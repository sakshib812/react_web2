/**
 * SecurityLockoutOverlay: DOM Lockout & Threat Remediation Screen Overlay
 * Renders an un-dismissible, high-contrast security lockout shield over the DOM.
 * Fortified with MutationObservers against DOM tampering, removal, or CSS suppression (N-9).
 */
export declare class SecurityLockoutOverlay {
    static OVERLAY_ELEMENT_ID: string;
    private static readonly EVTS;
    private static isCapturingEvents;
    private static isLockoutEnforced;
    private static isMutating;
    private static bodyObserver;
    private static overlayObserver;
    private static lastTitle;
    private static lastMessage;
    private static lastIncidentId?;
    private static eventSuppressor;
    static renderLockoutOverlay(title?: string, message?: string, incidentId?: string): void;
    private static attachObservers;
    private static ensureOverlayStyles;
    static dismissLockoutOverlay(): void;
    static isLockoutActive(): boolean;
}
