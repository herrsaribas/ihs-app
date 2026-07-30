'use client';

import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase/client';
import type { Lang } from '@/lib/i18n';
import type { QAEntry } from '@/lib/content/soru';
import type { KadroGroup } from '@/lib/content/kadro';

/**
 * CMS hooks: read published content from Supabase, fall back to the bundled
 * default content when Supabase is not configured or the table is empty.
 */

export function useQaItems(lang: Lang, fallback: QAEntry[]): QAEntry[] {
  const [items, setItems] = useState<QAEntry[]>(fallback);
  useEffect(() => {
    setItems(fallback);
    const sb = getSupabase();
    if (!sb) return;
    let alive = true;
    sb.from('qa_items')
      .select('category,question,answer,source')
      .eq('lang', lang)
      .eq('published', true)
      .order('sort_order')
      .then(({ data }) => {
        if (alive && data && data.length) {
          setItems(data.map((r) => ({ cat: r.category, q: r.question, a: r.answer, src: r.source || '' })));
        }
      });
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);
  return items;
}

export interface ActivityEntry { date: string; title: string; desc: string; imageUrl?: string | null }

export function useActivities(lang: Lang, fallback: ActivityEntry[]): ActivityEntry[] {
  const [items, setItems] = useState<ActivityEntry[]>(fallback);
  useEffect(() => {
    setItems(fallback);
    const sb = getSupabase();
    if (!sb) return;
    let alive = true;
    sb.from('activities')
      .select('date_label,title,description,image_url')
      .eq('lang', lang)
      .eq('published', true)
      .order('sort_order')
      .then(({ data }) => {
        if (alive && data && data.length) {
          setItems(data.map((r) => ({ date: r.date_label, title: r.title, desc: r.description, imageUrl: r.image_url })));
        }
      });
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);
  return items;
}

export function useInstructorGroups(lang: Lang, fallback: KadroGroup[]): KadroGroup[] {
  const [groups, setGroups] = useState<KadroGroup[]>(fallback);
  useEffect(() => {
    setGroups(fallback);
    const sb = getSupabase();
    if (!sb) return;
    let alive = true;
    sb.from('instructors')
      .select('group_name,name,role,bio,bio_long,books,articles,videos,social,photo_url')
      .eq('lang', lang)
      .eq('published', true)
      .order('sort_order')
      .then(({ data }) => {
        if (!alive || !data || !data.length) return;
        const byGroup = new Map<string, KadroGroup>();
        for (const r of data) {
          if (!byGroup.has(r.group_name)) {
            const fb = fallback.find((g) => g.name === r.group_name);
            byGroup.set(r.group_name, { name: r.group_name, desc: fb?.desc || '', members: [] });
          }
          byGroup.get(r.group_name)!.members.push({
            name: r.name, role: r.role, bio: r.bio, bioLong: r.bio_long || r.bio,
            books: r.books || [], articles: r.articles || [], videos: r.videos || [],
            social: r.social || [], photoUrl: r.photo_url || undefined,
          });
        }
        setGroups([...byGroup.values()]);
      });
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);
  return groups;
}
