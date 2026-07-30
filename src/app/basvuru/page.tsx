'use client';

import { useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { useLang } from '@/lib/i18n';
import { getSupabase } from '@/lib/supabase/client';
import { BASVURU } from '@/lib/content/basvuru';
import { APPLICATION_PROGRAMS } from '@/lib/content/programs';
import { Pattern, SimpleFooter, SubpageHeader } from '@/components/shared';

const inputStyle: CSSProperties = {
  fontFamily: 'Inter', fontSize: 14, fontWeight: 400, padding: '13px 15px',
  border: '1px solid rgba(19,28,43,.2)', borderRadius: 4, background: '#f7f4ec', color: '#131c2b',
};
const labelStyle: CSSProperties = {
  display: 'flex', flexDirection: 'column', gap: 7, fontSize: 13, fontWeight: 600, color: 'rgba(19,28,43,.75)',
};

export default function BasvuruPage() {
  const { lang } = useLang();
  const t = BASVURU[lang];
  const programs = APPLICATION_PROGRAMS[lang];

  const [step, setStep] = useState(0);
  const [program, setProgram] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', education: '', motivation: '' });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function nextStep() {
    setError('');
    if (step < 2) { setStep(step + 1); return; }
    if (!form.name.trim() || !form.email.trim()) { setError(t.required); return; }
    setSubmitting(true);
    const sb = getSupabase();
    if (sb) {
      const { error: err } = await sb.from('applications').insert({
        program: programs[program].name,
        name: form.name, email: form.email, phone: form.phone || null,
        city: form.city || null, education: form.education || null,
        motivation: form.motivation || null, lang,
      });
      if (err) { setError(t.error); setSubmitting(false); return; }
    }
    setSubmitting(false);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", background: '#f7f4ec', color: '#131c2b', minHeight: '100svh' }}>
      <SubpageHeader backLabel={t.back} />

      <section style={{ position: 'relative', background: 'linear-gradient(180deg,#0d1420,#131c2b)', color: '#fff', padding: '72px 24px 150px', textAlign: 'center', overflow: 'hidden' }}>
        <Pattern />
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: '#7fd1ae' }}>{t.eyebrow}</span>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 'clamp(32px,4.6vw,54px)', margin: 0 }}>{t.title}</h1>
          <p style={{ fontSize: 15.5, lineHeight: 1.7, color: 'rgba(255,255,255,.7)', maxWidth: 560, margin: 0, textWrap: 'pretty' } as CSSProperties}>{t.sub}</p>
        </div>
      </section>

      <div style={{ maxWidth: 1120, margin: '-90px auto 0', padding: '0 24px 100px', display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap', position: 'relative' }}>

        <div style={{ flex: '1 1 560px', background: '#fff', border: '1px solid rgba(19,28,43,.1)', boxShadow: '0 20px 60px rgba(13,20,32,.12)' }}>
          {!submitted ? (
            <>
              <div style={{ display: 'flex', borderBottom: '1px solid rgba(19,28,43,.1)' }}>
                {t.stepLabels.map((label, i) => (
                  <div key={label} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, padding: '18px 16px', color: i === step ? '#131c2b' : 'rgba(19,28,43,.45)', borderBottom: i === step ? '2px solid #1c7a5c' : '2px solid transparent', background: i < step ? 'rgba(28,122,92,.05)' : 'none' }}>
                    <span style={{ width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11.5, fontWeight: 700, flexShrink: 0, background: i <= step ? '#1c7a5c' : 'rgba(19,28,43,.12)', color: i <= step ? '#fff' : 'rgba(19,28,43,.5)' }}>{i + 1}</span>
                    <span className="ihs-step-label" style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: '.02em' }}>{label}</span>
                  </div>
                ))}
              </div>

              <div style={{ padding: 'clamp(28px,4vw,48px)', display: 'flex', flexDirection: 'column', gap: 26 }}>
                {step === 0 && (
                  <>
                    <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 24, margin: 0 }}>{t.step1.title}</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {programs.map((po, i) => (
                        <button key={po.name} onClick={() => setProgram(i)} style={{ fontFamily: 'Inter', display: 'flex', alignItems: 'center', gap: 16, padding: '18px 20px', cursor: 'pointer', background: i === program ? 'rgba(28,122,92,.06)' : '#fff', textAlign: 'left', width: '100%', border: i === program ? '1px solid #1c7a5c' : '1px solid rgba(19,28,43,.15)', borderRadius: 4, transition: 'all .2s ease' }}>
                          <span style={{ width: 18, height: 18, borderRadius: '50%', flexShrink: 0, transition: 'all .2s ease', border: i === program ? '6px solid #1c7a5c' : '2px solid rgba(19,28,43,.3)', background: '#fff', boxSizing: 'border-box' }} />
                          <span style={{ display: 'flex', flexDirection: 'column', gap: 4, textAlign: 'left' }}>
                            <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 16.5, color: '#131c2b' }}>{po.name}</span>
                            <span style={{ fontSize: 13, color: 'rgba(19,28,43,.55)' }}>{po.meta}</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {step === 1 && (
                  <>
                    <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 24, margin: 0 }}>{t.step2.title}</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16 }}>
                      <label style={labelStyle}>{t.step2.name}
                        <input type="text" value={form.name} onChange={set('name')} style={inputStyle} />
                      </label>
                      <label style={labelStyle}>{t.step2.email}
                        <input type="email" value={form.email} onChange={set('email')} style={inputStyle} />
                      </label>
                      <label style={labelStyle}>{t.step2.phone}
                        <input type="tel" value={form.phone} onChange={set('phone')} style={inputStyle} />
                      </label>
                      <label style={labelStyle}>{t.step2.city}
                        <input type="text" value={form.city} onChange={set('city')} style={inputStyle} />
                      </label>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 24, margin: 0 }}>{t.step3.title}</h2>
                    <label style={labelStyle}>{t.step3.education}
                      <input type="text" value={form.education} onChange={set('education')} placeholder={t.step3.educationPh} style={inputStyle} />
                    </label>
                    <label style={labelStyle}>{t.step3.motivation}
                      <textarea rows={6} value={form.motivation} onChange={set('motivation')} placeholder={t.step3.motivationPh} style={{ ...inputStyle, resize: 'vertical' }} />
                    </label>
                  </>
                )}

                {error && <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600, color: '#b3402a' }}>{error}</p>}

                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, borderTop: '1px solid rgba(19,28,43,.08)', paddingTop: 24 }}>
                  <button onClick={() => setStep(Math.max(0, step - 1))} style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, cursor: step === 0 ? 'default' : 'pointer', color: 'rgba(19,28,43,.6)', background: 'none', border: '1px solid rgba(19,28,43,.2)', borderRadius: 26, padding: '13px 26px', opacity: step === 0 ? 0 : 1, pointerEvents: step === 0 ? 'none' : 'auto' }}>{t.prev}</button>
                  <button onClick={nextStep} disabled={submitting} style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: '#fff', background: '#1c7a5c', border: 'none', borderRadius: 26, padding: '13px 32px', cursor: 'pointer', opacity: submitting ? 0.7 : 1 }}>
                    {submitting ? t.submitting : step === 2 ? t.submit : t.next}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div style={{ padding: 'clamp(40px,6vw,72px)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 18 }}>
              <span style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(28,122,92,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, color: '#1c7a5c' }}>✓</span>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 26, margin: 0 }}>{t.done.title}</h2>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: 'rgba(19,28,43,.62)', maxWidth: 420, margin: 0, textWrap: 'pretty' } as CSSProperties}>{t.done.sub}</p>
              <Link href="/" style={{ marginTop: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none', color: '#fff', background: '#131c2b', borderRadius: 26, padding: '13px 30px' }}>{t.done.cta}</Link>
            </div>
          )}
        </div>

        <aside style={{ flex: '1 1 300px', maxWidth: 380, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ background: '#131c2b', color: '#fff', padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#7fd1ae' }}>{t.process.label}</span>
            {t.process.items.map((pi) => (
              <div key={pi.n} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, fontWeight: 600, color: '#7fd1ae', flex: '0 0 24px' }}>{pi.n}</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{pi.title}</span>
                  <span style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(255,255,255,.6)' }}>{pi.desc}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', border: '1px solid rgba(19,28,43,.1)', padding: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#1c7a5c' }}>{t.help.label}</span>
            <p style={{ fontSize: 13.5, lineHeight: 1.65, color: 'rgba(19,28,43,.62)', margin: 0 }}>{t.help.text}</p>
            <span style={{ fontSize: 13.5, fontWeight: 600, color: '#131c2b' }}>info@ihs.edu · +1 (610) 000-0000</span>
          </div>
        </aside>
      </div>

      <SimpleFooter />
    </div>
  );
}
