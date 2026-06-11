import React from 'react';
import { useTranslation } from 'react-i18next';
import { Coins, Layers, Gift, SlidersHorizontal, Check, ArrowRightLeft } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const FlexibleModels: React.FC = () => {
  const { t } = useTranslation();
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

  const models = [
    { icon: Coins, title: t('flexibleModels.creditSystem.title'), description: t('flexibleModels.creditSystem.description') },
    { icon: Layers, title: t('flexibleModels.sessionPackages.title'), description: t('flexibleModels.sessionPackages.description') },
    { icon: Gift, title: t('flexibleModels.giftCards.title'), description: t('flexibleModels.giftCards.description') },
    { icon: SlidersHorizontal, title: t('flexibleModels.customRules.title'), description: t('flexibleModels.customRules.description') },
  ];

  return (
    <section ref={sectionRef} className="bg-sand py-20 lg:py-24">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-12">
          <SectionLabel className="mb-3 block">{t('flexibleModels.label')}</SectionLabel>
          <h2 className="font-display text-3xl sm:text-[38px] font-semibold text-brown tracking-[-0.01em] mb-4 leading-tight">
            {t('flexibleModels.title')}
          </h2>
          <p className="font-body text-[15px] text-brown/65 leading-relaxed max-w-xl mx-auto mb-8">
            {t('flexibleModels.subtitle')}
          </p>

          {/* Center "engine" badge */}
          <div
            className="inline-flex items-center gap-2.5 bg-white rounded-full px-5 py-2.5 shadow-sm border border-brown/[0.06]"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(10px)', transition: 'all 0.5s ease-out 0.1s' }}
          >
            <div className="w-7 h-7 rounded-full bg-tan/10 flex items-center justify-center">
              <ArrowRightLeft className="w-3.5 h-3.5 text-tan" />
            </div>
            <span className="font-body text-[13px] text-brown/70">{t('flexibleModels.engineLabel')}</span>
          </div>
        </div>

        {/* Cards Grid — unified warm palette */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {models.map((model, i) => (
            <div
              key={model.title}
              className="bg-white rounded-2xl p-6 ring-1 ring-brown/[0.05] shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${i * 100 + 200}ms`,
                transition: 'opacity 0.5s ease-out, transform 0.5s ease-out, box-shadow 0.3s ease-out',
              }}
            >
              <div className="w-10 h-10 rounded-xl bg-tan/10 flex items-center justify-center mb-4">
                <model.icon className="w-5 h-5 text-tan" />
              </div>
              <h3 className="font-body text-sm font-semibold text-brown mb-2">
                {model.title}
              </h3>
              <p className="font-body text-[13px] text-brown/55 leading-relaxed">
                {model.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust line */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-6 border-t border-brown/[0.06]">
          {[t('flexibleModels.trust1'), t('flexibleModels.trust2'), t('flexibleModels.trust3')].map((text) => (
            <div key={text} className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-tan" />
              <span className="font-body text-xs text-brown/60">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlexibleModels;
