'use client';

import { useCallback, useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase/client';
import { A, Modal } from '@/components/admin';

/**
 * CMS editor for the three dynamic content tables:
 *  - qa_items      (Sorularla Hadis köşesi)
 *  - activities    (Faaliyetler / duyurular)
 *  - instructors   (Akademik kadro)
 * Rows are per-language (tr / de). When these tables are empty the public site
 * falls back to the built-in default content.
 */

type Tab = 'qa' | 'activities' | 'instructors';

interface QaRow { id: string; lang: string; category: string; question: string; answer: string; source: string | null; sort_order: number; published: boolean }
interface ActRow { id: string; lang: string; date_label: string; title: string; description: string; image_url: string | null; sort_order: number; published: boolean }
interface InstRow {
  id: string; lang: string; group_name: string; name: string; role: string; bio: string; bio_long: string | null;
  books: { title: string; meta: string }[]; articles: { title: string; meta: string }[];
  videos: { title: string; meta: string }[]; social: { label: string; url: string }[];
  photo_url: string | null; sort_order: number; published: boolean;
}

const pairsToText = (arr: { title?: string; meta?: string; label?: string; url?: string }[] | null, isSocial = false) =>
  (arr || []).map((x) => (isSocial ? `${x.label} | ${x.url}` : `${x.title} | ${x.meta}`)).join('\n');

const textToPairs = (text: string, isSocial = false) =>
  text.split('\n').map((l) => l.trim()).filter(Boolean).map((l) => {
    const [a, b] = l.split('|').map((s) => s.trim());
    return isSocial ? { label: a || '', url: b || '#' } : { title: a || '', meta: b || '' };
  });

export default function IcerikPage() {
  const [tab, setTab] = useState<Tab>('qa');
  const [lang, setLang] = useState<'tr' | 'de'>('tr');
  const [qaRows, setQaRows] = useState<QaRow[]>([]);
  const [actRows, setActRows] = useState<ActRow[]>([]);
  const [instRows, setInstRows] = useState<InstRow[]>([]);
  const [busy, setBusy] = useState(false);

  const [editQa, setEditQa] = useState<Partial<QaRow> | null>(null);
  const [editAct, setEditAct] = useState<Partial<ActRow> | null>(null);
  const [editInst, setEditInst] = useState<Partial<InstRow> & { booksText?: string; articlesText?: string; videosText?: string; socialText?: string } | null>(null);

  const load = useCallback(async () => {
    const sb = getSupabase();
    if (!sb) return;
    const [qa, act, inst] = await Promise.all([
      sb.from('qa_items').select('*').eq('lang', lang).order('sort_order'),
      sb.from('activities').select('*').eq('lang', lang).order('sort_order'),
      sb.from('instructors').select('*').eq('lang', lang).order('sort_order'),
    ]);
    setQaRows((qa.data as QaRow[]) || []);
    setActRows((act.data as ActRow[]) || []);
    setInstRows((inst.data as InstRow[]) || []);
  }, [lang]);

  useEffect(() => { load(); }, [load]);

  async function saveQa() {
    const sb = getSupabase();
    if (!sb || !editQa?.question || !editQa?.answer) return;
    setBusy(true);
    const payload = {
      lang, category: editQa.category || 'Genel', question: editQa.question, answer: editQa.answer,
      source: editQa.source || null, sort_order: editQa.sort_order ?? 0, published: editQa.published ?? true,
    };
    if (editQa.id) await sb.from('qa_items').update(payload).eq('id', editQa.id);
    else await sb.from('qa_items').insert(payload);
    await load(); setBusy(false); setEditQa(null);
  }

  async function saveAct() {
    const sb = getSupabase();
    if (!sb || !editAct?.title || !editAct?.description) return;
    setBusy(true);
    const payload = {
      lang, date_label: editAct.date_label || '', title: editAct.title, description: editAct.description,
      image_url: editAct.image_url || null, sort_order: editAct.sort_order ?? 0, published: editAct.published ?? true,
    };
    if (editAct.id) await sb.from('activities').update(payload).eq('id', editAct.id);
    else await sb.from('activities').insert(payload);
    await load(); setBusy(false); setEditAct(null);
  }

  async function saveInst() {
    const sb = getSupabase();
    if (!sb || !editInst?.name || !editInst?.role || !editInst?.group_name) return;
    setBusy(true);
    const payload = {
      lang, group_name: editInst.group_name, name: editInst.name, role: editInst.role,
      bio: editInst.bio || '', bio_long: editInst.bio_long || null,
      books: textToPairs(editInst.booksText || ''), articles: textToPairs(editInst.articlesText || ''),
      videos: textToPairs(editInst.videosText || ''), social: textToPairs(editInst.socialText || '', true),
      photo_url: editInst.photo_url || null, sort_order: editInst.sort_order ?? 0, published: editInst.published ?? true,
    };
    if (editInst.id) await sb.from('instructors').update(payload).eq('id', editInst.id);
    else await sb.from('instructors').insert(payload);
    await load(); setBusy(false); setEditInst(null);
  }

  async function removeRow(table: string, id: string) {
    const sb = getSupabase();
    if (!sb || !window.confirm('Kayıt silinsin mi?')) return;
    await sb.from(table).delete().eq('id', id);
    await load();
    setEditQa(null); setEditAct(null); setEditInst(null);
  }

  const tabBtn = (active: boolean) => ({
    fontFamily: 'Inter', fontSize: 13.5, fontWeight: 600, cursor: 'pointer', borderRadius: 20,
    padding: '9px 20px', background: active ? '#131c2b' : '#fff', color: active ? '#fff' : 'rgba(19,28,43,.65)',
    border: '1px solid ' + (active ? '#131c2b' : 'rgba(19,28,43,.2)'),
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <h1 style={A.h1}>İçerik Yönetimi (CMS)</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          {(['tr', 'de'] as const).map((l) => (
            <button key={l} onClick={() => setLang(l)} style={tabBtn(lang === l)}>{l.toUpperCase()}</button>
          ))}
        </div>
      </div>

      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: 'rgba(19,28,43,.55)' }}>
        Bu tablolar boşken site, kod içindeki varsayılan içeriği gösterir. Buraya kayıt eklediğinizde site otomatik olarak buradaki içeriği kullanır.
      </p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button onClick={() => setTab('qa')} style={tabBtn(tab === 'qa')}>Sorularla Hadis ({qaRows.length})</button>
        <button onClick={() => setTab('activities')} style={tabBtn(tab === 'activities')}>Faaliyetler ({actRows.length})</button>
        <button onClick={() => setTab('instructors')} style={tabBtn(tab === 'instructors')}>Akademik Kadro ({instRows.length})</button>
      </div>

      {/* ---------- QA ---------- */}
      {tab === 'qa' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <button onClick={() => setEditQa({ published: true, sort_order: qaRows.length })} style={{ ...A.btn, alignSelf: 'flex-start' }}>+ Yeni Soru-Cevap</button>
          <div style={{ ...A.card, padding: 0, overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 640 }}>
              <thead><tr><th style={A.th}>Sıra</th><th style={A.th}>Kategori</th><th style={A.th}>Soru</th><th style={A.th}>Yayın</th><th style={A.th} /></tr></thead>
              <tbody>
                {qaRows.map((r) => (
                  <tr key={r.id}>
                    <td style={A.td}>{r.sort_order}</td>
                    <td style={A.td}>{r.category}</td>
                    <td style={{ ...A.td, maxWidth: 420 }}>{r.question}</td>
                    <td style={A.td}>{r.published ? '✓' : '—'}</td>
                    <td style={A.td}><button onClick={() => setEditQa(r)} style={A.btnGhost}>Düzenle</button></td>
                  </tr>
                ))}
                {!qaRows.length && <tr><td style={{ ...A.td, color: 'rgba(19,28,43,.45)' }} colSpan={5}>Kayıt yok — site varsayılan içeriği gösteriyor.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ---------- Activities ---------- */}
      {tab === 'activities' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <button onClick={() => setEditAct({ published: true, sort_order: actRows.length })} style={{ ...A.btn, alignSelf: 'flex-start' }}>+ Yeni Faaliyet</button>
          <div style={{ ...A.card, padding: 0, overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 640 }}>
              <thead><tr><th style={A.th}>Sıra</th><th style={A.th}>Tarih</th><th style={A.th}>Başlık</th><th style={A.th}>Yayın</th><th style={A.th} /></tr></thead>
              <tbody>
                {actRows.map((r) => (
                  <tr key={r.id}>
                    <td style={A.td}>{r.sort_order}</td>
                    <td style={A.td}>{r.date_label}</td>
                    <td style={{ ...A.td, maxWidth: 420 }}>{r.title}</td>
                    <td style={A.td}>{r.published ? '✓' : '—'}</td>
                    <td style={A.td}><button onClick={() => setEditAct(r)} style={A.btnGhost}>Düzenle</button></td>
                  </tr>
                ))}
                {!actRows.length && <tr><td style={{ ...A.td, color: 'rgba(19,28,43,.45)' }} colSpan={5}>Kayıt yok — site varsayılan içeriği gösteriyor.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ---------- Instructors ---------- */}
      {tab === 'instructors' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <button onClick={() => setEditInst({ published: true, sort_order: instRows.length, group_name: lang === 'tr' ? 'Danışma Kurulu' : 'Beirat' })} style={{ ...A.btn, alignSelf: 'flex-start' }}>+ Yeni Hoca</button>
          <div style={{ ...A.card, padding: 0, overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 640 }}>
              <thead><tr><th style={A.th}>Sıra</th><th style={A.th}>Kurul</th><th style={A.th}>Ad</th><th style={A.th}>Görev</th><th style={A.th}>Yayın</th><th style={A.th} /></tr></thead>
              <tbody>
                {instRows.map((r) => (
                  <tr key={r.id}>
                    <td style={A.td}>{r.sort_order}</td>
                    <td style={A.td}>{r.group_name}</td>
                    <td style={{ ...A.td, fontWeight: 600 }}>{r.name}</td>
                    <td style={A.td}>{r.role}</td>
                    <td style={A.td}>{r.published ? '✓' : '—'}</td>
                    <td style={A.td}>
                      <button onClick={() => setEditInst({ ...r, booksText: pairsToText(r.books), articlesText: pairsToText(r.articles), videosText: pairsToText(r.videos), socialText: pairsToText(r.social, true) })} style={A.btnGhost}>Düzenle</button>
                    </td>
                  </tr>
                ))}
                {!instRows.length && <tr><td style={{ ...A.td, color: 'rgba(19,28,43,.45)' }} colSpan={6}>Kayıt yok — site varsayılan içeriği gösteriyor.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ---------- Modals ---------- */}
      {editQa && (
        <Modal title={editQa.id ? 'Soru-Cevap Düzenle' : 'Yeni Soru-Cevap'} onClose={() => setEditQa(null)} wide>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14 }}>
            <label style={A.label}>Kategori
              <input value={editQa.category || ''} onChange={(e) => setEditQa((f) => ({ ...f, category: e.target.value }))} style={A.input} />
            </label>
            <label style={A.label}>Sıra
              <input type="number" value={editQa.sort_order ?? 0} onChange={(e) => setEditQa((f) => ({ ...f, sort_order: Number(e.target.value) }))} style={A.input} />
            </label>
            <label style={A.label}>Hazırlayan
              <input value={editQa.source || ''} onChange={(e) => setEditQa((f) => ({ ...f, source: e.target.value }))} style={A.input} />
            </label>
          </div>
          <label style={A.label}>Soru *
            <input value={editQa.question || ''} onChange={(e) => setEditQa((f) => ({ ...f, question: e.target.value }))} style={A.input} />
          </label>
          <label style={A.label}>Cevap *
            <textarea rows={6} value={editQa.answer || ''} onChange={(e) => setEditQa((f) => ({ ...f, answer: e.target.value }))} style={{ ...A.input, resize: 'vertical' }} />
          </label>
          <label style={{ fontSize: 13.5, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <input type="checkbox" checked={editQa.published ?? true} onChange={(e) => setEditQa((f) => ({ ...f, published: e.target.checked }))} /> Yayında
          </label>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'space-between', flexWrap: 'wrap' }}>
            {editQa.id ? <button onClick={() => removeRow('qa_items', editQa.id!)} style={A.btnDanger}>Sil</button> : <span />}
            <button disabled={busy} onClick={saveQa} style={A.btn}>Kaydet</button>
          </div>
        </Modal>
      )}

      {editAct && (
        <Modal title={editAct.id ? 'Faaliyet Düzenle' : 'Yeni Faaliyet'} onClose={() => setEditAct(null)} wide>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14 }}>
            <label style={A.label}>Tarih etiketi (ör. Eylül 2026)
              <input value={editAct.date_label || ''} onChange={(e) => setEditAct((f) => ({ ...f, date_label: e.target.value }))} style={A.input} />
            </label>
            <label style={A.label}>Sıra
              <input type="number" value={editAct.sort_order ?? 0} onChange={(e) => setEditAct((f) => ({ ...f, sort_order: Number(e.target.value) }))} style={A.input} />
            </label>
            <label style={A.label}>Görsel URL
              <input value={editAct.image_url || ''} onChange={(e) => setEditAct((f) => ({ ...f, image_url: e.target.value }))} style={A.input} />
            </label>
          </div>
          <label style={A.label}>Başlık *
            <input value={editAct.title || ''} onChange={(e) => setEditAct((f) => ({ ...f, title: e.target.value }))} style={A.input} />
          </label>
          <label style={A.label}>Açıklama *
            <textarea rows={4} value={editAct.description || ''} onChange={(e) => setEditAct((f) => ({ ...f, description: e.target.value }))} style={{ ...A.input, resize: 'vertical' }} />
          </label>
          <label style={{ fontSize: 13.5, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <input type="checkbox" checked={editAct.published ?? true} onChange={(e) => setEditAct((f) => ({ ...f, published: e.target.checked }))} /> Yayında
          </label>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'space-between', flexWrap: 'wrap' }}>
            {editAct.id ? <button onClick={() => removeRow('activities', editAct.id!)} style={A.btnDanger}>Sil</button> : <span />}
            <button disabled={busy} onClick={saveAct} style={A.btn}>Kaydet</button>
          </div>
        </Modal>
      )}

      {editInst && (
        <Modal title={editInst.id ? 'Hoca Düzenle' : 'Yeni Hoca'} onClose={() => setEditInst(null)} wide>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14 }}>
            <label style={A.label}>Kurul *
              <input value={editInst.group_name || ''} onChange={(e) => setEditInst((f) => ({ ...f, group_name: e.target.value }))} style={A.input} />
            </label>
            <label style={A.label}>Ad Soyad *
              <input value={editInst.name || ''} onChange={(e) => setEditInst((f) => ({ ...f, name: e.target.value }))} style={A.input} />
            </label>
            <label style={A.label}>Görev / Alan *
              <input value={editInst.role || ''} onChange={(e) => setEditInst((f) => ({ ...f, role: e.target.value }))} style={A.input} />
            </label>
            <label style={A.label}>Sıra
              <input type="number" value={editInst.sort_order ?? 0} onChange={(e) => setEditInst((f) => ({ ...f, sort_order: Number(e.target.value) }))} style={A.input} />
            </label>
            <label style={A.label}>Fotoğraf URL
              <input value={editInst.photo_url || ''} onChange={(e) => setEditInst((f) => ({ ...f, photo_url: e.target.value }))} style={A.input} />
            </label>
          </div>
          <label style={A.label}>Kısa biyografi (kart) *
            <textarea rows={2} value={editInst.bio || ''} onChange={(e) => setEditInst((f) => ({ ...f, bio: e.target.value }))} style={{ ...A.input, resize: 'vertical' }} />
          </label>
          <label style={A.label}>Uzun biyografi (profil penceresi)
            <textarea rows={4} value={editInst.bio_long || ''} onChange={(e) => setEditInst((f) => ({ ...f, bio_long: e.target.value }))} style={{ ...A.input, resize: 'vertical' }} />
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14 }}>
            <label style={A.label}>Kitaplar (her satır: Başlık | Bilgi)
              <textarea rows={3} value={editInst.booksText || ''} onChange={(e) => setEditInst((f) => ({ ...f, booksText: e.target.value }))} style={{ ...A.input, resize: 'vertical' }} />
            </label>
            <label style={A.label}>Makaleler (her satır: Başlık | Bilgi)
              <textarea rows={3} value={editInst.articlesText || ''} onChange={(e) => setEditInst((f) => ({ ...f, articlesText: e.target.value }))} style={{ ...A.input, resize: 'vertical' }} />
            </label>
            <label style={A.label}>Videolar (her satır: Başlık | Bilgi)
              <textarea rows={3} value={editInst.videosText || ''} onChange={(e) => setEditInst((f) => ({ ...f, videosText: e.target.value }))} style={{ ...A.input, resize: 'vertical' }} />
            </label>
            <label style={A.label}>Sosyal medya (her satır: Etiket | URL)
              <textarea rows={3} value={editInst.socialText || ''} onChange={(e) => setEditInst((f) => ({ ...f, socialText: e.target.value }))} style={{ ...A.input, resize: 'vertical' }} />
            </label>
          </div>
          <label style={{ fontSize: 13.5, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <input type="checkbox" checked={editInst.published ?? true} onChange={(e) => setEditInst((f) => ({ ...f, published: e.target.checked }))} /> Yayında
          </label>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'space-between', flexWrap: 'wrap' }}>
            {editInst.id ? <button onClick={() => removeRow('instructors', editInst.id!)} style={A.btnDanger}>Sil</button> : <span />}
            <button disabled={busy} onClick={saveInst} style={A.btn}>Kaydet</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
