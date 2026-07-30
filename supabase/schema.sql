-- ============================================================
-- IHS — Institute for Hadith Sciences
-- Supabase schema: custom CRM (students/applications) + CMS
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor).
-- ============================================================

-- ---------- CRM: applications (Başvurular) ----------
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  program text not null,
  name text not null,
  email text not null,
  phone text,
  city text,
  education text,
  motivation text,
  lang text not null default 'tr',
  status text not null default 'new'
    check (status in ('new','review','interview','accepted','rejected','enrolled')),
  notes text
);

-- ---------- CRM: students (Öğrenciler) ----------
create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  application_id uuid references public.applications(id) on delete set null,
  name text not null,
  email text not null,
  phone text,
  city text,
  program text not null,
  enrollment_year text,
  status text not null default 'active'
    check (status in ('active','paused','graduated','left')),
  notes text
);

-- ---------- CRM: contact messages (İletişim formu) ----------
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  message text not null,
  lang text not null default 'tr',
  is_read boolean not null default false
);

-- ---------- CRM/CMS: submitted questions (Sorularla Hadis - soru sor) ----------
create table if not exists public.submitted_questions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text,
  email text,
  question text not null,
  lang text not null default 'tr',
  status text not null default 'new'
    check (status in ('new','answered','published','dismissed')),
  answer text
);

-- ---------- CMS: published Q&A (Sorularla Hadis köşesi) ----------
create table if not exists public.qa_items (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  lang text not null check (lang in ('tr','de')),
  category text not null,
  question text not null,
  answer text not null,
  source text,
  sort_order int not null default 0,
  published boolean not null default true
);

-- ---------- CMS: activities / announcements (Faaliyetler) ----------
create table if not exists public.activities (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  lang text not null check (lang in ('tr','de')),
  date_label text not null,
  title text not null,
  description text not null,
  image_url text,
  sort_order int not null default 0,
  published boolean not null default true
);

-- ---------- CMS: instructors / academic staff (Kadro) ----------
create table if not exists public.instructors (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  lang text not null check (lang in ('tr','de')),
  group_name text not null,           -- e.g. 'Danışma Kurulu' / 'Beirat'
  name text not null,
  role text not null,
  bio text not null,                  -- short bio (card)
  bio_long text,                      -- long bio (profile modal)
  books jsonb not null default '[]',      -- [{title, meta}]
  articles jsonb not null default '[]',   -- [{title, meta}]
  videos jsonb not null default '[]',     -- [{title, meta}]
  social jsonb not null default '[]',     -- [{label, url}]
  photo_url text,
  sort_order int not null default 0,
  published boolean not null default true
);

-- ============================================================
-- Row Level Security
-- Public (anon) may: submit forms + read published content.
-- Authenticated admins (Supabase Auth users) may: everything.
-- ============================================================

alter table public.applications        enable row level security;
alter table public.students            enable row level security;
alter table public.contact_messages    enable row level security;
alter table public.submitted_questions enable row level security;
alter table public.qa_items            enable row level security;
alter table public.activities          enable row level security;
alter table public.instructors         enable row level security;

-- anon inserts (public forms)
create policy "anon can submit application"
  on public.applications for insert to anon with check (true);
create policy "anon can send message"
  on public.contact_messages for insert to anon with check (true);
create policy "anon can ask question"
  on public.submitted_questions for insert to anon with check (true);

-- anon reads published CMS content
create policy "anyone can read published qa"
  on public.qa_items for select using (published);
create policy "anyone can read published activities"
  on public.activities for select using (published);
create policy "anyone can read published instructors"
  on public.instructors for select using (published);

-- authenticated admins: full access
create policy "admin full access applications"
  on public.applications for all to authenticated using (true) with check (true);
create policy "admin full access students"
  on public.students for all to authenticated using (true) with check (true);
create policy "admin full access messages"
  on public.contact_messages for all to authenticated using (true) with check (true);
create policy "admin full access questions"
  on public.submitted_questions for all to authenticated using (true) with check (true);
create policy "admin full access qa"
  on public.qa_items for all to authenticated using (true) with check (true);
create policy "admin full access activities"
  on public.activities for all to authenticated using (true) with check (true);
create policy "admin full access instructors"
  on public.instructors for all to authenticated using (true) with check (true);

-- ============================================================
-- Storage bucket for CMS images (instructor photos, activity images)
-- ============================================================
insert into storage.buckets (id, name, public)
values ('cms', 'cms', true)
on conflict (id) do nothing;

create policy "public read cms bucket"
  on storage.objects for select using (bucket_id = 'cms');
create policy "admin write cms bucket"
  on storage.objects for insert to authenticated with check (bucket_id = 'cms');
create policy "admin update cms bucket"
  on storage.objects for update to authenticated using (bucket_id = 'cms');
create policy "admin delete cms bucket"
  on storage.objects for delete to authenticated using (bucket_id = 'cms');
