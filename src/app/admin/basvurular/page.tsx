'use client';

import { useCallback, useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase/client';
import { A, APP_STATUSES, Modal, StatusBadge } from '@/components/admin';

interface Application {
  id: string; created_at: string; program: string; name: string; email: string;
  phone: string | null; city: string | null; education: string | null;
  motivation: string | null; lang: string; status: string; notes: string | null;
}

export default function BasvurularPage() {
  const [rows, setRows] = useState<Application[]>([]);
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState<Application | null>(null);
  const [notes, setNotes] = useState('');
  const [busy, setBusy] = useState(false);
  const [info, setInfo] = useState('');

  const load = useCallback(async () => {
    const sb = getSupabase();
    if (!sb) return;
    const { data } = await sb.from('applications').select('*').order('created_at', { ascending: false });
    setRows((data as Application[]) || []);
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = filter ? rows.filter((r) => r.status === filter) : rows;

  async function setStatus(app: Application, status: string) {
    const sb = getSupabase();
    if (!sb) return;
    setBusy(true);
    await sb.from('applications').update({ status }).eq('id', app.id);
    setSelected((s) => (s && s.id === app.id ? { ...s, status } : s));
    await load();
    setBusy(false);
  }

  async function saveNotes(app: Application) {
    const sb = getSupabase();
    if (!sb) return;
    setBusy(true);
    await sb.from('applications').update({ notes }).eq('id', app.id);
    await load();
    setBusy(false);
    setInfo('Not kaydedildi.');
    setTimeout(() => setInfo(''), 1500);
  }

  async function convertToStudent(app: Application) {
    const sb = getSupabase();
    if (!sb) return;
    setBusy(true);
    await sb.from('students').insert({
      application_id: app.id, name: app.name, email: app.email, phone: app.phone,
      city: app.city, program: app.program, enrollment_year: String(new Date().getFullYear()),
    });
    await sb.from('applications').update({ status: 'enrolled' }).eq('id', app.id);
    await load();
    setBusy(false);
    setSelected(null);
    setInfo('');
  }

  const chip = (active: boolean, color?: string) => ({
    fontFamily: 'Inter', fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
    borderRadius: 16, padding: '7px 15px',
    background: active ? (color || '#131c2b') : '#fff',
    color: active ? '#fff' : 'rgba(19,28,43,.65)',
    border: '1px solid ' + (active ? (color || '#131c2b') : 'rgba(19,28,43,.2)'),
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <h1 style={A.h1}>Başvurular</h1>
        <span style={{ fontSize: 13, color: 'rgba(19,28,43,.55)' }}>{filtered.length} kayıt</span>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button onClick={() => setFilter('')} style={chip(!filter)}>Tümü</button>
        {APP_STATUSES.map((s) => (
          <button key={s.value} onClick={() => setFilter(s.value)} style={chip(filter === s.value, s.color)}>
            {s.label} ({rows.filter((r) => r.status === s.value).length})
          </button>
        ))}
      </div>

      <div style={{ ...A.card, padding: 0, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 720 }}>
          <thead>
            <tr>
              <th style={A.th}>Tarih</th>
              <th style={A.th}>Ad Soyad</th>
              <th style={A.th}>Program</th>
              <th style={A.th}>Şehir</th>
              <th style={A.th}>Durum</th>
              <th style={A.th} />
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id}>
                <td style={A.td}>{new Date(r.created_at).toLocaleDateString('tr-TR')}</td>
                <td style={{ ...A.td, fontWeight: 600 }}>{r.name}<br /><span style={{ fontWeight: 400, fontSize: 12.5, color: 'rgba(19,28,43,.5)' }}>{r.email}</span></td>
                <td style={A.td}>{r.program}</td>
                <td style={A.td}>{r.city || '—'}</td>
                <td style={A.td}><StatusBadge status={r.status} /></td>
                <td style={A.td}>
                  <button onClick={() => { setSelected(r); setNotes(r.notes || ''); setInfo(''); }} style={A.btnGhost}>İncele</button>
                </td>
              </tr>
            ))}
            {!filtered.length && (
              <tr><td style={{ ...A.td, color: 'rgba(19,28,43,.45)' }} colSpan={6}>Kayıt bulunamadı.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <Modal title={selected.name} onClose={() => setSelected(null)} wide>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14, fontSize: 14 }}>
            <div><strong>Program:</strong><br />{selected.program}</div>
            <div><strong>E-posta:</strong><br />{selected.email}</div>
            <div><strong>Telefon:</strong><br />{selected.phone || '—'}</div>
            <div><strong>Şehir / Ülke:</strong><br />{selected.city || '—'}</div>
            <div><strong>Eğitim:</strong><br />{selected.education || '—'}</div>
            <div><strong>Başvuru dili / tarihi:</strong><br />{selected.lang.toUpperCase()} · {new Date(selected.created_at).toLocaleString('tr-TR')}</div>
          </div>
          {selected.motivation && (
            <div style={{ fontSize: 14, lineHeight: 1.7, background: '#f7f4ec', borderRadius: 8, padding: 16 }}>
              <strong>Motivasyon:</strong><br />{selected.motivation}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: 'rgba(19,28,43,.6)' }}>DURUM</span>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {APP_STATUSES.map((s) => (
                <button key={s.value} disabled={busy} onClick={() => setStatus(selected, s.value)}
                  style={{ fontFamily: 'Inter', fontSize: 12.5, fontWeight: 600, cursor: 'pointer', borderRadius: 16, padding: '7px 15px', background: selected.status === s.value ? s.color : '#fff', color: selected.status === s.value ? '#fff' : 'rgba(19,28,43,.65)', border: `1px solid ${selected.status === s.value ? s.color : 'rgba(19,28,43,.2)'}` }}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <label style={A.label}>Dahili Notlar
            <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} style={{ ...A.input, resize: 'vertical' }} />
          </label>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <button disabled={busy} onClick={() => saveNotes(selected)} style={A.btnGhost}>Notu Kaydet</button>
            <button disabled={busy || selected.status === 'enrolled'} onClick={() => convertToStudent(selected)} style={{ ...A.btn, opacity: selected.status === 'enrolled' ? 0.5 : 1 }}>
              Öğrenci Olarak Kaydet
            </button>
            {info && <span style={{ fontSize: 13, fontWeight: 600, color: '#1c7a5c' }}>{info}</span>}
          </div>
        </Modal>
      )}
    </div>
  );
}
