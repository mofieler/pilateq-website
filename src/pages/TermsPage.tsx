import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';

const TermsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-cream/90 backdrop-blur-xl border-b border-brown/10 sticky top-0 z-50">
        <div className="max-w-[800px] mx-auto px-6 h-16 flex items-center">
          <Link to="/" className="flex items-center gap-2 font-body text-sm text-brown/70 hover:text-brown transition-colors">
            <ArrowLeft className="w-4 h-4" />{t('terms.back')}
          </Link>
        </div>
      </header>
      <main className="max-w-[800px] mx-auto px-6 py-16">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-brown mb-2">{t('terms.pageTitle')}</h1>
        <p className="font-body text-sm text-brown/50 mb-12">{t('terms.pageSubtitle')}</p>

        <div className="space-y-10">
          {[
            { title: '1. Scope', text: 'These Terms of Service govern the use of the Pilateq software platform provided by Pilateq. By registering for or using the Service, you agree to these terms.' },
            { title: '2. Description of Service', text: 'Pilateq is a web-based booking and management platform for boutique Pilates studios. The Service includes class scheduling, member management, credit/session tracking, payment processing, and analytics.' },
            { title: '3. Registration & Account', text: 'To use Pilateq, you must create an account. You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account.' },
            { title: '4. Subscription & Payment', text: 'Pilateq is offered on a subscription basis. Subscriptions are billed monthly in advance. You may cancel with 30 days notice. No refunds for partial months.' },
            { title: '5. Data Protection', text: 'As a studio operator using Pilateq, you are the data controller for your students personal data. We act as a data processor. Both parties comply with the GDPR.' },
            { title: '6. Availability & Support', text: 'We strive to maintain 99.5% uptime. Email support is available for Starter plans; priority support for Professional and Enterprise plans.' },
            { title: '7. Limitation of Liability', text: 'We are liable for damages caused by intentional or grossly negligent conduct. For simple negligence, liability is limited to foreseeable, typical damages.' },
            { title: '8. Termination', text: 'Either party may terminate with 30 days written notice. Your data will be available for export for 30 days after termination, then permanently deleted.' },
            { title: '9. Governing Law', text: 'These terms are governed by the laws of the Federal Republic of Germany. The place of jurisdiction is Stuttgart, Germany.' },
          ].map((section) => (
            <section key={section.title}>
              <h2 className="font-body text-sm font-semibold uppercase tracking-wider text-tan mb-3">{section.title}</h2>
              <p className="font-body text-base text-brown/80 leading-relaxed">{section.text}</p>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TermsPage;
