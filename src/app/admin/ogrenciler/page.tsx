'use client';

import { useCallback, useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase/client';
import { A, Modal, STUDENT_STATUSES } from '@/components/admin';

interface Student {
  id: string; created_at: string; name: string; email: string; phone: string | null;
  city: string | null; program: string; enrollment_year: string | null; status: string; notes: string | null;
}

const EMPTY: Omit<Student, 'id' | 'created_at'> = {
  name: '', email: '', phone: '', city: '', program: '', enrollment_year: '', status: 'active', notes: '',
};

export default function OgrencilerPage() {
  const [rows, setRows] = useState<Student[]>([]);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<Student | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const sb = getSupabase();
    if (!sb) return;
    const { data } = await sb.from('students').select('*').order('created_at', { ascending: false });
    setRows((data as Student[]) || []);
  }, []);

  useEffect(() => { load(); }, [load]);

  const q = search.trim().toLowerCase();
  const filtered = q
    ? rows.filter((r) => r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q) || r.program.toLowerCase().includes(q))
    : rows;

  function openNew() { setIsNew(true); setForm(EMPTY); setEditing(null); }
  function openEdit(s: Student) {
    setIsNew(false); setEditing(s);
    setForm({ name: s.name, email: s.email, phone: s.phone || '', city: s.city || '', program: s.program, enrollment_year: s.enrollment_year || '', status: s.status, notes: s.notes || '' });
  }

  async function save() {
    const sb = getSupabase();
    if (!sb || !form.name || !form.email || !form.program) return;
    setBusy(true);
    if (isNew) await sb.from('students').insert(form);
    else if (editing) await sb.from('students').update(form).eq('id', editing.id);
    await load();
    setBusy(false);
    setEditing(null); setIsNew(false);
  }

  async function remove(s: Student) {
    const sb = getSupabase();
    if (!sb) return;
    if (!window.confirm(`${s.name} kaydı silinsin mi?`)) return;
    await sb.from('students').delete().eq('id', s.id);
    await load();
    setEditing(null);
  }

  const statusLabel = (v: string) => STUDENT_STATUSES.find((s) => s.value === v)?.label || v;
  const modalOpen = isNew || editing !== null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <h1 style={A.h1}>Öğrenciler</h1>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <input type="search" placeholder="Ara: isim, e-posta, program..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ ...A.input, width: 260 }} />
          <button onClick={openNew} style={A.btn}>+ Yeni Öğrenci</button>
        </div>
      </div>

      <div style={{ ...A.card, padding: 0, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 720 }}>
          <thead>
            <tr>
              <th style={A.th}>Ad Soyad</th>
              <th style={A.th}>Program</th>
              <th style={A.th}>Şehir</th>
              <th style={A.th}>Kayıt Yılı</th>
              <th style={A.th}>Durum</th>
              <th style={A.th} />
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id}>
                <td style={{ ...A.td, fontWeight: 600 }}>{r.name}<br /><span style={{ fontWeight: 400, fontSize: 12.5, color: 'rgba(19,28,43,.5)' }}>{r.email}</span></td>
                <td style={A.td}>{r.program}</td>
                <td style={A.td}>{r.city || '—'}</td>
                <td style={A.td}>{r.enrollment_year || '—'}</td>
                <td style={A.td}>{statusLabel(r.status)}</td>
                <td style={A.td}><button onClick={() => openEdit(r)} style={A.btnGhost}>Düzenle</button></td>
              </tr>
            ))}
            {!filtered.length && (
              <tr><td style={{ ...A.td, color: 'rgba(19,28,43,.45)' }} colSpan={6}>Öğrenci bulunamadı. Başvurulardan &quot;Öğrenci Olarak Kaydet&quot; ile ya da yukarıdan elle ekleyebilirsiniz.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <Modal title={isNew ? 'Yeni Öğrenci' : form.name} onClose={() => { setEditing(null); setIsNew(false); }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14 }}>
            <label style={A.label}>Ad Soyad *
              <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} style={A.input} />
            </label>
            <label style={A.label}>E-posta *
              <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} style={A.input} />
            </label>
            <label style={A.label}>Telefon
              <input value={form.phone || ''} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} style={A.input} />
            </label>
            <label style={A.label}>Şehir / Ülke
              <input value={form.city || ''} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} style={A.input} />
            </label>
            <label style={A.label}>Program *
              <input value={form.program} onChange={(e) => setForm((f) => ({ ...f, program: e.target.value }))} style={A.input} />
            </label>
            <label style={A.label}>Kayıt Yılı
              <input value={form.enrollment_year || ''} onChange={(e) => setForm((f) => ({ ...f, enrollment_year: e.target.value }))} style={A.input} />
            </label>
            <label style={A.label}>Durum
              <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))} style={A.input}>
                {STUDENT_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </label>
          </div>
          <label style={A.label}>Notlar
            <textarea rows={3} value={form.notes || ''} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} style={{ ...A.input, resize: 'vertical' }} />
          </label>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'space-between', flexWrap: 'wrap' }}>
            {!isNew && editing ? <button onClick={() => remove(editing)} style={A.btnDanger}>Sil</button> : <span />}
            <button disabled={busy} onClick={save} style={A.btn}>{busy ? 'Kaydediliyor...' : 'Kaydet'}</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
