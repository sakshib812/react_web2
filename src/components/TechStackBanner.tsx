import React from 'react';
import { 
  Code, 
  Workflow, 
  ShieldCheck, 
  Flame, 
  CheckCircle2, 
  Layers 
} from 'lucide-react';

export const TechStackBanner: React.FC = () => {
  return (
    <section id="framework" className="stack-section">
      <div className="container">
        {/* Studio Config Badge matching the user's configuration */}
        <div className="stack-config-badge">
          <div className="stack-config-title">
            <Layers size={22} color="var(--primary)" />
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                SDK Studio Config Activated
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                React (TSX / JSX) • React 16.8 – 19+ & Future (Vite / Functional Hooks)
              </div>
            </div>
          </div>
          <span className="stack-pill">
            <CheckCircle2 size={14} style={{ display: 'inline', marginRight: 4 }} />
            Config Verified & Active
          </span>
        </div>

        <div className="section-header">
          <div className="section-badge">Architecture</div>
          <h2 className="section-title">Engineered Around Modern Framework Standards</h2>
          <p className="section-description">
            Configured strictly to your framework requirements: functional hook semantics,
            typed TSX interfaces, and Vite's native ES-module dev server.
          </p>
        </div>

        <div className="stack-cards-grid">
          <div className="stack-card">
            <div className="stack-card-icon" style={{ background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8' }}>
              <Code size={26} />
            </div>
            <h3>React (TSX / JSX)</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Full TypeScript (TSX) integration for strict prop checking, compile-time autocompletion, and robust component architecture.
            </p>
          </div>

          <div className="stack-card">
            <div className="stack-card-icon" style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
              <Flame size={26} />
            </div>
            <h3>Vite Next-Gen Bundler</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Instant server start, lightning fast Hot Module Replacement (HMR), and highly optimized Rollup production bundling.
            </p>
          </div>

          <div className="stack-card">
            <div className="stack-card-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
              <Workflow size={26} />
            </div>
            <h3>Functional Hooks (16.8 – 19+)</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Pure functional paradigms utilizing `useState`, `useEffect`, `useMemo`, `useCallback`, and React 19 concurrent features.
            </p>
          </div>

          <div className="stack-card">
            <div className="stack-card-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
              <ShieldCheck size={26} />
            </div>
            <h3>Production Ready</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Zero legacy class component overhead, clean semantic HTML5, accessible ARIA attributes, and fluid responsive design.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
