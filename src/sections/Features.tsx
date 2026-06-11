import React from 'react';
import { useTranslation } from 'react-i18next';
import SectionLabel from '@/components/SectionLabel';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SchedulingUI, CreditsUI, AnalyticsUI, PaymentsUI } from '@/components/FeatureUIs';

interface FeatureItem {
  title: string;
  description: string;
  ui: React.FC;
}

const Features: React.FC = () => {
  const { t } = useTranslation();

  const features: FeatureItem[] = [
    { title: t('features.scheduling.title'), description: t('features.scheduling.description'), ui: SchedulingUI },
    { title: t('features.payments.title'), description: t('features.payments.description'), ui: CreditsUI },
    { title: t('features.analytics.title'), description: t('features.analytics.description'), ui: AnalyticsUI },
    { title: t('features.financial.title'), description: t('features.financial.description'), ui: PaymentsUI },
  ];

  return (
    <section id="features" className="bg-cream py-20 lg:py-24">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <div className="text-center mb-14 lg:mb-16">
          <SectionLabel className="mb-3 block">{t('features.label')}</SectionLabel>
          <h2 className="font-display text-3xl sm:text-[38px] font-semibold text-brown tracking-[-0.01em]">
            {t('features.title')}
          </h2>
        </div>
        <div className="flex flex-col gap-16 lg:gap-20">
          {features.map((f, i) => (
            <FeatureRow key={i} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureRow: React.FC<{ feature: FeatureItem; index: number }> = ({ feature, index }) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const reversed = index % 2 !== 0;
  const UI = feature.ui;

  return (
    <div ref={ref} className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 lg:gap-14`}>
      <div className="flex-1 transition-all duration-700 ease-out" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : `translateX(${reversed ? '30px' : '-30px'})` }}>
        <h3 className="font-display text-xl sm:text-2xl font-semibold text-brown mb-3 leading-snug">{feature.title}</h3>
        <p className="font-body text-[15px] text-brown/65 leading-relaxed">{feature.description}</p>
      </div>
      <div className="flex-1 w-full max-w-[420px] lg:max-w-none transition-all duration-700 ease-out" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : `translateX(${reversed ? '-30px' : '30px'})`, transitionDelay: '120ms' }}>
        <UI />
      </div>
    </div>
  );
};

export default Features;
