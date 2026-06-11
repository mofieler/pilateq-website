import React from 'react';
import { cn } from '@/lib/utils';

interface PillButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline-light' | 'outline-dark' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  href?: string;
  fullWidth?: boolean;
}

const PillButton: React.FC<PillButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  href,
  fullWidth = false,
}) => {
  const baseClasses =
    'inline-flex items-center justify-center rounded-pill font-body font-semibold transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-tan focus:ring-offset-2';

  const sizeClasses = {
    sm: 'text-sm px-5 py-2',
    md: 'text-sm px-6 py-2.5',
    lg: 'text-base px-10 py-4',
  };

  const variantClasses = {
    primary: 'bg-tan text-white hover:bg-[#b08555]',
    secondary:
      'bg-white/15 text-white border border-white/30 hover:bg-white/25',
    'outline-light':
      'bg-transparent text-white border border-white/30 hover:bg-white/10',
    'outline-dark':
      'bg-transparent text-brown border border-brown/30 hover:bg-brown/5',
    dark: 'bg-brown text-white hover:bg-[#3a2a1f]',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const classes = cn(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    widthClass,
    className
  );

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export default PillButton;
