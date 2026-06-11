import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PillButton from '@/components/PillButton';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const FinalCTA: React.FC = () => {
  const { t } = useTranslation();
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="bg-sand py-20 lg:py-24">
      <div className="max-w-[640px] mx-auto px-5 sm:px-8 text-center">
        <h2
          className="font-display text-3xl sm:text-[42px] font-semibold text-brown tracking-[-0.01em] mb-4 leading-tight"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(25px)', transition: 'all 0.6s ease-out' }}
        >
          {t('finalCta.title')}
        </h2>
        <p
          className="font-body text-[15px] text-brown/65 mb-8 leading-relaxed"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(25px)', transition: 'all 0.6s ease-out 100ms' }}
        >
          {t('finalCta.subtitle')}
        </p>
        <div style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(25px)', transition: 'all 0.6s ease-out 200ms' }}>
          <Link to="/contact">
            <PillButton variant="primary" size="lg">
              {t('finalCta.button')}
            </PillButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
