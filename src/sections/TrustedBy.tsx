import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const studioNames = [
  'Core Balance',
  'Pilates Flow',
  'Studio Form',
  'The Pilates Room',
  'Body & Mind',
  'Align Studio',
];

const TrustedBy: React.FC = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="bg-sand py-12 sm:py-14">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 text-center">
        <span
          className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-brown/40 mb-8 block transition-all duration-600 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          Trusted by Boutique Studios
        </span>

        <div className="flex flex-wrap items-center justify-center gap-x-10 sm:gap-x-16 gap-y-5">
          {studioNames.map((name, i) => (
            <span
              key={name}
              className="font-display text-lg sm:text-xl text-tan/50 font-semibold tracking-tight transition-all duration-500 ease-out"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${i * 100 + 200}ms`,
              }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
