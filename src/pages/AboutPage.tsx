import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft, MapPin, Globe, GraduationCap, Briefcase,
  Search, Code2, ClipboardList, PenTool, Sparkles,
  Target, Users, Lightbulb, Heart, Zap,
} from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Logo from '@/components/Logo';

const AboutPage: React.FC = () => {
  const { t } = useTranslation();
  const { ref: revealRef, isVisible } = useScrollReveal<HTMLElement>();

  const skills = [
    { icon: Search, title: t('about.skill1Title'), description: t('about.skill1Desc') },
    { icon: Code2, title: t('about.skill2Title'), description: t('about.skill2Desc') },
    { icon: ClipboardList, title: t('about.skill3Title'), description: t('about.skill3Desc') },
    { icon: PenTool, title: t('about.skill4Title'), description: t('about.skill4Desc') },
  ];

  const philosophy = [
    { icon: Target, title: t('about.phi1Title'), text: t('about.phi1Text') },
    { icon: Users, title: t('about.phi2Title'), text: t('about.phi2Text') },
    { icon: Lightbulb, title: t('about.phi3Title'), text: t('about.phi3Text') },
    { icon: Heart, title: t('about.phi4Title'), text: t('about.phi4Text') },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-cream/90 backdrop-blur-xl border-b border-brown/10 sticky top-0 z-50">
        <div className="max-w-[900px] mx-auto px-5 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-body text-sm text-brown/70 hover:text-brown transition-colors min-h-[44px]">
            <ArrowLeft className="w-4 h-4" />{t('about.back')}
          </Link>
          <Link to="/" className="flex items-center gap-2 font-display text-[22px] font-semibold text-brown hover:text-tan transition-colors" aria-label={t('common.logoAlt')}>
            <Logo size={32} alt={t('common.logoAlt')} />
            <span>Pilateq</span>
          </Link>
        </div>
      </header>

      {/* Portrait + Intro */}
      <section className="pt-12 pb-6 px-5">
        <div className="max-w-[700px] mx-auto text-center">
          <div
            className="w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] mx-auto mb-6 rounded-full overflow-hidden ring-2 ring-tan/20 shadow-lg"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'scale(1)' : 'scale(0.9)', transition: 'all 0.7s ease-out' }}
          >
            <img src="/assets/moritz.jpg" alt="Moritz Fieler" className="w-full h-full object-cover object-top" />
          </div>

          <span className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-tan mb-3 block" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease-out 0.2s' }}>
            {t('about.roleLabel')}
          </span>

          <h1 className="font-display text-4xl sm:text-5xl md:text-[56px] font-bold text-brown leading-[1.05] tracking-[-0.02em] mb-4" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease-out 0.25s' }}>
            {t('about.pageTitle')}
          </h1>

          <p className="font-body text-base sm:text-lg text-brown/60 leading-relaxed max-w-lg mx-auto mb-5" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(15px)', transition: 'all 0.6s ease-out 0.35s' }}>
            {t('about.pageSubtitle')}
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease-out 0.45s' }}>
            <span className="inline-flex items-center gap-1.5 font-body text-xs text-brown/50 bg-sand px-3 py-1.5 rounded-full"><MapPin className="w-3.5 h-3.5" /> Stuttgart</span>
            <span className="inline-flex items-center gap-1.5 font-body text-xs text-brown/50 bg-sand px-3 py-1.5 rounded-full"><Zap className="w-3.5 h-3.5" /> {t('about.age')}</span>
          </div>
        </div>
      </section>

      {/* Philosophy / Why I built this */}
      <section className="py-10 px-5 bg-sand">
        <div className="max-w-[700px] mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-lg bg-tan/10 flex items-center justify-center">
              <Sparkles className="w-4.5 h-4.5 text-tan" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-brown tracking-[-0.01em]">{t('about.philosophyTitle')}</h2>
          </div>

          <p className="font-body text-[15px] text-brown/65 leading-relaxed mb-8">
            {t('about.philosophyIntro')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {philosophy.map((item, i) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-5 border border-brown/[0.04] shadow-sm"
                style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.5s ease-out ${0.3 + i * 0.1}s` }}
              >
                <div className="w-8 h-8 rounded-lg bg-tan/10 flex items-center justify-center mb-3">
                  <item.icon className="w-4 h-4 text-tan" />
                </div>
                <h3 className="font-body text-[13px] font-semibold text-brown mb-1.5">{item.title}</h3>
                <p className="font-body text-xs text-brown/55 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section ref={revealRef} className="py-10 px-5">
        <div className="max-w-[700px] mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-brown mb-6 tracking-[-0.01em]">{t('about.journeyTitle')}</h2>

          <div className="space-y-6">
            {[
              { icon: Globe, title: t('about.journey1Title'), text: t('about.journey1Text') },
              { icon: GraduationCap, title: t('about.journey2Title'), text: t('about.journey2Text') },
              { icon: Briefcase, title: t('about.journey3Title'), text: t('about.journey3Text') },
            ].map((item, i) => (
              <div
                key={item.title}
                className="flex gap-4 items-start"
                style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.6s ease-out ${0.1 + i * 0.1}s` }}
              >
                <div className="w-10 h-10 rounded-xl bg-tan/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <item.icon className="w-5 h-5 text-tan" />
                </div>
                <div>
                  <h3 className="font-body text-sm font-semibold text-brown mb-1">{item.title}</h3>
                  <p className="font-body text-[13px] text-brown/60 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-10 px-5 bg-sand">
        <div className="max-w-[700px] mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-brown mb-6 tracking-[-0.01em]">{t('about.skillsTitle')}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skills.map((skill, i) => (
              <div
                key={skill.title}
                className="bg-white rounded-xl p-5 border border-brown/[0.04] shadow-sm"
                style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.5s ease-out ${0.4 + i * 0.1}s` }}
              >
                <div className="w-8 h-8 rounded-lg bg-tan/10 flex items-center justify-center mb-3">
                  <skill.icon className="w-4 h-4 text-tan" />
                </div>
                <h3 className="font-body text-[13px] font-semibold text-brown mb-1.5">{skill.title}</h3>
                <p className="font-body text-xs text-brown/55 leading-relaxed">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Languages */}
      <section className="py-10 px-5">
        <div className="max-w-[700px] mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-brown mb-5 tracking-[-0.01em]">{t('about.languagesTitle')}</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { code: 'DE', name: t('about.lang1') },
              { code: 'EN', name: t('about.lang2') },
              { code: 'ES', name: t('about.lang3') },
            ].map((lang) => (
              <span key={lang.code} className="inline-flex items-center gap-2 font-body text-sm text-brown/70 bg-sand px-4 py-2 rounded-full">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-tan">{lang.code}</span>{lang.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-5">
        <div className="max-w-[500px] mx-auto text-center">
          <p className="font-display text-xl sm:text-2xl text-brown mb-6 leading-snug">{t('about.ctaText')}</p>
          <Link to="/contact">
            <span className="inline-flex items-center justify-center rounded-pill bg-tan text-white font-body font-semibold text-sm px-8 py-3.5 hover:bg-[#b08555] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 min-h-[48px]">
              {t('about.ctaButton')}
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
