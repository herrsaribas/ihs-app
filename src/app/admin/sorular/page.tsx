'use client';

import { useCallback, useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase/client';
import { A, Modal } from '@/components/admin';

interface SubmittedQuestion {
  id: string; created_at: string; name: string | null; email: string | null;
  question: string; lang: string; status: string; answer: string | null;
}

const Q_STATUSES = [
  { value: 'new', label: 'Yeni' },
  { value: 'answered', label: 'Cevaplandı' },
  { value: 'published', label: 'Yayımlandı' },
  { value: 'dismissed', label: 'Kapatıldı' },
];

export default function SorularPage() {
  const [rows, setRows] = useState<SubmittedQuestion[]>([]);
  const [selected, setSelected] = useState<SubmittedQuestion | null>(null);
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('Genel');
  const [busy, setBusy] = useState(false);
  const [info, setInfo] = useState('');

  const load = useCallback(async () => {
    const sb = getSupabase();
    if (!sb) return;
    const { data } = await sb.from('submitted_questions').select('*').order('created_at', { ascending: false });
    setRows((data as SubmittedQuestion[]) || []);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function saveAnswer(publish: boolean) {
    const sb = getSupabase();
    if (!sb || !selected) return;
    setBusy(true);
    await sb.from('submitted_questions').update({ answer, status: publish ? 'published' : 'answered' }).eq('id', selected.id);
    if (publish && answer.trim()) {
      await sb.from('qa_items').insert({
        lang: selected.lang === 'de' ? 'de' : 'tr',
        category, question: selected.question, answer, source: 'IHS', published: true, sort_order: 999,
      });
    }
    await load();
    setBusy(false);
    setInfo(publish ? 'Cevap kaydedildi ve Sorularla Hadis köşesinde yayımlandı.' : 'Cevap kaydedildi.');
  }

  async function dismiss(qRow: SubmittedQuestion) {
    const sb = getSupabase();
    if (!sb) return;
    await sb.from('submitted_questions').update({ status: 'dismissed' }).eq('id', qRow.id);
    await load();
    setSelected(null);
  }

  const statusLabel = (v: string) => Q_STATUSES.find((s) => s.value === v)?.label || v;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <h1 style={A.h1}>Gelen Sorular (Sorularla Hadis)</h1>

      <div style={{ ...A.card, padding: 0, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 680 }}>
          <thead>
            <tr>
              <th style={A.th}>Tarih</th>
              <th style={A.th}>Gönderen</th>
              <th style={A.th}>Soru</th>
              <th style={A.th}>Durum</th>
              <th style={A.th} />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td style={A.td}>{new Date(r.created_at).toLocaleDateString('tr-TR')}</td>
                <td style={A.td}>{r.name || 'Anonim'}<br /><span style={{ fontSize: 12.5, color: 'rgba(19,28,43,.5)' }}>{r.email || ''}</span></td>
                <td style={{ ...A.td, maxWidth: 380 }}>{r.question}</td>
                <td style={A.td}>{statusLabel(r.status)}</td>
                <td style={A.td}>
                  <button onClick={() => { setSelected(r); setAnswer(r.answer || ''); setInfo(''); }} style={A.btnGhost}>Cevapla</button>
                </td>
              </tr>
            ))}
            {!rows.length && <tr><td style={{ ...A.td, color: 'rgba(19,28,43,.45)' }} colSpan={5}>Henüz soru gelmedi.</td></tr>}
          </tbody>
        </table>
      </div>

      {selected && (
        <Modal title="Soruyu Cevapla" onClose={() => setSelected(null)} wide>
          <div style={{ fontSize: 14, lineHeight: 1.7, background: '#f7f4ec', borderRadius: 8, padding: 16 }}>
            <strong>{selected.name || 'Anonim'}</strong> ({selected.lang.toUpperCase()}) sordu:<br />{selected.question}
          </div>
          <label style={A.label}>Cevap
            <textarea rows={6} value={answer} onChange={(e) => setAnswer(e.target.value)} style={{ ...A.input, resize: 'vertical' }} />
          </label>
          <label style={A.label}>Yayım kategorisi (köşede görünecek)
            <input value={category} onChange={(e) => setCategory(e.target.value)} style={A.input} />
          </label>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <button disabled={busy || !answer.trim()} onClick={() => saveAnswer(false)} style={A.btnGhost}>Cevabı Kaydet</button>
            <button disabled={busy || !answer.trim()} onClick={() => saveAnswer(true)} style={A.btn}>Kaydet + Köşede Yayımla</button>
            <button disabled={busy} onClick={() => dismiss(selected)} style={A.btnDanger}>Kapat (yayımlama)</button>
            {info && <span style={{ fontSize: 13, fontWeight: 600, color: '#1c7a5c' }}>{info}</span>}
          </div>
          {selected.email && (
            <p style={{ margin: 0, fontSize: 12.5, color: 'rgba(19,28,43,.5)' }}>
              Cevabı e-posta ile iletmek için: <a href={`mailto:${selected.email}`}>{selected.email}</a>
            </p>
          )}
        </Modal>
      )}
    </div>
  );
}
