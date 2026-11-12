// Production v3 P-256 Public JWKs (RO-1, G-N13-2, G-N3-1)
export const POLICY_P256_JWK_V3 = {
    kty: 'EC',
    crv: 'P-256',
    x: 'W2hiHfGR-C3DAIFtr5-UXDBYlS5GePQ-WVqfbIaWja4',
    y: 'H85-tIZJ5_x6zJ48sZ-zYtpMr7mg8xjHd1T6lRofzFo'
};
export const LEASE_P256_JWK_V3 = {
    kty: 'EC',
    crv: 'P-256',
    x: 'tguAgCXW8e8uQYPbDmuydkrgZiqkZyBB_4A7QUuVICo',
    y: 'RU5L05mWtANjeSN4ZKPbuucuryXowWK6u8WaVnNrz-s'
};
// Legacy v2 & v1 keys strictly for non-production development/testing fallback
export const POLICY_P256_JWK_V2 = {
    kty: 'EC',
    crv: 'P-256',
    x: 'J6lyrQF7xDRiAi22Bisyyj0UFt1K829OfXzJ8oJUF3M',
    y: 'tM8MqCnHQY_MgGyd6zI0Qpxtr7kFxtCkqpbG4HM9xwU'
};
export const LEASE_P256_JWK_V2 = {
    kty: 'EC',
    crv: 'P-256',
    x: 'XbhWkskg6X_2czewC2U3AnLwxxUUcBeLJq87JpWNAyc',
    y: 'vwa2bMOLQn7IDKbk4k--622f8ZArjMk1GkiJsstm_uc'
};
const P256_KEY_V1 = {
    kty: 'EC',
    crv: 'P-256',
    x: 'Qh2qlAKK4ayAbp2duymbONlUsMxQFZky3_1a2XTKsUE',
    y: 'vxY1Ocbdd225AlaHNEaHMoAmN9bhtoHDxwXJ91Zd6sk'
};
// Production trust roots ONLY pin uncompromised v3 public keys (RO-1, G-N13-2, G-N3-1)
export const TRUSTED_POLICY_PUBLIC_KEYS = {
    secureshield_policy_p256_v3: POLICY_P256_JWK_V3
};
export const TRUSTED_LEASE_PUBLIC_KEYS = {
    secureshield_lease_p256_v3: LEASE_P256_JWK_V3
};
// Non-production development & test fallback keys
const DEV_POLICY_PUBLIC_KEYS = {
    secureshield_policy_p256_v1: P256_KEY_V1,
    secureshield_policy_p256_v2: POLICY_P256_JWK_V2
};
const DEV_LEASE_PUBLIC_KEYS = {
    secureshield_lease_p256_v1: P256_KEY_V1,
    secureshield_lease_p256_v2: LEASE_P256_JWK_V2
};
export class PolicySignatureVerifier {
    static getSubtle() {
        const s = (typeof globalThis !== 'undefined' && globalThis.crypto?.subtle) ||
            (typeof window !== 'undefined' && window.crypto?.subtle);
        if (!s)
            throw new Error('WebCrypto subtle unavailable');
        return s;
    }
    static base64UrlToUint8Array(base64url) {
        let b64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
        while (b64.length % 4 !== 0)
            b64 += '=';
        if (typeof atob === 'function') {
            const bin = atob(b64);
            const arr = new Uint8Array(bin.length);
            for (let i = 0; i < bin.length; i++)
                arr[i] = bin.charCodeAt(i);
            return arr;
        }
        const buf = globalThis.Buffer;
        if (buf)
            return new Uint8Array(buf.from(b64, 'base64'));
        throw new Error('Base64 decode unavailable');
    }
    static async verifyPolicyEnvelope(data, customKeys, clockOffsetSec = 0, isProduction = false) {
        return PolicySignatureVerifier.verifyEnvelopeInternal(data, 'policy', customKeys, clockOffsetSec, isProduction);
    }
    static async verifyLeaseEnvelope(data, customKeys, clockOffsetSec = 0, isProduction = false) {
        return PolicySignatureVerifier.verifyEnvelopeInternal(data, 'lease', customKeys, clockOffsetSec, isProduction);
    }
    static async verifyEnvelopeInternal(data, expectedPurpose, customKeys, clockOffsetSec = 0, isProduction = false) {
        if (!data || typeof data !== 'object') {
            return { isValid: false, policy: null, reason: `Invalid ${expectedPurpose} payload` };
        }
        if (!data.protected || !data.payload || !data.signature) {
            return { isValid: false, policy: null, reason: 'lacks cryptographic JWS envelope' };
        }
        try {
            const headerBytes = PolicySignatureVerifier.base64UrlToUint8Array(data.protected);
            const header = JSON.parse(new TextDecoder().decode(headerBytes));
            if (header.alg !== 'ES256') {
                return { isValid: false, policy: null, reason: `Unsupported alg: ${header.alg}` };
            }
            const defaultKid = expectedPurpose === 'policy' ? 'secureshield_policy_p256_v3' : 'secureshield_lease_p256_v3';
            const kid = header.kid || defaultKid;
            // In production mode, strictly reject any development or legacy compromised keys (G-N13-2, RO-1)
            if (isProduction && (!customKeys || !customKeys[kid])) {
                if (kid === 'secureshield_policy_p256_v1' ||
                    kid === 'secureshield_policy_p256_v2' ||
                    kid === 'secureshield_lease_p256_v1' ||
                    kid === 'secureshield_lease_p256_v2' ||
                    kid.includes('dev') ||
                    kid.includes('test')) {
                    return {
                        isValid: false,
                        policy: null,
                        kid,
                        reason: `Compromised or non-production key '${kid}' is forbidden in production environment`
                    };
                }
            }
            // Purpose binding enforcement (RO-1, G-N13-2, G-N3-1, NI-5)
            let keyPool;
            if (expectedPurpose === 'policy') {
                if (header.typ && (header.typ === 'secureshield-lease+jwt' || header.typ === 'lease')) {
                    return { isValid: false, policy: null, kid, reason: 'Purpose binding mismatch: lease envelope cannot be used as policy' };
                }
                if (kid === 'secureshield_lease_p256_v1' ||
                    kid === 'secureshield_lease_p256_v2' ||
                    kid === 'secureshield_lease_p256_v3') {
                    return { isValid: false, policy: null, kid, reason: 'Purpose binding mismatch: lease key cannot sign policy' };
                }
                keyPool = isProduction
                    ? { ...TRUSTED_POLICY_PUBLIC_KEYS, ...(customKeys || {}) }
                    : { ...TRUSTED_POLICY_PUBLIC_KEYS, ...DEV_POLICY_PUBLIC_KEYS, ...(customKeys || {}) };
            }
            else {
                if (header.typ && (header.typ === 'secureshield-policy+jwt' || header.typ === 'policy')) {
                    return { isValid: false, policy: null, kid, reason: 'Purpose binding mismatch: policy envelope cannot be used as lease' };
                }
                if (kid === 'secureshield_policy_p256_v1' ||
                    kid === 'secureshield_policy_p256_v2' ||
                    kid === 'secureshield_policy_p256_v3') {
                    return { isValid: false, policy: null, kid, reason: 'Purpose binding mismatch: policy key cannot sign lease' };
                }
                keyPool = isProduction
                    ? { ...TRUSTED_LEASE_PUBLIC_KEYS, ...(customKeys || {}) }
                    : { ...TRUSTED_LEASE_PUBLIC_KEYS, ...DEV_LEASE_PUBLIC_KEYS, ...(customKeys || {}) };
            }
            // Hardening: strictly accept only pinned keys or explicit customKeys; NEVER fall back to untrusted embedded keys (G-N13-3, G-N3-2)
            const publicKeyJwk = keyPool[kid];
            if (!publicKeyJwk) {
                return { isValid: false, policy: null, kid, reason: `Unknown kid: ${kid} (untrusted)` };
            }
            // Clock skew compensation with clamped server time offset (NI-3: asymmetric clamp [-300s, +3600s])
            // Negative offset is clamped to -300s to prevent replay of expired envelopes via forged server_time
            // Positive offset is clamped to +3600s (1 hour) to accommodate slow client device clocks
            const clampedOffsetSec = Math.max(-300, Math.min(3600, Number(clockOffsetSec) || 0));
            const now = Math.floor(Date.now() / 1000) + clampedOffsetSec;
            if (typeof header.iat === 'number' && header.iat > now + 300) {
                return { isValid: false, policy: null, kid, reason: `Clock skew violation: ${header.iat} > ${now}` };
            }
            if (typeof header.exp === 'number' && header.exp < now - 300) {
                return { isValid: false, policy: null, kid, reason: `Expired ${expectedPurpose} signature: exp ${header.exp} < ${now}` };
            }
            const toVerify = new TextEncoder().encode(`${data.protected}.${data.payload}`);
            const sigBytes = PolicySignatureVerifier.base64UrlToUint8Array(data.signature);
            if (sigBytes.length !== 64) {
                return { isValid: false, policy: null, kid, reason: 'Invalid signature length' };
            }
            const subtle = PolicySignatureVerifier.getSubtle();
            const key = await subtle.importKey('jwk', publicKeyJwk, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['verify']);
            const isOk = await subtle.verify({ name: 'ECDSA', hash: { name: 'SHA-256' } }, key, sigBytes, toVerify);
            if (!isOk) {
                return { isValid: false, policy: null, kid, reason: 'verification failed' };
            }
            const payloadBytes = PolicySignatureVerifier.base64UrlToUint8Array(data.payload);
            const policy = JSON.parse(new TextDecoder().decode(payloadBytes));
            return { isValid: true, policy, kid, iat: header.iat, exp: header.exp };
        }
        catch (err) {
            return { isValid: false, policy: null, reason: `Verification error: ${err?.message || err}` };
        }
    }
}
