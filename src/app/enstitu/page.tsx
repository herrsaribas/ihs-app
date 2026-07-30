'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import { useLang } from '@/lib/i18n';
import { ENSTITU, ENSTITU_UI } from '@/lib/content/enstitu';
import { useActivities } from '@/lib/cms';
import { CtaBand, ImageBox, SimpleFooter, SubpageHeader, SubpageHero } from '@/components/shared';

const TAB_IDS = ['hakkimizda', 'projeler', 'faaliyetler'];

export default function EnstituPage() {
  const { lang } = useLang();
  const ui = ENSTITU_UI[lang];
  const t = ENSTITU[lang];
  const [tab, setTab] = useState('hakkimizda');

  const activities = useActivities(lang, t.activities.items.map((it) => ({ date: it.date, title: it.title, desc: it.desc })));

  useEffect(() => {
    const applyHash = () => {
      const h = (window.location.hash || '').replace('#', '');
      if (TAB_IDS.includes(h)) setTab(h);
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  const cur = t.tabs.find((x) => x.id === tab) || t.tabs[0];

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", background: '#f7f4ec', color: '#131c2b', minHeight: '100svh' }}>
      <SubpageHeader backLabel={ui.back} applyLabel={ui.apply} />
      <SubpageHero eyebrow={ui.eyebrow} title={cur.title} sub={cur.sub} />

      <div style={{ background: '#fff', borderBottom: '1px solid rgba(19,28,43,.1)' }}>
        <div className="ihs-tabs" style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px', display: 'flex', gap: 4, justifyContent: 'center' }}>
          {t.tabs.map((x) => (
            <button
              key={x.id}
              onClick={() => { window.history.replaceState(null, '', '#' + x.id); setTab(x.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{ fontFamily: 'Inter', fontSize: 13.5, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', background: 'none', border: 'none', padding: '17px 20px', transition: 'color .2s ease', color: x.id === tab ? '#1c7a5c' : 'rgba(19,28,43,.55)', boxShadow: x.id === tab ? 'inset 0 -2px 0 #1c7a5c' : 'none' }}
            >
              {x.label}
            </button>
          ))}
        </div>
      </div>

      {tab === 'hakkimizda' && (
        <section style={{ padding: '88px 24px', background: '#f7f4ec' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 72 }}>
            <div style={{ display: 'flex', gap: 56, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <div style={{ flex: '1 1 420px', display: 'flex', flexDirection: 'column', gap: 18 }}>
                <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#1c7a5c' }}>{t.about.whoLabel}</span>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 'clamp(26px,3vw,36px)', margin: 0 }}>{t.about.whoTitle}</h2>
                <p style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(19,28,43,.7)', margin: 0, textWrap: 'pretty' } as CSSProperties}>{t.about.who1}</p>
                <p style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(19,28,43,.7)', margin: 0, textWrap: 'pretty' } as CSSProperties}>{t.about.who2}</p>
              </div>
              <div style={{ flex: '0 1 380px', minWidth: 280, width: '100%', aspectRatio: '4/3', margin: '0 auto' }}>
                <ImageBox placeholder="Enstitü görseli" radius={6} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 1, background: 'rgba(19,28,43,.1)', border: '1px solid rgba(19,28,43,.1)' }}>
              {t.about.values.map((v) => (
                <div key={v.title} style={{ background: '#fff', padding: '34px 28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <span style={{ fontFamily: "'Amiri',serif", fontSize: 28, color: '#1c7a5c', lineHeight: 1 }}>{v.ar}</span>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 18, margin: 0, color: '#131c2b' }}>{v.title}</h3>
                  <p style={{ fontSize: 13.5, lineHeight: 1.65, color: 'rgba(19,28,43,.62)', margin: 0 }}>{v.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 56, flexWrap: 'wrap', alignItems: 'center', background: '#131c2b', color: '#fff', padding: 'clamp(30px,4vw,52px)' }}>
              <div style={{ flex: '0 0 220px', width: 220, height: 280, margin: '0 auto' }}>
                <ImageBox placeholder="Başkan fotoğrafı" radius={6} />
              </div>
              <div style={{ flex: '1 1 380px', display: 'flex', flexDirection: 'column', gap: 18 }}>
                <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#7fd1ae' }}>{t.about.presLabel}</span>
                <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(18px,2vw,23px)', lineHeight: 1.65, margin: 0, textWrap: 'pretty' } as CSSProperties}>{t.about.presQuote}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontWeight: 600, fontSize: 15 }}>{t.about.presName}</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,.55)' }}>{t.about.presRole}</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 14, borderTop: '3px solid #1c7a5c', background: '#fff', padding: '32px 30px' }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 20, margin: 0, color: '#131c2b' }}>{t.about.missionTitle}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(19,28,43,.65)', margin: 0, textWrap: 'pretty' } as CSSProperties}>{t.about.missionText}</p>
              </div>
              <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 14, borderTop: '3px solid #1c7a5c', background: '#fff', padding: '32px 30px' }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 20, margin: 0, color: '#131c2b' }}>{t.about.visionTitle}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(19,28,43,.65)', margin: 0, textWrap: 'pretty' } as CSSProperties}>{t.about.visionText}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {tab === 'projeler' && (
        <section style={{ padding: '88px 24px', background: '#f7f4ec' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 32 }}>
            {t.projects.items.map((pr) => (
              <div key={pr.n} style={{ background: '#fff', border: '1px solid rgba(19,28,43,.1)', borderTop: '3px solid #1c7a5c', padding: '36px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, color: 'rgba(28,122,92,.35)' }}>{pr.n}</span>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 21, color: '#131c2b', margin: 0 }}>{pr.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(19,28,43,.62)', margin: 0, flex: 1 }}>{pr.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(19,28,43,.08)', paddingTop: 14 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.03em', color: '#1c7a5c' }}>{pr.status}</span>
                  <span style={{ fontSize: 12.5, color: 'rgba(19,28,43,.45)' }}>{pr.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {tab === 'faaliyetler' && (
        <section style={{ padding: '88px 24px', background: '#f7f4ec' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 36 }}>
            {activities.map((n) => (
              <div key={n.title} style={{ display: 'flex', flexDirection: 'column', gap: 14, background: '#fff', border: '1px solid rgba(19,28,43,.1)', paddingBottom: 24 }}>
                <div style={{ width: '100%', aspectRatio: '16/10' }}>
                  <ImageBox src={n.imageUrl} placeholder="Etkinlik görseli" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '8px 22px 0' }}>
                  <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.04em', color: '#1c7a5c' }}>{n.date}</span>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 18, color: '#131c2b', margin: 0 }}>{n.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: 'rgba(19,28,43,.6)', margin: 0 }}>{n.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <CtaBand title={ui.ctaTitle} ctaLabel={ui.applyLong} />
      <SimpleFooter />
    </div>
  );
}
