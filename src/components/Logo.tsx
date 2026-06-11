import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: number;
  variant?: 'default' | 'light';
  lazy?: boolean;
  alt?: string;
}

const Logo: React.FC<LogoProps> = ({
  className,
  size = 32,
  variant = 'default',
  lazy = false,
  alt = 'Pilateq',
}) => {
  return (
    <img
      src="/assets/logo.png"
      alt={alt}
      width={size}
      height={size}
      loading={lazy ? 'lazy' : 'eager'}
      decoding="async"
      className={cn(
        'object-contain shrink-0 select-none',
        variant === 'default' && 'rounded-full',
        variant === 'light' && 'rounded-full bg-cream p-1',
        className
      )}
      style={{ width: size, height: size }}
    />
  );
};

export default Logo;
