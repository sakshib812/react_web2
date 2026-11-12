export class StorageScrubber {
    static UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    static JWT_REGEX = /^eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{3,}\.[A-Za-z0-9_-]*$/;
    static BEARER_REGEX = /^Bearer\s+[A-Za-z0-9\-._~+/%=]{12,}$/i;
    static PEM_REGEX = /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/;
    static HEX64_REGEX = /^[A-Fa-f0-9]{64}$/;
    static API_KEY_REGEX = /^(?:sk|pk)_(?:live|test)_[a-zA-Z0-9]{16,}|(?:secret|password|passwd)[._-]/i;
    static SENSITIVE_KEY_REGEX = /(?:access[._-]?token|refresh[._-]?token|id[._-]?token|auth[._-]?token|bearer(?:[._-]?token)?|session[._-]?(?:id|key|token)|api[._-]?key|private[._-]?key|(?:^|[._-]|[a-z])secret(?!ary|ariat|ion)(?:$|[._-]|key|token|data|code)?|(?:^|[._-]|[a-z])pass(?:word|wd)(?!hint)(?:$|[._-]|hash|salt)?|(?:^|[._-]|[a-z])pin(?:[._-]?code)?(?!count)(?:$|[._-])|credentials?|oauth(?:[._-]?token)?|(?:^|[._-]|[a-z])jwt(?:[._-]?token)?)/i;
    static SAFE_KEY_REGEX = /(?:^|[._-]|[a-z])(?:theme|color|design|style|ui|cart|checkout|pagination|cursor|next|previous|count|type|length|status|indicator|state|dismissed|closed|present|mode|version|author|authority|checksum|hash|etag|digest|santa|offset|hint)(?:$|[._-]|[A-Z])/i;
    static scanForPlaintextLeaks() {
        const leakingKeys = [];
        let inspectedCount = 0;
        const audit = (store, type) => {
            if (typeof store === 'undefined')
                return;
            try {
                for (let i = 0; i < store.length; i++) {
                    const key = store.key(i);
                    if (!key)
                        continue;
                    inspectedCount++;
                    const reason = StorageScrubber.evaluatePotentialLeak(key, store.getItem(key) || '');
                    if (reason) {
                        let category = 'credential';
                        if (reason.includes('JWT') || reason.includes('Bearer') || /token/i.test(key)) {
                            category = 'token';
                        }
                        else if (reason.includes('private key') || /key/i.test(key)) {
                            category = 'key';
                        }
                        else if (/pass(?:word|wd)/i.test(key)) {
                            category = 'password';
                        }
                        else if (/secret/i.test(key) || reason.includes('hex secret')) {
                            category = 'secret';
                        }
                        leakingKeys.push({ storage: type, key, reason, namespace: type, category });
                    }
                }
            }
            catch { }
        };
        if (typeof localStorage !== 'undefined')
            audit(localStorage, 'localStorage');
        if (typeof sessionStorage !== 'undefined')
            audit(sessionStorage, 'sessionStorage');
        return { leaksFound: leakingKeys.length, leakingKeys, inspectedCount };
    }
    static purgePlaintextLeaks(whitelistKeys = []) {
        const report = StorageScrubber.scanForPlaintextLeaks();
        const whitelistSet = new Set(whitelistKeys.map(k => k.toLowerCase()));
        for (const item of report.leakingKeys) {
            if (whitelistSet.has(item.key.toLowerCase()))
                continue;
            try {
                const store = item.storage === 'localStorage'
                    ? (typeof localStorage !== 'undefined' ? localStorage : null)
                    : (typeof sessionStorage !== 'undefined' ? sessionStorage : null);
                if (store) {
                    store.removeItem(item.key);
                    console.warn(`[SecureShield] StorageScrubber purged unencrypted secret from ${item.storage}: '${item.key}' (${item.reason})`);
                }
            }
            catch { }
        }
        return report;
    }
    static wipeVolatileStorage() {
        if (typeof sessionStorage !== 'undefined') {
            try {
                sessionStorage.clear();
            }
            catch { }
        }
    }
    static evaluatePotentialLeak(key, value) {
        if (!key || typeof key !== 'string')
            return null;
        if (key === 'secureshield_auth_vault' || key.startsWith('secureshield_'))
            return null;
        const trimmed = (value || '').trim();
        if (!trimmed || trimmed === 'true' || trimmed === 'false' || trimmed === 'null' || trimmed === 'undefined') {
            return null;
        }
        if (StorageScrubber.UUID_REGEX.test(trimmed))
            return null;
        if (StorageScrubber.JWT_REGEX.test(trimmed)) {
            return 'Plaintext JWT token structure detected in storage value';
        }
        if (StorageScrubber.BEARER_REGEX.test(trimmed)) {
            return 'Plaintext Bearer authorization credential detected in storage value';
        }
        if (StorageScrubber.PEM_REGEX.test(trimmed)) {
            return 'Plaintext private key PEM structure detected in storage value';
        }
        if (StorageScrubber.HEX64_REGEX.test(trimmed)) {
            if (!StorageScrubber.SAFE_KEY_REGEX.test(key)) {
                return '256-bit raw hex secret key detected in storage value';
            }
        }
        if (StorageScrubber.API_KEY_REGEX.test(trimmed)) {
            return 'Plaintext API credential or secret pattern detected in storage value';
        }
        if (StorageScrubber.SAFE_KEY_REGEX.test(key))
            return null;
        if (StorageScrubber.SENSITIVE_KEY_REGEX.test(key)) {
            if (/(?:pass(?:word|wd)|pin)/i.test(key)) {
                if (trimmed.length >= 4) {
                    return `Storage key name '${key}' contains unencrypted credential secret`;
                }
            }
            else if (trimmed.length >= 8 && !/^\d+$/.test(trimmed)) {
                return `Storage key name '${key}' contains unencrypted credential secret`;
            }
        }
        return null;
    }
}
