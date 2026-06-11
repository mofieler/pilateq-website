import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Mail, MapPin, Phone, Clock, Check, Loader2, AlertCircle } from 'lucide-react';
import Logo from '@/components/Logo';

const RESEND_API_URL = import.meta.env.VITE_API_URL || '/api/send';

const ContactPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', studio: '', message: '', website: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(RESEND_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          studio: formData.studio,
          message: formData.message,
          website: formData.website, // honeypot
          locale: i18n.language,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setSubmitted(true);
      } else {
        setError(data.error || t('contact.form.error'));
      }
    } catch {
      setError(t('contact.form.error'));
    } finally {
      setLoading(false);
    }
  };

  const contactDetails = [
    { icon: Mail, label: t('contact.email'), value: t('contact.emailValue'), href: 'mailto:info@pilateq.de' },
    { icon: Phone, label: t('contact.phone'), value: t('contact.phoneValue'), href: 'tel:+4915168456178' },
    { icon: MapPin, label: t('contact.location'), value: t('contact.locationValue') },
    { icon: Clock, label: t('contact.responseTime'), value: t('contact.responseValue') },
  ];

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-cream/90 backdrop-blur-xl border-b border-brown/10 sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-body text-sm text-brown/70 hover:text-brown transition-colors">
            <ArrowLeft className="w-4 h-4" />{t('contact.back')}
          </Link>
          <Link to="/" className="flex items-center gap-2 font-display text-[22px] font-semibold text-brown hover:text-tan transition-colors" aria-label={t('common.logoAlt')}>
            <Logo size={32} alt={t('common.logoAlt')} />
            <span>Pilateq</span>
          </Link>
        </div>
      </header>

      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute w-[500px] h-[500px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #C4956A 0%, transparent 70%)', top: '10%', right: '-10%', animation: 'float 22s ease-in-out infinite' }} />
        <div className="absolute w-[400px] h-[400px] rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, #4A3427 0%, transparent 70%)', bottom: '5%', left: '-15%', animation: 'float 28s ease-in-out infinite reverse' }} />
      </div>

      <main className="relative z-[1] max-w-[1200px] mx-auto px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          <div>
            <span className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-tan mb-4 block">{t('contact.label')}</span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-[48px] font-semibold text-brown tracking-[-0.01em] mb-5 leading-tight">{t('contact.title')}</h1>
            <p className="font-body text-base sm:text-lg text-brown/70 leading-relaxed mb-10 max-w-md">{t('contact.subtitle')}</p>

            <div className="space-y-6 mb-10">
              {contactDetails.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-tan/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-tan" />
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-brown mb-0.5">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="font-body text-sm text-brown/70 hover:text-tan transition-colors">{item.value}</a>
                    ) : (
                      <p className="font-body text-sm text-brown/70">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-6 border border-brown/5">
              <h3 className="font-body text-sm font-semibold text-brown mb-4">{t('contact.nextSteps.title')}</h3>
              <ol className="space-y-3">
                {(t('contact.nextSteps.steps', { returnObjects: true }) as string[]).map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-tan text-white text-[10px] font-body font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                    <span className="font-body text-sm text-brown/70">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div>
            {submitted ? (
              <div className="bg-white rounded-3xl p-10 text-center border border-brown/5">
                <div className="w-16 h-16 rounded-full bg-tan/10 flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-tan" />
                </div>
                <h2 className="font-display text-2xl font-semibold text-brown mb-3">{t('contact.success.title')}</h2>
                <p className="font-body text-base text-brown/70 max-w-sm mx-auto">{t('contact.success.message')}</p>
                <Link to="/" className="inline-block mt-6 font-body text-sm text-tan hover:underline">{t('contact.success.back')}</Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-brown/5">
                <div className="space-y-5">
                  {/* Honeypot: hidden from humans, traps bots */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    />
                  </div>

                  <div>
                    <label htmlFor="name" className="font-body text-sm font-medium text-brown mb-1.5 block">{t('contact.form.name')} *</label>
                    <input type="text" id="name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-sand border border-brown/10 font-body text-sm text-brown placeholder:text-brown/40 focus:outline-none focus:ring-2 focus:ring-tan/50 transition-all" placeholder={t('contact.form.namePlaceholder')} />
                  </div>
                  <div>
                    <label htmlFor="email" className="font-body text-sm font-medium text-brown mb-1.5 block">{t('contact.form.email')} *</label>
                    <input type="email" id="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-sand border border-brown/10 font-body text-sm text-brown placeholder:text-brown/40 focus:outline-none focus:ring-2 focus:ring-tan/50 transition-all" placeholder={t('contact.form.emailPlaceholder')} />
                  </div>
                  <div>
                    <label htmlFor="studio" className="font-body text-sm font-medium text-brown mb-1.5 block">{t('contact.form.studio')}</label>
                    <input type="text" id="studio" value={formData.studio} onChange={(e) => setFormData({ ...formData, studio: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-sand border border-brown/10 font-body text-sm text-brown placeholder:text-brown/40 focus:outline-none focus:ring-2 focus:ring-tan/50 transition-all" placeholder={t('contact.form.studioPlaceholder')} />
                  </div>
                  <div>
                    <label htmlFor="message" className="font-body text-sm font-medium text-brown mb-1.5 block">{t('contact.form.message')} <span className="text-brown/40 font-normal">{t('contact.form.messageOptional')}</span></label>
                    <textarea id="message" rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-sand border border-brown/10 font-body text-sm text-brown placeholder:text-brown/40 focus:outline-none focus:ring-2 focus:ring-tan/50 transition-all resize-none" placeholder={t('contact.form.messagePlaceholder')} />
                  </div>

                  {error && (
                    <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 text-red-700 font-body text-sm">
                      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <button type="submit" disabled={loading} className="w-full py-3.5 rounded-pill bg-tan text-white font-body font-semibold text-sm hover:bg-[#b08555] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 disabled:opacity-60 flex items-center justify-center gap-2">
                    {loading ? <><Loader2 className="w-4 h-4 animate-spin" />{t('contact.form.sending')}</> : t('contact.form.submit')}
                  </button>
                  <p className="font-body text-xs text-brown/40 text-center">{t('contact.form.disclaimer')}</p>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
