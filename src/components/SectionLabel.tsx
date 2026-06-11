import React from 'react';
import { cn } from '@/lib/utils';

interface SectionLabelProps {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}

const SectionLabel: React.FC<SectionLabelProps> = ({
  children,
  light = false,
  className,
}) => {
  return (
    <span
      className={cn(
        'font-body text-xs font-semibold uppercase tracking-[0.15em]',
        light ? 'text-tan' : 'text-tan',
        className
      )}
    >
      {children}
    </span>
  );
};

export default SectionLabel;
