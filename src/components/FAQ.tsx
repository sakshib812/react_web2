import React, { useState, useMemo } from 'react';
import { ChevronDown, HelpCircle, Search, X } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs: FAQItem[] = [
    {
      category: 'Framework',
      question: 'Why choose React 19 with Vite over traditional setups?',
      answer: 'Vite leverages native ES modules during development, delivering instant cold starts and sub-millisecond Hot Module Replacement (HMR) without full-page reloads. Paired with React 19, you gain access to improved concurrent rendering, optimistic mutations, and fast compiler optimizations.'
    },
    {
      category: 'TypeScript',
      question: 'Is TypeScript mandatory or can standard JSX be used?',
      answer: 'Both TSX and JSX are supported out of the box. TypeScript (.tsx) provides strict compile-time type safety, interface contracts, and autocompletion, but you can create standard JavaScript (.jsx/.js) components side-by-side without config changes.'
    },
    {
      category: 'Architecture',
      question: 'How do functional hooks enhance component performance?',
      answer: 'Pure functional components with hooks like useState, useEffect, and useMemo eliminate legacy class component boilerplate, allow deterministic lifecycle isolation, and make state logic fully reusable across custom hooks.'
    },
    {
      category: 'Development',
      question: 'How do I run and build this website locally?',
      answer: 'Run "npm run dev" to launch the local development server at http://localhost:5173. To generate a minified, production-optimized bundle, run "npm run build" which outputs the static bundle into the /dist directory in ~3 seconds.'
    },
    {
      category: 'Deployment',
      question: 'Can I deploy this to Vercel, Netlify, or AWS?',
      answer: 'Yes! The build produces static HTML, CSS, and JS assets. You can deploy seamlessly to Vercel, Netlify, Cloudflare Pages, AWS S3/CloudFront, or GitHub Pages with zero server setup.'
    }
  ];

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqs;
    const q = searchQuery.toLowerCase();
    return faqs.filter(f => 
      f.question.toLowerCase().includes(q) || 
      f.answer.toLowerCase().includes(q) ||
      f.category.toLowerCase().includes(q)
    );
  }, [faqs, searchQuery]);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="showcase-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <HelpCircle size={14} /> Questions & Answers
          </div>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-description">
            Search our knowledge base for answers regarding React 19, Vite, architecture, and deployment.
          </p>

          {/* Live Search Bar */}
          <div style={{ position: 'relative', maxWidth: 480, margin: '1.5rem auto 0' }}>
            <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics (e.g. hooks, vite, typescript, build)..."
              className="form-control"
              style={{ paddingLeft: '2.75rem', paddingRight: '2.5rem', borderRadius: 'var(--radius-full)' }}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', cursor: 'pointer' }}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="faq-container">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <button 
                  className="faq-question"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span className="stack-pill" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}>
                      {faq.category}
                    </span>
                    <span>{faq.question}</span>
                  </div>
                  <ChevronDown 
                    size={20} 
                    style={{ 
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform var(--transition-fast)',
                      flexShrink: 0,
                      marginLeft: 12
                    }} 
                  />
                </button>
                {isOpen && (
                  <div className="faq-answer">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
              No matching questions found for "{searchQuery}".
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
