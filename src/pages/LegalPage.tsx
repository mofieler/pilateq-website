import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';

const LegalPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-cream/90 backdrop-blur-xl border-b border-brown/10 sticky top-0 z-50">
        <div className="max-w-[800px] mx-auto px-6 h-16 flex items-center">
          <Link to="/" className="flex items-center gap-2 font-body text-sm text-brown/70 hover:text-brown transition-colors">
            <ArrowLeft className="w-4 h-4" />{t('legal.back')}
          </Link>
        </div>
      </header>
      <main className="max-w-[800px] mx-auto px-6 py-16">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-brown mb-2">{t('legal.pageTitle')}</h1>
        <p className="font-body text-sm text-brown/50 mb-12">{t('legal.pageSubtitle')}</p>
        <div className="space-y-10">
          <section>
            <h2 className="font-body text-sm font-semibold uppercase tracking-wider text-tan mb-3">{t('legal.sections.info.title')}</h2>
            <div className="font-body text-base text-brown/80 leading-relaxed space-y-1">
              <p className="font-semibold text-brown">{t('legal.sections.info.company')}</p>
              <p>{t('legal.sections.info.address')}</p>
            </div>
          </section>
          <section>
            <h2 className="font-body text-sm font-semibold uppercase tracking-wider text-tan mb-3">{t('legal.sections.contact.title')}</h2>
            <div className="font-body text-base text-brown/80 leading-relaxed space-y-1">
              <p>{t('legal.sections.contact.email')}: info@pilateq.de</p>
              <p>{t('legal.sections.contact.phone')}: +49 151 68456178</p>
            </div>
          </section>
          <section>
            <h2 className="font-body text-sm font-semibold uppercase tracking-wider text-tan mb-3">{t('legal.sections.vat.title')}</h2>
            <p className="font-body text-base text-brown/80">{t('legal.sections.vat.text')}</p>
          </section>
          <section>
            <h2 className="font-body text-sm font-semibold uppercase tracking-wider text-tan mb-3">{t('legal.sections.dispute.title')}</h2>
            <p className="font-body text-base text-brown/80">{t('legal.sections.dispute.text')} <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-tan hover:underline">https://ec.europa.eu/consumers/odr</a>.</p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LegalPage;
