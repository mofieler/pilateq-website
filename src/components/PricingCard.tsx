import React from 'react';
import { Link } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import PillButton from './PillButton';

interface PricingCardProps {
  name: string;
  description: string;
  price: string;
  period?: string;
  features: string[];
  excludedFeatures?: string[];
  badge?: string;
  highlighted?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  name,
  description,
  price,
  period = '/month',
  features,
  excludedFeatures,
  badge,
  highlighted = false,
}) => {
  return (
    <div
      className={cn(
        'relative bg-sand rounded-2xl p-7 sm:p-8 flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5',
        highlighted && 'ring-2 ring-tan'
      )}
    >
      {badge && (
        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-tan text-white text-[9px] font-body font-semibold uppercase tracking-wider px-3 py-1 rounded-pill">
          {badge}
        </span>
      )}

      <span className="font-body text-[12px] font-semibold uppercase tracking-wider text-tan mb-1.5">
        {name}
      </span>
      <p className="font-body text-[13px] text-brown/55 mb-5">{description}</p>

      <div className="flex items-baseline gap-1 mb-6">
        <span className="font-display text-[42px] font-bold text-brown leading-none">
          {price}
        </span>
        <span className="font-body text-sm text-brown/45">{period}</span>
      </div>

      <ul className="space-y-2.5 mb-8 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2.5">
            <Check className="w-4 h-4 text-tan flex-shrink-0 mt-0.5" />
            <span className="font-body text-[14px] text-brown/75">
              {feature}
            </span>
          </li>
        ))}
        {excludedFeatures?.map((feature, index) => (
          <li key={`excl-${index}`} className="flex items-start gap-2.5">
            <X className="w-4 h-4 text-brown/15 flex-shrink-0 mt-0.5" />
            <span className="font-body text-[14px] text-brown/30 line-through">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Link to="/contact" className="block w-full">
        <PillButton
          variant={highlighted ? 'primary' : 'dark'}
          size="md"
          fullWidth
        >
          Start Free Trial
        </PillButton>
      </Link>
    </div>
  );
};

export default PricingCard;
