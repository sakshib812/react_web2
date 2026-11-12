// Built-in Prototype Tamper Protection (RO-6, G-N7-1)
// Cache and bind standard ECMAScript prototype methods at module evaluation time
const _call = Function.prototype.call;
const _String_split = _call.bind(String.prototype.split);
const _String_trim = _call.bind(String.prototype.trim);
const _String_toLowerCase = _call.bind(String.prototype.toLowerCase);
const _String_replace = _call.bind(String.prototype.replace);
const _String_indexOf = _call.bind(String.prototype.indexOf);
const _String_lastIndexOf = _call.bind(String.prototype.lastIndexOf);
const _String_slice = _call.bind(String.prototype.slice);
const _RegExp_test = _call.bind(RegExp.prototype.test);
function safeTrim(str) {
    if (typeof str !== 'string')
        return '';
    try {
        return _String_trim(str);
    }
    catch {
        return _String_replace(str, /^\s+|\s+$/g, '');
    }
}
function safeLowerCase(str) {
    if (typeof str !== 'string')
        return '';
    try {
        return _String_toLowerCase(str);
    }
    catch {
        return str;
    }
}
function safeStartsWith(str, prefix) {
    if (typeof str !== 'string' || typeof prefix !== 'string')
        return false;
    if (prefix.length > str.length)
        return false;
    return _String_slice(str, 0, prefix.length) === prefix;
}
function safeEndsWith(str, suffix) {
    if (typeof str !== 'string' || typeof suffix !== 'string')
        return false;
    if (suffix.length > str.length)
        return false;
    return _String_slice(str, str.length - suffix.length) === suffix;
}
function safeIncludes(str, search) {
    if (typeof str !== 'string' || typeof search !== 'string')
        return false;
    return _String_indexOf(str, search) !== -1;
}
function safeSplit(str, sep) {
    if (typeof str !== 'string')
        return [];
    // Pure character traversal for single character separator (completely immune to String.prototype.split tampering)
    if (sep.length === 1) {
        const res = [];
        let cur = '';
        for (let i = 0; i < str.length; i++) {
            if (str[i] === sep) {
                res.push(cur);
                cur = '';
            }
            else {
                cur += str[i];
            }
        }
        res.push(cur);
        return res;
    }
    return _String_split(str, sep);
}
export class OriginValidator {
    static normalizeDomain(input) {
        if (!input || typeof input !== 'string')
            return '';
        const str = safeLowerCase(safeTrim(input));
        if (!str)
            return '';
        let hostname = '';
        try {
            if (safeIncludes(str, '://')) {
                hostname = new URL(str).hostname;
            }
            else if (safeIncludes(str, ':') && !safeIncludes(str, '[') && safeSplit(str, ':').length > 2) {
                hostname = new URL('https://[' + str + ']').hostname;
            }
            else {
                hostname = new URL('https://' + str).hostname;
            }
        }
        catch {
            return '';
        }
        return _String_replace(_String_replace(hostname, /\.+$/, ''), /^\[|\]$/g, '');
    }
    // Wildcard (*.domain.com) matches apex and subdomains
    static matchesDomain(currentHostname, targetPattern) {
        const current = OriginValidator.normalizeDomain(currentHostname);
        if (!current || !targetPattern || typeof targetPattern !== 'string')
            return false;
        const trimmedPattern = _String_replace(safeLowerCase(safeTrim(targetPattern)), /\.+$/, '');
        if (!trimmedPattern)
            return false;
        if (safeStartsWith(trimmedPattern, '*.') || safeStartsWith(trimmedPattern, '.')) {
            const rootDomain = OriginValidator.normalizeDomain(_String_replace(trimmedPattern, /^\*?\./, ''));
            return !!rootDomain && (current === rootDomain || safeEndsWith(current, `.${rootDomain}`));
        }
        if (trimmedPattern === '*' || safeStartsWith(trimmedPattern, '*')) {
            return false;
        }
        const normalizedTarget = OriginValidator.normalizeDomain(trimmedPattern);
        return !!normalizedTarget && current === normalizedTarget;
    }
    // Loopback interfaces including 0.0.0.0 (INADDR_ANY)
    static isLoopback(input) {
        const host = OriginValidator.normalizeDomain(input);
        if (!host)
            return false;
        return host === 'localhost' || host === '127.0.0.1' || host === '::1' || host === '0.0.0.0' || safeEndsWith(host, '.localhost');
    }
    static parseIPv4(ipStr) {
        if (!ipStr || typeof ipStr !== 'string')
            return null;
        const parts = safeSplit(ipStr, '.');
        if (parts.length !== 4)
            return null;
        const octets = [];
        for (let i = 0; i < parts.length; i++) {
            const p = parts[i];
            if (!p || !_RegExp_test(/^\d+$/, p))
                return null;
            const n = Number(p);
            if (isNaN(n) || n < 0 || n > 255)
                return null;
            octets.push(n);
        }
        return octets;
    }
    static isPrivateOrRestrictedIPv4(octets) {
        const [a, b, c] = octets;
        if (a === 0 || a === 127 || a === 10 || a >= 224)
            return true;
        if (a === 172 && b >= 16 && b <= 31)
            return true;
        if (a === 192 && b === 168)
            return true;
        if (a === 100 && b >= 64 && b <= 127)
            return true;
        if (a === 169 && b === 254)
            return true;
        if (a === 192 && b === 0 && (c === 0 || c === 2))
            return true;
        if (a === 198 && ((b === 51 && c === 100) || b === 18 || b === 19))
            return true;
        if (a === 203 && b === 0 && c === 113)
            return true;
        return false;
    }
    static parseIPv6(ipStr) {
        let str = _String_replace(safeLowerCase(ipStr), /^\[|\]$/g, '');
        const pct = _String_indexOf(str, '%');
        if (pct !== -1)
            str = _String_slice(str, 0, pct);
        let embeddedV4 = null;
        const lastColon = _String_lastIndexOf(str, ':');
        if (lastColon !== -1 && _String_indexOf(str, '.', lastColon) !== -1) {
            const v4Parsed = OriginValidator.parseIPv4(_String_slice(str, lastColon + 1));
            if (!v4Parsed)
                return null;
            embeddedV4 = v4Parsed;
            str = _String_slice(str, 0, lastColon) + ':' + ((v4Parsed[0] << 8) | v4Parsed[1]).toString(16) + ':' + ((v4Parsed[2] << 8) | v4Parsed[3]).toString(16);
        }
        const doubleColonIndex = _String_indexOf(str, '::');
        let headWords = [];
        let tailWords = [];
        if (doubleColonIndex !== -1) {
            if (_String_indexOf(str, '::', doubleColonIndex + 2) !== -1)
                return null;
            const head = _String_slice(str, 0, doubleColonIndex);
            const tail = _String_slice(str, doubleColonIndex + 2);
            if (head)
                headWords = safeSplit(head, ':');
            if (tail)
                tailWords = safeSplit(tail, ':');
        }
        else {
            headWords = safeSplit(str, ':');
        }
        if (headWords.length + tailWords.length > 8)
            return null;
        const words = new Array(8).fill(0);
        for (let i = 0; i < headWords.length; i++) {
            if (!headWords[i])
                continue;
            const val = parseInt(headWords[i], 16);
            if (isNaN(val) || val < 0 || val > 0xffff)
                return null;
            words[i] = val;
        }
        const tailStart = 8 - tailWords.length;
        for (let i = 0; i < tailWords.length; i++) {
            if (!tailWords[i])
                continue;
            const val = parseInt(tailWords[i], 16);
            if (isNaN(val) || val < 0 || val > 0xffff)
                return null;
            words[tailStart + i] = val;
        }
        return { words, embeddedV4 };
    }
    static isPrivateOrRestrictedIPv6(parsedV6) {
        const { words, embeddedV4 } = parsedV6;
        const [w0, w1, w2, w3, w4, w5, w6, w7] = words;
        let allZero = true;
        for (let i = 0; i < words.length; i++) {
            if (words[i] !== 0) {
                allZero = false;
                break;
            }
        }
        if (allZero)
            return true;
        if (w0 === 0 && w1 === 0 && w2 === 0 && w3 === 0 && w4 === 0 && w5 === 0 && w6 === 0 && w7 === 1)
            return true;
        if (w0 === 0 && w1 === 0 && w2 === 0 && w3 === 0 && w4 === 0 && (w5 === 0xffff || w5 === 0)) {
            return OriginValidator.isPrivateOrRestrictedIPv4(embeddedV4 || [w6 >> 8, w6 & 0xff, w7 >> 8, w7 & 0xff]);
        }
        if ((w0 & 0xfe00) === 0xfc00 || (w0 & 0xffc0) === 0xfe80 || (w0 & 0xff00) === 0xff00)
            return true;
        if (w0 === 0x2002 || (w0 === 0x2001 && (w1 === 0x0db8 || w1 === 0)) || (w0 === 0x64 && w1 === 0xff9b))
            return true;
        return false;
    }
    static isPrivateOrRestrictedHost(hostname) {
        if (!hostname || typeof hostname !== 'string')
            return false;
        let clean = _String_replace(_String_replace(safeLowerCase(safeTrim(hostname)), /\.+$/, ''), /^\[|\]$/g, '');
        if (!clean)
            return false;
        const pct = _String_indexOf(clean, '%');
        if (pct !== -1)
            clean = _String_slice(clean, 0, pct);
        if (!clean)
            return false;
        if (clean === 'localhost' || safeEndsWith(clean, '.localhost'))
            return true;
        const v4 = OriginValidator.parseIPv4(clean);
        if (v4)
            return OriginValidator.isPrivateOrRestrictedIPv4(v4);
        const v6 = OriginValidator.parseIPv6(clean);
        if (v6)
            return OriginValidator.isPrivateOrRestrictedIPv6(v6);
        return false;
    }
    static canonicalizeOrigin(input) {
        if (!input || typeof input !== 'string')
            return '';
        const trimmed = safeTrim(input);
        if (!trimmed)
            return '';
        const lower = safeLowerCase(trimmed);
        if (lower === 'null' || safeStartsWith(lower, 'file:') || safeStartsWith(lower, 'data:') || safeStartsWith(lower, 'blob:') || lower === 'https://null' || lower === 'http://null') {
            return '';
        }
        try {
            const u = safeIncludes(trimmed, '://') ? new URL(trimmed) : new URL(`https://${trimmed}`);
            const origin = safeLowerCase(u.origin);
            if (!origin || origin === 'null' || safeStartsWith(origin, 'file:') || u.hostname === 'null') {
                return '';
            }
            return origin;
        }
        catch {
            return '';
        }
    }
    static matchesOrigin(originA, originB) {
        const normA = OriginValidator.canonicalizeOrigin(originA);
        const normB = OriginValidator.canonicalizeOrigin(originB);
        return !!normA && !!normB && normA === normB;
    }
    static isFramed() {
        try {
            if (typeof window === 'undefined')
                return false;
            return window.self !== window.top;
        }
        catch {
            return true;
        }
    }
    static getCurrentContext() {
        if (typeof window !== 'undefined' && window.location) {
            const origin = window.location.origin || `${window.location.protocol}//${window.location.host}`;
            const hostname = window.location.hostname || 'localhost';
            return { origin, hostname };
        }
        return { origin: 'http://localhost:3000', hostname: 'localhost' };
    }
    static validate(allowedOrigins) {
        const { origin, hostname } = OriginValidator.getCurrentContext();
        const isFramed = OriginValidator.isFramed();
        if (!allowedOrigins || allowedOrigins.length === 0) {
            return { isValid: true, currentOrigin: origin, currentHostname: hostname, isFramed };
        }
        let isMatch = false;
        for (let i = 0; i < allowedOrigins.length; i++) {
            const rule = allowedOrigins[i];
            if (OriginValidator.matchesDomain(hostname, rule) || OriginValidator.matchesDomain(origin, rule)) {
                isMatch = true;
                break;
            }
        }
        if (!isMatch) {
            return {
                isValid: false,
                currentOrigin: origin,
                currentHostname: hostname,
                isFramed,
                mismatchReason: `Current origin '${origin}' (${hostname}) does not match any allowed domain in allowlist: [${allowedOrigins.join(', ')}]`
            };
        }
        return { isValid: true, currentOrigin: origin, currentHostname: hostname, isFramed };
    }
}
