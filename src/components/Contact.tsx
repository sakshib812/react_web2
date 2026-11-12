import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare, User, Sparkles } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Framework Inquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    // Simulate API submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: 'Framework Inquiry', message: '' });
    }, 600);
  };

  return (
    <section id="contact">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <Mail size={14} /> Get In Touch
          </div>
          <h2 className="section-title">Ready to Launch Your Project?</h2>
          <p className="section-description">
            Send us a message or request a custom component architecture consultation.
          </p>
        </div>

        <div className="contact-card">
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.1)',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}>
                <CheckCircle2 size={36} />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Message Sent Successfully!</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Thank you for reaching out. We will respond within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn btn-secondary"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">
                  <User size={14} style={{ display: 'inline', marginRight: 4 }} />
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Rivera"
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  <Mail size={14} style={{ display: 'inline', marginRight: 4 }} />
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@example.com"
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="subject">
                  <Sparkles size={14} style={{ display: 'inline', marginRight: 4 }} />
                  Interest / Subject
                </label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="form-control"
                >
                  <option value="Framework Inquiry">React 19 + Vite Framework Consultation</option>
                  <option value="Custom Web App">Custom Web App Development</option>
                  <option value="Component Library">UI Component Library Design</option>
                  <option value="Other">Other / General Feedback</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">
                  <MessageSquare size={14} style={{ display: 'inline', marginRight: 4 }} />
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about what you want to build..."
                  className="form-control"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '0.75rem' }}
                disabled={loading}
              >
                {loading ? (
                  <span>Sending message...</span>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

