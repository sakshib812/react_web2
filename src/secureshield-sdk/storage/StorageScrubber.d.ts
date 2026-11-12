export interface StorageLeakItem {
    storage: 'localStorage' | 'sessionStorage';
    key: string;
    reason: string;
    namespace?: string;
    category?: 'token' | 'key' | 'password' | 'credential' | 'secret';
}
export interface StorageLeakReport {
    leaksFound: number;
    leakingKeys: StorageLeakItem[];
    inspectedCount: number;
}
export declare class StorageScrubber {
    static readonly UUID_REGEX: RegExp;
    static readonly JWT_REGEX: RegExp;
    static readonly BEARER_REGEX: RegExp;
    static readonly PEM_REGEX: RegExp;
    static readonly HEX64_REGEX: RegExp;
    static readonly API_KEY_REGEX: RegExp;
    static readonly SENSITIVE_KEY_REGEX: RegExp;
    static readonly SAFE_KEY_REGEX: RegExp;
    static scanForPlaintextLeaks(): StorageLeakReport;
    static purgePlaintextLeaks(whitelistKeys?: string[]): StorageLeakReport;
    static wipeVolatileStorage(): void;
    static evaluatePotentialLeak(key: string, value: string): string | null;
}
