import React from 'react';
import SectionLabel from '@/components/SectionLabel';
import TestimonialCard from '@/components/TestimonialCard';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const testimonials = [
  {
    quote:
      'Pilateq transformed how we manage bookings. Our members love the experience, and I finally have time to focus on teaching.',
    name: 'Elena Rossi',
    studio: 'Core Balance Studio, Milan',
  },
  {
    quote:
      'The credit system is genius. It\'s flexible for our students and gives us predictable revenue. Plus, it looks absolutely beautiful.',
    name: 'Sophie Brennan',
    studio: 'The Pilates Room, Dublin',
  },
  {
    quote:
      'We switched from a clunky system and never looked back. The admin dashboard alone saves me hours every week.',
    name: 'Marie Hoffmann',
    studio: 'Studio Form, Berlin',
  },
];

const Testimonials: React.FC = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="bg-cream py-24 sm:py-32"
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        <div className="text-center mb-14 sm:mb-16">
          <SectionLabel className="mb-4 block">Testimonials</SectionLabel>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[40px] font-semibold text-brown tracking-[-0.01em]">
            Loved by Studio Owners
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="transition-all duration-700 ease-out"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transitionDelay: `${i * 120}ms`,
              }}
            >
              <TestimonialCard
                quote={t.quote}
                name={t.name}
                studio={t.studio}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
