'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { useLang } from '@/lib/i18n';
import { PROGRAMS, PROGRAM_UI } from '@/lib/content/programs';
import { Pattern, SimpleFooter, SubpageHeader } from '@/components/shared';

export default function ProgramPage() {
  const { lang } = useLang();
  const ui = PROGRAM_UI[lang];
  const [pid, setPid] = useState('hadis-merkezli');

  useEffect(() => {
    const applyHash = () => {
      const h = (window.location.hash || '').replace('#', '');
      if (PROGRAMS.some((p) => p.id === h)) setPid(h);
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  const prog = PROGRAMS.find((p) => p.id === pid) || PROGRAMS[0];
  const p = prog[lang];

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", background: '#f7f4ec', color: '#131c2b', minHeight: '100svh' }}>
      <SubpageHeader
        backLabel={ui.back}
        applyLabel={ui.apply}
        extraLinks={<Link href="/egitimler" style={{ fontSize: 13.5, fontWeight: 500, textDecoration: 'none', color: 'rgba(255,255,255,.8)' }}>{ui.allPrograms}</Link>}
      />

      <section style={{ position: 'relative', background: 'linear-gradient(180deg,#0d1420,#131c2b)', color: '#fff', padding: '64px 24px 72px', overflow: 'hidden' }}>
        <Pattern />
        <div style={{ position: 'relative', maxWidth: 1080, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: '#7fd1ae' }}>{p.kind} · {ui.enrollment}</span>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 'clamp(32px,4.6vw,54px)', margin: 0, maxWidth: 760 }}>{p.name}</h1>
          <p style={{ fontSize: 15.5, lineHeight: 1.75, color: 'rgba(255,255,255,.72)', maxWidth: 640, margin: 0, textWrap: 'pretty' } as CSSProperties}>{p.intro}</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 6 }}>
            {p.chips.map((c) => (
              <span key={c} style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: '.03em', color: '#fff', border: '1px solid rgba(255,255,255,.3)', borderRadius: 18, padding: '7px 15px' }}>{c}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 10 }}>
            <Link href="/basvuru" style={{ fontSize: 14, fontWeight: 600, textDecoration: 'none', color: '#0d1420', background: '#ece6d8', borderRadius: 26, padding: '14px 30px' }}>{ui.applyLong}</Link>
            <a href="#mufredat" style={{ fontSize: 14, fontWeight: 600, textDecoration: 'none', color: '#fff', border: '1px solid rgba(255,255,255,.4)', borderRadius: 26, padding: '14px 30px' }}>{ui.seeCurriculum}</a>
          </div>
        </div>
      </section>

      <div style={{ background: '#fff', borderBottom: '1px solid rgba(19,28,43,.1)' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px', display: 'flex', gap: 4, overflowX: 'auto' }}>
          {PROGRAMS.map((pr) => (
            <button
              key={pr.id}
              onClick={() => { window.history.replaceState(null, '', '#' + pr.id); setPid(pr.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', background: 'none', border: 'none', padding: '16px 14px', transition: 'color .2s ease', color: pr.id === pid ? '#1c7a5c' : 'rgba(19,28,43,.55)', boxShadow: pr.id === pid ? 'inset 0 -2px 0 #1c7a5c' : 'none' }}
            >
              {pr[lang].tab}
            </button>
          ))}
        </div>
      </div>

      <section style={{ padding: '88px 24px', background: '#f7f4ec' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', gap: 56, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 420px', display: 'flex', flexDirection: 'column', gap: 18 }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#1c7a5c' }}>{ui.aboutLabel}</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 'clamp(26px,3vw,36px)', margin: 0 }}>{ui.aboutTitle}</h2>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(19,28,43,.7)', margin: 0, textWrap: 'pretty' } as CSSProperties}>{p.about}</p>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(19,28,43,.7)', margin: 0, textWrap: 'pretty' } as CSSProperties}>{p.about2}</p>
          </div>
          <div style={{ flex: '1 1 340px', maxWidth: 440, background: '#fff', border: '1px solid rgba(19,28,43,.1)', padding: '32px 30px', display: 'flex', flexDirection: 'column', gap: 18 }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#1c7a5c' }}>{ui.factsLabel}</span>
            {p.facts.map((f) => (
              <div key={f.k} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', borderBottom: '1px solid rgba(19,28,43,.07)', paddingBottom: 14 }}>
                <span style={{ width: 6, height: 6, background: '#1c7a5c', transform: 'rotate(45deg)', flexShrink: 0, marginTop: 7 }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#131c2b' }}>{f.k}</span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.6, color: 'rgba(19,28,43,.62)' }}>{f.v}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="mufredat" style={{ padding: '88px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 44 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#1c7a5c' }}>{ui.currLabel}</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 'clamp(26px,3vw,36px)', margin: 0 }}>{ui.currTitle}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 28 }}>
            {p.terms.map((term) => (
              <div key={term.name} style={{ border: '1px solid rgba(19,28,43,.1)', padding: '28px 26px', display: 'flex', flexDirection: 'column', gap: 14, background: '#f7f4ec' }}>
                <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 18, color: '#1c7a5c' }}>{term.name}</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {term.courses.map((crs) => (
                    <div key={crs} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                      <span style={{ width: 5, height: 5, background: 'rgba(19,28,43,.3)', transform: 'rotate(45deg)', flexShrink: 0 }} />
                      <span style={{ fontSize: 14, lineHeight: 1.55, color: 'rgba(19,28,43,.75)' }}>{crs}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '88px 24px', background: '#ece6d8' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#1c7a5c' }}>{ui.feeLabel}</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 'clamp(26px,3vw,36px)', margin: 0 }}>{ui.feeTitle}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 28 }}>
            {p.fees.map((fee) => (
              <div key={fee.region} style={{ background: '#fff', borderTop: '3px solid #1c7a5c', padding: '32px 30px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(19,28,43,.6)' }}>{fee.region}</span>
                <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 32, color: '#131c2b' }}>{fee.amount}</span>
                <span style={{ fontSize: 13.5, lineHeight: 1.6, color: 'rgba(19,28,43,.62)' }}>{fee.note}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13.5, lineHeight: 1.7, color: 'rgba(19,28,43,.6)', margin: 0, textAlign: 'center', maxWidth: 640, alignSelf: 'center', textWrap: 'pretty' } as CSSProperties}>{p.feeNote}</p>
        </div>
      </section>

      <section style={{ padding: '88px 24px', background: '#1c7a5c', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 'clamp(26px,3vw,36px)', margin: 0, textWrap: 'pretty' } as CSSProperties}>{ui.ctaTitle}</h2>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: 'rgba(255,255,255,.85)', margin: 0 }}>{ui.ctaSub}</p>
          <Link href="/basvuru" style={{ marginTop: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none', color: '#1c7a5c', background: '#fff', borderRadius: 26, padding: '14px 34px' }}>{ui.applyLong}</Link>
        </div>
      </section>

      <SimpleFooter />
    </div>
  );
}
