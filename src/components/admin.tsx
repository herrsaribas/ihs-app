'use client';

import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { getSupabase } from '@/lib/supabase/client';

/* ---------- shared admin styles ---------- */

export const A = {
  card: {
    background: '#fff', border: '1px solid rgba(19,28,43,.1)', borderRadius: 8, padding: 24,
  } as CSSProperties,
  input: {
    fontFamily: 'Inter', fontSize: 14, padding: '11px 13px', border: '1px solid rgba(19,28,43,.2)',
    borderRadius: 6, background: '#fff', color: '#131c2b', width: '100%', boxSizing: 'border-box',
  } as CSSProperties,
  label: {
    display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12.5, fontWeight: 600, color: 'rgba(19,28,43,.7)',
  } as CSSProperties,
  btn: {
    fontFamily: 'Inter', fontSize: 13.5, fontWeight: 600, color: '#fff', background: '#1c7a5c',
    border: 'none', borderRadius: 20, padding: '10px 22px', cursor: 'pointer',
  } as CSSProperties,
  btnGhost: {
    fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: '#131c2b', background: 'none',
    border: '1px solid rgba(19,28,43,.25)', borderRadius: 20, padding: '9px 18px', cursor: 'pointer',
  } as CSSProperties,
  btnDanger: {
    fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: '#b3402a', background: 'none',
    border: '1px solid rgba(179,64,42,.4)', borderRadius: 20, padding: '9px 18px', cursor: 'pointer',
  } as CSSProperties,
  th: {
    textAlign: 'left', fontSize: 11.5, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase',
    color: 'rgba(19,28,43,.5)', padding: '12px 14px', borderBottom: '1px solid rgba(19,28,43,.12)', whiteSpace: 'nowrap',
  } as CSSProperties,
  td: {
    fontSize: 13.5, color: 'rgba(19,28,43,.8)', padding: '12px 14px', borderBottom: '1px solid rgba(19,28,43,.07)',
    verticalAlign: 'top',
  } as CSSProperties,
  h1: {
    fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 26, margin: 0, color: '#131c2b',
  } as CSSProperties,
};

/* ---------- status labels & colors (CRM pipeline) ---------- */

export const APP_STATUSES: { value: string; label: string; color: string }[] = [
  { value: 'new', label: 'Yeni', color: '#2563a8' },
  { value: 'review', label: 'İncelemede', color: '#8a6d1a' },
  { value: 'interview', label: 'Görüşme', color: '#7c4dbe' },
  { value: 'accepted', label: 'Kabul', color: '#1c7a5c' },
  { value: 'rejected', label: 'Red', color: '#b3402a' },
  { value: 'enrolled', label: 'Kayıtlı', color: '#0d1420' },
];

export const STUDENT_STATUSES: { value: string; label: string }[] = [
  { value: 'active', label: 'Aktif' },
  { value: 'paused', label: 'Dondurdu' },
  { value: 'graduated', label: 'Mezun' },
  { value: 'left', label: 'Ayrıldı' },
];

export function StatusBadge({ status }: { status: string }) {
  const s = APP_STATUSES.find((x) => x.value === status);
  return (
    <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '.03em', color: '#fff', background: s?.color || '#666', borderRadius: 12, padding: '4px 11px', whiteSpace: 'nowrap' }}>
      {s?.label || status}
    </span>
  );
}

/* ---------- session hook ---------- */

export function useAdminSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [configured, setConfigured] = useState(true);

  useEffect(() => {
    const sb = getSupabase();
    if (!sb) { setConfigured(false); setLoading(false); return; }
    sb.auth.getSession().then(({ data }) => { setSession(data.session); setLoading(false); });
    const { data: sub } = sb.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  return { session, loading, configured };
}

/* ---------- modal ---------- */

export function Modal({ title, onClose, children, wide }: { title: string; onClose: () => void; children: ReactNode; wide?: boolean }) {
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 500, background: 'rgba(13,20,32,.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: '#fff', borderRadius: 10, width: '100%', maxWidth: wide ? 860 : 560, maxHeight: '90svh', overflowY: 'auto', padding: 28, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 20, margin: 0 }}>{title}</h2>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: '50%', background: '#131c2b', color: '#fff', border: 'none', fontSize: 14, cursor: 'pointer' }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}
