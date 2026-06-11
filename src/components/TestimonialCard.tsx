import React from 'react';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  quote: string;
  name: string;
  studio: string;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  name,
  studio,
  className,
}) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <div
      className={cn(
        'bg-sand rounded-3xl p-8 sm:p-10 flex flex-col transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl',
        className
      )}
    >
      <p className="font-display text-xl sm:text-[22px] font-medium italic text-brown leading-relaxed mb-8 flex-1">
        &ldquo;{quote}&rdquo;
      </p>

      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-brown/10 flex items-center justify-center flex-shrink-0">
          <span className="font-body text-sm font-semibold text-brown">
            {initials}
          </span>
        </div>
        <div>
          <p className="font-body text-sm font-semibold text-brown">{name}</p>
          <p className="font-body text-[13px] text-tan">{studio}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
