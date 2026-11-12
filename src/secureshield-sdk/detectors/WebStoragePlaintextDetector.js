import { StorageScrubber } from '../storage/StorageScrubber.js';
export class WebStoragePlaintextDetector {
    static scan() {
        let triggered = false;
        const evidence = {};
        try {
            if (typeof localStorage !== 'undefined') {
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (!key)
                        continue;
                    const val = localStorage.getItem(key) || '';
                    const leak = StorageScrubber.evaluatePotentialLeak(key, val);
                    if (leak) {
                        triggered = true;
                        evidence['local_storage_key'] = key;
                        evidence['reason'] = leak;
                        evidence['storage_namespace'] = 'localStorage';
                        break;
                    }
                }
            }
            if (!triggered && typeof sessionStorage !== 'undefined') {
                for (let i = 0; i < sessionStorage.length; i++) {
                    const key = sessionStorage.key(i);
                    if (!key)
                        continue;
                    const val = sessionStorage.getItem(key) || '';
                    const leak = StorageScrubber.evaluatePotentialLeak(key, val);
                    if (leak) {
                        triggered = true;
                        evidence['session_storage_key'] = key;
                        evidence['reason'] = leak;
                        evidence['storage_namespace'] = 'sessionStorage';
                        break;
                    }
                }
            }
        }
        catch (e) {
            evidence['error'] = e.message;
        }
        return {
            id: 'web_storage_plaintext_detector',
            triggered,
            severity: triggered ? 2 : 0, // MEDIUM
            category: 'app',
            event: 'unencrypted_web_storage_secret_detected',
            evidence
        };
    }
}
