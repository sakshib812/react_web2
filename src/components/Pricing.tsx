import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

export const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const tiers = [
    {
      name: 'Starter',
      price: billingCycle === 'yearly' ? 0 : 0,
      description: 'Ideal for personal experiments, portfolios, and prototypes.',
      features: [
        'Vite + React 19 template setup',
        'TypeScript compiler configuration',
        'Basic responsive layout tokens',
        'Community GitHub discussions',
        'Standard build scripts'
      ],
      popular: false,
      cta: 'Get Started Free'
    },
    {
      name: 'Professional',
      price: billingCycle === 'yearly' ? 19 : 24,
      description: 'Designed for production applications and fast-shipping teams.',
      features: [
        'Everything in Starter',
        'Custom hooks & state architecture',
        'Light & Dark theme token engine',
        'SEO & Meta optimization pre-configured',
        'Priority component updates',
        '1-on-1 architecture review'
      ],
      popular: true,
      cta: 'Start 14-Day Free Trial'
    },
    {
      name: 'Enterprise',
      price: billingCycle === 'yearly' ? 49 : 59,
      description: 'Custom multi-tenant platforms, SLAs, and dedicated engineering.',
      features: [
        'Everything in Professional',
        'Custom design system integration',
        'Micro-frontend & SSR setup',
        '99.99% uptime deployment configs',
        'Dedicated Slack support channel',
        'Custom security & audit reviews'
      ],
      popular: false,
      cta: 'Contact Sales'
    }
  ];

  return (
    <section id="pricing">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Pricing</div>
          <h2 className="section-title">Transparent & Scalable Plans</h2>
          <p className="section-description">
            Choose the tier that matches your project scope. Scale seamlessly anytime.
          </p>

          <div style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--bg-card)', padding: '0.35rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-light)', marginTop: '1.5rem' }}>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`btn btn-sm ${billingCycle === 'monthly' ? 'btn-primary' : ''}`}
              style={{ borderRadius: 'var(--radius-full)' }}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`btn btn-sm ${billingCycle === 'yearly' ? 'btn-primary' : ''}`}
              style={{ borderRadius: 'var(--radius-full)' }}
            >
              Yearly (Save 20%)
            </button>
          </div>
        </div>

        <div className="pricing-grid">
          {tiers.map((tier, idx) => (
            <div key={idx} className={`pricing-card ${tier.popular ? 'featured' : ''}`}>
              {tier.popular && (
                <div className="pricing-badge">
                  <Sparkles size={12} style={{ display: 'inline', marginRight: 4 }} />
                  Most Popular
                </div>
              )}

              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>{tier.name}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', minHeight: '40px' }}>
                {tier.description}
              </p>

              <div className="pricing-price">
                ${tier.price}
                <span>/ month</span>
              </div>

              <ul className="pricing-features">
                {tier.features.map((feat, fIdx) => (
                  <li key={fIdx} className="pricing-feature-item">
                    <Check size={16} color="var(--primary)" style={{ flexShrink: 0 }} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`btn ${tier.popular ? 'btn-primary' : 'btn-secondary'}`}
                style={{ width: '100%' }}
              >
                <span>{tier.cta}</span>
                <ArrowRight size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

