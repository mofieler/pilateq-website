import React from 'react';
import { useTranslation } from 'react-i18next';
import SectionLabel from '@/components/SectionLabel';
import PillButton from '@/components/PillButton';
import PhoneSlider from '@/components/PhoneSlider';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const PlatformShowcase: React.FC = () => {
  const { t } = useTranslation();
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

  const slides = [
    { image: '/assets/slider-student.jpg', label: t('platform.studentView') },
    { image: '/assets/slider-admin.jpg', label: t('platform.adminView') },
  ];

  return (
    <section id="platform" ref={sectionRef} className="bg-brown py-20 lg:py-24">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
          <div className="flex-1 lg:max-w-[48%] text-center lg:text-left">
            <SectionLabel light className="mb-3 block">{t('platform.label')}</SectionLabel>
            <h2 className="font-display text-3xl sm:text-[38px] font-semibold text-cream tracking-[-0.01em] mb-4 leading-tight">
              {t('platform.title')}
            </h2>
            <p className="font-body text-[15px] text-cream/65 leading-relaxed mb-7 max-w-md mx-auto lg:mx-0">
              {t('platform.subtitle')}
            </p>
            <PillButton variant="primary" size="md">
              {t('platform.explore')}
            </PillButton>
          </div>
          <div
            className="flex-1 lg:max-w-[52%] flex justify-center"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.97)',
              transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
              transitionDelay: '200ms',
            }}
          >
            <PhoneSlider slides={slides} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformShowcase;
