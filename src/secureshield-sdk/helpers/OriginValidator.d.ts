export interface OriginValidationResult {
    isValid: boolean;
    currentOrigin: string;
    currentHostname: string;
    isFramed: boolean;
    mismatchReason?: string;
}
export declare class OriginValidator {
    static normalizeDomain(input: string): string;
    static matchesDomain(currentHostname: string, targetPattern: string): boolean;
    static isLoopback(input: string): boolean;
    static parseIPv4(ipStr: string): number[] | null;
    static isPrivateOrRestrictedIPv4(octets: number[]): boolean;
    static parseIPv6(ipStr: string): {
        words: number[];
        embeddedV4: number[] | null;
    } | null;
    static isPrivateOrRestrictedIPv6(parsedV6: {
        words: number[];
        embeddedV4: number[] | null;
    }): boolean;
    static isPrivateOrRestrictedHost(hostname: string): boolean;
    static canonicalizeOrigin(input: string): string;
    static matchesOrigin(originA: string, originB: string): boolean;
    static isFramed(): boolean;
    static getCurrentContext(): {
        origin: string;
        hostname: string;
    };
    static validate(allowedOrigins?: string[]): OriginValidationResult;
}
