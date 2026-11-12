import { useState, useEffect } from 'react';
import './App.css';
import { SecurityProvider } from './providers/SecurityProvider';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechStackBanner } from './components/TechStackBanner';
import { Features } from './components/Features';
import { Playground } from './components/Playground';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

function MainLayout() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Check saved theme or system preference
    const saved = localStorage.getItem('novareact-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('novareact-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="app-root">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <TechStackBanner />
        <Features />
        <Playground />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export function App() {
  return (
    <SecurityProvider>
      <MainLayout />
    </SecurityProvider>
  );
}

export default App;
