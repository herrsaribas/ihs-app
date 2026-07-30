'use client';

import { useState, type CSSProperties } from 'react';
import { useLang } from '@/lib/i18n';
import { BAGIS, BAGIS_AMOUNTS, IBAN, PAYPAL_BASE } from '@/lib/content/bagis';
import { Pattern, SimpleFooter, SubpageHeader } from '@/components/shared';

export default function BagisPage() {
  const { lang } = useLang();
  const ui = BAGIS[lang];
  const [amount, setAmount] = useState(50);
  const [copied, setCopied] = useState(false);

  function copyIban() {
    if (navigator.clipboard) navigator.clipboard.writeText(IBAN.replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  const darkLabel: CSSProperties = { fontSize: 11, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.45)' };

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", background: '#f7f4ec', color: '#131c2b', minHeight: '100svh' }}>
      <SubpageHeader backLabel={ui.back} />

      <section style={{ position: 'relative', background: 'linear-gradient(180deg,#0d1420,#131c2b)', color: '#fff', padding: '72px 24px 88px', textAlign: 'center', overflow: 'hidden' }}>
        <Pattern />
        <div style={{ position: 'relative', maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: '#7fd1ae' }}>{ui.eyebrow}</span>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 'clamp(32px,4.6vw,54px)', margin: 0 }}>{ui.title}</h1>
          <p dir="rtl" style={{ fontFamily: "'Amiri',serif", fontSize: 'clamp(20px,2.6vw,27px)', lineHeight: 1.9, color: '#7fd1ae', margin: 0 }}>مَثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ</p>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,.6)', maxWidth: 560, margin: 0, textWrap: 'pretty' } as CSSProperties}>{ui.verse}</p>
          <span style={{ fontSize: 12, letterSpacing: '.04em', color: 'rgba(255,255,255,.4)' }}>{ui.verseSrc}</span>
        </div>
      </section>

      <section style={{ padding: '72px 24px', background: '#f7f4ec' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 56 }}>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 14 }}>
            <p style={{ fontSize: 15.5, lineHeight: 1.75, color: 'rgba(19,28,43,.7)', maxWidth: 640, margin: 0, textWrap: 'pretty' } as CSSProperties}>{ui.intro}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 24 }}>
            {ui.purposes.map((pu) => (
              <div key={pu.title} style={{ background: '#fff', border: '1px solid rgba(19,28,43,.1)', borderTop: '3px solid #1c7a5c', padding: '28px 26px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span style={{ fontFamily: "'Amiri',serif", fontSize: 26, color: '#1c7a5c', lineHeight: 1 }}>{pu.ar}</span>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 18, margin: 0, color: '#131c2b' }}>{pu.title}</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.65, color: 'rgba(19,28,43,.62)', margin: 0 }}>{pu.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'stretch' }}>
            <div style={{ flex: '1 1 340px', background: '#fff', border: '1px solid rgba(19,28,43,.1)', padding: 'clamp(28px,3.5vw,44px)', display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#1c7a5c' }}>{ui.onlineLabel}</span>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 24, margin: 0 }}>{ui.paypalTitle}</h2>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: 'rgba(19,28,43,.62)', margin: 0 }}>{ui.paypalDesc}</p>
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {BAGIS_AMOUNTS.map((a) => (
                  <button key={a} onClick={() => setAmount(a)} style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'all .2s ease', borderRadius: 22, padding: '10px 22px', background: a === amount ? '#131c2b' : 'none', color: a === amount ? '#fff' : '#131c2b', border: '1px solid ' + (a === amount ? '#131c2b' : 'rgba(19,28,43,.25)') }}>
                    {a} €
                  </button>
                ))}
              </div>
              <a href={`${PAYPAL_BASE}&amount=${amount}`} target="_blank" rel="noopener" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontSize: 15, fontWeight: 600, textDecoration: 'none', color: '#fff', background: '#1c7a5c', borderRadius: 28, padding: '16px 32px', textAlign: 'center' }}>{ui.paypalCta}</a>
              <span style={{ fontSize: 12, lineHeight: 1.6, color: 'rgba(19,28,43,.45)' }}>{ui.paypalNote}</span>
            </div>

            <div style={{ flex: '1 1 340px', background: '#131c2b', color: '#fff', padding: 'clamp(28px,3.5vw,44px)', display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#7fd1ae' }}>{ui.bankLabel}</span>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 24, margin: 0 }}>{ui.bankTitle}</h2>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: 'rgba(255,255,255,.62)', margin: 0 }}>{ui.bankDesc}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3, borderBottom: '1px solid rgba(255,255,255,.12)', paddingBottom: 12 }}>
                  <span style={darkLabel}>{ui.accountHolder}</span>
                  <span style={{ fontSize: 14.5, fontWeight: 600 }}>Institute for Hadith Sciences e.V.</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3, borderBottom: '1px solid rgba(255,255,255,.12)', paddingBottom: 12 }}>
                  <span style={darkLabel}>IBAN</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 14.5, fontWeight: 600, letterSpacing: '.04em', fontVariantNumeric: 'tabular-nums' }}>{IBAN}</span>
                    <button onClick={copyIban} style={{ fontFamily: 'Inter', fontSize: 11.5, fontWeight: 600, color: '#7fd1ae', background: 'none', border: '1px solid rgba(127,209,174,.4)', borderRadius: 14, padding: '4px 12px', cursor: 'pointer' }}>
                      {copied ? ui.copied : ui.copy}
                    </button>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3, borderBottom: '1px solid rgba(255,255,255,.12)', paddingBottom: 12 }}>
                  <span style={darkLabel}>BIC</span>
                  <span style={{ fontSize: 14.5, fontWeight: 600, letterSpacing: '.04em' }}>GENODEF1XXX</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3, borderBottom: '1px solid rgba(255,255,255,.12)', paddingBottom: 12 }}>
                  <span style={darkLabel}>{ui.bankName}</span>
                  <span style={{ fontSize: 14.5, fontWeight: 600 }}>Volksbank (Beispiel)</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <span style={darkLabel}>{ui.reference}</span>
                  <span style={{ fontSize: 14.5, fontWeight: 600 }}>{ui.referenceVal}</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: '#ece6d8', border: '1px solid rgba(19,28,43,.08)', padding: 'clamp(26px,3.5vw,40px)', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#1c7a5c' }}>{ui.taxLabel}</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 22, margin: 0 }}>{ui.taxTitle}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {ui.taxItems.map((tx) => (
                <div key={tx.slice(0, 24)} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ width: 6, height: 6, background: '#1c7a5c', transform: 'rotate(45deg)', flexShrink: 0, marginTop: 7 }} />
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(19,28,43,.72)', margin: 0, textWrap: 'pretty' } as CSSProperties}>{tx}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 12.5, lineHeight: 1.65, color: 'rgba(19,28,43,.5)', margin: 0, textWrap: 'pretty' } as CSSProperties}>{ui.taxDisclaimer}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, textAlign: 'center' }}>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(19,28,43,.6)', margin: 0, maxWidth: 520, textWrap: 'pretty' } as CSSProperties}>{ui.contactNote}</p>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#131c2b' }}>spenden@ihs.edu · +49 (0) 69 000 000 00</span>
          </div>

        </div>
      </section>

      <SimpleFooter />
    </div>
  );
}
