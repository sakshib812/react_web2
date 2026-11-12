import React from 'react';
import {
  Zap,
  Boxes,
  Palette,
  ShieldCheck,
  Smartphone,
  Rocket,
  ArrowUpRight
} from 'lucide-react';

interface FeatureItem {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  tag: string;
  title: string;
  description: string;
}

export const Features: React.FC = () => {
  const features: FeatureItem[] = [
    {
      icon: <Zap size={24} />,
      iconBg: 'rgba(59, 130, 246, 0.1)',
      iconColor: '#3b82f6',
      tag: 'Performance',
      title: 'Sub-Millisecond HMR',
      description: 'Experience instantaneous updates without full page reloads via Vite ES modules and React fast refresh.'
    },
    {
      icon: <Boxes size={24} />,
      iconBg: 'rgba(139, 92, 246, 0.1)',
      iconColor: '#8b5cf6',
      tag: 'Modern Hooks',
      title: 'Declarative State Store',
      description: 'Harness the power of React 19 functional hooks for deterministic state flows and clean lifecycle isolation.'
    },
    {
      icon: <Palette size={24} />,
      iconBg: 'rgba(236, 72, 153, 0.1)',
      iconColor: '#ec4899',
      tag: 'Design System',
      title: 'Adaptive Light & Dark UI',
      description: 'Crafted with CSS custom design tokens, glassmorphism filters, fluid typography, and seamless theme switching.'
    },
    {
      icon: <ShieldCheck size={24} />,
      iconBg: 'rgba(16, 185, 129, 0.1)',
      iconColor: '#10b981',
      tag: 'Reliability',
      title: 'TypeScript Type Safety',
      description: 'End-to-end typed props, interfaces, and event handlers ensure compile-time confidence and error-free execution.'
    },
    {
      icon: <Smartphone size={24} />,
      iconBg: 'rgba(245, 158, 11, 0.1)',
      iconColor: '#f59e0b',
      tag: 'Responsiveness',
      title: '100% Mobile & Desktop Ready',
      description: 'Fully responsive grid layout tested across smartphones, tablets, laptops, and ultra-wide monitor displays.'
    },
    {
      icon: <Rocket size={24} />,
      iconBg: 'rgba(6, 182, 212, 0.1)',
      iconColor: '#06b6d4',
      tag: 'Production',
      title: 'Optimized Bundler Pipeline',
      description: 'Tree-shaking, code splitting, and minified production builds that load in a fraction of a second globally.'
    }
  ];

  return (
    <section id="features">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Capabilities</div>
          <h2 className="section-title">Everything You Need to Build Fast</h2>
          <p className="section-description">
            Clean architecture, modular separation of concerns, and future-proof design principles built directly into every component.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, idx) => (
            <div key={idx} className="card feature-card">
              <div
                className="feature-icon-wrapper"
                style={{ background: feature.iconBg, color: feature.iconColor }}
              >
                {feature.icon}
              </div>
              <span className="feature-tag">{feature.tag}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--primary)', fontSize: '0.88rem', fontWeight: 600 }}>
                <span>Learn more</span>
                <ArrowUpRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

