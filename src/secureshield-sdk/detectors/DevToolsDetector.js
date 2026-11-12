export class DevToolsDetector {
    static scan() {
        let triggered = false;
        const evidence = {};
        try {
            if (typeof window !== 'undefined' && typeof window.outerWidth === 'number' && typeof window.innerWidth === 'number') {
                // Probe 1: Check window outer vs inner dimension delta
                const threshold = 160;
                const widthDiff = window.outerWidth - window.innerWidth;
                const heightDiff = window.outerHeight - window.innerHeight;
                if (widthDiff > threshold || heightDiff > threshold) {
                    triggered = true;
                    evidence['window_delta'] = `widthDiff:${widthDiff}, heightDiff:${heightDiff}`;
                }
            }
            if (typeof Image !== 'undefined') {
                // Probe 2: Firebug / console element inspection trap
                const element = new Image();
                Object.defineProperty(element, 'id', {
                    get: function () {
                        triggered = true;
                        evidence['console_getter_trap'] = 'active';
                        return 'devtools';
                    }
                });
            }
        }
        catch (e) {
            evidence['error'] = e.message;
        }
        return {
            id: 'browser_devtools_detector',
            triggered,
            severity: triggered ? 3 : 0, // HIGH
            category: 'environment',
            event: 'browser_devtools_open',
            evidence
        };
    }
}
