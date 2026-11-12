/**
 * SecurityLockoutOverlay: DOM Lockout & Threat Remediation Screen Overlay
 * Renders an un-dismissible, high-contrast security lockout shield over the DOM.
 * Fortified with MutationObservers against DOM tampering, removal, or CSS suppression (N-9).
 */
export class SecurityLockoutOverlay {
    static OVERLAY_ELEMENT_ID = 'secureshield_lockout_overlay';
    static EVTS = ['click', 'dblclick', 'mousedown', 'mouseup', 'keydown', 'keyup', 'keypress', 'touchstart', 'touchend', 'contextmenu'];
    static isCapturingEvents = false;
    static isLockoutEnforced = false;
    static isMutating = false;
    static bodyObserver = null;
    static overlayObserver = null;
    static lastTitle = '🚨 Access Terminated: Security Violation';
    static lastMessage = 'Your application session has been terminated by enterprise security policy due to an active environment threat.';
    static lastIncidentId;
    static eventSuppressor = (e) => {
        e.stopPropagation();
        e.preventDefault();
    };
    static renderLockoutOverlay(title = '🚨 Access Terminated: Security Violation', message = 'Your application session has been terminated by enterprise security policy due to an active environment threat.', incidentId) {
        if (typeof document === 'undefined' || !document.body || typeof document.getElementById !== 'function')
            return;
        SecurityLockoutOverlay.lastTitle = title;
        SecurityLockoutOverlay.lastMessage = message;
        SecurityLockoutOverlay.lastIncidentId = incidentId;
        SecurityLockoutOverlay.isLockoutEnforced = true;
        let overlay = document.getElementById(SecurityLockoutOverlay.OVERLAY_ELEMENT_ID);
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = SecurityLockoutOverlay.OVERLAY_ELEMENT_ID;
            overlay.style.cssText = 'position:fixed!important;top:0!important;left:0!important;width:100vw!important;height:100vh!important;background:#0B0F19!important;color:#F8FAFC!important;z-index:2147483647!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;text-align:center!important;padding:24px!important;box-sizing:border-box!important;font-family:system-ui,sans-serif!important;user-select:none!important;-webkit-user-select:none!important;pointer-events:auto!important;visibility:visible!important;opacity:1!important;';
            const incId = incidentId || `INC-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000)}`;
            const mk = (t, s, txt) => {
                const el = document.createElement(t);
                if (s)
                    el.style.cssText = s;
                if (txt)
                    el.textContent = txt;
                return el;
            };
            const card = mk('div', 'max-width:520px;background:#131B2E;border:1px solid #EF4444;border-radius:16px;padding:36px 28px;box-shadow:0 25px 50px -12px rgba(239,68,68,0.25);');
            card.appendChild(mk('div', 'font-size:56px;line-height:1;margin-bottom:18px;', '🛡️'));
            card.appendChild(mk('h1', 'color:#F87171;font-size:20px;font-weight:800;margin:0 0 12px 0;', title));
            card.appendChild(mk('p', 'color:#94A3B8;font-size:13px;line-height:1.6;margin:0 0 24px 0;', message));
            const meta = mk('div', 'background:#0B0F19;border:1px solid #1E293B;border-radius:8px;padding:12px;margin-bottom:24px;text-align:left;');
            const addRow = (l, v, c) => {
                const r = mk('div', 'color:#64748B;font-size:11px;font-family:monospace;margin-bottom:4px;');
                r.appendChild(mk('span', '', l + ': '));
                r.appendChild(mk('span', `color:${c};`, v));
                meta.appendChild(r);
            };
            addRow('INCIDENT ID', incId, '#00E5FF');
            addRow('TIMESTAMP', new Date().toISOString(), '#94A3B8');
            addRow('ENFORCEMENT', 'BLOCK_TERMINATE', '#EF4444');
            card.appendChild(meta);
            card.appendChild(mk('div', 'font-size:11px;color:#475569;font-weight:500;', 'Protected by SecureShield Enterprise Defense'));
            overlay.appendChild(card);
            SecurityLockoutOverlay.isMutating = true;
            try {
                document.body.appendChild(overlay);
                document.body.style.setProperty('overflow', 'hidden', 'important');
            }
            catch { }
            finally {
                SecurityLockoutOverlay.isMutating = false;
            }
        }
        else {
            const inBody = typeof document.body.contains === 'function' ? document.body.contains(overlay) : overlay.parentNode === document.body;
            if (!inBody) {
                SecurityLockoutOverlay.isMutating = true;
                try {
                    document.body.appendChild(overlay);
                }
                catch { }
                finally {
                    SecurityLockoutOverlay.isMutating = false;
                }
            }
            SecurityLockoutOverlay.ensureOverlayStyles(overlay);
        }
        SecurityLockoutOverlay.attachObservers(overlay);
        if (!SecurityLockoutOverlay.isCapturingEvents && typeof window !== 'undefined') {
            for (const ev of SecurityLockoutOverlay.EVTS) {
                window.addEventListener(ev, SecurityLockoutOverlay.eventSuppressor, true);
            }
            SecurityLockoutOverlay.isCapturingEvents = true;
        }
    }
    static attachObservers(overlay) {
        if (typeof MutationObserver === 'undefined' || typeof document === 'undefined')
            return;
        const root = document.documentElement || document.body;
        if (root && !SecurityLockoutOverlay.bodyObserver) {
            SecurityLockoutOverlay.bodyObserver = new MutationObserver(() => {
                if (SecurityLockoutOverlay.isMutating || !SecurityLockoutOverlay.isLockoutEnforced)
                    return;
                const cur = document.getElementById(SecurityLockoutOverlay.OVERLAY_ELEMENT_ID);
                // Counter ancestor suppression styling on documentElement and body (RO-7, G-N9-3)
                if (document.documentElement) {
                    const docEl = document.documentElement;
                    if (docEl.style.display === 'none' || docEl.style.visibility === 'hidden' || docEl.style.opacity === '0') {
                        docEl.style.setProperty('display', 'block', 'important');
                        docEl.style.setProperty('visibility', 'visible', 'important');
                        docEl.style.setProperty('opacity', '1', 'important');
                    }
                }
                if (document.body) {
                    const b = document.body;
                    if (b.style.display === 'none' || b.style.visibility === 'hidden' || b.style.opacity === '0') {
                        b.style.setProperty('display', 'block', 'important');
                        b.style.setProperty('visibility', 'visible', 'important');
                        b.style.setProperty('opacity', '1', 'important');
                    }
                }
                const parent = cur ? cur.parentNode : null;
                const inDom = cur && (parent === document.body || parent === document.documentElement || (document.contains ? document.contains(cur) : false));
                if (!inDom) {
                    SecurityLockoutOverlay.isMutating = true;
                    try {
                        SecurityLockoutOverlay.renderLockoutOverlay(SecurityLockoutOverlay.lastTitle, SecurityLockoutOverlay.lastMessage, SecurityLockoutOverlay.lastIncidentId);
                    }
                    finally {
                        SecurityLockoutOverlay.isMutating = false;
                    }
                }
                else if (cur) {
                    SecurityLockoutOverlay.ensureOverlayStyles(cur);
                }
            });
            SecurityLockoutOverlay.bodyObserver.observe(root, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['style', 'class', 'hidden']
            });
            if (document.body && document.documentElement && root !== document.body) {
                try {
                    SecurityLockoutOverlay.bodyObserver.observe(document.body, {
                        childList: true,
                        subtree: true,
                        attributes: true,
                        attributeFilter: ['style', 'class', 'hidden']
                    });
                }
                catch { }
            }
        }
        if (SecurityLockoutOverlay.overlayObserver) {
            SecurityLockoutOverlay.overlayObserver.disconnect();
        }
        SecurityLockoutOverlay.overlayObserver = new MutationObserver(() => {
            if (SecurityLockoutOverlay.isMutating || !SecurityLockoutOverlay.isLockoutEnforced)
                return;
            const el = document.getElementById(SecurityLockoutOverlay.OVERLAY_ELEMENT_ID);
            if (el)
                SecurityLockoutOverlay.ensureOverlayStyles(el);
        });
        SecurityLockoutOverlay.overlayObserver.observe(overlay, {
            attributes: true,
            attributeFilter: ['style', 'class', 'hidden', 'inert', 'popover']
        });
    }
    static ensureOverlayStyles(el) {
        if (SecurityLockoutOverlay.isMutating)
            return;
        if (el.style.display === 'flex' &&
            el.style.visibility === 'visible' &&
            el.style.opacity === '1' &&
            el.style.zIndex === '2147483647' &&
            !el.hasAttribute('hidden') &&
            !el.hasAttribute('inert') &&
            !el.hasAttribute('popover') &&
            (!document.body || document.body.style.overflow === 'hidden')) {
            return;
        }
        SecurityLockoutOverlay.isMutating = true;
        try {
            const s = el.style;
            s.setProperty('display', 'flex', 'important');
            s.setProperty('visibility', 'visible', 'important');
            s.setProperty('opacity', '1', 'important');
            s.setProperty('position', 'fixed', 'important');
            s.setProperty('top', '0px', 'important');
            s.setProperty('left', '0px', 'important');
            s.setProperty('width', '100vw', 'important');
            s.setProperty('height', '100vh', 'important');
            s.setProperty('z-index', '2147483647', 'important');
            s.setProperty('pointer-events', 'auto', 'important');
            if (el.hasAttribute('hidden'))
                el.removeAttribute('hidden');
            if (el.hasAttribute('inert'))
                el.removeAttribute('inert');
            if (el.hasAttribute('popover'))
                el.removeAttribute('popover');
            if (document.body && document.body.style.overflow !== 'hidden') {
                document.body.style.setProperty('overflow', 'hidden', 'important');
            }
        }
        finally {
            SecurityLockoutOverlay.isMutating = false;
        }
    }
    static dismissLockoutOverlay() {
        SecurityLockoutOverlay.isLockoutEnforced = false;
        if (SecurityLockoutOverlay.bodyObserver) {
            SecurityLockoutOverlay.bodyObserver.disconnect();
            SecurityLockoutOverlay.bodyObserver = null;
        }
        if (SecurityLockoutOverlay.overlayObserver) {
            SecurityLockoutOverlay.overlayObserver.disconnect();
            SecurityLockoutOverlay.overlayObserver = null;
        }
        if (typeof document !== 'undefined' && typeof document.getElementById === 'function') {
            SecurityLockoutOverlay.isMutating = true;
            try {
                const el = document.getElementById(SecurityLockoutOverlay.OVERLAY_ELEMENT_ID);
                if (el && el.parentNode) {
                    el.parentNode.removeChild(el);
                }
                if (document.body) {
                    document.body.style.overflow = '';
                }
            }
            finally {
                SecurityLockoutOverlay.isMutating = false;
            }
        }
        if (SecurityLockoutOverlay.isCapturingEvents && typeof window !== 'undefined') {
            for (const ev of SecurityLockoutOverlay.EVTS) {
                window.removeEventListener(ev, SecurityLockoutOverlay.eventSuppressor, true);
            }
            SecurityLockoutOverlay.isCapturingEvents = false;
        }
    }
    static isLockoutActive() {
        if (typeof document === 'undefined' || typeof document.getElementById !== 'function')
            return false;
        const exists = !!document.getElementById(SecurityLockoutOverlay.OVERLAY_ELEMENT_ID);
        if (!exists && SecurityLockoutOverlay.isLockoutEnforced) {
            SecurityLockoutOverlay.renderLockoutOverlay(SecurityLockoutOverlay.lastTitle, SecurityLockoutOverlay.lastMessage, SecurityLockoutOverlay.lastIncidentId);
            return true;
        }
        return exists;
    }
}
