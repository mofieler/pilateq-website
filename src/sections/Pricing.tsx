import React from 'react';
import { useTranslation } from 'react-i18next';
import SectionLabel from '@/components/SectionLabel';
import PricingCard from '@/components/PricingCard';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const Pricing: React.FC = () => {
  const { t } = useTranslation();
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section id="pricing" ref={sectionRef} className="bg-cream py-20 lg:py-24">
      <div className="max-w-[1000px] mx-auto px-5 sm:px-8">
        <div className="text-center mb-12">
          <SectionLabel className="mb-3 block">{t('pricing.label')}</SectionLabel>
          <h2 className="font-display text-3xl sm:text-[38px] font-semibold text-brown tracking-[-0.01em]">
            {t('pricing.title')}
          </h2>
          <p className="font-body text-[15px] text-brown/55 mt-3 max-w-md mx-auto">
            {t('pricing.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 mb-5">
          <div style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'scale(1)' : 'scale(0.96)', transition: 'opacity 0.6s ease-out, transform 0.6s ease-out' }}>
            <PricingCard
              name={t('pricing.starter.name')}
              description={t('pricing.starter.description')}
              price="49 €"
              features={t('pricing.starter.features', { returnObjects: true }) as string[]}
              excludedFeatures={t('pricing.starter.excluded', { returnObjects: true }) as string[]}
            />
          </div>
          <div style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'scale(1)' : 'scale(0.96)', transition: 'opacity 0.6s ease-out 150ms, transform 0.6s ease-out 150ms' }}>
            <PricingCard
              name={t('pricing.professional.name')}
              description={t('pricing.professional.description')}
              price="99 €"
              features={t('pricing.professional.features', { returnObjects: true }) as string[]}
              badge={t('pricing.professional.badge')}
              highlighted
            />
          </div>
        </div>

        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-brown/[0.08]" />
          <span className="font-body text-[11px] uppercase tracking-wider text-brown/35">{t('pricing.divider')}</span>
          <div className="flex-1 h-px bg-brown/[0.08]" />
        </div>

        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease-out 400ms, transform 0.6s ease-out 400ms',
          }}
        >
          <div className="bg-brown rounded-2xl p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-tan/[0.04] translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-tan/[0.03] -translate-x-1/4 translate-y-1/4" />
            <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="font-body text-[12px] font-semibold uppercase tracking-wider text-tan">{t('pricing.enterprise.name')}</span>
                  <span className="bg-tan text-white text-[9px] font-body font-semibold uppercase tracking-wider px-2.5 py-1 rounded-pill">{t('pricing.enterprise.badge')}</span>
                </div>
                <p className="font-body text-[13px] text-cream/55 mb-3">{t('pricing.enterprise.description')}</p>
                <p className="font-body text-[14px] text-cream/75 leading-relaxed max-w-xl">{t('pricing.enterprise.explanation')}</p>
              </div>
              <div className="flex flex-col items-start lg:items-end gap-2.5 flex-shrink-0">
                <span className="font-display text-3xl font-bold text-cream">{t('pricing.enterprise.priceLabel')}</span>
                <a href="mailto:info@pilateq.de" className="inline-flex items-center justify-center rounded-pill font-body font-semibold text-[13px] px-6 py-2.5 bg-tan text-white hover:bg-[#b08555] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0">
                  {t('pricing.enterprise.cta')}
                </a>
              </div>
            </div>
            <div className="relative mt-6 pt-5 border-t border-cream/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(t('pricing.enterprise.features', { returnObjects: true }) as string[]).map((feature) => (
                <div key={feature} className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-tan flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <span className="font-body text-[12px] text-cream/65 leading-snug">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
