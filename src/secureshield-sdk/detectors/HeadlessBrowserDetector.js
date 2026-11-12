export class HeadlessBrowserDetector {
    static scan() {
        let triggered = false;
        const evidence = {};
        // Probe 1: navigator.webdriver
        if (typeof navigator !== 'undefined' && navigator.webdriver) {
            triggered = true;
            evidence['navigator_webdriver'] = 'true';
        }
        // Probe 2: PhantomJS / Nightmare / Selenium properties
        if (typeof window !== 'undefined') {
            const win = window;
            if (win.callPhantom || win._phantom || win.__nightmare || win.domAutomation || win.domAutomationController) {
                triggered = true;
                evidence['automation_global'] = 'detected';
            }
        }
        // Probe 3: Languages array length check
        if (typeof navigator !== 'undefined' && (!navigator.languages || navigator.languages.length === 0)) {
            triggered = true;
            evidence['empty_languages'] = 'true';
        }
        return {
            id: 'headless_browser_detector',
            triggered,
            severity: triggered ? 4 : 0, // CRITICAL
            category: 'environment',
            event: 'headless_puppeteer_selenium_detected',
            evidence
        };
    }
}
