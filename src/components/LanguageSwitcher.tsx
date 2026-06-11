import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const languages = [
  { code: 'en', label: 'English', flag: 'EN' },
  { code: 'de', label: 'Deutsch', flag: 'DE' },
  { code: 'fr', label: 'Français', flag: 'FR' },
  { code: 'it', label: 'Italiano', flag: 'IT' },
  { code: 'es', label: 'Español', flag: 'ES' },
];

const LanguageSwitcher: React.FC<{ light?: boolean }> = ({ light = false }) => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const current = languages.find((l) => l.code === i18n.language) || languages[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-body font-medium transition-all duration-200',
          light
            ? 'text-cream/70 hover:text-cream hover:bg-white/10'
            : 'text-brown/60 hover:text-brown hover:bg-brown/5'
        )}
        aria-label="Select language"
      >
        <Globe className="w-3.5 h-3.5" />
        <span className="uppercase tracking-wider">{current.flag}</span>
      </button>

      {open && (
        <div
          className={cn(
            'absolute right-0 top-full mt-2 rounded-xl shadow-lg border py-1.5 min-w-[150px] z-[80]',
            light
              ? 'bg-brown border-cream/10'
              : 'bg-white border-brown/10'
          )}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                i18n.changeLanguage(lang.code);
                setOpen(false);
              }}
              className={cn(
                'w-full text-left px-4 py-2 text-[13px] font-body transition-colors flex items-center gap-3',
                i18n.language === lang.code
                  ? light
                    ? 'text-tan bg-white/5'
                    : 'text-tan bg-tan/5'
                  : light
                    ? 'text-cream/70 hover:text-cream hover:bg-white/5'
                    : 'text-brown/70 hover:text-brown hover:bg-brown/[0.03]'
              )}
            >
              <span className="text-[11px] font-semibold uppercase tracking-wider w-6">
                {lang.flag}
              </span>
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
