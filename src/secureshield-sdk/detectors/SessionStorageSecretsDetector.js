import { StorageScrubber } from '../storage/StorageScrubber.js';
/**
 * SessionStorageSecretsDetector: P4 Informational / Storage Security Detector.
 *
 * Scans sessionStorage items for unencrypted JWT tokens, private keys, API secrets,
 * or password credentials stored in plaintext without cryptographic envelope protection.
 *
 * CROSS-CUTTING METRICS:
 * - Performance Cost: ~0.02ms (Direct storage key/value regex inspection)
 * - Execution Model: On-demand synchronous scan
 * - Sensitive Data: Matched secret values are REDACTED/HASHED; raw tokens are never recorded in telemetry.
 * - Evasion Limits: Encrypted payloads stored under benign key names cannot be inspected without keys.
 */
export class SessionStorageSecretsDetector {
    static scan() {
        const nowMs = Date.now().toString();
        const evidence = {
            scan_timestamp_ms: nowMs,
            probe_target: 'SessionStorage Plaintext Secrets & Tokens',
            probe_technique: 'session_storage_key_value_pattern_audit'
        };
        let triggered = false;
        const exposedKeys = [];
        try {
            if (typeof sessionStorage !== 'undefined') {
                const keyCount = sessionStorage.length;
                evidence['total_session_storage_items'] = keyCount;
                for (let i = 0; i < keyCount; i++) {
                    const key = sessionStorage.key(i) || '';
                    const rawValue = sessionStorage.getItem(key) || '';
                    const leakReason = StorageScrubber.evaluatePotentialLeak(key, rawValue);
                    if (leakReason) {
                        triggered = true;
                        exposedKeys.push(`Key '${key}' (Matched ${leakReason})`);
                    }
                }
            }
            evidence['detected_exposed_keys'] = exposedKeys;
            evidence['actual_value'] = triggered
                ? `Plaintext credentials found in sessionStorage (${exposedKeys.length}): ${exposedKeys.slice(0, 3).join(', ')}`
                : 'SessionStorage Plaintext Secrets verified clean in browser context';
            evidence['expected_value'] = 'SessionStorage must contain zero plaintext credentials, JWTs, or private keys';
            evidence['threat_classification'] = triggered
                ? 'UNENCRYPTED_PLAINTEXT_CREDENTIALS_IN_SESSION_STORAGE'
                : 'Clean browser environment';
            evidence['remediation_guidance'] = triggered
                ? 'Migrate unencrypted credentials into SecureShield Vault (AES-GCM encrypted) or HttpOnly cookies'
                : 'No action required. Baseline clean.';
        }
        catch (e) {
            evidence['error'] = `SessionStorageSecretsDetector error: ${e.message}`;
        }
        return {
            id: 'session_storage_plaintext_detector',
            triggered,
            severity: triggered ? 3 : 0,
            category: 'application_integrity',
            event: triggered ? 'session_storage_secrets_detected' : 'session_storage_plaintext_detector_verified',
            confidence: 0.90,
            fpRiskTier: 'LOW',
            evasionDifficulty: 'MEDIUM',
            status: triggered ? 'FAILED' : 'PASSED',
            name: 'SessionStorage Secrets Detector',
            evidence
        };
    }
}
