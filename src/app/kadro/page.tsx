'use client';

import { useState, type CSSProperties } from 'react';
import { useLang } from '@/lib/i18n';
import { KADRO_GROUPS, KADRO_UI, type KadroMember } from '@/lib/content/kadro';
import { useInstructorGroups } from '@/lib/cms';
import { CtaBand, ImageBox, SimpleFooter, SubpageHeader, SubpageHero } from '@/components/shared';

export default function KadroPage() {
  const { lang } = useLang();
  const ui = KADRO_UI[lang];
  const groups = useInstructorGroups(lang, KADRO_GROUPS[lang]);
  const [tab, setTab] = useState(0);
  const [selected, setSelected] = useState<KadroMember | null>(null);

  const group = groups[tab] || groups[0];
  const smallLabel: CSSProperties = { fontSize: 11, fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', color: '#1c7a5c' };

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", background: '#f7f4ec', color: '#131c2b', minHeight: '100svh' }}>
      <SubpageHeader backLabel={ui.back} applyLabel={ui.apply} />
      <SubpageHero eyebrow={ui.eyebrow} title={ui.title} sub={ui.sub} />

      <div style={{ background: '#fff', borderBottom: '1px solid rgba(19,28,43,.1)' }}>
        <div className="ihs-tabs" style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px', display: 'flex', gap: 4, justifyContent: 'center' }}>
          {groups.map((g, i) => (
            <button key={g.name} onClick={() => { setTab(i); setSelected(null); }} style={{ fontFamily: 'Inter', fontSize: 13.5, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', background: 'none', border: 'none', padding: '17px 20px', transition: 'color .2s ease', color: i === tab ? '#1c7a5c' : 'rgba(19,28,43,.55)', boxShadow: i === tab ? 'inset 0 -2px 0 #1c7a5c' : 'none' }}>
              {g.name}
            </button>
          ))}
        </div>
      </div>

      <section style={{ padding: '72px 24px 100px', background: '#f7f4ec' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <p style={{ fontSize: 14.5, lineHeight: 1.7, color: 'rgba(19,28,43,.6)', maxWidth: 680, margin: '0 auto 28px', textAlign: 'center', textWrap: 'pretty' } as CSSProperties}>{group?.desc}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 32 }}>
            {group?.members.map((m) => (
              <div key={m.name} style={{ background: '#fff', border: '1px solid rgba(19,28,43,.1)', display: 'flex', flexDirection: 'column', transition: 'box-shadow .25s ease' }}>
                <div style={{ width: '100%', aspectRatio: '4/3' }}>
                  <ImageBox src={m.photoUrl} placeholder={ui.photoPlaceholder} />
                </div>
                <div style={{ padding: '26px 24px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 20, color: '#131c2b', margin: 0 }}>{m.name}</h3>
                    <span style={{ fontSize: 13, color: '#1c7a5c', fontWeight: 600 }}>{m.role}</span>
                  </div>
                  <p style={{ fontSize: 13.5, lineHeight: 1.65, color: 'rgba(19,28,43,.62)', margin: 0, flex: 1 }}>{m.bio}</p>
                  <button onClick={() => setSelected(m)} style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: '#131c2b', background: 'none', border: 'none', borderBottom: '1px solid #1c7a5c', cursor: 'pointer', alignSelf: 'flex-start', padding: '0 0 2px' }}>{ui.viewProfile} →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selected && (
        <div onClick={() => setSelected(null)} style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(13,20,32,.72)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, animation: 'ihsFadeIn .3s ease' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: '#fff', maxWidth: 900, width: '100%', maxHeight: '88svh', overflowY: 'auto', display: 'flex', flexWrap: 'wrap', position: 'relative' }}>
            <button onClick={() => setSelected(null)} style={{ position: 'absolute', top: 14, right: 14, zIndex: 2, width: 36, height: 36, borderRadius: '50%', background: '#131c2b', color: '#fff', border: 'none', fontSize: 16, cursor: 'pointer' }}>✕</button>
            <div style={{ flex: '1 1 300px', minWidth: 280, background: '#131c2b', color: '#fff', padding: '36px 30px', display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ width: '100%', aspectRatio: '3/4', maxWidth: 260 }}>
                <ImageBox src={selected.photoUrl} placeholder={ui.photoPlaceholder} radius={4} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 24, margin: 0 }}>{selected.name}</h2>
                <span style={{ fontSize: 13.5, color: '#7fd1ae', fontWeight: 600 }}>{selected.role}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,.45)' }}>{ui.social}</span>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {selected.social.map((soc) => (
                    <a key={soc.label} href={soc.url} style={{ fontSize: 12, fontWeight: 600, textDecoration: 'none', color: '#fff', border: '1px solid rgba(255,255,255,.3)', borderRadius: 16, padding: '6px 13px' }}>{soc.label}</a>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ flex: '1.4 1 380px', minWidth: 300, padding: '40px 36px', display: 'flex', flexDirection: 'column', gap: 26 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span style={smallLabel}>{ui.biography}</span>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(19,28,43,.72)', margin: 0, textWrap: 'pretty' } as CSSProperties}>{selected.bioLong}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span style={smallLabel}>{ui.books}</span>
                {selected.books.map((b) => (
                  <div key={b.title} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                    <span style={{ width: 5, height: 5, background: '#1c7a5c', transform: 'rotate(45deg)', flexShrink: 0 }} />
                    <span style={{ fontSize: 13.5, lineHeight: 1.6, color: 'rgba(19,28,43,.75)' }}><em style={{ fontStyle: 'italic' }}>{b.title}</em> — {b.meta}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span style={smallLabel}>{ui.articles}</span>
                {selected.articles.map((art) => (
                  <div key={art.title} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                    <span style={{ width: 5, height: 5, background: 'rgba(19,28,43,.3)', transform: 'rotate(45deg)', flexShrink: 0 }} />
                    <span style={{ fontSize: 13.5, lineHeight: 1.6, color: 'rgba(19,28,43,.75)' }}>&quot;{art.title}&quot; — {art.meta}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span style={smallLabel}>{ui.videos}</span>
                {selected.videos.map((v) => (
                  <div key={v.title} style={{ display: 'flex', gap: 12, alignItems: 'center', border: '1px solid rgba(19,28,43,.1)', padding: '12px 14px' }}>
                    <span style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(28,122,92,.1)', color: '#1c7a5c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0 }}>▶</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <span style={{ fontSize: 13.5, fontWeight: 600, color: '#131c2b' }}>{v.title}</span>
                      <span style={{ fontSize: 12, color: 'rgba(19,28,43,.5)' }}>{v.meta}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <CtaBand title={ui.ctaTitle} ctaLabel={ui.applyLong} />
      <SimpleFooter />
    </div>
  );
}
