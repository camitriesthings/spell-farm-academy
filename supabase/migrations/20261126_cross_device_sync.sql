-- Spell Farm Academy: private per-user progress and farm photos.
create table if not exists public.user_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_state enable row level security;
revoke all on table public.user_state from anon, authenticated;
grant select, insert, update on table public.user_state to authenticated;

drop policy if exists "Users can read their own farm state" on public.user_state;
create policy "Users can read their own farm state"
on public.user_state for select to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Users can create their own farm state" on public.user_state;
create policy "Users can create their own farm state"
on public.user_state for insert to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own farm state" on public.user_state;
create policy "Users can update their own farm state"
on public.user_state for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('farm-photos', 'farm-photos', false, 8388608, array['image/jpeg','image/png','image/webp','image/gif'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Users can view their own farm photo" on storage.objects;
create policy "Users can view their own farm photo"
on storage.objects for select to authenticated
using (bucket_id = 'farm-photos' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "Users can upload their own farm photo" on storage.objects;
create policy "Users can upload their own farm photo"
on storage.objects for insert to authenticated
with check (bucket_id = 'farm-photos' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "Users can replace their own farm photo" on storage.objects;
create policy "Users can replace their own farm photo"
on storage.objects for update to authenticated
using (bucket_id = 'farm-photos' and (storage.foldername(name))[1] = (select auth.uid())::text)
with check (bucket_id = 'farm-photos' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "Users can delete their own farm photo" on storage.objects;
create policy "Users can delete their own farm photo"
on storage.objects for delete to authenticated
using (bucket_id = 'farm-photos' and (storage.foldername(name))[1] = (select auth.uid())::text);
