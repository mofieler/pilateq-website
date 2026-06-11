import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from '@/components/Logo';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-brown pt-14 pb-8">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold text-cream mb-2 hover:text-tan transition-colors" aria-label={t('common.logoAlt')}>
              <Logo size={28} variant="light" lazy alt={t('common.logoAlt')} />
              <span>Pilateq</span>
            </Link>
            <p className="font-body text-[13px] text-cream/45 leading-relaxed">{t('footer.tagline')}</p>
          </div>
          <div>
            <h4 className="font-body text-[13px] font-semibold text-cream mb-3">{t('footer.product')}</h4>
            <ul className="space-y-2">
              <li><a href="/#features" className="font-body text-[13px] text-cream/55 hover:text-cream transition-colors">{t('nav.features')}</a></li>
              <li><a href="/#pricing" className="font-body text-[13px] text-cream/55 hover:text-cream transition-colors">{t('nav.pricing')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-body text-[13px] font-semibold text-cream mb-3">{t('footer.resources')}</h4>
            <ul className="space-y-2">
              <li><a href="mailto:info@pilateq.de" className="font-body text-[13px] text-cream/55 hover:text-cream transition-colors">{t('footer.contact')}</a></li>
              <li><Link to="/legal" className="font-body text-[13px] text-cream/55 hover:text-cream transition-colors">{t('footer.legalNotice')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-body text-[13px] font-semibold text-cream mb-3">{t('footer.company')}</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="font-body text-[13px] text-cream/55 hover:text-cream transition-colors">{t('footer.about')}</Link></li>
              <li><Link to="/legal" className="font-body text-[13px] text-cream/55 hover:text-cream transition-colors">{t('footer.legal')}</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-cream/[0.08] pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-[11px] text-cream/35">{t('footer.copyright')}</p>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="font-body text-[11px] text-cream/35 hover:text-cream/60 transition-colors">{t('footer.privacy')}</Link>
            <Link to="/terms" className="font-body text-[11px] text-cream/35 hover:text-cream/60 transition-colors">{t('footer.terms')}</Link>
            <Link to="/privacy" className="font-body text-[11px] text-cream/35 hover:text-cream/60 transition-colors">{t('footer.cookies')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
