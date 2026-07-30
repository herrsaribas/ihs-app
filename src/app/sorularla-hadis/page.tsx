'use client';

import { useState, type CSSProperties, type FormEvent } from 'react';
import { useLang } from '@/lib/i18n';
import { getSupabase } from '@/lib/supabase/client';
import { QA_DEFAULT, SORU_UI } from '@/lib/content/soru';
import { useQaItems } from '@/lib/cms';
import { Pattern, SimpleFooter, SubpageHeader } from '@/components/shared';

export default function SorularlaHadisPage() {
  const { lang } = useLang();
  const ui = SORU_UI[lang];
  const all = useQaItems(lang, QA_DEFAULT[lang]);

  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('');
  const [open, setOpen] = useState(0);
  const [asked, setAsked] = useState(false);
  const [askForm, setAskForm] = useState({ name: '', email: '', question: '' });

  const cats = [...new Set(all.map((q) => q.cat))].filter(Boolean);
  const ql = query.trim().toLowerCase();
  const filtered = all.filter((q) =>
    (!cat || q.cat === cat) &&
    (!ql || q.q.toLowerCase().includes(ql) || q.a.toLowerCase().includes(ql)),
  );

  const chip = (active: boolean): CSSProperties => ({
    fontFamily: 'Inter', fontSize: 12.5, fontWeight: 600, cursor: 'pointer', transition: 'all .2s ease',
    borderRadius: 18, padding: '8px 17px',
    background: active ? '#131c2b' : '#fff', color: active ? '#fff' : 'rgba(19,28,43,.65)',
    border: '1px solid ' + (active ? '#131c2b' : 'rgba(19,28,43,.18)'),
  });

  const darkInput: CSSProperties = {
    fontFamily: 'Inter', fontSize: 14, padding: '14px 16px', border: '1px solid rgba(255,255,255,.25)',
    borderRadius: 4, background: 'rgba(255,255,255,.07)', color: '#fff',
  };

  async function submitAsk(e: FormEvent) {
    e.preventDefault();
    const sb = getSupabase();
    if (sb && askForm.question.trim()) {
      await sb.from('submitted_questions').insert({
        name: askForm.name || null, email: askForm.email || null, question: askForm.question, lang,
      });
    }
    setAsked(true);
  }

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", background: '#f7f4ec', color: '#131c2b', minHeight: '100svh' }}>
      <SubpageHeader backLabel={ui.back} applyLabel={ui.apply} />

      <section style={{ position: 'relative', background: 'linear-gradient(180deg,#0d1420,#131c2b)', color: '#fff', padding: '72px 24px 88px', textAlign: 'center', overflow: 'hidden' }}>
        <Pattern />
        <div style={{ position: 'relative', maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
          <span style={{ fontFamily: "'Amiri',serif", fontSize: 30, color: '#7fd1ae', lineHeight: 1 }}>؟</span>
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: '#7fd1ae' }}>{ui.eyebrow}</span>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 'clamp(32px,4.6vw,54px)', margin: 0 }}>{ui.title}</h1>
          <p style={{ fontSize: 15.5, lineHeight: 1.7, color: 'rgba(255,255,255,.7)', maxWidth: 560, margin: 0, textWrap: 'pretty' } as CSSProperties}>{ui.sub}</p>
          <div style={{ width: '100%', maxWidth: 540, marginTop: 14, position: 'relative' }}>
            <input
              type="text" value={query}
              onChange={(e) => { setQuery(e.target.value); setOpen(-1); }}
              placeholder={ui.searchPh}
              style={{ width: '100%', boxSizing: 'border-box', fontFamily: 'Inter', fontSize: 15, padding: '16px 22px', border: '1px solid rgba(255,255,255,.25)', borderRadius: 30, background: 'rgba(255,255,255,.08)', color: '#fff' }}
            />
            <span style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', fontSize: 15, color: 'rgba(255,255,255,.5)', pointerEvents: 'none' }}>⌕</span>
          </div>
        </div>
      </section>

      <section style={{ padding: '56px 24px 100px', background: '#f7f4ec' }}>
        <div style={{ maxWidth: 880, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 36 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button onClick={() => { setCat(''); setOpen(-1); }} style={chip(!cat)}>{ui.allCat}</button>
            {cats.map((c) => (
              <button key={c} onClick={() => { setCat(c); setOpen(-1); }} style={chip(cat === c)}>{c}</button>
            ))}
          </div>
          <span style={{ fontSize: 13, color: 'rgba(19,28,43,.5)', textAlign: 'center' }}>
            {filtered.length ? `${filtered.length} ${ui.results}` : ui.noResults}
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {filtered.map((q, i) => (
              <div key={q.q} style={{ background: '#fff', border: '1px solid rgba(19,28,43,.1)', borderLeft: open === i ? '3px solid #1c7a5c' : '3px solid transparent' }}>
                <button onClick={() => setOpen(open === i ? -1 : i)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 18, background: 'none', border: 'none', cursor: 'pointer', padding: '22px 24px', textAlign: 'left' }}>
                  <span style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: '#1c7a5c' }}>{q.cat}</span>
                    <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 17.5, color: '#131c2b', lineHeight: 1.4 }}>{q.q}</span>
                  </span>
                  <span style={{ fontSize: 20, color: '#1c7a5c', flexShrink: 0 }}>{open === i ? '−' : '+'}</span>
                </button>
                <div style={{ display: open === i ? 'block' : 'none', padding: '0 24px 24px' }}>
                  <p style={{ fontSize: 14.5, lineHeight: 1.8, color: 'rgba(19,28,43,.72)', margin: '0 0 12px', maxWidth: 720, textWrap: 'pretty' } as CSSProperties}>{q.a}</p>
                  {q.src && <span style={{ fontSize: 12.5, fontWeight: 600, color: 'rgba(19,28,43,.45)' }}>{ui.sourceLabel}: {q.src}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '88px 24px', background: '#131c2b', color: '#fff' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#7fd1ae' }}>{ui.askLabel}</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 'clamp(26px,3vw,36px)', margin: 0 }}>{ui.askTitle}</h2>
            <p style={{ fontSize: 14.5, lineHeight: 1.7, color: 'rgba(255,255,255,.65)', maxWidth: 520, margin: 0, textWrap: 'pretty' } as CSSProperties}>{ui.askSub}</p>
          </div>
          {!asked ? (
            <form onSubmit={submitAsk} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14 }}>
                <input type="text" placeholder={ui.askName} value={askForm.name} onChange={(e) => setAskForm((f) => ({ ...f, name: e.target.value }))} style={darkInput} />
                <input type="email" placeholder={ui.askEmail} value={askForm.email} onChange={(e) => setAskForm((f) => ({ ...f, email: e.target.value }))} style={darkInput} />
              </div>
              <textarea rows={4} required placeholder={ui.askQuestion} value={askForm.question} onChange={(e) => setAskForm((f) => ({ ...f, question: e.target.value }))} style={{ ...darkInput, resize: 'vertical' }} />
              <button type="submit" style={{ alignSelf: 'center', fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: '#0d1420', background: '#ece6d8', border: 'none', borderRadius: 26, padding: '14px 36px', cursor: 'pointer' }}>{ui.askSubmit}</button>
            </form>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center', padding: '20px 0' }}>
              <span style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(127,209,174,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: '#7fd1ae' }}>✓</span>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,.8)', margin: 0, maxWidth: 440 }}>{ui.askDone}</p>
            </div>
          )}
        </div>
      </section>

      <SimpleFooter />
    </div>
  );
}
