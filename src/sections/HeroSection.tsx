import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PillButton from '@/components/PillButton';
import HeroDashboard from '@/components/HeroDashboard';

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Code Dashboard Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center p-4 sm:p-8 lg:p-12">
        <div className="w-full max-w-[900px] lg:max-w-[1000px] opacity-[0.35] sm:opacity-[0.4] lg:opacity-50 scale-[0.85] sm:scale-90 lg:scale-100">
          <HeroDashboard />
        </div>
      </div>

      {/* Warm overlay for readability */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(135deg, rgba(74,52,39,0.55) 0%, rgba(74,52,39,0.65) 50%, rgba(74,52,39,0.75) 100%)',
        }}
      />

      {/* Floating accent shapes */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{
            background: 'radial-gradient(circle, #C4956A 0%, transparent 70%)',
            top: '-15%',
            right: '-10%',
            animation: 'float 22s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-[0.04]"
          style={{
            background: 'radial-gradient(circle, #FAF6F0 0%, transparent 70%)',
            bottom: '-10%',
            left: '-15%',
            animation: 'float 28s ease-in-out infinite reverse',
          }}
        />
      </div>

      {/* Content */}
      <div
        className="relative z-[2] text-center px-6 max-w-3xl mx-auto pt-16"
        style={{ marginTop: '-2vh' }}
      >
        <span
          className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-white/70 mb-6 block"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s ease-out',
          }}
        >
          {t('hero.label')}
        </span>

        <h1
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold text-white leading-[1.1] tracking-[-0.02em] mb-6"
          style={{
            textShadow: '0 2px 30px rgba(0,0,0,0.3)',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease-out 0.15s, transform 0.8s ease-out 0.15s',
          }}
        >
          Beautifully Simple
          <br />
          Booking for Your
          <br />
          Pilates Studio
        </h1>

        <p
          className="font-body text-base sm:text-lg text-white/80 max-w-xl mx-auto mb-10 leading-relaxed"
          style={{
            textShadow: '0 1px 15px rgba(0,0,0,0.35)',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s',
          }}
        >
          {t('hero.subtitle')}
        </p>

        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease-out 0.45s, transform 0.8s ease-out 0.45s',
          }}
        >
          <Link to="/contact">
            <PillButton variant="primary" size="lg">
              {t('hero.startTrial')}
            </PillButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
