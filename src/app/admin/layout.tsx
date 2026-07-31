'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getSupabase } from '@/lib/supabase/client';
import { useAdminSession } from '@/components/admin';
import { LOGO } from '@/components/shared';

const NAV = [
  { href: '/admin', label: 'Genel Bakış' },
  { href: '/admin/basvurular', label: 'Başvurular' },
  { href: '/admin/ogrenciler', label: 'Öğrenciler' },
  { href: '/admin/mesajlar', label: 'Mesajlar' },
  { href: '/admin/sorular', label: 'Gelen Sorular' },
  { href: '/admin/icerik', label: 'İçerik (CMS)' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { session, loading, configured } = useAdminSession();
  // trailingSlash: true makes routes render as /admin/login/ — normalize before comparing
  const path = (pathname || '/').replace(/\/+$/, '') || '/';
  const isLogin = path === '/admin/login';

  useEffect(() => {
    if (!loading && configured && !session && !isLogin) router.replace('/admin/login');
  }, [loading, configured, session, isLogin, router]);

  if (isLogin) return <>{children}</>;

  if (!configured) {
    return (
      <div style={{ fontFamily: "'Inter',sans-serif", minHeight: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f4ec', padding: 24 }}>
        <div style={{ maxWidth: 560, background: '#fff', border: '1px solid rgba(19,28,43,.1)', borderRadius: 10, padding: 36, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, margin: 0 }}>Supabase yapılandırılmamış</h1>
          <p style={{ fontSize: 14.5, lineHeight: 1.7, color: 'rgba(19,28,43,.7)', margin: 0 }}>
            Yönetim panelini kullanmak için <code>.env.local</code> dosyasına
            <code> NEXT_PUBLIC_SUPABASE_URL</code> ve <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> değerlerini
            ekleyin, ardından <code>supabase/schema.sql</code> dosyasını Supabase SQL Editor&apos;da çalıştırın.
            Kurulum adımları için README.md dosyasına bakın.
          </p>
        </div>
      </div>
    );
  }

  if (loading || !session) {
    return (
      <div style={{ fontFamily: "'Inter',sans-serif", minHeight: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f4ec', color: 'rgba(19,28,43,.5)', fontSize: 14 }}>
        Yükleniyor...
      </div>
    );
  }

  return (
    <div className="ihs-admin" style={{ fontFamily: "'Inter',sans-serif", minHeight: '100svh', display: 'flex', background: '#f7f4ec', color: '#131c2b' }}>
      <aside className="ihs-admin-side" style={{ width: 232, flexShrink: 0, background: '#0d1420', color: '#fff', display: 'flex', flexDirection: 'column', padding: '24px 16px', gap: 24, position: 'sticky', top: 0, height: '100svh', boxSizing: 'border-box' }}>
        <Link href="/" style={{ display: 'flex', justifyContent: 'center' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO} alt="IHS" style={{ width: 150, height: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.95 }} />
        </Link>
        <nav className="ihs-admin-nav" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {NAV.map((n) => {
            const active = path === n.href;
            return (
              <Link key={n.href} href={n.href} style={{ fontSize: 13.5, fontWeight: active ? 700 : 500, textDecoration: 'none', color: active ? '#fff' : 'rgba(255,255,255,.65)', background: active ? 'rgba(28,122,92,.35)' : 'none', borderRadius: 8, padding: '10px 14px' }}>
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="ihs-admin-user" style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={{ fontSize: 11.5, color: 'rgba(255,255,255,.4)', wordBreak: 'break-all' }}>{session.user.email}</span>
          <button
            onClick={async () => { await getSupabase()?.auth.signOut(); router.replace('/admin/login'); }}
            style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: '#fff', background: 'none', border: '1px solid rgba(255,255,255,.3)', borderRadius: 18, padding: '8px 16px', cursor: 'pointer' }}
          >
            Çıkış Yap
          </button>
        </div>
      </aside>
      <main style={{ flex: 1, padding: 'clamp(20px,3vw,40px)', minWidth: 0 }}>{children}</main>
    </div>
  );
}
