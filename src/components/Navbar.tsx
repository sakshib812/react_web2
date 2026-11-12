import React, { useState } from 'react';
import { 
  Code2, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* Brand */}
        <a href="#" className="nav-brand">
          <div className="brand-icon">
            <Code2 size={22} />
          </div>
          <span>Nova<span className="gradient-text">React</span></span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="nav-links">
          <a href="#framework" className="nav-link">Framework</a>
          <a href="#features" className="nav-link">Features</a>
          <a href="#playground" className="nav-link">Playground</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="#faq" className="nav-link">FAQ</a>
        </nav>

        {/* Right Actions */}
        <div className="nav-actions">
          <button 
            onClick={toggleTheme} 
            className="theme-toggle-btn"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <a href="#contact" className="btn btn-primary btn-sm">
            <span>Get Started</span>
            <ArrowRight size={14} />
          </a>

          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="container mobile-drawer">
          <a href="#framework" onClick={() => setMobileMenuOpen(false)}>Framework</a>
          <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
          <a href="#playground" onClick={() => setMobileMenuOpen(false)}>Playground</a>
          <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
          <a href="#contact" className="btn btn-primary btn-sm" onClick={() => setMobileMenuOpen(false)}>
            <Sparkles size={14} /> Get Started
          </a>
        </div>
      )}
    </header>
  );
};
