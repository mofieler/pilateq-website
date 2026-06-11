import React, { useState, useEffect, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Slide {
  image: string;
  label: string;
}

interface PhoneSliderProps {
  slides: Slide[];
  className?: string;
}

const PhoneSlider: React.FC<PhoneSliderProps> = ({ slides, className }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const startAutoRotate = useCallback(() => {
    if (prefersReducedMotion || slides.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
  }, [prefersReducedMotion, slides.length]);

  const stopAutoRotate = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoRotate();
    return () => stopAutoRotate();
  }, [startAutoRotate, stopAutoRotate]);

  const handleTabClick = (index: number) => {
    if (index === activeSlide || isTransitioning) return;
    setIsTransitioning(true);
    stopAutoRotate();
    setActiveSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
    startAutoRotate();
  };

  if (prefersReducedMotion) {
    return (
      <div className={cn('flex flex-col items-center', className)}>
        <div className="relative w-full max-w-[240px] rounded-[24px] overflow-hidden shadow-xl bg-sand/10 ring-1 ring-white/[0.08]">
          <img
            src={slides[0].image}
            alt={slides[0].label}
            className="w-full block"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col items-center', className)}>
      {/* Image container — compact, NOT a phone mockup */}
      <div
        className="relative w-full max-w-[220px] sm:max-w-[260px] rounded-[24px] overflow-hidden shadow-2xl ring-1 ring-white/[0.08]"
        role="tabpanel"
      >
        <div className="aspect-[9/16] relative">
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide.image}
              alt={slide.label}
              className={cn(
                'absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out',
                index === activeSlide
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-[1.04]'
              )}
            />
          ))}
        </div>
      </div>

      {/* Tab buttons — compact */}
      <div
        className="flex gap-2 mt-5"
        role="tablist"
        aria-label="App view selector"
      >
        {slides.map((slide, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={index === activeSlide}
            onClick={() => handleTabClick(index)}
            className={cn(
              'px-4 py-2 rounded-pill text-[12px] font-body font-medium transition-all duration-300',
              index === activeSlide
                ? 'bg-tan text-white shadow-md'
                : 'bg-white/10 text-white/45 hover:text-white/70 hover:bg-white/[0.12]'
            )}
          >
            {slide.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PhoneSlider;
