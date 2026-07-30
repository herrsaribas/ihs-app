'use client';

import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { useLang } from '@/lib/i18n';

export const LOGO = '/uploads/WhatsApp_Image_2026-07-18_at_13.41.05-removebg-preview.png';

/** Drifting geometric SVG pattern layer used across all dark sections. */
export function Pattern({ opacity = 0.16 }: { opacity?: number }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: '-60px',
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cg fill='none' stroke='%232f9c78' stroke-width='1' opacity='0.5'%3E%3Crect x='30' y='30' width='60' height='60'/%3E%3Crect x='30' y='30' width='60' height='60' transform='rotate(45 60 60)'/%3E%3C/g%3E%3C/svg%3E\")",
        backgroundSize: '120px 120px',
        opacity,
        animation: 'ihsDrift 70s linear infinite',
      }}
    />
  );
}

/** Simple placeholder box for image slots (photos are managed in the admin CMS). */
export function ImageBox({
  src, alt, placeholder, radius = 0, style,
}: { src?: string | null; alt?: string; placeholder: string; radius?: number; style?: CSSProperties }) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt || placeholder} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: radius, display: 'block', ...style }} />
    );
  }
  return (
    <div
      style={{
        width: '100%', height: '100%', borderRadius: radius,
        background: 'repeating-linear-gradient(45deg, rgba(19,28,43,.05), rgba(19,28,43,.05) 12px, rgba(19,28,43,.09) 12px, rgba(19,28,43,.09) 24px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'rgba(19,28,43,.4)', fontSize: 12.5, fontWeight: 600, textAlign: 'center', padding: 8, boxSizing: 'border-box',
        ...style,
      }}
    >
      {placeholder}
    </div>
  );
}

/** Dark sub-page header (used by every page except the home page). */
export function SubpageHeader({
  backLabel, applyLabel, extraLinks,
}: { backLabel: string; applyLabel?: string; extraLinks?: ReactNode }) {
  const { toggleLang, otherLangLabel } = useLang();
  return (
    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '14px clamp(20px,4vw,64px)', background: '#0d1420' }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO} alt="IHS — Institute for Hadith Sciences" style={{ height: 'clamp(84px,7vw,110px)', width: 'auto', margin: '-14px 0', filter: 'brightness(0) invert(1)' }} />
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
        {extraLinks}
        <Link href="/" style={{ fontSize: 13.5, fontWeight: 500, textDecoration: 'none', color: 'rgba(255,255,255,.8)' }}>← {backLabel}</Link>
        <button onClick={toggleLang} style={{ fontFamily: 'Inter', fontSize: 12.5, fontWeight: 600, letterSpacing: '.04em', background: 'none', border: '1px solid rgba(255,255,255,.5)', color: '#fff', borderRadius: 20, padding: '6px 13px', cursor: 'pointer' }}>
          {otherLangLabel}
        </button>
        {applyLabel && (
          <Link href="/basvuru" style={{ fontSize: 13, fontWeight: 600, textDecoration: 'none', color: '#fff', background: '#1c7a5c', borderRadius: 24, padding: '9px 20px', whiteSpace: 'nowrap' }}>
            {applyLabel}
          </Link>
        )}
      </div>
    </header>
  );
}

/** Dark hero band for sub-pages. */
export function SubpageHero({
  eyebrow, title, sub, children, paddingBottom = 72,
}: { eyebrow: string; title: string; sub?: string; children?: ReactNode; paddingBottom?: number }) {
  return (
    <section style={{ position: 'relative', background: 'linear-gradient(180deg,#0d1420,#131c2b)', color: '#fff', padding: `64px 24px ${paddingBottom}px`, textAlign: 'center', overflow: 'hidden' }}>
      <Pattern />
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: '#7fd1ae' }}>{eyebrow}</span>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 'clamp(32px,4.6vw,54px)', margin: 0 }}>{title}</h1>
        {sub && <p style={{ fontSize: 15.5, lineHeight: 1.7, color: 'rgba(255,255,255,.7)', maxWidth: 620, margin: 0, textWrap: 'pretty' } as CSSProperties}>{sub}</p>}
        {children}
      </div>
    </section>
  );
}

export function SimpleFooter() {
  return (
    <footer style={{ padding: '28px 24px', background: '#0d1420', textAlign: 'center' }}>
      <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,.4)' }}>© 2026 IHS — Institute for Hadith Sciences</span>
    </footer>
  );
}

/** Bottom dark CTA band used by sub-pages. */
export function CtaBand({ title, sub, ctaLabel, green }: { title: string; sub?: string; ctaLabel: string; green?: boolean }) {
  return (
    <section style={{ padding: '88px 24px', background: green ? '#1c7a5c' : '#131c2b', color: '#fff', textAlign: 'center' }}>
      <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 'clamp(24px,3vw,36px)', margin: 0, textWrap: 'pretty' } as CSSProperties}>{title}</h2>
        {sub && <p style={{ fontSize: 15, lineHeight: 1.65, color: 'rgba(255,255,255,.85)', margin: 0 }}>{sub}</p>}
        <Link
          href="/basvuru"
          style={green
            ? { marginTop: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none', color: '#1c7a5c', background: '#fff', borderRadius: 26, padding: '14px 34px' }
            : { marginTop: 6, fontSize: 14, fontWeight: 600, textDecoration: 'none', color: '#0d1420', background: '#ece6d8', borderRadius: 26, padding: '14px 34px' }}
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
