import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import PillButton from '@/components/PillButton';
import LanguageSwitcher from '@/components/LanguageSwitcher';

let lenisInstance: any = null;
export function setLenisInstance(instance: any) { lenisInstance = instance; }

interface AnchorLink { href: string; labelKey: string; }
interface RouteLink { to: string; label: string; delay: number; }
interface MobileAnchorLink { href: string; label: string; delay: number; }
type MobileLink = MobileAnchorLink | RouteLink;

const anchorLinks: AnchorLink[] = [
  { href: '/#features', labelKey: 'features' },
  { href: '/#platform', labelKey: 'forStudios' },
  { href: '/#pricing', labelKey: 'pricing' },
];

const Navigation: React.FC = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
      if (lenisInstance) lenisInstance.stop();
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
      if (lenisInstance) lenisInstance.start();
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((p) => !p);

  const linkClass = "font-body text-sm font-medium text-brown/80 hover:text-brown transition-colors relative group min-h-[44px] flex items-center";
  const underline = <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-tan transition-all duration-300 group-hover:w-full" />;
  const mobileLinkClass = "font-display text-3xl font-semibold text-brown hover:text-tan transition-all duration-300 min-h-[48px] flex items-center";

  const mobileLinks: MobileLink[] = [
    { href: '/#features', label: t('nav.features'), delay: 200 },
    { href: '/#platform', label: t('nav.forStudios'), delay: 275 },
    { href: '/#pricing', label: t('nav.pricing'), delay: 350 },
    { to: '/about', label: t('nav.about'), delay: 425 },
  ] as MobileLink[];

  return (
    <>
      <nav className={cn('fixed top-0 left-0 right-0 transition-all duration-500', scrolled ? 'bg-cream/90 backdrop-blur-xl shadow-sm z-50' : 'bg-cream z-50')}>
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="font-display text-[22px] font-semibold text-brown relative z-[70]">Pilateq</Link>

          <div className="hidden md:flex items-center gap-7">
            {anchorLinks.map((link) => (
              <a key={link.labelKey} href={link.href} className={linkClass}>
                {t(`nav.${link.labelKey}`)}{underline}
              </a>
            ))}
            <Link to="/about" className={linkClass}>{t('nav.about')}{underline}</Link>
            <LanguageSwitcher />
            <Link to="/contact"><PillButton variant="primary" size="sm">{t('nav.startTrial')}</PillButton></Link>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <LanguageSwitcher />
            <button className={cn('relative z-[70] w-12 h-12 flex items-center justify-center', menuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100')} onClick={toggleMenu} aria-label="Open menu">
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className="block w-6 h-0.5 bg-brown rounded-full" />
                <span className="block w-6 h-0.5 bg-brown rounded-full" />
                <span className="block w-6 h-0.5 bg-brown rounded-full" />
              </div>
            </button>
          </div>
        </div>
      </nav>

      <div className={cn('fixed inset-0 bg-cream md:hidden flex flex-col z-[60] transition-all duration-500', menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none')}>
        <div className="flex items-center justify-between px-5 sm:px-8 h-16 sm:h-20 shrink-0">
          <span className="font-display text-[22px] font-semibold text-brown">Pilateq</span>
          <button onClick={closeMenu} className="w-12 h-12 flex items-center justify-center text-brown/70 hover:text-brown" aria-label="Close menu">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <nav className="flex-1 flex flex-col items-center justify-center gap-6">
          {mobileLinks.map((link) => (
            <div
              key={link.label}
              className={cn(mobileLinkClass, menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}
              style={{ transitionDelay: menuOpen ? `${link.delay}ms` : '0ms' }}
            >
              {'to' in link ? (
                <Link to={link.to} onClick={closeMenu}>{link.label}</Link>
              ) : (
                <a href={link.href} onClick={closeMenu}>{link.label}</a>
              )}
            </div>
          ))}
          <div className={cn('transition-all duration-300 mt-4', menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')} style={{ transitionDelay: menuOpen ? '500ms' : '0ms' }}>
            <Link to="/contact" onClick={closeMenu}><PillButton variant="primary" size="lg">{t('nav.startTrial')}</PillButton></Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navigation;
