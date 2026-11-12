import { DetectorItem } from '../telemetry.js';
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
export declare class SessionStorageSecretsDetector {
    static scan(): DetectorItem;
}
