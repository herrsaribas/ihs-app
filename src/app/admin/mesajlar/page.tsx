'use client';

import { useCallback, useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase/client';
import { A } from '@/components/admin';

interface Message {
  id: string; created_at: string; name: string; email: string; message: string; lang: string; is_read: boolean;
}

export default function MesajlarPage() {
  const [rows, setRows] = useState<Message[]>([]);
  const [showRead, setShowRead] = useState(true);

  const load = useCallback(async () => {
    const sb = getSupabase();
    if (!sb) return;
    const { data } = await sb.from('contact_messages').select('*').order('created_at', { ascending: false });
    setRows((data as Message[]) || []);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function toggleRead(m: Message) {
    const sb = getSupabase();
    if (!sb) return;
    await sb.from('contact_messages').update({ is_read: !m.is_read }).eq('id', m.id);
    await load();
  }

  async function remove(m: Message) {
    const sb = getSupabase();
    if (!sb) return;
    if (!window.confirm('Mesaj silinsin mi?')) return;
    await sb.from('contact_messages').delete().eq('id', m.id);
    await load();
  }

  const filtered = showRead ? rows : rows.filter((r) => !r.is_read);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <h1 style={A.h1}>İletişim Mesajları</h1>
        <label style={{ fontSize: 13.5, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <input type="checkbox" checked={showRead} onChange={(e) => setShowRead(e.target.checked)} />
          Okunmuşları da göster
        </label>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {filtered.map((m) => (
          <div key={m.id} style={{ ...A.card, opacity: m.is_read ? 0.72 : 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: 15 }}>{m.name}</span>
                <span style={{ fontSize: 13, color: 'rgba(19,28,43,.55)', marginLeft: 10 }}>{m.email}</span>
              </div>
              <span style={{ fontSize: 12.5, color: 'rgba(19,28,43,.45)' }}>
                {m.lang.toUpperCase()} · {new Date(m.created_at).toLocaleString('tr-TR')}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: 'rgba(19,28,43,.8)', whiteSpace: 'pre-wrap' }}>{m.message}</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a href={`mailto:${m.email}`} style={{ ...A.btn, textDecoration: 'none' }}>Yanıtla</a>
              <button onClick={() => toggleRead(m)} style={A.btnGhost}>{m.is_read ? 'Okunmadı İşaretle' : 'Okundu İşaretle'}</button>
              <button onClick={() => remove(m)} style={A.btnDanger}>Sil</button>
            </div>
          </div>
        ))}
        {!filtered.length && <p style={{ fontSize: 14, color: 'rgba(19,28,43,.5)' }}>Mesaj yok.</p>}
      </div>
    </div>
  );
}
