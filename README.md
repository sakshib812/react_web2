# NovaReact — Modern Web Application

A responsive, high-performance website configured strictly with the target tech stack:
- **Framework:** React (TSX / JSX)
- **Version Flavor:** React 16.8 – 19+ & Future (Vite / Functional Hooks)
- **Tooling:** Vite, TypeScript, Lucide Icons, Modern Design Tokens

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```
This generates a minified, production-ready static site inside the `dist/` directory.

### 4. Preview the Production Build
```bash
npm run preview
```

---

## 📁 Project Architecture

```
web/
├── public/                 # Static assets & favicons
├── src/
│   ├── components/         # Modular functional components
│   │   ├── Navbar.tsx      # Responsive header with theme toggle
│   │   ├── Hero.tsx        # Hero with interactive live demo card
│   │   ├── TechStackBanner.tsx # Stack selection & architecture info
│   │   ├── Features.tsx    # Grid of feature highlights
│   │   ├── Playground.tsx  # Interactive Hooks & State playground
│   │   ├── Pricing.tsx     # Pricing tiers with billing toggle
│   │   ├── FAQ.tsx         # Interactive accordion FAQ
│   │   ├── Contact.tsx     # Form with real-time state feedback
│   │   ├── Footer.tsx      # Footer, status indicators & links
│   │   └── ScrollToTop.tsx # Smooth back-to-top button
│   ├── App.css             # Component styling & layout rules
│   ├── index.css           # Global design system & theme variables
│   ├── App.tsx             # Root component with theme state
│   └── main.tsx            # React 19 createRoot bootstrap
├── index.html              # HTML5 entry with web fonts
├── package.json            # Scripts & dependencies
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

---

## ✨ Features Included

- **Target Framework Alignment**: Fully functional React 19 hooks (`useState`, `useMemo`, `useEffect`).
- **Interactive Demos**:
  - Live state counter with multiplier and turbo mode.
  - Task manager with status filtering and dynamic array mutations.
  - Live metric and financial calculator using memoized computation.
  - Dynamic theme palette generator with click-to-copy functionality.
- **Adaptive Theme Engine**: Smooth Dark Mode & Light Mode switcher with local storage persistence.
- **100% Responsive**: Tested across smartphone, tablet, and desktop viewports.
