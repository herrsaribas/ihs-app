'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabase } from '@/lib/supabase/client';
import { A } from '@/components/admin';
import { LOGO } from '@/components/shared';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const sb = getSupabase();

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!sb) { setError('Supabase yapılandırılmamış (.env.local dosyasını doldurun).'); return; }
    setBusy(true); setError('');
    const { error: err } = await sb.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (err) { setError('Giriş başarısız: e-posta veya şifre hatalı.'); return; }
    router.replace('/admin');
  }

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", minHeight: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg,#0d1420,#131c2b)', padding: 24 }}>
      <form onSubmit={submit} style={{ width: '100%', maxWidth: 400, background: '#fff', borderRadius: 12, padding: 36, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO} alt="IHS" style={{ width: 200, height: 'auto', alignSelf: 'center' }} />
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 22, margin: 0, textAlign: 'center' }}>Yönetim Paneli</h1>
        <label style={A.label}>E-posta
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={A.input} />
        </label>
        <label style={A.label}>Şifre
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} style={A.input} />
        </label>
        {error && <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#b3402a' }}>{error}</p>}
        <button type="submit" disabled={busy} style={{ ...A.btn, padding: '13px 22px', opacity: busy ? 0.7 : 1 }}>
          {busy ? 'Giriş yapılıyor...' : 'Giriş Yap'}
        </button>
        <p style={{ margin: 0, fontSize: 12, color: 'rgba(19,28,43,.5)', lineHeight: 1.6 }}>
          Yönetici hesabı, Supabase Dashboard → Authentication → Users bölümünden oluşturulur.
        </p>
      </form>
    </div>
  );
}
