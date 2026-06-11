import React, { useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation, { setLenisInstance } from '@/sections/Navigation';
import HeroSection from '@/sections/HeroSection';
import Features from '@/sections/Features';
import FlexibleModels from '@/sections/FlexibleModels';
import PlatformShowcase from '@/sections/PlatformShowcase';
import Pricing from '@/sections/Pricing';
import FinalCTA from '@/sections/FinalCTA';
import Footer from '@/sections/Footer';
import LegalPage from '@/pages/LegalPage';
import PrivacyPage from '@/pages/PrivacyPage';
import TermsPage from '@/pages/TermsPage';
import ContactPage from '@/pages/ContactPage';
import AboutPage from '@/pages/AboutPage';

gsap.registerPlugin(ScrollTrigger);

const LandingPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <Features />
        <FlexibleModels />
        <PlatformShowcase />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
};

const App: React.FC = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/legal" element={<LegalPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
};

export default App;
