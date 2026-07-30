'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getSupabase } from '@/lib/supabase/client';
import { A, StatusBadge } from '@/components/admin';

interface RecentApp { id: string; created_at: string; name: string; program: string; status: string }

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ applications: 0, newApps: 0, students: 0, messages: 0, questions: 0 });
  const [recent, setRecent] = useState<RecentApp[]>([]);

  useEffect(() => {
    const sb = getSupabase();
    if (!sb) return;
    (async () => {
      const [apps, newApps, students, msgs, qs, rec] = await Promise.all([
        sb.from('applications').select('id', { count: 'exact', head: true }),
        sb.from('applications').select('id', { count: 'exact', head: true }).eq('status', 'new'),
        sb.from('students').select('id', { count: 'exact', head: true }),
        sb.from('contact_messages').select('id', { count: 'exact', head: true }).eq('is_read', false),
        sb.from('submitted_questions').select('id', { count: 'exact', head: true }).eq('status', 'new'),
        sb.from('applications').select('id,created_at,name,program,status').order('created_at', { ascending: false }).limit(8),
      ]);
      setCounts({
        applications: apps.count || 0, newApps: newApps.count || 0,
        students: students.count || 0, messages: msgs.count || 0, questions: qs.count || 0,
      });
      setRecent((rec.data as RecentApp[]) || []);
    })();
  }, []);

  const tiles = [
    { label: 'Toplam Başvuru', value: counts.applications, href: '/admin/basvurular' },
    { label: 'Yeni Başvuru', value: counts.newApps, href: '/admin/basvurular' },
    { label: 'Öğrenci', value: counts.students, href: '/admin/ogrenciler' },
    { label: 'Okunmamış Mesaj', value: counts.messages, href: '/admin/mesajlar' },
    { label: 'Bekleyen Soru', value: counts.questions, href: '/admin/sorular' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <h1 style={A.h1}>Genel Bakış</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))', gap: 16 }}>
        {tiles.map((t) => (
          <Link key={t.label} href={t.href} style={{ ...A.card, textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: 'rgba(19,28,43,.55)' }}>{t.label}</span>
            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 34, fontWeight: 600, color: '#1c7a5c' }}>{t.value}</span>
          </Link>
        ))}
      </div>

      <div style={{ ...A.card, padding: 0, overflowX: 'auto' }}>
        <div style={{ padding: '18px 20px', borderBottom: '1px solid rgba(19,28,43,.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 15, fontWeight: 700 }}>Son Başvurular</span>
          <Link href="/admin/basvurular" style={{ fontSize: 13, fontWeight: 600, color: '#1c7a5c', textDecoration: 'none' }}>Tümünü Gör →</Link>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
          <thead>
            <tr>
              <th style={A.th}>Tarih</th>
              <th style={A.th}>Ad Soyad</th>
              <th style={A.th}>Program</th>
              <th style={A.th}>Durum</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((r) => (
              <tr key={r.id}>
                <td style={A.td}>{new Date(r.created_at).toLocaleDateString('tr-TR')}</td>
                <td style={{ ...A.td, fontWeight: 600 }}>{r.name}</td>
                <td style={A.td}>{r.program}</td>
                <td style={A.td}><StatusBadge status={r.status} /></td>
              </tr>
            ))}
            {!recent.length && (
              <tr><td style={{ ...A.td, color: 'rgba(19,28,43,.45)' }} colSpan={4}>Henüz başvuru yok.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
