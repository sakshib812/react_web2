# 🛡️ SecureShield Web SDK (v4.0.0)

> Enterprise-Grade Client-Side Security, Anti-Bot Fraud Defense, Threat Detection & Zero-Trust Telemetry Engine for Web Applications.

---

## 📦 What's Inside This Release Package

This release contains the clean single-file artifacts for integrating SecureShield into your web application:

```
SecureShield_Web_SDK_Release/
├── secureshield.js              <-- 📦 Option A (Drop-in IIFE): For classic <script src="secureshield.js"> tags
├── secureshield.iife.js         <-- 📦 Option A (Standalone IIFE): Explicit IIFE globalName: SecureShield
├── secureshield.esm.js          <-- ⚡ Option A (ES Module): For modern bundlers & <script type="module">
├── secureshield.hardened.js     <-- 🛡️ Option B (Hardened IIFE): AST-Obfuscated drop-in bundle for <script> tags
├── secureshield.wasm.js         <-- 🛡️ Option B (Drop-in alias): Backward-compatible alias for secureshield.hardened.js
├── secureshield.hardened.esm.js <-- ⚡ Option B (Hardened ESM): AST-Obfuscated ES Module
├── secureshield.js.sha256       <-- 🔒 Published SHA-256 Checksum (Option A Drop-in)
├── secureshield.js.sri          <-- 🛡️ Subresource Integrity (SRI) Hash for <script> tag
├── secureshield.esm.js.sha256   <-- 🔒 Published SHA-256 Checksum (Option A ESM)
├── secureshield.esm.js.sri      <-- 🛡️ Subresource Integrity (SRI) Hash (Option A ESM)
├── secureshield.iife.js.sha256  <-- 🔒 Published SHA-256 Checksum (Option A IIFE)
├── secureshield.iife.js.sri     <-- 🛡️ Subresource Integrity (SRI) Hash (Option A IIFE)
├── secureshield.hardened.js.sha256 <-- 🔒 Published SHA-256 Checksum (Option B Hardened)
├── secureshield.hardened.js.sri    <-- 🛡️ Subresource Integrity (SRI) Hash (Option B Hardened)
├── secureshield.wasm.js.sha256  <-- 🔒 Published SHA-256 Checksum (Option B alias)
├── secureshield.wasm.js.sri     <-- 🛡️ Subresource Integrity (SRI) Hash for <script> tag
├── index.d.ts                   <-- 📘 Complete TypeScript Definitions (for React/Next/Vue/Angular)
├── INTEGRATION_GUIDE.md         <-- 📖 Step-by-Step Integration Guide (All Frameworks)
├── SECURESHIELD_WEB_SDK_SPECIFICATION.md <-- 📑 Complete Architecture & Detector Specification
└── README.md                    <-- 📋 Quick Start & Overview
```

---

## ⚡ 3-Minute Quick Start

### Method 1: Drop-in Script Tag (HTML / CMS / Vanilla JS)

Add the script tag to your `<head>` and initialize SecureShield. Both Option A (`secureshield.js`) and Option B (`secureshield.hardened.js` / `secureshield.wasm.js`) are fully compatible with standard `<script>` tags:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Protected App</title>

  <!-- Option A: Standard Drop-in (IIFE) -->
  <script src="./secureshield.js" async></script>

  <!-- OR Option B: Hardened Enterprise Edition (IIFE Drop-in) -->
  <!-- <script src="./secureshield.hardened.js" async></script> -->
  <!-- <script src="./secureshield.wasm.js" async></script> -->

  <!-- Alternatively, for ES Modules:
  <script type="module" src="./secureshield.esm.js"></script>
  -->
</head>
<body>
  <script>
    window.addEventListener('DOMContentLoaded', async () => {
      // 1. Fetch ephemeral token from your server (Zero secrets in client code)
      const { sessionToken } = await fetch('/api/secureshield-handshake').then(r => r.json());

      // 2. Initialize SecureShield
      const shield = await window.SecureShield.init({
        sessionToken: sessionToken,
        serverUrl: 'https://security.yourcompany.com/api/v1/telemetry/ingest',
        enableStorageLeakScrubber: true,
        enableTabBlurShield: true
      });

      // 3. Collect device signals & evaluate trust
      const verdict = await shield.ingestTelemetry();
      console.log('Security Status:', verdict.verdict);
    });
  </script>
</body>
</html>
```

---

### Method 2: NPM Package (React, Next.js, Vue 3, Angular)

```bash
npm install @secureshield/web
```

```typescript
import { SecureShield, SecurityAuditReport } from '@secureshield/web';

async function bootstrap() {
  try {
    const { sessionToken } = await fetch('/api/secureshield-handshake').then(r => r.json());

    const shield = await SecureShield.init({
      sessionToken,
      serverUrl: process.env.NEXT_PUBLIC_SECURITY_INGEST_URL,
      enableStorageLeakScrubber: true,
      enableTabBlurShield: true
    });

    const response = await shield.ingestTelemetry();
    console.log('Ingest Status:', response.status, 'Threat Score:', response.deviceStatus?.threatScore);
  } catch (error) {
    console.error('[SecureShield] Initialization error:', error);
  }
}
```

---

## ⚡ Measured Browser Performance (50+ Runs Benchmark)

| Environment / Mode | Bundle Variant | Mean Execution | Median (P50) | P95 Budget |
| :--- | :--- | :--- | :--- | :--- |
| **Chromium** | Option A (Standard IIFE) | 47.1 ms | 40.1 ms | 67.1 ms |
| **Chromium** | Option B (Hardened IIFE) | 110.5 ms | 98.4 ms | 142 ms |
| **Firefox** | Option A (Standard IIFE) | 21.02 ms | 21 ms | 27 ms |
| **Firefox** | Option B (Hardened IIFE) | 18.94 ms | 18 ms | 26 ms |
| **WebKit** | Option A (Standard IIFE) | 16.18 ms | 16 ms | 19 ms |
| **WebKit** | Option B (Hardened IIFE) | 23.1 ms | 23 ms | 28 ms |
| **Chromium (4× CPU Throttle)** | Option A (Standard IIFE) | 31.74 ms | 30.5 ms | 45.6 ms |

> **Performance & Main-Thread Notice**:
> Under standard desktop hardware, synchronous scans complete in 28–40 ms (comfortably within the 50 ms unthrottled budget). Under heavy 4× CPU throttling (low-end mobile simulation), scan duration extends to 30.5 ms median (45.6 ms P95), exceeding 50 ms. Synchronous execution blocks the main thread for approximately 2 frames at 60fps. Asynchronous idle-time yielding is scheduled for the v4.1 roadmap.

---

## 💻 Runtime & Module Requirements

- **Node.js**: `>= 18.0.0` (specified in `engines`).
- **Module Formats**: Native ES Modules (`type: "module"`) with bundled IIFE distributions.
- **CommonJS `require()`**: Modern Node runtimes (`>= 22.12.0`) support native `require(esm)`. In legacy Node CommonJS environments (< 22.12), use dynamic `import('@secureshield/web')` or bundler transpilation.
- **Zero Runtime Dependencies**: `dependencies` is empty `{}` in `package.json`; `npm audit --omit=dev` reports 0 vulnerabilities.
- **Legacy Alias Notice**: `secureshield.wasm.js` is a backward-compatible legacy alias for `secureshield.hardened.js` (scheduled for removal in v5.0.0).

## 🔒 Security Architecture Highlights

> **DOM Lockout Defense-in-Depth Disclaimer (N-9, RO-7, G-N9-3)**: The client-side lockout overlay (`SecurityLockoutOverlay`) employs MutationObservers against stylesheet tampering and element removal, providing active UI friction against interactive attackers. However, client-side DOM controls are not an absolute security boundary against local DevTools manipulation. Definitive security enforcement relies on local cryptographic key wiping (`RemediationManager.wipeLocalKeys()`) and server-side session revocation.


| Layer | Feature | Protection Mechanism |
|---|---|---|
| **Zero-Trust Risk Governance** | Server-Authoritative Telemetry | Hardened client-side sensor evaluates 83 granular detector probes; authoritative scoring and verdicts are calculated strictly on the backend gateway. |
| **Option A (Standard JS)** | Single-File ESM / IIFE Bundle | Compact, zero-dependency distribution for general web applications and SPAs. |
| **Option B (Hardened Enterprise)** | AST Obfuscation Tier | Control-flow flattening, dead-code injection, and string encryption to defeat reverse engineering. Compatible with classic `<script>` tags. |
| **Storage Sanitization** | `StorageScrubber` | Automatically purges unencrypted JWTs and access tokens leaked in `localStorage`/`sessionStorage`. |
| **DOM Hardening** | `TabBlurShield` | Automatically blurs sensitive screen contents when the browser window loses focus. |
| **Remote Remediation** | Dynamic Policy Dispatch | Executes real-time OTA actions (`BLOCK`, `CHALLENGE`, `PAUSED`, `WIPE_LOCAL_KEYS`) returned by the security gateway. |

---

## 🧪 Independent Verification Kit & Test Reproduction (Finding M-1)

The Verification Kit contains **34 black-box verification tests** across 6 test suites that audit the compiled production bundles, SRI sidecars, cryptographic lease bindings, and performance SLAs — no repository access or devDependencies required. (The 437 internal unit/integration tests exercise the raw TypeScript source and require the internal development workspace; they are not run by the Verification Kit).

- **Download**: [`SecureShield_Verification_Kit.zip`](/downloads/SecureShield_Verification_Kit.zip)
- **Published SHA-256 Checksum**: `61129e02f00c24018900587d0de75d04ee4b52006fb93324bd6bb2042ce14025`
- **Execution (Zero Dependencies, Air-Gapped)**:
  ```bash
  unzip SecureShield_Verification_Kit.zip
  npm test
  npm run benchmark
  ```

> **Notice for NPM / Standalone Package Consumers**:
> Shipped `@secureshield/web` packages and tarballs contain compiled, production-ready runtime distributions and intentionally omit internal source files, test suites, and AST obfuscation configurations. All compliance test suites, RASP validation probes, and benchmark harnesses are published in the Verification Kit with its published cryptographic SHA-256 hash.

---

## 📖 Full Documentation

For detailed step-by-step guides for **React**, **Next.js (App & Pages Router)**, **Vue 3**, and **Angular**, refer to [`INTEGRATION_GUIDE.md`](./INTEGRATION_GUIDE.md).
