export declare const POLICY_P256_JWK_V3: JsonWebKey;
export declare const LEASE_P256_JWK_V3: JsonWebKey;
export declare const POLICY_P256_JWK_V2: JsonWebKey;
export declare const LEASE_P256_JWK_V2: JsonWebKey;
export declare const TRUSTED_POLICY_PUBLIC_KEYS: Record<string, JsonWebKey>;
export declare const TRUSTED_LEASE_PUBLIC_KEYS: Record<string, JsonWebKey>;
export interface PolicyVerificationResult {
    isValid: boolean;
    policy: any | null;
    kid?: string;
    reason?: string;
    iat?: number;
    exp?: number;
}
export declare class PolicySignatureVerifier {
    private static getSubtle;
    static base64UrlToUint8Array(base64url: string): Uint8Array;
    static verifyPolicyEnvelope(data: any, customKeys?: Record<string, JsonWebKey>, clockOffsetSec?: number, isProduction?: boolean): Promise<PolicyVerificationResult>;
    static verifyLeaseEnvelope(data: any, customKeys?: Record<string, JsonWebKey>, clockOffsetSec?: number, isProduction?: boolean): Promise<PolicyVerificationResult>;
    private static verifyEnvelopeInternal;
}
