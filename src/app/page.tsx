'use client';

import { useEffect, useState, type CSSProperties, type FormEvent } from 'react';
import Link from 'next/link';
import { useLang } from '@/lib/i18n';
import { getSupabase } from '@/lib/supabase/client';
import { useActivities, useInstructorGroups, useQaItems } from '@/lib/cms';
import { DAILY, DAILY_UI, HOME_CONTENT, type DailyLang } from '@/lib/content/home';
import { KADRO_GROUPS } from '@/lib/content/kadro';
import { ImageBox, LOGO, Pattern } from '@/components/shared';

const HERO_IMG = '/uploads/AdobeStock_402292642_Editorial_Use_Only (1).jpeg';

export default function HomePage() {
  const { lang, toggleLang, otherLangLabel } = useLang();
  const t = HOME_CONTENT[lang];

  const [scrolled, setScrolled] = useState(false);
  const [showDaily, setShowDaily] = useState(true);
  const [dailyLang, setDailyLang] = useState<DailyLang>('tr');
  const [eduOpen, setEduOpen] = useState(false);
  const [instOpen, setInstOpen] = useState(false);
  const [kadroTab, setKadroTab] = useState(0);
  const [openQA, setOpenQA] = useState(0);

  const kadroGroups = useInstructorGroups(lang, KADRO_GROUPS[lang]);
  const qaItems = useQaItems(lang, t.qa.items.map((it) => ({ cat: '', q: it.q, a: it.a, src: '' })));
  const activityItems = useActivities(lang, t.activities.items.map((it) => ({ date: it.date, title: it.title, desc: it.desc })));

  // contact form
  const [cName, setCName] = useState(''); const [cEmail, setCEmail] = useState(''); const [cMsg, setCMsg] = useState('');
  const [cSent, setCSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const daily = DAILY[Math.floor(Date.now() / 86400000) % DAILY.length];
  const dailyUI = DAILY_UI[dailyLang];
  const showTrans = dailyLang !== 'ar';

  const headerText = scrolled ? '#131c2b' : '#ffffff';
  const pill = (active: boolean): CSSProperties => ({
    fontFamily: 'Inter', fontSize: 12.5, fontWeight: 600, letterSpacing: '.06em', cursor: 'pointer',
    borderRadius: 18, padding: '7px 16px', transition: 'all .25s ease',
    background: active ? '#1c7a5c' : 'none', color: active ? '#fff' : 'rgba(255,255,255,.7)',
    border: active ? '1px solid #1c7a5c' : '1px solid rgba(255,255,255,.3)',
  });
  const tabStyle = (active: boolean): CSSProperties => ({
    fontFamily: 'Inter', fontSize: 13.5, fontWeight: 600, cursor: 'pointer',
    borderRadius: 22, padding: '10px 24px', transition: 'all .25s ease',
    background: active ? '#131c2b' : 'none', color: active ? '#fff' : '#131c2b',
    border: '1px solid ' + (active ? '#131c2b' : 'rgba(19,28,43,.3)'),
  });
  const navLink: CSSProperties = { fontSize: 13.5, fontWeight: 500, textDecoration: 'none', color: headerText, opacity: 0.85 };
  const dropLink: CSSProperties = { fontSize: 13.5, fontWeight: 500, textDecoration: 'none', color: '#131c2b' };
  const dropLabel: CSSProperties = { fontSize: 10.5, fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(19,28,43,.45)' };

  async function submitContact(e: FormEvent) {
    e.preventDefault();
    const sb = getSupabase();
    if (sb && cName && cEmail && cMsg) {
      await sb.from('contact_messages').insert({ name: cName, email: cEmail, message: cMsg, lang });
    }
    setCSent(true);
  }

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", background: '#f7f4ec', color: '#131c2b', overflowX: 'hidden' }}>

      {/* ---------- Daily hadith/ayah overlay ---------- */}
      {showDaily && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'linear-gradient(180deg,#0d1420,#131c2b)', animation: 'ihsFadeIn .5s ease' }}>
          <Pattern opacity={0.14} />
          <div style={{ position: 'relative', maxWidth: 720, width: '100%', maxHeight: '90svh', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 26, padding: '48px 36px', border: '1px solid rgba(255,255,255,.14)', background: 'rgba(13,20,32,.55)', backdropFilter: 'blur(6px)', animation: 'ihsRise .7s ease' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO} alt="IHS" style={{ width: 340, height: 'auto', maxWidth: '80%', filter: 'brightness(0) invert(1)', opacity: 0.95 }} />
            <div style={{ display: 'flex', gap: 8 }}>
              {(['tr', 'de', 'en', 'ar'] as DailyLang[]).map((l) => (
                <button key={l} onClick={() => setDailyLang(l)} style={pill(l === dailyLang)}>{l.toUpperCase()}</button>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
              <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: '#7fd1ae' }}>{dailyUI.hadith}</span>
              <p dir="rtl" style={{ fontFamily: "'Amiri',serif", fontSize: 'clamp(24px,3.4vw,34px)', lineHeight: 1.9, color: '#fff', margin: 0 }}>{daily.hadithAr}</p>
              {showTrans && <p style={{ fontSize: 15.5, lineHeight: 1.75, color: 'rgba(255,255,255,.78)', margin: 0, textWrap: 'pretty' } as CSSProperties}>{daily.hadith[dailyLang as 'tr' | 'de' | 'en'] || ''}</p>}
              <span style={{ fontSize: 12.5, letterSpacing: '.04em', color: 'rgba(255,255,255,.45)' }}>{daily.hadithSrc}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', justifyContent: 'center' }}>
              <span style={{ width: 44, height: 1, background: 'rgba(255,255,255,.25)' }} />
              <span style={{ width: 6, height: 6, background: '#1c7a5c', transform: 'rotate(45deg)' }} />
              <span style={{ width: 44, height: 1, background: 'rgba(255,255,255,.25)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
              <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: '#7fd1ae' }}>{dailyUI.ayah}</span>
              <p dir="rtl" style={{ fontFamily: "'Amiri',serif", fontSize: 'clamp(22px,3vw,30px)', lineHeight: 1.9, color: '#fff', margin: 0 }}>{daily.ayahAr}</p>
              {showTrans && <p style={{ fontSize: 15.5, lineHeight: 1.75, color: 'rgba(255,255,255,.78)', margin: 0, textWrap: 'pretty' } as CSSProperties}>{daily.ayah[dailyLang as 'tr' | 'de' | 'en'] || ''}</p>}
              <span style={{ fontSize: 12.5, letterSpacing: '.04em', color: 'rgba(255,255,255,.45)' }}>{daily.ayahSrc}</span>
            </div>
            <button onClick={() => setShowDaily(false)} style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: '#0d1420', background: '#ece6d8', border: 'none', borderRadius: 26, padding: '14px 36px', cursor: 'pointer', marginTop: 6 }}>{dailyUI.continue}</button>
          </div>
        </div>
      )}

      {/* ---------- Fixed header ---------- */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: scrolled ? '10px clamp(20px,4vw,64px)' : '18px clamp(20px,4vw,64px)', transition: 'background .4s ease,box-shadow .4s ease,padding .4s ease', background: scrolled ? 'rgba(247,244,236,0.92)' : 'transparent', boxShadow: scrolled ? '0 1px 0 rgba(19,28,43,.08)' : 'none', backdropFilter: 'blur(8px)' }}>
        <a href="#hero" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO} alt="IHS — Institute for Hadith Sciences" style={{ height: 'clamp(84px,7vw,112px)', width: 'auto', margin: '-16px 0', filter: scrolled ? 'none' : 'brightness(0) invert(1)', transition: 'filter .4s ease' }} />
        </a>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px,1.6vw,22px)', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <div style={{ position: 'relative' }}>
            <button onClick={() => { setEduOpen(!eduOpen); setInstOpen(false); }} style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: headerText, opacity: 0.85, display: 'flex', alignItems: 'center', gap: 5 }}>
              {t.nav.edu} <span style={{ fontSize: 8 }}>▼</span>
            </button>
            {eduOpen && (
              <div style={{ position: 'absolute', top: 30, left: '50%', transform: 'translateX(-50%)', background: '#fff', border: '1px solid rgba(19,28,43,.1)', boxShadow: '0 16px 40px rgba(13,20,32,.18)', padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 11, minWidth: 300, zIndex: 200 }}>
                <span style={dropLabel}>{t.nav.eduMain}</span>
                <Link href="/program#hadis-merkezli" style={{ ...dropLink, fontWeight: 600 }}>{t.nav.eduP1}</Link>
                <span style={{ height: 1, background: 'rgba(19,28,43,.08)', margin: '5px 0' }} />
                <span style={dropLabel}>{t.nav.eduSpec}</span>
                <Link href="/program#hadis-ilimleri" style={dropLink}>{t.nav.eduP2}</Link>
                <Link href="/program#tefsir-ilimleri" style={dropLink}>{t.nav.eduP3}</Link>
                <Link href="/program#meal-calismalari" style={dropLink}>{t.nav.eduP4}</Link>
                <span style={{ height: 1, background: 'rgba(19,28,43,.08)', margin: '5px 0' }} />
                <Link href="/egitimler" style={{ fontSize: 13, fontWeight: 600, textDecoration: 'none', color: '#1c7a5c' }}>{t.nav.eduAll} →</Link>
              </div>
            )}
          </div>
          <div style={{ position: 'relative' }}>
            <button onClick={() => { setInstOpen(!instOpen); setEduOpen(false); }} style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: headerText, opacity: 0.85, display: 'flex', alignItems: 'center', gap: 5 }}>
              {t.nav.inst} <span style={{ fontSize: 8 }}>▼</span>
            </button>
            {instOpen && (
              <div style={{ position: 'absolute', top: 30, left: '50%', transform: 'translateX(-50%)', background: '#fff', border: '1px solid rgba(19,28,43,.1)', boxShadow: '0 16px 40px rgba(13,20,32,.18)', padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 11, minWidth: 220, zIndex: 200 }}>
                <Link href="/enstitu#hakkimizda" style={dropLink}>{t.nav.instAbout}</Link>
                <Link href="/kadro" style={dropLink}>{t.nav.kadro}</Link>
                <Link href="/enstitu#projeler" style={dropLink}>{t.nav.projeler}</Link>
                <Link href="/enstitu#faaliyetler" style={dropLink}>{t.nav.faaliyetler}</Link>
              </div>
            )}
          </div>
          <Link href="/sorularla-hadis" style={navLink}>{t.nav.hadis}</Link>
          <a href="#yayinlar" style={navLink}>{t.nav.yayinlar}</a>
          <a href="#contact" style={{ fontSize: 13, fontWeight: 500, textDecoration: 'none', color: headerText, opacity: 0.85 }}>{t.nav.contact}</a>
          <button onClick={toggleLang} style={{ fontFamily: 'Inter', fontSize: 12.5, fontWeight: 600, letterSpacing: '.04em', background: 'none', border: `1px solid ${headerText}`, color: headerText, opacity: 0.85, borderRadius: 20, padding: '6px 13px', cursor: 'pointer' }}>{otherLangLabel}</button>
          <Link href="/basvuru" style={{ fontSize: 13, fontWeight: 600, textDecoration: 'none', color: '#fff', background: '#1c7a5c', borderRadius: 24, padding: '9px 20px', whiteSpace: 'nowrap' }}>{t.buttons.apply}</Link>
        </nav>
      </header>

      {/* ---------- Hero (video background) ---------- */}
      <section id="hero" style={{ position: 'relative', minHeight: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', background: 'linear-gradient(180deg,#0d1420 0%,#131c2b 60%,#0d1420 100%)', overflow: 'hidden', padding: '140px 24px 100px' }}>
        <video autoPlay muted loop playsInline preload="metadata" poster={HERO_IMG} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.14 }}>
          <source src="/uploads/hero-bg.webm" type="video/webm" />
          <source src="/uploads/hero-bg.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(13,20,32,.55) 0%,rgba(19,28,43,.35) 50%,rgba(13,20,32,.75) 100%)' }} />
        <Pattern opacity={0.22} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 50% 25%,rgba(47,156,120,.28),transparent 70%)' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 820, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO} alt="IHS — Institute for Hadith Sciences" style={{ width: 'clamp(260px,32vw,400px)', height: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.95 }} />
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: '#7fd1ae' }}>{t.hero.eyebrow}</span>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 'clamp(42px,6.4vw,80px)', lineHeight: 1.08, color: '#fff', margin: 0 }}>{t.hero.title}</h1>
          <p style={{ fontSize: 'clamp(16px,1.6vw,19px)', lineHeight: 1.75, color: 'rgba(255,255,255,.7)', maxWidth: 600, margin: 0, textWrap: 'pretty' } as CSSProperties}>{t.hero.sub}</p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginTop: 12 }}>
            <a href="#program" style={{ fontSize: 14, fontWeight: 600, textDecoration: 'none', color: '#0d1420', background: '#ece6d8', borderRadius: 26, padding: '14px 30px' }}>{t.hero.cta1}</a>
            <a href="#contact" style={{ fontSize: 14, fontWeight: 600, textDecoration: 'none', color: '#fff', border: '1px solid rgba(255,255,255,.4)', borderRadius: 26, padding: '14px 30px' }}>{t.hero.cta2}</a>
          </div>
        </div>
      </section>

      {/* ---------- Mission ---------- */}
      <section style={{ padding: '88px 24px', background: '#f7f4ec' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 22 }}>
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#1c7a5c' }}>{t.mission.label}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 34, height: 1, background: '#131c2b', opacity: 0.25 }} />
            <span style={{ width: 6, height: 6, background: '#1c7a5c', transform: 'rotate(45deg)' }} />
            <span style={{ width: 34, height: 1, background: '#131c2b', opacity: 0.25 }} />
          </div>
          <p style={{ fontFamily: "'Playfair Display',serif", fontWeight: 500, fontSize: 'clamp(20px,2.4vw,28px)', lineHeight: 1.6, color: '#131c2b', margin: 0, textWrap: 'pretty' } as CSSProperties}>{t.mission.text}</p>
        </div>
      </section>

      {/* ---------- Main program ---------- */}
      <section id="program" style={{ padding: '100px 24px', background: '#131c2b', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 60% at 80% 20%,rgba(47,156,120,.16),transparent 70%)' }} />
        <div style={{ position: 'relative', maxWidth: 1080, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 44 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 640 }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#7fd1ae' }}>{t.program.label}</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 'clamp(28px,3.4vw,42px)', margin: 0 }}>{t.program.title}</h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.7, color: 'rgba(255,255,255,.7)', margin: 0, textWrap: 'pretty' } as CSSProperties}>{t.program.sub}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 1, background: 'rgba(255,255,255,.14)', border: '1px solid rgba(255,255,255,.14)' }}>
            {t.program.pillars.map((pl) => (
              <div key={pl.title} style={{ background: '#131c2b', padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <span style={{ fontFamily: "'Amiri',serif", fontSize: 30, color: '#7fd1ae', lineHeight: 1 }}>{pl.ar}</span>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 19, margin: 0 }}>{pl.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: 'rgba(255,255,255,.62)', margin: 0 }}>{pl.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/basvuru" style={{ fontSize: 14, fontWeight: 600, textDecoration: 'none', color: '#0d1420', background: '#ece6d8', borderRadius: 26, padding: '14px 30px' }}>{t.program.cta}</Link>
            <Link href="/program#hadis-merkezli" style={{ fontSize: 14, fontWeight: 600, textDecoration: 'none', color: '#fff', border: '1px solid rgba(255,255,255,.4)', borderRadius: 26, padding: '14px 30px' }}>{t.programs.more}</Link>
            <span style={{ fontSize: 13.5, color: 'rgba(255,255,255,.55)' }}>{t.program.meta}</span>
          </div>
        </div>
      </section>

      {/* ---------- Certificate programs ---------- */}
      <section id="programs" style={{ padding: '100px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 14, marginBottom: 56 }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#1c7a5c' }}>{t.programs.label}</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 'clamp(28px,3.4vw,42px)', color: '#131c2b', margin: 0 }}>{t.programs.title}</h2>
            <p style={{ fontSize: 15.5, color: 'rgba(19,28,43,.6)', maxWidth: 560, margin: 0, lineHeight: 1.6 }}>{t.programs.sub}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 1, background: 'rgba(19,28,43,.1)', border: '1px solid rgba(19,28,43,.1)' }}>
            {t.programs.items.map((p) => (
              <div key={p.code} style={{ background: '#fff', padding: '38px 30px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 34, color: 'rgba(28,122,92,.35)' }}>{p.code}</span>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 19, color: '#131c2b', margin: 0 }}>{p.name}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: 'rgba(19,28,43,.62)', margin: 0, flex: 1 }}>{p.desc}</p>
                <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.03em', color: '#1c7a5c' }}>{p.duration}</span>
                <Link href={p.link} style={{ fontSize: 13, fontWeight: 600, textDecoration: 'none', color: '#131c2b', borderBottom: '1px solid #1c7a5c', alignSelf: 'flex-start', paddingBottom: 2 }}>{t.programs.more} →</Link>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 36 }}>
            <Link href="/egitimler" style={{ fontSize: 14, fontWeight: 600, textDecoration: 'none', color: '#fff', background: '#131c2b', borderRadius: 26, padding: '13px 30px' }}>{t.programs.all} →</Link>
          </div>
        </div>
      </section>

      {/* ---------- Kadro ---------- */}
      <section id="kadro" style={{ padding: '100px 24px', background: '#f7f4ec' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 14, marginBottom: 40 }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#1c7a5c' }}>{t.kadro.label}</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 'clamp(28px,3.4vw,42px)', color: '#131c2b', margin: 0 }}>{t.kadro.title}</h2>
            <p style={{ fontSize: 15.5, color: 'rgba(19,28,43,.6)', maxWidth: 560, margin: 0, lineHeight: 1.6 }}>{t.kadro.sub}</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 48 }}>
            {kadroGroups.map((g, i) => (
              <button key={g.name} onClick={() => setKadroTab(i)} style={tabStyle(i === kadroTab)}>{g.name}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 32 }}>
            {(kadroGroups[kadroTab] || kadroGroups[0])?.members.map((m) => (
              <div key={m.name} style={{ background: '#fff', border: '1px solid rgba(19,28,43,.1)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '100%', aspectRatio: '4/3' }}>
                  <ImageBox src={m.photoUrl} placeholder="Hoca fotoğrafı" />
                </div>
                <div style={{ padding: '26px 24px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 19, color: '#131c2b', margin: 0 }}>{m.name}</h3>
                    <span style={{ fontSize: 13, color: '#1c7a5c', fontWeight: 600 }}>{m.role}</span>
                  </div>
                  <p style={{ fontSize: 13.5, lineHeight: 1.65, color: 'rgba(19,28,43,.62)', margin: 0, flex: 1 }}>{m.bio}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, borderTop: '1px solid rgba(19,28,43,.08)', paddingTop: 14 }}>
                    {[t.kadro.links.bio, t.kadro.links.books, t.kadro.links.articles, t.kadro.links.videos, t.kadro.links.social].map((label) => (
                      <Link key={label} href="/kadro" style={{ fontSize: 12, fontWeight: 600, textDecoration: 'none', color: '#1c7a5c', border: '1px solid rgba(28,122,92,.3)', borderRadius: 16, padding: '5px 12px' }}>{label}</Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Q&A ---------- */}
      <section id="hadis" style={{ padding: '100px 24px', background: '#131c2b', color: '#fff' }}>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 14, marginBottom: 48 }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#7fd1ae' }}>{t.qa.label}</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 'clamp(28px,3.4vw,42px)', margin: 0 }}>{t.qa.title}</h2>
            <p style={{ fontSize: 15.5, color: 'rgba(255,255,255,.6)', maxWidth: 560, margin: 0, lineHeight: 1.6 }}>{t.qa.sub}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {qaItems.slice(0, 4).map((q, i) => (
              <div key={q.q} style={{ borderTop: '1px solid rgba(255,255,255,.14)' }}>
                <button onClick={() => setOpenQA(openQA === i ? -1 : i)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, background: 'none', border: 'none', cursor: 'pointer', padding: '22px 6px', textAlign: 'left' }}>
                  <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 17.5, color: '#fff' }}>{q.q}</span>
                  <span style={{ fontSize: 20, color: '#7fd1ae', flexShrink: 0 }}>{openQA === i ? '−' : '+'}</span>
                </button>
                <div style={{ display: openQA === i ? 'block' : 'none', padding: '0 6px 24px' }}>
                  <p style={{ fontSize: 14.5, lineHeight: 1.75, color: 'rgba(255,255,255,.7)', margin: 0, maxWidth: 720 }}>{q.a}</p>
                </div>
              </div>
            ))}
            <div style={{ borderTop: '1px solid rgba(255,255,255,.14)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 36 }}>
            <Link href="/sorularla-hadis" style={{ fontSize: 14, fontWeight: 600, textDecoration: 'none', color: '#fff', border: '1px solid rgba(255,255,255,.4)', borderRadius: 26, padding: '13px 30px' }}>{t.qa.all} →</Link>
          </div>
        </div>
      </section>

      {/* ---------- Publications ---------- */}
      <section id="yayinlar" style={{ padding: '100px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 64 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 14 }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#1c7a5c' }}>{t.pubs.label}</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 'clamp(28px,3.4vw,42px)', color: '#131c2b', margin: 0 }}>{t.pubs.title}</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 22, color: '#131c2b', margin: 0, display: 'flex', alignItems: 'center', gap: 14 }}>
              {t.pubs.visualTitle}<span style={{ flex: 1, height: 1, background: 'rgba(19,28,43,.12)' }} />
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 32 }}>
              {t.pubs.visual.map((v) => (
                <div key={v.title} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ width: '100%', aspectRatio: '16/9' }}>
                    <ImageBox placeholder="Video kapağı" radius={4} />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: '#1c7a5c' }}>{v.type}</span>
                  <h4 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 17, color: '#131c2b', margin: 0 }}>{v.title}</h4>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 22, color: '#131c2b', margin: 0, display: 'flex', alignItems: 'center', gap: 14 }}>
              {t.pubs.writtenTitle}<span style={{ flex: 1, height: 1, background: 'rgba(19,28,43,.12)' }} />
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 32 }}>
              {t.pubs.written.map((w) => (
                <div key={w.title} style={{ display: 'flex', gap: 20, alignItems: 'flex-start', border: '1px solid rgba(19,28,43,.1)', padding: 24 }}>
                  <div style={{ width: 84, flex: '0 0 84px', aspectRatio: '3/4' }}>
                    <ImageBox placeholder="Kapak" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: '#1c7a5c' }}>{w.type}</span>
                    <h4 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 17, color: '#131c2b', margin: 0 }}>{w.title}</h4>
                    <p style={{ fontSize: 13.5, lineHeight: 1.6, color: 'rgba(19,28,43,.6)', margin: 0 }}>{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Projects ---------- */}
      <section id="projeler" style={{ padding: '100px 24px', background: '#ece6d8' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 14, marginBottom: 56 }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#1c7a5c' }}>{t.projects.label}</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 'clamp(28px,3.4vw,42px)', color: '#131c2b', margin: 0 }}>{t.projects.title}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 32 }}>
            {t.projects.items.map((pr) => (
              <div key={pr.n} style={{ background: '#fff', padding: '34px 30px', display: 'flex', flexDirection: 'column', gap: 14, borderTop: '3px solid #1c7a5c' }}>
                <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, color: 'rgba(28,122,92,.35)' }}>{pr.n}</span>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 19, color: '#131c2b', margin: 0 }}>{pr.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: 'rgba(19,28,43,.62)', margin: 0, flex: 1 }}>{pr.desc}</p>
                <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.03em', color: '#1c7a5c' }}>{pr.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Activities ---------- */}
      <section id="faaliyetler" style={{ padding: '100px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 14, marginBottom: 56 }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#1c7a5c' }}>{t.activities.label}</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 'clamp(28px,3.4vw,42px)', color: '#131c2b', margin: 0 }}>{t.activities.title}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 36 }}>
            {activityItems.slice(0, 3).map((n) => (
              <div key={n.title} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ width: '100%', aspectRatio: '16/10' }}>
                  <ImageBox src={n.imageUrl} placeholder="Etkinlik görseli" radius={4} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.04em', color: '#1c7a5c' }}>{n.date}</span>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 18, color: '#131c2b', margin: 0 }}>{n.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: 'rgba(19,28,43,.6)', margin: 0 }}>{n.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Donate ---------- */}
      <section style={{ padding: '90px 24px', background: '#1c7a5c', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,.75)' }}>{t.donate.label}</span>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 'clamp(26px,3vw,36px)', margin: 0, textWrap: 'pretty' } as CSSProperties}>{t.donate.title}</h2>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: 'rgba(255,255,255,.85)', margin: 0, textWrap: 'pretty' } as CSSProperties}>{t.donate.sub}</p>
          <Link href="/bagis" style={{ marginTop: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none', color: '#1c7a5c', background: '#fff', borderRadius: 26, padding: '14px 32px' }}>{t.donate.cta}</Link>
        </div>
      </section>

      {/* ---------- Contact ---------- */}
      <section id="contact" style={{ padding: '110px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', gap: 64, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 280px', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#1c7a5c' }}>{t.contact.label}</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 'clamp(26px,3vw,36px)', color: '#131c2b', margin: 0 }}>{t.contact.title}</h2>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: 'rgba(19,28,43,.62)', margin: 0 }}>{t.contact.sub}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14, fontSize: 14, color: 'rgba(19,28,43,.7)' }}>
              <div><strong style={{ color: '#131c2b' }}>{t.contact.info.address}:</strong> Bethlehem, PA / Frankfurt</div>
              <div><strong style={{ color: '#131c2b' }}>{t.contact.info.phone}:</strong> +1 (610) 000-0000</div>
              <div><strong style={{ color: '#131c2b' }}>{t.contact.info.email}:</strong> info@ihs.edu</div>
            </div>
          </div>
          {cSent ? (
            <div style={{ flex: '1 1 340px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, textAlign: 'center' }}>
              <span style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(28,122,92,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: '#1c7a5c' }}>✓</span>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(19,28,43,.7)', margin: 0, maxWidth: 380 }}>{t.contact.sent}</p>
            </div>
          ) : (
            <form style={{ flex: '1 1 340px', display: 'flex', flexDirection: 'column', gap: 14 }} onSubmit={submitContact}>
              <input type="text" required value={cName} onChange={(e) => setCName(e.target.value)} placeholder={t.contact.fields.name} style={{ fontFamily: 'Inter', fontSize: 14, padding: '14px 16px', border: '1px solid rgba(19,28,43,.2)', borderRadius: 4, background: '#f7f4ec', color: '#131c2b' }} />
              <input type="email" required value={cEmail} onChange={(e) => setCEmail(e.target.value)} placeholder={t.contact.fields.email} style={{ fontFamily: 'Inter', fontSize: 14, padding: '14px 16px', border: '1px solid rgba(19,28,43,.2)', borderRadius: 4, background: '#f7f4ec', color: '#131c2b' }} />
              <textarea required value={cMsg} onChange={(e) => setCMsg(e.target.value)} placeholder={t.contact.fields.message} rows={4} style={{ fontFamily: 'Inter', fontSize: 14, padding: '14px 16px', border: '1px solid rgba(19,28,43,.2)', borderRadius: 4, background: '#f7f4ec', color: '#131c2b', resize: 'vertical' }} />
              <button type="submit" style={{ alignSelf: 'flex-start', fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: '#fff', background: '#131c2b', border: 'none', borderRadius: 26, padding: '14px 30px', cursor: 'pointer' }}>{t.contact.fields.submit}</button>
            </form>
          )}
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer style={{ padding: '64px 24px 32px', background: '#0d1420', color: 'rgba(255,255,255,.7)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 280 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={LOGO} alt="IHS — Institute for Hadith Sciences" style={{ width: 200, height: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,.4)', marginTop: 8 }}>{t.footer.tagline}</span>
            </div>
            <div style={{ display: 'flex', gap: 56, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.4)' }}>{t.nav.program}</span>
                <a href="#program" style={{ fontSize: 13.5, textDecoration: 'none', color: 'rgba(255,255,255,.7)' }}>{t.nav.program}</a>
                <a href="#programs" style={{ fontSize: 13.5, textDecoration: 'none', color: 'rgba(255,255,255,.7)' }}>{t.footer.certs}</a>
                <a href="#kadro" style={{ fontSize: 13.5, textDecoration: 'none', color: 'rgba(255,255,255,.7)' }}>{t.nav.kadro}</a>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.4)' }}>{t.footer.explore}</span>
                <a href="#hadis" style={{ fontSize: 13.5, textDecoration: 'none', color: 'rgba(255,255,255,.7)' }}>{t.nav.hadis}</a>
                <a href="#yayinlar" style={{ fontSize: 13.5, textDecoration: 'none', color: 'rgba(255,255,255,.7)' }}>{t.nav.yayinlar}</a>
                <a href="#projeler" style={{ fontSize: 13.5, textDecoration: 'none', color: 'rgba(255,255,255,.7)' }}>{t.nav.projeler}</a>
                <a href="#faaliyetler" style={{ fontSize: 13.5, textDecoration: 'none', color: 'rgba(255,255,255,.7)' }}>{t.nav.faaliyetler}</a>
                <a href="#contact" style={{ fontSize: 13.5, textDecoration: 'none', color: 'rgba(255,255,255,.7)' }}>{t.nav.contact}</a>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,.1)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, fontSize: 12.5, color: 'rgba(255,255,255,.4)' }}>
            <span>© 2026 IHS — {t.footer.rights}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
