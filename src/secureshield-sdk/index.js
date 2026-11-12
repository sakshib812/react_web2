import { TelemetrySerializer, SDK_VERSION } from './telemetry.js';
import { PayloadSecurityHelper } from './crypto/PayloadSecurityHelper.js';
import { envelopeEncrypt } from './crypto/EnvelopeCrypto.js';
import { OriginValidator } from './helpers/OriginValidator.js';
import { PolicySignatureVerifier } from './helpers/PolicySignatureVerifier.js';
import { IndexedDbLeaseVault } from './storage/IndexedDbLeaseVault.js';
import { RemediationManager } from './remediation/RemediationManager.js';
import { TabBlurShield } from './ui/TabBlurShield.js';
import { SecureUiHardening } from './ui/SecureUiHardening.js';
import { StorageScrubber } from './storage/StorageScrubber.js';
import { RuntimeIntegrityGuardian } from './integrity/RuntimeIntegrityGuardian.js';
import { DevToolsDetector } from './detectors/DevToolsDetector.js';
import { HeadlessBrowserDetector } from './detectors/HeadlessBrowserDetector.js';
import { BrowserFingerprintDetector } from './detectors/BrowserFingerprintDetector.js';
import { BrowserVersionIntegrityDetector } from './detectors/BrowserVersionIntegrityDetector.js';
import { BrowserCapabilitySpoofingDetector } from './detectors/BrowserCapabilitySpoofingDetector.js';
import { UserAgentTamperingDetector } from './detectors/UserAgentTamperingDetector.js';
import { NavigatorPropertyIntegrityDetector } from './detectors/NavigatorPropertyIntegrityDetector.js';
import { TimeManipulationDetector } from './detectors/TimeManipulationDetector.js';
import { AutomationEnvironmentDetector } from './detectors/AutomationEnvironmentDetector.js';
import { VirtualBrowserDetector } from './detectors/VirtualBrowserDetector.js';
import { ConsoleTamperingDetector } from './detectors/ConsoleTamperingDetector.js';
import { DomTamperingDetector } from './detectors/DomTamperingDetector.js';
import { DynamicEvalDetector } from './detectors/DynamicEvalDetector.js';
import { RuntimeHookDetector } from './detectors/RuntimeHookDetector.js';
import { FunctionPrototypeTamperingDetector } from './detectors/FunctionPrototypeTamperingDetector.js';
import { NativeApiOverrideDetector } from './detectors/NativeApiOverrideDetector.js';
import { WasmIntegrityDetector } from './detectors/WasmIntegrityDetector.js';
import { ScriptInjectionDetector } from './detectors/ScriptInjectionDetector.js';
import { RuntimeFunctionHookDetector } from './detectors/RuntimeFunctionHookDetector.js';
import { GlobalObjectTamperingDetector } from './detectors/GlobalObjectTamperingDetector.js';
import { MemoryLeakExploitationDetector } from './detectors/MemoryLeakExploitationDetector.js';
import { DebuggerDetectionDetector } from './detectors/DebuggerDetectionDetector.js';
import { ExtensionInjectionDetector } from './detectors/ExtensionInjectionDetector.js';
import { MaliciousExtensionDetector } from './detectors/MaliciousExtensionDetector.js';
import { ContentScriptInjectionDetector } from './detectors/ContentScriptInjectionDetector.js';
import { ExtensionPermissionAbuseDetector } from './detectors/ExtensionPermissionAbuseDetector.js';
import { AdInjectionDetector } from './detectors/AdInjectionDetector.js';
import { CryptoMinerDetector } from './detectors/CryptoMinerDetector.js';
import { ClipboardHijackingDetector } from './detectors/ClipboardHijackingDetector.js';
import { PluginIntegrityDetector } from './detectors/PluginIntegrityDetector.js';
import { WebStoragePlaintextDetector } from './detectors/WebStoragePlaintextDetector.js';
import { SessionStorageSecretsDetector } from './detectors/SessionStorageSecretsDetector.js';
import { CookiePolicyDetector } from './detectors/CookiePolicyDetector.js';
import { IndexedDbIntegrityDetector } from './detectors/IndexedDbIntegrityDetector.js';
import { ServiceWorkerIntegrityDetector } from './detectors/ServiceWorkerIntegrityDetector.js';
import { ManifestIntegrityDetector } from './detectors/ManifestIntegrityDetector.js';
import { ClientConfigTamperingDetector } from './detectors/ClientConfigTamperingDetector.js';
import { SriComplianceDetector } from './detectors/SriComplianceDetector.js';
import { SslValidationDetector } from './detectors/SslValidationDetector.js';
import { WebCertificatePinningDetector } from './detectors/WebCertificatePinningDetector.js';
import { HttpsEnforcementDetector } from './detectors/HttpsEnforcementDetector.js';
import { MixedContentDetector } from './detectors/MixedContentDetector.js';
import { WebDnsManipulationDetector } from './detectors/WebDnsManipulationDetector.js';
import { WebProxyDetector } from './detectors/WebProxyDetector.js';
import { WebVpnDetector } from './detectors/WebVpnDetector.js';
import { NetworkLatencyDetector } from './detectors/NetworkLatencyDetector.js';
import { IframeClickjackingDetector } from './detectors/IframeClickjackingDetector.js';
import { UiOverlayDetector } from './detectors/UiOverlayDetector.js';
import { HiddenElementDetector } from './detectors/HiddenElementDetector.js';
import { ScreenCaptureDetector } from './detectors/ScreenCaptureDetector.js';
import { WindowFocusDetector } from './detectors/WindowFocusDetector.js';
import { BotBehaviorDetector } from './detectors/BotBehaviorDetector.js';
import { MouseDynamicsDetector } from './detectors/MouseDynamicsDetector.js';
import { KeyboardDynamicsDetector } from './detectors/KeyboardDynamicsDetector.js';
import { TouchEventDetector } from './detectors/TouchEventDetector.js';
import { HumanInteractionDetector } from './detectors/HumanInteractionDetector.js';
import { WebSessionHijackDetector } from './detectors/WebSessionHijackDetector.js';
import { CredentialStuffingDetector } from './detectors/CredentialStuffingDetector.js';
import { ImpossibleNavigationDetector } from './detectors/ImpossibleNavigationDetector.js';
import { SessionAnomalyDetector } from './detectors/SessionAnomalyDetector.js';
import { WebglRendererVendorDetector } from './detectors/webgl_renderer_vendor_detector.js';
import { WebgpuSubsystemDetector } from './detectors/webgpu_subsystem_detector.js';
import { CanvasFingerprintIntegrityDetector } from './detectors/canvas_fingerprint_integrity_detector.js';
import { BatterySubsystemDetector } from './detectors/battery_subsystem_detector.js';
import { ScreenGeometryDetector } from './detectors/screen_geometry_detector.js';
import { HardwareTopologyDetector } from './detectors/hardware_topology_detector.js';
import { PrototypeChainIntegrityDetector } from './detectors/prototype_chain_integrity_detector.js';
import { AutomationArtifactsDetector } from './detectors/automation_artifacts_detector.js';
import { LocalstorageSecretsDetector } from './detectors/localstorage_secrets_detector.js';
import { WasmBytecodeIntegrityDetector } from './detectors/wasm_bytecode_integrity_detector.js';
import { ClientHintsConsistencyDetector } from './detectors/client_hints_consistency_detector.js';
import { PermissionsApiSweepDetector } from './detectors/permissions_api_sweep_detector.js';
import { WebAuthnHardwareAuthenticatorDetector } from './detectors/webauthn_hardware_authenticator_detector.js';
import { InputPointerMediaQueryDetector } from './detectors/input_pointer_media_query_detector.js';
import { IntlLocaleFingerprintDetector } from './detectors/intl_locale_fingerprint_detector.js';
import { ErrorStackFormatDetector } from './detectors/error_stack_format_detector.js';
import { FontLoadingEnumerationDetector } from './detectors/font_loading_enumeration_detector.js';
import { MathFpPrecisionDetector } from './detectors/math_fp_precision_detector.js';
import { MediaCapabilitiesCodecDetector } from './detectors/media_capabilities_codec_detector.js';
import { StorageQuotaEstimateDetector } from './detectors/storage_quota_estimate_detector.js';
import { CssEngineFeatureMatrixDetector } from './detectors/css_engine_feature_matrix_detector.js';
import { AdblockerPresenceDetector } from './detectors/adblocker_presence_detector.js';
import { GlobalPrivacyControlDetector } from './detectors/global_privacy_control_detector.js';
const _call = Function.prototype.call, _trim = String.prototype.trim, _lower = String.prototype.toLowerCase, _URL_ctor = typeof URL !== 'undefined' ? URL : (typeof window !== 'undefined' ? window.URL : undefined);
export function normalizeEnvironment(env) {
    if (env === undefined)
        return 'production';
    if (typeof env !== 'string') {
        throw new Error(`[SecureShield Configuration Error] Invalid environment: expected string, received ${typeof env}.`);
    }
    const n = _call.call(_lower, _call.call(_trim, env));
    if (n === 'production' || n === 'staging' || n === 'development')
        return n;
    if (n === 'sandbox')
        return 'development';
    const s = (env.length > 64 ? env.slice(0, 64) + '...' : env).replace(/[\0-\x1f\x7f-\x9f]/g, '_');
    throw new Error(`[SecureShield Configuration Error] Invalid environment '${s}'. Expected 'production', 'staging', or 'development'.`);
}
function buildApiEndpoint(rawServerUrl, endpointSubpath, extraQueryParams) {
    if (!rawServerUrl || typeof rawServerUrl !== 'string')
        return '';
    const trimmed = _call.call(_trim, rawServerUrl);
    if (!trimmed)
        return '';
    try {
        const url = _URL_ctor ? new _URL_ctor(trimmed) : new URL(trimmed);
        let pathname = url.pathname.replace(/\/+$/, '');
        pathname = pathname.replace(/(?:\/api\/v1\/(?:telemetry\/ingest|policy\/config|auth\/sdk-handshake|sdk\/initialize)|\/telemetry\/ingest|\/api\/v1)$/i, '');
        const combinedPath = (pathname + endpointSubpath).replace(/\/+/g, '/');
        url.pathname = combinedPath;
        if (extraQueryParams) {
            extraQueryParams.forEach((val, key) => {
                url.searchParams.set(key, val);
            });
        }
        url.hash = '';
        return url.toString();
    }
    catch {
        const stripped = trimmed.replace(/\/+$/, '').replace(/(?:\/api\/v1\/(?:telemetry\/ingest|policy\/config|auth\/sdk-handshake|sdk\/initialize)|\/telemetry\/ingest|\/api\/v1)$/i, '');
        const queryIdx = stripped.indexOf('?');
        if (queryIdx !== -1) {
            const base = stripped.slice(0, queryIdx).replace(/\/+$/, '');
            const search = stripped.slice(queryIdx);
            if (extraQueryParams && extraQueryParams.toString()) {
                const joiner = search.includes('?') ? '&' : '?';
                return `${base}${endpointSubpath}${search}${joiner}${extraQueryParams.toString()}`;
            }
            return `${base}${endpointSubpath}${search}`;
        }
        const queryPart = extraQueryParams && extraQueryParams.toString() ? `?${extraQueryParams.toString()}` : '';
        return `${stripped}${endpointSubpath}${queryPart}`;
    }
}
export function getBaseApiUrl(u) {
    if (!u || typeof u !== 'string')
        return '';
    const trimmed = _call.call(_trim, u);
    if (!trimmed)
        return '';
    try {
        const url = _URL_ctor ? new _URL_ctor(trimmed) : new URL(trimmed);
        let pathname = url.pathname.replace(/\/+$/, '');
        pathname = pathname.replace(/(?:\/api\/v1\/(?:telemetry\/ingest|policy\/config|auth\/sdk-handshake|sdk\/initialize)|\/telemetry\/ingest|\/api\/v1)$/i, '');
        url.pathname = pathname;
        url.search = '';
        url.hash = '';
        return url.toString().replace(/\/+$/, '');
    }
    catch {
        return trimmed.replace(/\/+$/, '').replace(/(?:\/api\/v1\/(?:telemetry\/ingest|policy\/config|auth\/sdk-handshake|sdk\/initialize)|\/telemetry\/ingest|\/api\/v1)$/i, '');
    }
}
export class SecureShield {
    tenantId;
    appId;
    appToken;
    appVersion;
    headerKey;
    encryptionKey;
    initializationKey;
    sessionToken;
    deviceToken;
    serverUrl;
    publicKeyPem;
    serverPublicKeyBase64;
    hmacKeyHex;
    enableE2eeEncryption;
    allowedOrigins;
    offlineGracePeriodMs;
    remediationManager;
    #isPausedState = false;
    autoIngest;
    #environment;
    #verifiedPolicy = null;
    isHandshakeApproved = false;
    isOfflineMode = false;
    hasBiometricConsent = false;
    #clockOffsetSec = 0;
    #lastPolicyTimestamp = 0;
    #latestAuditReport = null;
    preferHeaderAppToken = true;
    strictLeaseBindingEnforcement = true;
    customPolicyKeys;
    customLeaseKeys;
    constructor(config) {
        this.customPolicyKeys = config?.customPolicyKeys;
        this.customLeaseKeys = config?.customLeaseKeys;
        const resolvedEnv = normalizeEnvironment(config?.environment);
        if (resolvedEnv === 'production') {
            SecureShield.validateProductionServerUrl(config?.serverUrl);
        }
        this.#environment = resolvedEnv;
        this.#isPausedState = false;
        this.#clockOffsetSec = (() => {
            try {
                if (typeof localStorage !== 'undefined') {
                    const stored = localStorage.getItem('secureshield_clock_offset_sec');
                    if (stored) {
                        const parsed = parseInt(stored, 10);
                        if (!isNaN(parsed))
                            return Math.max(-300, Math.min(3600, parsed));
                    }
                }
            }
            catch { }
            return 0;
        })();
        this.#lastPolicyTimestamp = 0;
        this.#verifiedPolicy = null;
        this.#latestAuditReport = null;
        Object.defineProperty(this, 'isPausedState', {
            get: () => this.#isPausedState,
            set: () => { },
            configurable: false
        });
        Object.defineProperty(this, 'environment', {
            get: () => this.#environment,
            set: () => { },
            configurable: false
        });
        Object.defineProperty(this, 'verifiedPolicy', {
            get: () => this.#verifiedPolicy,
            set: () => { },
            configurable: false
        });
        Object.defineProperty(this, 'latestAuditReport', {
            get: () => this.#latestAuditReport,
            set: (val) => {
                if (this.#environment === 'development') {
                    this.#latestAuditReport = val;
                }
            },
            configurable: false
        });
        this.tenantId = config?.tenantId || 'TEN-ENTERPRISE-01';
        this.appId = config?.appId || 'app_web_portal_prod';
        this.appVersion = config?.appVersion || '1.0.0';
        this.appToken = config?.appToken;
        this.headerKey = config?.headerKey;
        this.encryptionKey = config?.encryptionKey;
        this.initializationKey = config?.initializationKey;
        const proc = typeof globalThis !== 'undefined' ? globalThis.process : undefined;
        const envApiBase = proc?.env?.API_BASE_URL || proc?.env?.VITE_API_BASE_URL || proc?.env?.SECURESHIELD_SERVER_URL || proc?.env?.REACT_APP_SECURESHIELD_URL || (typeof window !== 'undefined' && (window.__SECURESHIELD_ENV__?.API_BASE_URL || window._env_?.VITE_API_BASE_URL));
        const defaultServerUrl = envApiBase ? `${envApiBase.replace(/\/+$/, '').replace(/\/api\/v1$/, '')}/api/v1/telemetry/ingest` : '';
        this.serverUrl = config?.serverUrl || defaultServerUrl;
        this.publicKeyPem = config?.publicKeyPem;
        this.serverPublicKeyBase64 = config?.serverPublicKeyBase64;
        this.hmacKeyHex = config?.hmacKeyHex;
        this.enableE2eeEncryption = config?.enableE2eeEncryption ?? true;
        this.allowedOrigins = config?.allowedOrigins;
        this.offlineGracePeriodMs = config?.offlineGracePeriodMs ?? (86400 * 1000); // 24 Hours default
        const isDev = resolvedEnv === 'development';
        this.remediationManager = new RemediationManager({
            ...config,
            enableDomLockoutOverlay: config?.enableDomLockoutOverlay ?? true,
            blockRedirectUrl: config?.blockRedirectUrl !== undefined ? config.blockRedirectUrl : (isDev ? null : '/access-blocked'),
            requireSignature: true
        });
        this.autoIngest = config?.autoIngest ?? false;
        this.preferHeaderAppToken = config?.preferHeaderAppToken ?? true;
        this.strictLeaseBindingEnforcement = config?.strictLeaseBindingEnforcement ?? true;
        if (config?.serverPublicKeyBase64) {
            PayloadSecurityHelper.setServerPublicKey(config.serverPublicKeyBase64);
        }
        if (config?.hmacKeyHex) {
            PayloadSecurityHelper.setHmacKey(config.hmacKeyHex);
        }
        if (config?.consent?.behavioralBiometrics !== undefined) {
            this.hasBiometricConsent = config.consent.behavioralBiometrics === true;
        }
        else if (config?.enableBehavioralBiometrics) {
            console.warn("[SecureShield DEPRECATION] 'enableBehavioralBiometrics' is deprecated and does not grant legal consent under GDPR/DPDP. Please configure 'consent: { behavioralBiometrics: true }' explicitly.");
            this.hasBiometricConsent = false;
        }
        if (this.hasBiometricConsent) {
            this.initBiometricListeners();
        }
    }
    static OriginValidator = OriginValidator;
    static validateProductionServerUrl(serverUrl) {
        if (typeof serverUrl !== 'string' || !_call.call(_trim, serverUrl)) {
            throw new Error('[SecureShield Configuration Error] serverUrl is required when running in production environment. (configure environment: "development")');
        }
        if (serverUrl.length > 2048) {
            throw new Error('[SecureShield Configuration Error] serverUrl exceeds maximum allowed length of 2048 characters.');
        }
        const trimmed = _call.call(_trim, serverUrl);
        // Direct character-level scheme validation (RO-6, G-N7-1)
        // Immune to window.URL subclassing/getter overrides, String.prototype, and RegExp tampering
        const isHttps = (trimmed.length >= 8 &&
            (trimmed[0] === 'h' || trimmed[0] === 'H') &&
            (trimmed[1] === 't' || trimmed[1] === 'T') &&
            (trimmed[2] === 't' || trimmed[2] === 'T') &&
            (trimmed[3] === 'p' || trimmed[3] === 'P') &&
            (trimmed[4] === 's' || trimmed[4] === 'S') &&
            trimmed[5] === ':' &&
            trimmed[6] === '/' &&
            trimmed[7] === '/');
        let parsed;
        try {
            parsed = _URL_ctor ? new _URL_ctor(trimmed) : new URL(trimmed);
        }
        catch (e) {
            throw new Error(`[SecureShield Configuration Error] Invalid production serverUrl format ('${trimmed}'): ${e.message}`);
        }
        if (!isHttps || parsed.protocol !== 'https:') {
            let receivedScheme = '';
            for (let i = 0; i < Math.min(trimmed.length, 12); i++) {
                if (trimmed[i] === ':') {
                    receivedScheme = trimmed.slice(0, i + 1).toLowerCase();
                    break;
                }
            }
            throw new Error(`[SecureShield Configuration Error] HTTPS is strictly required for serverUrl in production environment (received '${receivedScheme || parsed.protocol}'). Non-TLS endpoints are forbidden.`);
        }
        if (parsed.username || parsed.password) {
            throw new Error('[SecureShield Configuration Error] Embedded userinfo/credentials in production serverUrl are forbidden.');
        }
        const rawHostname = _call.call(_lower, parsed.hostname).replace(/\.+$/, '');
        const hostname = rawHostname.startsWith('[') && rawHostname.endsWith(']') ? rawHostname.slice(1, -1) : rawHostname;
        if (OriginValidator.isPrivateOrRestrictedHost(hostname)) {
            throw new Error(`[SecureShield Configuration Error] Loopback/localhost serverUrl ('${parsed.hostname}') is forbidden in production environment.`);
        }
    }
    static init(config) {
        const normalizedEnv = normalizeEnvironment(config?.environment);
        if (normalizedEnv === 'production') {
            SecureShield.validateProductionServerUrl(config?.serverUrl);
        }
        return (async () => {
            if (config?.skipHandshake) {
                if (normalizedEnv === 'production') {
                    throw new Error('[SecureShield Security Violation] skipHandshake is strictly forbidden in production environment.');
                }
                const ctx = OriginValidator.getCurrentContext();
                if (!OriginValidator.isLoopback(ctx.origin)) {
                    throw new Error('[SecureShield Security Violation] skipHandshake is only permitted on loopback origins.');
                }
            }
            const originValidation = OriginValidator.validate(config?.allowedOrigins);
            if (!originValidation.isValid) {
                const errMessage = `[SecureShield CRITICAL] Origin Binding Violation: ${originValidation.mismatchReason}`;
                console.error(errMessage);
                throw new Error(errMessage);
            }
            if (config?.enablePrototypeFreezing) {
                RuntimeIntegrityGuardian.freezePrototypes();
            }
            if (config?.enableRuntimeIntegrityWatchdog !== false) {
                const integrityAudit = RuntimeIntegrityGuardian.auditRuntimeIntegrity();
                if (!integrityAudit.isClean) {
                    const tamperedSummary = integrityAudit.tamperedApis.map(a => `${a.apiName} (${a.reason})`).join('; ');
                    console.warn(`[SecureShield INTEGRITY WARNING] Runtime API tampering detected: ${tamperedSummary}`);
                    integrityAudit.tamperedApis.forEach(item => {
                        config?.onTamperDetected?.(item.apiName, item.reason);
                    });
                }
            }
            const instance = new SecureShield(config);
            if (config?.enableTabBlurShield) {
                TabBlurShield.enable(config.tabBlurOptions);
            }
            if (config?.enableWatermark) {
                SecureUiHardening.renderSecurityWatermark(config.watermarkText, config.watermarkOptions);
            }
            if (config?.enableStorageLeakScrubber) {
                StorageScrubber.purgePlaintextLeaks(config.storageWhitelistKeys);
            }
            if (config?.skipHandshake) {
                instance.isHandshakeApproved = true;
                try {
                    await instance.fetchSignedRemotePolicy();
                }
                catch {
                }
            }
            else if (instance.headerKey && instance.encryptionKey && instance.initializationKey) {
                await instance.initializeWithKeys();
            }
            else {
                await instance.executeSdkHandshake();
            }
            return RuntimeIntegrityGuardian.createTamperProofProxy(instance, 'SecureShield', (apiName, reason) => {
                config?.onTamperDetected?.(apiName, reason);
            });
        })();
    }
    getHandshakeUrl() {
        return buildApiEndpoint(this.serverUrl, '/api/v1/auth/sdk-handshake');
    }
    getSdkInitializeUrl() {
        return buildApiEndpoint(this.serverUrl, '/api/v1/sdk/initialize');
    }
    async initializeWithKeys(isRetry = false) {
        if (!this.headerKey || !this.encryptionKey || !this.initializationKey) {
            throw new Error('[SecureShield] Missing headerKey, encryptionKey, or initializationKey for SDK initialization.');
        }
        if (!this.serverUrl) {
            this.isHandshakeApproved = false;
            throw new Error('[SecureShield Configuration Error] serverUrl is required for key-based SDK initialization.');
        }
        const context = OriginValidator.getCurrentContext();
        const initUrl = this.getSdkInitializeUrl();
        try {
            const clientPayload = JSON.stringify({
                initializationKey: this.initializationKey,
                platform: 'WEB',
                origin: context.origin
            });
            const encryptedPayload = await envelopeEncrypt(clientPayload, this.encryptionKey);
            const res = await fetch(initUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-SS-KEY': this.headerKey
                },
                body: JSON.stringify({ encryptedPayload })
            });
            if (!res.ok) {
                const errorMsg = `[SecureShield CRITICAL] SDK Initialization Rejected (HTTP ${res.status}).`;
                console.error(errorMsg);
                this.isHandshakeApproved = false;
                throw new Error(errorMsg);
            }
            const resJson = await res.json();
            const serverTimeSec = resJson.server_time || (resJson.server_time_ms ? Math.floor(resJson.server_time_ms / 1000) : (resJson.data?.server_time || undefined));
            if (typeof serverTimeSec === 'number') {
                const rawOffsetSec = serverTimeSec - Math.floor(Date.now() / 1000);
                this.#clockOffsetSec = Math.max(-300, Math.min(3600, rawOffsetSec));
                try {
                    if (typeof localStorage !== 'undefined') {
                        localStorage.setItem('secureshield_clock_offset_sec', String(this.#clockOffsetSec));
                    }
                }
                catch { }
            }
            const hasSession = (resJson.success && resJson.data) || resJson.status === 'SUCCESS' || resJson.sessionToken;
            if (hasSession) {
                const sessionToken = resJson.data?.sessionToken || resJson.sessionToken;
                if (!sessionToken || typeof sessionToken !== 'string') {
                    const errorMsg = '[SecureShield CRITICAL] Server response missing verified sessionToken.';
                    console.error(errorMsg);
                    this.isHandshakeApproved = false;
                    throw new Error(errorMsg);
                }
                this.sessionToken = sessionToken;
                this.deviceToken = resJson.data?.deviceToken || resJson.deviceToken || undefined;
                this.isHandshakeApproved = true;
                this.isOfflineMode = false;
                try {
                    await IndexedDbLeaseVault.saveLease({
                        appId: this.appId,
                        tenantId: this.tenantId,
                        origin: context.origin,
                        sessionToken: this.sessionToken,
                        deviceToken: this.deviceToken,
                        leaseExpiryMs: Date.now() + this.offlineGracePeriodMs,
                        cachedAt: Date.now(),
                        signedEnvelope: resJson.signed_lease || resJson.data?.signed_lease
                    });
                }
                catch (vaultErr) {
                    console.warn('[SecureShield] Failed to persist lease in IndexedDB vault:', vaultErr?.message || vaultErr);
                }
                console.log('[SecureShield] SDK initialized successfully with Portal.');
                return true;
            }
            return await this.checkOfflineGraceLease(context.origin, isRetry);
        }
        catch (e) {
            if (e.message &&
                (e.message.includes('SDK Initialization Rejected') ||
                    e.message.includes('Server response missing verified sessionToken') ||
                    e.message.includes('Handshake failed and no valid encrypted offline lease found'))) {
                throw e;
            }
            console.warn(`[SecureShield] Initialization network error (${e.message}). Checking offline encrypted grace lease...`);
            return await this.checkOfflineGraceLease(context.origin, isRetry);
        }
    }
    getSessionToken() {
        return this.sessionToken;
    }
    getDeviceToken() {
        return this.deviceToken;
    }
    isInitialized() {
        return this.isHandshakeApproved;
    }
    async clearSession() {
        this.sessionToken = undefined;
        this.deviceToken = undefined;
        this.#verifiedPolicy = null;
        this.isHandshakeApproved = false;
        this.isOfflineMode = false;
        this.#isPausedState = false;
        this.#clockOffsetSec = 0;
        this.#latestAuditReport = null;
        // Preserved monotonic #lastPolicyTimestamp to prevent stale policy replay attacks (Finding NI-6)
        try {
            await IndexedDbLeaseVault.clearVault();
        }
        catch (vaultErr) {
            console.warn('[SecureShield] Failed to purge IndexedDB vault during clearSession():', vaultErr?.message || vaultErr);
        }
        // Invalidate volatile session storage on session logout (Finding G-N3-7)
        try {
            StorageScrubber.wipeVolatileStorage();
        }
        catch { }
        try {
            if (typeof localStorage !== 'undefined') {
                localStorage.removeItem('secureshield_clock_offset_sec');
            }
        }
        catch { }
    }
    async executeSdkHandshake(isRetry = false) {
        const context = OriginValidator.getCurrentContext();
        if (!this.serverUrl) {
            console.warn('[SecureShield] Handshake skipped: serverUrl is unconfigured.');
            return await this.checkOfflineGraceLease(context.origin, isRetry);
        }
        const handshakeUrl = this.getHandshakeUrl();
        try {
            const handshakePayload = {
                tenantId: this.tenantId,
                appId: this.appId,
                appToken: this.appToken || '',
                domain: context.origin,
                platform: 'WEB',
                sdkVersion: SDK_VERSION,
                appVersion: this.appVersion
            };
            const res = await fetch(handshakeUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-tenant-id': this.tenantId,
                    'x-app-id': this.appId,
                    'x-app-token': this.appToken || '',
                    'x-app-domain': context.origin,
                    'x-platform': 'WEB',
                    'x-sdk-version': SDK_VERSION,
                    'x-app-version': this.appVersion
                },
                body: JSON.stringify(handshakePayload)
            });
            if (res.status === 401 || res.status === 403) {
                const errorMsg = `[SecureShield CRITICAL] Portal Handshake Rejected (HTTP ${res.status}). Unauthorized origin '${context.origin}' or invalid App Token.`;
                console.error(errorMsg);
                this.isHandshakeApproved = false;
                throw new Error(errorMsg);
            }
            if (res.ok) {
                const resJson = await res.json();
                const serverTimeSec = resJson.server_time || (resJson.server_time_ms ? Math.floor(resJson.server_time_ms / 1000) : (resJson.data?.server_time || undefined));
                if (typeof serverTimeSec === 'number') {
                    const rawOffsetSec = serverTimeSec - Math.floor(Date.now() / 1000);
                    this.#clockOffsetSec = Math.max(-300, Math.min(3600, rawOffsetSec));
                    try {
                        if (typeof localStorage !== 'undefined') {
                            localStorage.setItem('secureshield_clock_offset_sec', String(this.#clockOffsetSec));
                        }
                    }
                    catch { }
                }
                const status = resJson.status || '';
                if (status === 'APPROVED' || status === 'SUCCESS' || status === 'ACTIVE') {
                    this.isHandshakeApproved = true;
                    this.isOfflineMode = false;
                    this.#verifiedPolicy = resJson.policy || resJson;
                    try {
                        await IndexedDbLeaseVault.saveLease({
                            appId: this.appId,
                            tenantId: this.tenantId,
                            origin: context.origin,
                            policy: this.#verifiedPolicy,
                            leaseExpiryMs: Date.now() + this.offlineGracePeriodMs,
                            cachedAt: Date.now(),
                            signedEnvelope: resJson.signed_lease || resJson.data?.signed_lease
                        });
                    }
                    catch (vaultErr) {
                        console.warn('[SecureShield] Failed to persist lease in IndexedDB vault:', vaultErr?.message || vaultErr);
                    }
                    console.log('[SecureShield] Handshake verified successfully with Portal. Identity bound.');
                    return true;
                }
            }
            return await this.checkOfflineGraceLease(context.origin, isRetry);
        }
        catch (e) {
            if (e.message &&
                (e.message.includes('Portal Handshake Rejected') ||
                    e.message.includes('Handshake failed and no valid encrypted offline lease found'))) {
                throw e;
            }
            console.warn(`[SecureShield] Handshake network error (${e.message}). Checking offline encrypted grace lease...`);
            return await this.checkOfflineGraceLease(context.origin, isRetry);
        }
    }
    async checkOfflineGraceLease(currentOrigin, isRetry = false) {
        const offlineCheck = await IndexedDbLeaseVault.verifyOfflineLease(this.appId, currentOrigin, this.#clockOffsetSec * 1000, this.customLeaseKeys, this.#environment === 'production', this.strictLeaseBindingEnforcement);
        if (offlineCheck.isValid && offlineCheck.lease) {
            this.isHandshakeApproved = true;
            this.isOfflineMode = true;
            this.#verifiedPolicy = offlineCheck.lease.policy || this.getFailClosedDefaultPolicy();
            console.info(`[SecureShield] Encrypted offline grace lease is ACTIVE (Valid until: ${new Date(offlineCheck.lease.leaseExpiryMs).toISOString()}). Allowing startup.`);
            return true;
        }
        const isLoopback = OriginValidator.isLoopback(currentOrigin);
        if (isLoopback && this.#environment !== 'production') {
            console.warn(`[SecureShield] Local development environment detected on '${currentOrigin}'. Activating local developer grace lease.`);
            this.isHandshakeApproved = true;
            this.isOfflineMode = true;
            this.#verifiedPolicy = this.getFailClosedDefaultPolicy();
            return true;
        }
        // Task 1 & Task 3: Distinguishable telemetry and automatic graceful fallback on missing bindings
        const isMissingBindings = offlineCheck.reason?.includes('missing required cryptographic bindings');
        if (isMissingBindings) {
            console.error(`[SecureShield TELEMETRY:LEASE_REJECTION_MISSING_BINDINGS] Offline lease rejected: signed payload lacks required cryptographic bindings (app_id, origin, iat, exp). Reason: '${offlineCheck.reason}'. Backend rollout sequencing check recommended.`);
            if (this.serverUrl && !isRetry) {
                try {
                    const telemetryItem = {
                        id: 'lease_cryptographic_binding_anomaly',
                        name: 'Lease Missing Cryptographic Bindings',
                        category: 'INTEGRITY',
                        event: 'LEASE_REJECTION_MISSING_BINDINGS',
                        triggered: true,
                        severity: 3,
                        status: 'FAILED',
                        evidence: {
                            rejectionReason: offlineCheck.reason,
                            appId: this.appId,
                            tenantId: this.tenantId,
                            origin: currentOrigin,
                            environment: this.#environment,
                            strictLeaseBindingEnforcement: this.strictLeaseBindingEnforcement
                        }
                    };
                    const report = TelemetrySerializer.createReport([telemetryItem], this.tenantId, this.appId, this.#environment, this.appVersion);
                    this.ingestTelemetry(report).catch(() => { });
                }
                catch { }
                console.warn('[SecureShield] Attempting automatic online handshake refresh to recover from pre-upgrade cached lease...');
                try {
                    let refreshed = false;
                    if (this.headerKey && this.encryptionKey && this.initializationKey) {
                        refreshed = await this.initializeWithKeys(true);
                    }
                    else {
                        refreshed = await this.executeSdkHandshake(true);
                    }
                    if (refreshed) {
                        console.log('[SecureShield] Automatic online lease refresh SUCCEEDED. Recovered with fresh compliant lease.');
                        return true;
                    }
                }
                catch (refreshErr) {
                    console.error('[SecureShield CRITICAL] Automatic online lease refresh failed:', refreshErr?.message || refreshErr);
                }
            }
        }
        const fatalMsg = !this.serverUrl
            ? `[SecureShield Configuration Error] serverUrl is unconfigured and no valid offline grace lease was found for '${currentOrigin}'.`
            : `[SecureShield CRITICAL] Handshake failed and no valid encrypted offline lease found (${offlineCheck.reason || 'Missing or expired lease'}). Failing closed.`;
        console.error(fatalMsg);
        this.isHandshakeApproved = false;
        throw new Error(fatalMsg);
    }
    isApproved(response) {
        if (this.#environment === 'production' && !this.isHandshakeApproved) {
            return false;
        }
        if (response && (response.verdict !== undefined || response.status !== undefined || response.decision !== undefined)) {
            const verdict = (response.verdict || response.status || response.decision || '').toString().trim().toUpperCase();
            return verdict === 'APPROVED' || verdict === 'SECURE' || verdict === 'PASSED';
        }
        if (!this.isHandshakeApproved) {
            return false;
        }
        if (this.#latestAuditReport) {
            const approvedVerdicts = ['SECURE', 'PASSED', 'APPROVED'];
            if (!approvedVerdicts.includes(this.#latestAuditReport.verdict || '')) {
                return false;
            }
            if (this.#latestAuditReport.failed > 0) {
                const hasCriticalTamper = this.#latestAuditReport.items?.some((i) => (i.triggered || i.status === 'FAILED') && (i.severity >= 3 ||
                    i.id === 'headless_browser_detector' ||
                    i.id === 'bot_behavior_detector' ||
                    i.id === 'automation_environment_detector' ||
                    i.id === 'virtual_browser_detector'));
                if (hasCriticalTamper) {
                    return false;
                }
            }
        }
        return true;
    }
    isHandshakeActive() {
        return this.isHandshakeApproved;
    }
    getLatestAuditReport() {
        return this.#latestAuditReport;
    }
    grantConsent(category) {
        if (category === 'behavioralBiometrics') {
            this.hasBiometricConsent = true;
            this.initBiometricListeners();
        }
    }
    revokeConsent(category) {
        if (category === 'behavioralBiometrics') {
            this.hasBiometricConsent = false;
            this.teardownBiometricListeners();
        }
    }
    hasConsent(category) {
        if (category === 'behavioralBiometrics') {
            return this.hasBiometricConsent;
        }
        return false;
    }
    initBiometricListeners() {
        if (typeof window === 'undefined')
            return;
        MouseDynamicsDetector.initListener({ consentGranted: true });
        KeyboardDynamicsDetector.initListeners({ consentGranted: true });
        TouchEventDetector.initListeners({ consentGranted: true });
        HumanInteractionDetector.initListeners({ consentGranted: true });
    }
    teardownBiometricListeners() {
        MouseDynamicsDetector.removeListener();
        KeyboardDynamicsDetector.removeListeners();
        TouchEventDetector.removeListeners();
        HumanInteractionDetector.removeListeners();
    }
    isOperatingOffline() {
        return this.isOfflineMode;
    }
    getIngestUrl() {
        return buildApiEndpoint(this.serverUrl, '/api/v1/telemetry/ingest');
    }
    getPolicyUrl() {
        if (!this.serverUrl)
            return '';
        const params = new URLSearchParams();
        if (this.tenantId)
            params.set('tenantId', this.tenantId);
        if (this.appId)
            params.set('appId', this.appId);
        // N-12: appToken is strictly transmitted via x-app-token header; never in query string
        return buildApiEndpoint(this.serverUrl, '/api/v1/policy/config', params);
    }
    async fetchSignedRemotePolicy() {
        if (!this.serverUrl) {
            this.#verifiedPolicy = this.getFailClosedDefaultPolicy();
            return;
        }
        try {
            const url = this.getPolicyUrl();
            const headers = {
                'Accept': 'application/json'
            };
            if (this.appToken) {
                headers['x-app-token'] = this.appToken;
            }
            const res = await fetch(url, {
                headers
            });
            if (res.ok) {
                const payload = await res.json();
                const verification = await PolicySignatureVerifier.verifyPolicyEnvelope(payload, this.customPolicyKeys, this.#clockOffsetSec, this.#environment === 'production');
                if (verification.isValid && verification.policy) {
                    const policyIat = verification.iat || 0;
                    if (this.#lastPolicyTimestamp > 0 && policyIat > 0 && policyIat < this.#lastPolicyTimestamp) {
                        console.error('[SecureShield CRITICAL] Stale or replayed remote policy rejected (iat earlier than active policy). Enforcing fail-closed default policy.');
                        this.#verifiedPolicy = this.getFailClosedDefaultPolicy();
                        return;
                    }
                    if (policyIat > 0) {
                        this.#lastPolicyTimestamp = policyIat;
                    }
                    this.#verifiedPolicy = verification.policy;
                    return;
                }
                console.error('[SecureShield CRITICAL] Remote policy signature verification failed. Enforcing fail-closed default policy.');
                this.#verifiedPolicy = this.getFailClosedDefaultPolicy();
                return;
            }
            // Transient HTTP 5xx or server error: retain unexpired last-known-good cached policy (Finding NI-5)
            if (!this.#verifiedPolicy) {
                this.#verifiedPolicy = this.getFailClosedDefaultPolicy();
            }
        }
        catch {
            // Transient network failure: retain unexpired last-known-good cached policy (Finding NI-5)
            if (!this.#verifiedPolicy) {
                this.#verifiedPolicy = this.getFailClosedDefaultPolicy();
            }
        }
    }
    getFailClosedDefaultPolicy() {
        return {
            tenant_id: this.tenantId,
            app_id: this.appId,
            policy_version: '2026.08.01-fail-closed-default',
            global_enforcement_mode: 'BLOCK',
            detectors: {
                browser_devtools_open_detector: { enabled: true, action: 'BLOCK', severity: 4 },
                headless_browser_detector: { enabled: true, action: 'BLOCK', severity: 4 },
                javascript_runtime_hook_detector: { enabled: true, action: 'BLOCK', severity: 4 }
            }
        };
    }
    async evaluateSecurityState() {
        const report = this.runScan();
        this.#latestAuditReport = report;
        let autoIngestSuccess = false;
        if (this.serverUrl) {
            try {
                const ingestRes = await this.ingestTelemetry(report);
                if (ingestRes?.deviceStatus) {
                    report.risk_score = ingestRes.deviceStatus.threatScore;
                    report.risk_tier = ingestRes.deviceStatus.riskLevel;
                    report.verdict = ingestRes.verdict || (ingestRes.deviceStatus.riskLevel === 'CRITICAL' ? 'BLOCKED' : 'SECURE');
                    report.decision_action = ingestRes.decision_action || (report.verdict === 'BLOCKED' ? 'BLOCK' : 'ALLOW');
                    report.scoring_authority = 'SERVER_AUTHORITATIVE';
                    report.authoritative_verdict = report.verdict;
                    autoIngestSuccess = true;
                }
            }
            catch (e) {
                console.warn('[SecureShield] Auto-ingest notice:', e);
            }
        }
        else {
            console.warn('[SecureShield] Auto-ingest skipped: serverUrl is unconfigured.');
        }
        if (!autoIngestSuccess) {
            // Server ingestion failed or serverUrl unconfigured: enforce fail-closed offline policy
            if (this.isOfflineMode) {
                // Active encrypted offline lease or development loopback lease
                if (report.failed > 0) {
                    let totalPenalty = 0;
                    let hasCritical = false;
                    for (const item of report.items || []) {
                        if (item.triggered || item.status === 'FAILED') {
                            const sev = item.severity || 1;
                            totalPenalty += sev * 25;
                            if (sev >= 3 ||
                                item.id === 'headless_browser_detector' ||
                                item.id === 'bot_behavior_detector' ||
                                item.id === 'automation_environment_detector' ||
                                item.id === 'virtual_browser_detector') {
                                hasCritical = true;
                            }
                        }
                    }
                    report.risk_score = Math.min(100, Math.max(25, totalPenalty));
                    if (hasCritical || report.risk_score >= 80) {
                        report.risk_tier = 'CRITICAL';
                        report.verdict = 'BLOCKED';
                        report.decision_action = 'BLOCK';
                    }
                    else {
                        report.risk_tier = report.risk_score >= 50 ? 'HIGH' : 'MEDIUM';
                        report.verdict = 'PENDING_BACKEND_INGESTION';
                        report.decision_action = 'PENDING_BACKEND_INGESTION';
                    }
                }
                else {
                    // All probes clean under valid offline lease
                    report.risk_score = 0;
                    report.risk_tier = 'LOW';
                    report.verdict = 'SECURE';
                    report.decision_action = 'ALLOW';
                }
            }
            else {
                // Offline / network failure without valid offline lease -> FAIL CLOSED
                report.risk_score = 100;
                report.risk_tier = 'CRITICAL';
                report.verdict = 'BLOCKED';
                report.decision_action = 'BLOCK';
            }
            report.scoring_authority = 'CLIENT_LOCAL_OFFLINE';
            report.authoritative_verdict = report.verdict;
        }
        const trustScore = Math.max(0, 100 - (report.risk_score !== undefined ? report.risk_score : 100));
        report.trustScore = trustScore;
        return report;
    }
    async ingestTelemetry(reportPayload) {
        if (!this.serverUrl) {
            throw new Error('[SecureShield Configuration Error] serverUrl is unconfigured.');
        }
        const payload = reportPayload || this.runScan();
        const ingestUrl = this.getIngestUrl();
        try {
            let bodyData;
            const headers = {
                'Content-Type': 'application/json',
                'X-SecureShield-Tenant': this.tenantId,
                'X-SecureShield-AppId': this.appId
            };
            if (this.sessionToken) {
                headers['Authorization'] = `Bearer ${this.sessionToken}`;
            }
            if (this.enableE2eeEncryption) {
                const rawJsonStr = JSON.stringify(payload);
                const envelope = await PayloadSecurityHelper.createSecurityEnvelope(rawJsonStr, this.serverPublicKeyBase64, this.hmacKeyHex);
                bodyData = JSON.stringify(envelope);
            }
            else {
                bodyData = JSON.stringify(payload);
            }
            const res = await fetch(ingestUrl, {
                method: 'POST',
                headers,
                body: bodyData
            });
            if (!res.ok) {
                let errDetails = '';
                try {
                    const errJson = await res.json();
                    if (errJson?.reasonCode || errJson?.error) {
                        errDetails = `: ${errJson.error || errJson.reasonCode}`;
                        if (errJson.reasonCode === 'ASSET_PENDING_ADMIN_APPROVAL') {
                            console.warn(`[SecureShield] Application '${this.appId}' is pending administrator approval. Telemetry and live RASP defense are inactive until whitelisted.`);
                        }
                        else if (errJson.reasonCode === 'COMPANY_PENDING_APPROVAL') {
                            console.warn(`[SecureShield] Organization '${this.tenantId}' is pending administrator verification.`);
                        }
                    }
                }
                catch (_) { }
                throw new Error(`HTTP ${res.status} ${res.statusText}${errDetails}`);
            }
            const resJson = await res.json();
            // Process Over-The-Air Threat Remediation Action from Portal
            const decisionAction = resJson?.decision_action || resJson?.decisionAction || resJson?.action;
            if (decisionAction && typeof decisionAction === 'string') {
                const normAction = decisionAction.toUpperCase().trim();
                const isRemediationAction = (normAction === 'PAUSED' ||
                    normAction === 'UNPAUSE' ||
                    normAction === 'TERMINATE_APP' ||
                    normAction === 'BLOCK_DEVICE' ||
                    normAction === 'BLOCK_ACTION' ||
                    normAction === 'WIPE_LOCAL_KEYS');
                if (isRemediationAction) {
                    // Cryptographic JWS envelope verification
                    const signedEnvelope = resJson.signed_remediation || resJson.signed_envelope || (resJson.protected && resJson.signature ? resJson : null);
                    if (signedEnvelope) {
                        const verification = await PolicySignatureVerifier.verifyPolicyEnvelope(signedEnvelope, this.customPolicyKeys, this.#clockOffsetSec, this.#environment === 'production');
                        if (!verification.isValid) {
                            const err = `[SecureShield Security Error] Server remediation directive signature verification failed: ${verification.reason || 'Invalid signature'}`;
                            console.error(err);
                            throw new Error(err);
                        }
                    }
                    else {
                        const err = `[SecureShield Security Error] Server remediation directive rejected: missing cryptographic signature in '${this.#environment}' or on non-loopback origin for action '${normAction}'.`;
                        console.error(err);
                        throw new Error(err);
                    }
                    if (normAction === 'PAUSED') {
                        this.#isPausedState = true;
                    }
                    else if (normAction === 'UNPAUSE') {
                        this.#isPausedState = false;
                    }
                    await this.remediationManager.handleDecisionAction(decisionAction, resJson?.primary_threat || resJson?.reason || resJson?.message, true);
                }
            }
            return resJson;
        }
        catch (err) {
            return {
                status: 'ERROR',
                message: err.message || 'Telemetry ingestion network failure',
                ingest_url: ingestUrl
            };
        }
    }
    isPaused() {
        return this.#isPausedState;
    }
    setPaused(paused) {
        const currentOrigin = OriginValidator.getCurrentContext().origin;
        if (this.#environment !== 'development' || !OriginValidator.isLoopback(currentOrigin)) {
            throw new Error(`[SecureShield Security Error] setPaused() is restricted in '${this.#environment}' or on non-loopback origins.`);
        }
        console.warn('[SecureShield Deprecation] setPaused() is deprecated.');
        this.#isPausedState = paused;
    }
    getRemediationManager() {
        return this.remediationManager;
    }
    runScan(options) {
        if (this.#isPausedState) {
            const pausedReport = TelemetrySerializer.createReport([], this.tenantId, this.appId, this.#environment, this.appVersion);
            pausedReport.verdict = 'SECURE';
            pausedReport.decision_action = 'PAUSED';
            return pausedReport;
        }
        const items = [
            DevToolsDetector.scan(),
            HeadlessBrowserDetector.scan(),
            BrowserFingerprintDetector.scan(),
            BrowserVersionIntegrityDetector.scan(),
            BrowserCapabilitySpoofingDetector.scan(),
            UserAgentTamperingDetector.scan(),
            NavigatorPropertyIntegrityDetector.scan(),
            TimeManipulationDetector.scan(),
            AutomationEnvironmentDetector.scan(),
            VirtualBrowserDetector.scan(),
            ConsoleTamperingDetector.scan(),
            DomTamperingDetector.scan(),
            DynamicEvalDetector.scan(),
            RuntimeHookDetector.scan(),
            FunctionPrototypeTamperingDetector.scan(),
            NativeApiOverrideDetector.scan(),
            WasmIntegrityDetector.scan(),
            ScriptInjectionDetector.scan(),
            RuntimeFunctionHookDetector.scan(),
            GlobalObjectTamperingDetector.scan(),
            MemoryLeakExploitationDetector.scan(),
            DebuggerDetectionDetector.scan(),
            ExtensionInjectionDetector.scan(),
            MaliciousExtensionDetector.scan(),
            ContentScriptInjectionDetector.scan(),
            ExtensionPermissionAbuseDetector.scan(),
            AdInjectionDetector.scan(),
            CryptoMinerDetector.scan(),
            ClipboardHijackingDetector.scan(),
            PluginIntegrityDetector.scan(),
            WebStoragePlaintextDetector.scan(),
            SessionStorageSecretsDetector.scan(),
            CookiePolicyDetector.scan(),
            IndexedDbIntegrityDetector.scan(),
            ServiceWorkerIntegrityDetector.scan(),
            ManifestIntegrityDetector.scan(),
            ClientConfigTamperingDetector.scan(),
            SriComplianceDetector.scan(),
            SslValidationDetector.scan(),
            WebCertificatePinningDetector.scan(),
            HttpsEnforcementDetector.scan(),
            MixedContentDetector.scan(),
            WebDnsManipulationDetector.scan(),
            WebProxyDetector.scan(),
            WebVpnDetector.scan(),
            NetworkLatencyDetector.scan(),
            IframeClickjackingDetector.scan(),
            UiOverlayDetector.scan(),
            HiddenElementDetector.scan(),
            ScreenCaptureDetector.scan(),
            WindowFocusDetector.scan(),
            BotBehaviorDetector.scan(),
            MouseDynamicsDetector.scan({ consentGranted: this.hasBiometricConsent }),
            KeyboardDynamicsDetector.scan({ consentGranted: this.hasBiometricConsent }),
            TouchEventDetector.scan({ consentGranted: this.hasBiometricConsent }),
            HumanInteractionDetector.scan({ consentGranted: this.hasBiometricConsent }),
            WebSessionHijackDetector.scan(),
            CredentialStuffingDetector.scan(),
            ImpossibleNavigationDetector.scan(),
            SessionAnomalyDetector.scan(),
            WebglRendererVendorDetector.scan(),
            WebgpuSubsystemDetector.scan(),
            CanvasFingerprintIntegrityDetector.scan(),
            BatterySubsystemDetector.scan(),
            ScreenGeometryDetector.scan(),
            HardwareTopologyDetector.scan(),
            PrototypeChainIntegrityDetector.scan(),
            AutomationArtifactsDetector.scan(),
            LocalstorageSecretsDetector.scan(),
            WasmBytecodeIntegrityDetector.scan(),
            ClientHintsConsistencyDetector.scan(),
            PermissionsApiSweepDetector.scan(),
            WebAuthnHardwareAuthenticatorDetector.scan(),
            InputPointerMediaQueryDetector.scan(),
            IntlLocaleFingerprintDetector.scan(),
            ErrorStackFormatDetector.scan(),
            FontLoadingEnumerationDetector.scan(),
            MathFpPrecisionDetector.scan(),
            MediaCapabilitiesCodecDetector.scan(),
            StorageQuotaEstimateDetector.scan(),
            CssEngineFeatureMatrixDetector.scan(),
            AdblockerPresenceDetector.scan(),
            GlobalPrivacyControlDetector.scan()
        ];
        const report = TelemetrySerializer.createReport(items, this.tenantId, this.appId, this.#environment, this.appVersion);
        this.#latestAuditReport = report;
        if (options?.ingest || this.autoIngest) {
            this.ingestTelemetry(report).catch(() => { });
        }
        return report;
    }
    scan(options) {
        return this.runScan(options);
    }
    getDetailedDeviceSecurityScan() {
        const report = this.runScan();
        return JSON.stringify(report, null, 2);
    }
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
if (typeof globalThis !== 'undefined') {
    globalThis.SecureShield = SecureShield;
    globalThis.SecureShieldWeb = SecureShield;
}
export default SecureShield;
