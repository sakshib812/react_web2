export const SDK_VERSION = '4.0.0';
export class TelemetrySerializer {
    static generateDeviceIdHash() {
        if (typeof window === 'undefined' || typeof navigator === 'undefined') {
            return 'dev_web_node_test_01';
        }
        const nav = navigator;
        const rawStr = [
            nav.userAgent || '',
            nav.language || '',
            nav.hardwareConcurrency || 4,
            window.screen ? `${window.screen.width}x${window.screen.height}` : '1024x768',
            new Date().getTimezoneOffset()
        ].join('|');
        let hash = 0;
        for (let i = 0; i < rawStr.length; i++) {
            const char = rawStr.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash |= 0;
        }
        return `dev_web_${Math.abs(hash).toString(16)}`;
    }
    static formatOsVersion() {
        if (typeof navigator === 'undefined' || !navigator.userAgent) {
            return 'NodeJS 22';
        }
        const ua = navigator.userAgent;
        if (/Windows NT 10\.0/i.test(ua))
            return 'Windows 10/11';
        if (/Windows NT 6\.3/i.test(ua))
            return 'Windows 8.1';
        if (/Windows NT 6\.2/i.test(ua))
            return 'Windows 8';
        if (/Windows NT 6\.1/i.test(ua))
            return 'Windows 7';
        if (/Mac OS X ([0-9_]+)/i.test(ua)) {
            const match = ua.match(/Mac OS X ([0-9_]+)/i);
            return `macOS ${match ? match[1].replace(/_/g, '.') : ''}`.trim();
        }
        if (/Android ([0-9.]+)/i.test(ua)) {
            const match = ua.match(/Android ([0-9.]+)/i);
            return `Android ${match ? match[1] : ''}`.trim();
        }
        if (/iPhone OS ([0-9_]+)/i.test(ua) || /iPad.*OS ([0-9_]+)/i.test(ua)) {
            const match = ua.match(/OS ([0-9_]+)/i);
            return `iOS ${match ? match[1].replace(/_/g, '.') : ''}`.trim();
        }
        if (/CrOS/i.test(ua))
            return 'ChromeOS';
        if (/Linux/i.test(ua))
            return 'Linux';
        return ua.length > 48 ? ua.substring(0, 48) : ua;
    }
    static createReport(items, tenantId, appId, environment, appVersion) {
        items.forEach(item => {
            if (!item.status) {
                item.status = item.triggered ? 'FAILED' : 'PASSED';
            }
            if (!item.name) {
                item.name = item.id;
            }
            if (item.confidence === undefined) {
                item.confidence = 0.85;
            }
            if (!item.fpRiskTier) {
                item.fpRiskTier = 'LOW';
            }
            if (!item.evasionDifficulty) {
                item.evasionDifficulty = 'MEDIUM';
            }
            if (item.executionTimeMs === undefined) {
                item.executionTimeMs = 0.03;
            }
            // Uniform Rule (V-7): Every passing detector MUST report severity: 0.
            // Non-zero severity weights (1-4) are reported only when a detector triggers / fails.
            if (item.status === 'PASSED' || !item.triggered) {
                item.severity = 0;
            }
        });
        const failedItems = items.filter(i => i.triggered || i.status === 'FAILED');
        const failedCount = failedItems.length;
        const passedCount = items.length - failedCount;
        const timestamp = Date.now();
        const deviceIdHash = TelemetrySerializer.generateDeviceIdHash();
        const osVersionStr = TelemetrySerializer.formatOsVersion();
        return {
            scan_id: `scan_web_${timestamp}_${Math.floor(Math.random() * 1000)}`,
            device_id_hash: deviceIdHash,
            session_id: `sess_web_${timestamp}`,
            os_name: 'Web',
            os_version: osVersionStr,
            app_id: appId || 'app_web_portal_prod',
            app_version: appVersion || '1.0.0',
            sdk_version: SDK_VERSION,
            verdict: 'PENDING_BACKEND_INGESTION',
            decision_action: 'PENDING_BACKEND_INGESTION',
            scoring_authority: 'SERVER_AUTHORITATIVE',
            authoritative_verdict: 'PENDING_BACKEND_INGESTION',
            total_detectors: items.length,
            passed: passedCount,
            failed: failedCount,
            tenant_id: tenantId || 'TEN-ENTERPRISE-01',
            environment: environment || 'web',
            items
        };
    }
}
