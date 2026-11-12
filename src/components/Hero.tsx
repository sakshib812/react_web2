import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Zap,
  Terminal,
  RotateCcw,
  Plus,
  CheckCircle2,
  Layers
} from 'lucide-react';

export const Hero: React.FC = () => {
  const [demoCount, setDemoCount] = useState<number>(42);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [fastMode, setFastMode] = useState<boolean>(true);

  const increment = () => setDemoCount(prev => prev + (fastMode ? 5 * multiplier : 1 * multiplier));
  const reset = () => setDemoCount(0);

  return (
    <section className="hero-section">
      <div className="hero-glow-bg" />
      <div className="container hero-grid">
        {/* Left Column: Headline & Call To Actions */}
        <div className="hero-content">
          <div className="hero-badge-stack">
            <Sparkles size={16} />
            <span>Target Tech Stack: React 16.8 – 19+ (Vite & Hooks)</span>
          </div>

          <h1 className="hero-title">
            Build Modern Web Apps with <span className="gradient-text">Lightning Speed</span>.
          </h1>

          <p className="hero-subtitle">
            A production-ready website engineered with modern React functional components,
            TypeScript type safety, and Vite HMR for instantaneous feedback loops.
          </p>

          <div className="hero-ctas">
            <a href="#playground" className="btn btn-primary btn-lg">
              <span>Try Live Playground</span>
              <ArrowRight size={18} />
            </a>
            <a href="#framework" className="btn btn-secondary btn-lg">
              <Layers size={18} />
              <span>Explore Tech Stack</span>
            </a>
          </div>

          <div className="hero-stats-row">
            <div className="hero-stat-item">
              <h4>0.05s</h4>
              <span>HMR Refresh Rate</span>
            </div>
            <div className="hero-stat-item">
              <h4>100%</h4>
              <span>Type-Safe TSX</span>
            </div>
            <div className="hero-stat-item">
              <h4>React 19</h4>
              <span>Concurrent Ready</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Live Demo Card */}
        <div className="hero-preview-card">
          <div className="card-header-bar">
            <div className="card-dots">
              <div className="dot dot-red"></div>
              <div className="dot dot-yellow"></div>
              <div className="dot dot-green"></div>
            </div>
            <div className="card-title-tab">
              <Terminal size={12} style={{ display: 'inline', marginRight: 4 }} />
              LiveComponent.tsx
            </div>
            <span className="stack-pill" style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}>
              ● Live React Hook
            </span>
          </div>

          <div className="card-body-content">
            <div className="preview-metric-box">
              <div className="metric-header">
                <span>Functional State Variable</span>
                <span style={{ color: 'var(--primary)' }}>useState()</span>
              </div>
              <div className="metric-value">
                {demoCount.toLocaleString()}
                <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-muted)', marginLeft: 8 }}>
                  renders
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setMultiplier(1)}
                className={`btn btn-sm ${multiplier === 1 ? 'btn-primary' : 'btn-secondary'}`}
              >
                1x Step
              </button>
              <button
                onClick={() => setMultiplier(5)}
                className={`btn btn-sm ${multiplier === 5 ? 'btn-primary' : 'btn-secondary'}`}
              >
                5x Step
              </button>
              <button
                onClick={() => setFastMode(!fastMode)}
                className={`btn btn-sm ${fastMode ? 'btn-primary' : 'btn-secondary'}`}
              >
                <Zap size={14} /> Turbo Mode: {fastMode ? 'ON' : 'OFF'}
              </button>
            </div>

            <div className="interactive-counter-row">
              <button onClick={increment} className="btn btn-primary" style={{ flex: 1 }}>
                <Plus size={16} /> Increment Counter
              </button>
              <button onClick={reset} className="btn btn-secondary" title="Reset Counter">
                <RotateCcw size={16} />
              </button>
            </div>

            <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <CheckCircle2 size={14} color="#10b981" />
                <span>Zero-latency state mutations handled by React Fiber</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle2 size={14} color="#10b981" />
                <span>Strict TSX compile-time parameter contract</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

