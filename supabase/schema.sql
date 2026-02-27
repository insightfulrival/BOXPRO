-- BOXPRO Database Schema
-- Run this in Supabase SQL Editor

-- Projects table
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  title_ro text not null,
  title_en text not null,
  description_ro text default '',
  description_en text default '',
  category text not null check (category in ('locuinta', 'birou', 'depozit', 'custom')),
  price numeric,
  currency text default 'EUR' check (currency in ('EUR', 'RON')),
  featured boolean default false,
  order_index integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Photos table
create table public.photos (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  url text not null,
  alt_ro text default '',
  alt_en text default '',
  placement text not null check (placement in ('hero', 'gallery', 'section_offers', 'project')),
  order_index integer default 0,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.projects enable row level security;
alter table public.photos enable row level security;

-- Public read policies
create policy "Projects are publicly readable" on public.projects
  for select using (true);

create policy "Photos are publicly readable" on public.photos
  for select using (true);

-- Authenticated write policies for projects
create policy "Authenticated users can insert projects" on public.projects
  for insert with check (auth.role() = 'authenticated');

create policy "Authenticated users can update projects" on public.projects
  for update using (auth.role() = 'authenticated');

create policy "Authenticated users can delete projects" on public.projects
  for delete using (auth.role() = 'authenticated');

-- Authenticated write policies for photos
create policy "Authenticated users can insert photos" on public.photos
  for insert with check (auth.role() = 'authenticated');

create policy "Authenticated users can update photos" on public.photos
  for update using (auth.role() = 'authenticated');

create policy "Authenticated users can delete photos" on public.photos
  for delete using (auth.role() = 'authenticated');

-- Storage bucket for photos
insert into storage.buckets (id, name, public)
  values ('photos', 'photos', true);

-- Storage policies
create policy "Photos are publicly accessible" on storage.objects
  for select using (bucket_id = 'photos');

create policy "Authenticated users can upload photos" on storage.objects
  for insert with check (bucket_id = 'photos' and auth.role() = 'authenticated');

create policy "Authenticated users can delete photos" on storage.objects
  for delete using (bucket_id = 'photos' and auth.role() = 'authenticated');

-- Auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at
  before update on public.projects
  for each row execute function public.handle_updated_at();
