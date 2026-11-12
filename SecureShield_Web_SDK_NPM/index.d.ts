import { SecurityAuditReport } from './telemetry.js';
import { OriginValidator } from './helpers/OriginValidator.js';
import { RemediationManager } from './remediation/RemediationManager.js';
import { TabBlurOptions } from './ui/TabBlurShield.js';
import { WatermarkOptions } from './ui/SecureUiHardening.js';
export interface SecureShieldConfig {
    tenantId?: string;
    appId?: string;
    appVersion?: string;
    appToken?: string;
    headerKey?: string;
    encryptionKey?: string;
    initializationKey?: string;
    serverUrl?: string;
    publicKeyPem?: string;
    serverPublicKeyBase64?: string;
    hmacKeyHex?: string;
    enableE2eeEncryption?: boolean;
    allowedOrigins?: string[];
    offlineGracePeriodMs?: number;
    skipHandshake?: boolean;
    blockRedirectUrl?: string | null;
    enableDomLockoutOverlay?: boolean;
    onRemediationTriggered?: (action: string, reason?: string) => void;
    onWipeKeys?: () => void;
    enableTabBlurShield?: boolean;
    tabBlurOptions?: TabBlurOptions;
    enableWatermark?: boolean;
    watermarkText?: string;
    watermarkOptions?: WatermarkOptions;
    defaultClipboardWipeTimeoutMs?: number;
    enableStorageLeakScrubber?: boolean;
    storageWhitelistKeys?: string[];
    enablePrototypeFreezing?: boolean;
    enableRuntimeIntegrityWatchdog?: boolean;
    onTamperDetected?: (api: string, details: string) => void;
    autoIngest?: boolean;
    environment?: 'production' | 'staging' | 'development';
    consent?: {
        behavioralBiometrics?: boolean;
    };
    /**
     * @deprecated Use `consent: { behavioralBiometrics: true }` to explicitly grant consent under GDPR/DPDP.
     */
    enableBehavioralBiometrics?: boolean;
    /**
     * Optional custom public keys to verify remote policy signatures against (enterprise key pinning or test overrides).
     */
    customPolicyKeys?: Record<string, JsonWebKey>;
    /**
     * Optional custom public keys to verify offline grace leases against (enterprise key pinning or test overrides).
     */
    customLeaseKeys?: Record<string, JsonWebKey>;
    /**
     * @deprecated N-12: appToken transmission via URL query string has been completely removed.
     * appToken is now transmitted strictly via the x-app-token header.
     * This option is retained as a no-op for backward compatibility.
     */
    preferHeaderAppToken?: boolean;
    disabledDetectors?: string[];
    /**
     * Gates strict cryptographic lease binding enforcement (NEW-1).
     * When true (default), leases lacking signed app_id, origin, iat, or exp are rejected fail-closed.
     * When false (staged rollout / migration mode), incomplete leases are treated as requiring
     * an online refresh with an operational warning, without falling back to unsigned data.
     * Default: true.
     */
    strictLeaseBindingEnforcement?: boolean;
}
export declare function normalizeEnvironment(env?: unknown): 'production' | 'staging' | 'development';
export declare function getBaseApiUrl(u: string): string;
export declare class SecureShield {
    #private;
    private tenantId;
    private appId;
    private appToken?;
    private appVersion;
    private headerKey?;
    private encryptionKey?;
    private initializationKey?;
    private sessionToken?;
    private deviceToken?;
    private serverUrl;
    private publicKeyPem?;
    private serverPublicKeyBase64?;
    private hmacKeyHex?;
    private enableE2eeEncryption;
    private allowedOrigins?;
    private offlineGracePeriodMs;
    private remediationManager;
    private autoIngest;
    private isHandshakeApproved;
    private isOfflineMode;
    private hasBiometricConsent;
    private preferHeaderAppToken;
    private strictLeaseBindingEnforcement;
    private customPolicyKeys?;
    private customLeaseKeys?;
    private constructor();
    static readonly OriginValidator: typeof OriginValidator;
    static validateProductionServerUrl(serverUrl?: string): void;
    static init(config?: SecureShieldConfig): Promise<SecureShield>;
    getHandshakeUrl(): string;
    getSdkInitializeUrl(): string;
    initializeWithKeys(isRetry?: boolean): Promise<boolean>;
    getSessionToken(): string | undefined;
    getDeviceToken(): string | undefined;
    isInitialized(): boolean;
    clearSession(): Promise<void>;
    executeSdkHandshake(isRetry?: boolean): Promise<boolean>;
    private checkOfflineGraceLease;
    isApproved(response?: any): boolean;
    isHandshakeActive(): boolean;
    getLatestAuditReport(): SecurityAuditReport | null;
    grantConsent(category: 'behavioralBiometrics'): void;
    revokeConsent(category: 'behavioralBiometrics'): void;
    hasConsent(category: 'behavioralBiometrics'): boolean;
    private initBiometricListeners;
    private teardownBiometricListeners;
    isOperatingOffline(): boolean;
    getIngestUrl(): string;
    getPolicyUrl(): string;
    fetchSignedRemotePolicy(): Promise<void>;
    private getFailClosedDefaultPolicy;
    evaluateSecurityState(): Promise<SecurityAuditReport & {
        trustScore: number;
    }>;
    ingestTelemetry(reportPayload?: SecurityAuditReport): Promise<any>;
    isPaused(): boolean;
    setPaused(paused: boolean): void;
    getRemediationManager(): RemediationManager;
    runScan(options?: {
        ingest?: boolean;
    }): SecurityAuditReport;
    scan(options?: {
        ingest?: boolean;
    }): SecurityAuditReport;
    getDetailedDeviceSecurityScan(): string;
}
export * from './telemetry.js';
export * from './detectors/DevToolsDetector.js';
export * from './detectors/HeadlessBrowserDetector.js';
export * from './detectors/BrowserFingerprintDetector.js';
export * from './detectors/BrowserVersionIntegrityDetector.js';
export * from './detectors/BrowserCapabilitySpoofingDetector.js';
export * from './detectors/UserAgentTamperingDetector.js';
export * from './detectors/NavigatorPropertyIntegrityDetector.js';
export * from './detectors/TimeManipulationDetector.js';
export * from './detectors/AutomationEnvironmentDetector.js';
export * from './detectors/VirtualBrowserDetector.js';
export * from './detectors/ConsoleTamperingDetector.js';
export * from './detectors/DomTamperingDetector.js';
export * from './detectors/DynamicEvalDetector.js';
export * from './detectors/RuntimeHookDetector.js';
export * from './detectors/FunctionPrototypeTamperingDetector.js';
export * from './detectors/NativeApiOverrideDetector.js';
export * from './detectors/WasmIntegrityDetector.js';
export * from './detectors/ScriptInjectionDetector.js';
export * from './detectors/RuntimeFunctionHookDetector.js';
export * from './detectors/GlobalObjectTamperingDetector.js';
export * from './detectors/MemoryLeakExploitationDetector.js';
export * from './detectors/DebuggerDetectionDetector.js';
export * from './detectors/ExtensionInjectionDetector.js';
export * from './detectors/MaliciousExtensionDetector.js';
export * from './detectors/ContentScriptInjectionDetector.js';
export * from './detectors/ExtensionPermissionAbuseDetector.js';
export * from './detectors/AdInjectionDetector.js';
export * from './detectors/CryptoMinerDetector.js';
export * from './detectors/ClipboardHijackingDetector.js';
export * from './detectors/PluginIntegrityDetector.js';
export * from './detectors/WebStoragePlaintextDetector.js';
export * from './detectors/SessionStorageSecretsDetector.js';
export * from './detectors/CookiePolicyDetector.js';
export * from './detectors/IndexedDbIntegrityDetector.js';
export * from './detectors/ServiceWorkerIntegrityDetector.js';
export * from './detectors/ManifestIntegrityDetector.js';
export * from './detectors/ClientConfigTamperingDetector.js';
export * from './detectors/SriComplianceDetector.js';
export * from './detectors/SslValidationDetector.js';
export * from './detectors/WebCertificatePinningDetector.js';
export * from './detectors/HttpsEnforcementDetector.js';
export * from './detectors/MixedContentDetector.js';
export * from './detectors/WebDnsManipulationDetector.js';
export * from './detectors/WebProxyDetector.js';
export * from './detectors/WebVpnDetector.js';
export * from './detectors/NetworkLatencyDetector.js';
export * from './detectors/IframeClickjackingDetector.js';
export * from './detectors/UiOverlayDetector.js';
export * from './detectors/HiddenElementDetector.js';
export * from './detectors/ScreenCaptureDetector.js';
export * from './detectors/WindowFocusDetector.js';
export * from './detectors/BotBehaviorDetector.js';
export * from './detectors/MouseDynamicsDetector.js';
export * from './detectors/KeyboardDynamicsDetector.js';
export * from './detectors/TouchEventDetector.js';
export * from './detectors/HumanInteractionDetector.js';
export * from './detectors/WebSessionHijackDetector.js';
export * from './detectors/CredentialStuffingDetector.js';
export * from './detectors/ImpossibleNavigationDetector.js';
export * from './detectors/SessionAnomalyDetector.js';
export * from './detectors/webgl_renderer_vendor_detector.js';
export * from './detectors/webgpu_subsystem_detector.js';
export * from './detectors/canvas_fingerprint_integrity_detector.js';
export * from './detectors/battery_subsystem_detector.js';
export * from './detectors/screen_geometry_detector.js';
export * from './detectors/hardware_topology_detector.js';
export * from './detectors/prototype_chain_integrity_detector.js';
export * from './detectors/automation_artifacts_detector.js';
export * from './detectors/localstorage_secrets_detector.js';
export * from './detectors/wasm_bytecode_integrity_detector.js';
export * from './detectors/client_hints_consistency_detector.js';
export * from './detectors/permissions_api_sweep_detector.js';
export * from './detectors/webauthn_hardware_authenticator_detector.js';
export * from './detectors/input_pointer_media_query_detector.js';
export * from './detectors/intl_locale_fingerprint_detector.js';
export * from './detectors/error_stack_format_detector.js';
export * from './detectors/font_loading_enumeration_detector.js';
export * from './detectors/math_fp_precision_detector.js';
export * from './detectors/media_capabilities_codec_detector.js';
export * from './detectors/storage_quota_estimate_detector.js';
export * from './detectors/css_engine_feature_matrix_detector.js';
export * from './detectors/adblocker_presence_detector.js';
export * from './detectors/global_privacy_control_detector.js';
export * from './crypto/PayloadSecurityHelper.js';
export * from './helpers/OriginValidator.js';
export * from './storage/IndexedDbLeaseVault.js';
export * from './remediation/RemediationManager.js';
export * from './ui/SecurityLockoutOverlay.js';
export * from './ui/TabBlurShield.js';
export * from './ui/SecureClipboard.js';
export * from './ui/SecureUiHardening.js';
export * from './crypto/MemoryScrubber.js';
export * from './storage/StorageScrubber.js';
export * from './integrity/RuntimeIntegrityGuardian.js';
export * from './detectors/DeviceFingerprintEngine.js';
export * from './telemetry.js';
export default SecureShield;
