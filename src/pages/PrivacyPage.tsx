import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-cream/90 backdrop-blur-xl border-b border-brown/10 sticky top-0 z-50">
        <div className="max-w-[800px] mx-auto px-6 h-16 flex items-center">
          <Link to="/" className="flex items-center gap-2 font-body text-sm text-brown/70 hover:text-brown transition-colors">
            <ArrowLeft className="w-4 h-4" />{t('privacy.back')}
          </Link>
        </div>
      </header>
      <main className="max-w-[800px] mx-auto px-6 py-16">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-brown mb-2">{t('privacy.pageTitle')}</h1>
        <p className="font-body text-sm text-brown/50 mb-12">{t('privacy.pageSubtitle')}</p>

        <div className="space-y-10">
          <section>
            <h2 className="font-body text-sm font-semibold uppercase tracking-wider text-tan mb-3">1. {t('privacy.dataController')}</h2>
            <p className="font-body text-base text-brown/80 leading-relaxed">{t('privacy.dataControllerText')}</p>
          </section>
          <section>
            <h2 className="font-body text-sm font-semibold uppercase tracking-wider text-tan mb-3">2. {t('privacy.dataCollected')}</h2>
            <p className="font-body text-base text-brown/80 leading-relaxed">{t('privacy.dataCollectedText')}</p>
          </section>
          <section>
            <h2 className="font-body text-sm font-semibold uppercase tracking-wider text-tan mb-3">3. {t('privacy.purpose')}</h2>
            <p className="font-body text-base text-brown/80 leading-relaxed">{t('privacy.purposeText')}</p>
          </section>
          <section>
            <h2 className="font-body text-sm font-semibold uppercase tracking-wider text-tan mb-3">4. {t('privacy.legalBasis')}</h2>
            <p className="font-body text-base text-brown/80 leading-relaxed">{t('privacy.legalBasisText')}</p>
          </section>
          <section>
            <h2 className="font-body text-sm font-semibold uppercase tracking-wider text-tan mb-3">5. {t('privacy.storage')}</h2>
            <p className="font-body text-base text-brown/80 leading-relaxed">{t('privacy.storageText')}</p>
          </section>
          <section>
            <h2 className="font-body text-sm font-semibold uppercase tracking-wider text-tan mb-3">6. {t('privacy.rights')}</h2>
            <p className="font-body text-base text-brown/80 leading-relaxed">{t('privacy.rightsText')}</p>
          </section>
          <section>
            <h2 className="font-body text-sm font-semibold uppercase tracking-wider text-tan mb-3">7. {t('privacy.cookies')}</h2>
            <p className="font-body text-base text-brown/80 leading-relaxed">{t('privacy.cookiesText')}</p>
          </section>
          <section>
            <h2 className="font-body text-sm font-semibold uppercase tracking-wider text-tan mb-3">8. {t('privacy.changes')}</h2>
            <p className="font-body text-base text-brown/80 leading-relaxed">{t('privacy.changesText')}</p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPage;
