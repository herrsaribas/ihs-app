'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import { useLang } from '@/lib/i18n';
import { EGITIMLER } from '@/lib/content/programs';
import { SimpleFooter, SubpageHeader, SubpageHero } from '@/components/shared';

export default function EgitimlerPage() {
  const { lang } = useLang();
  const t = EGITIMLER[lang];
  const ui = t.ui;

  const sectionTitle: CSSProperties = {
    fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 22, margin: 0,
    display: 'flex', alignItems: 'center', gap: 14, color: '#131c2b',
  };

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", background: '#f7f4ec', color: '#131c2b', minHeight: '100svh' }}>
      <SubpageHeader backLabel={ui.back} applyLabel={ui.apply} />
      <SubpageHero eyebrow={ui.eyebrow} title={ui.title} sub={ui.sub} />

      <section style={{ padding: '88px 24px', background: '#f7f4ec' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 56 }}>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <h2 style={sectionTitle}>{ui.mainLabel}<span style={{ flex: 1, height: 1, background: 'rgba(19,28,43,.12)' }} /></h2>
            <div style={{ background: '#131c2b', color: '#fff', padding: 'clamp(30px,4vw,48px)', display: 'flex', gap: 40, flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ flex: '1 1 420px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#7fd1ae' }}>{t.main.kind} · {ui.enrollment}</span>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 'clamp(24px,2.8vw,34px)', margin: 0 }}>{t.main.name}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.7, color: 'rgba(255,255,255,.72)', margin: 0, textWrap: 'pretty' } as CSSProperties}>{t.main.desc}</p>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {t.main.chips.map((c) => (
                    <span key={c} style={{ fontSize: 12, fontWeight: 600, color: '#fff', border: '1px solid rgba(255,255,255,.3)', borderRadius: 16, padding: '6px 13px' }}>{c}</span>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Link href={t.main.link} style={{ fontSize: 14, fontWeight: 600, textDecoration: 'none', color: '#0d1420', background: '#ece6d8', borderRadius: 26, padding: '13px 30px', textAlign: 'center' }}>{ui.details}</Link>
                <Link href="/basvuru" style={{ fontSize: 14, fontWeight: 600, textDecoration: 'none', color: '#fff', border: '1px solid rgba(255,255,255,.4)', borderRadius: 26, padding: '13px 30px', textAlign: 'center' }}>{ui.apply}</Link>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <h2 style={sectionTitle}>{ui.specLabel}<span style={{ flex: 1, height: 1, background: 'rgba(19,28,43,.12)' }} /></h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 28 }}>
              {t.specs.map((s) => (
                <div key={s.name} style={{ background: '#fff', border: '1px solid rgba(19,28,43,.1)', borderTop: '3px solid #1c7a5c', padding: '32px 30px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <span style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: '#1c7a5c' }}>{s.kind}</span>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 20, margin: 0, color: '#131c2b' }}>{s.name}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.65, color: 'rgba(19,28,43,.62)', margin: 0, flex: 1 }}>{s.desc}</p>
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: 'rgba(19,28,43,.55)' }}>{s.meta}</span>
                  <Link href={s.link} style={{ fontSize: 13, fontWeight: 600, textDecoration: 'none', color: '#131c2b', borderBottom: '1px solid #1c7a5c', alignSelf: 'flex-start', paddingBottom: 2 }}>{ui.details} →</Link>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <h2 style={sectionTitle}>{ui.compareLabel}<span style={{ flex: 1, height: 1, background: 'rgba(19,28,43,.12)' }} /></h2>
            <div style={{ overflowX: 'auto', background: '#fff', border: '1px solid rgba(19,28,43,.1)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 720 }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', fontSize: 12, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'rgba(19,28,43,.5)', padding: '16px 20px', borderBottom: '1px solid rgba(19,28,43,.12)' }} />
                    {t.compareHead.map((h) => (
                      <th key={h} style={{ textAlign: 'left', fontFamily: "'Playfair Display',serif", fontSize: 15, fontWeight: 600, color: '#131c2b', padding: '16px 20px', borderBottom: '1px solid rgba(19,28,43,.12)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.compareRows.map((r) => (
                    <tr key={r.label}>
                      <td style={{ fontSize: 13, fontWeight: 600, color: '#1c7a5c', padding: '14px 20px', borderBottom: '1px solid rgba(19,28,43,.07)', whiteSpace: 'nowrap' }}>{r.label}</td>
                      {r.cells.map((cell, i) => (
                        <td key={i} style={{ fontSize: 13.5, lineHeight: 1.55, color: 'rgba(19,28,43,.72)', padding: '14px 20px', borderBottom: '1px solid rgba(19,28,43,.07)' }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

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
