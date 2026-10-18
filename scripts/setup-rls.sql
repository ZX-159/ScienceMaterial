-- ScienceMaterial RLS Policies - Production Ready
-- Run this in Supabase Dashboard > SQL Editor after migrations

-- Enable RLS
alter table profiles enable row level security;
alter table lab_access_requests enable row level security;
alter table notifications enable row level security;
alter table progress enable row level security;
alter table bookmarks enable row level security;
alter table quiz_attempts enable row level security;
alter table experiments enable row level security;
alter table books enable row level security;
alter table chapters enable row level security;
alter table sections enable row level security;
alter table quizzes enable row level security;
alter table questions enable row level security;
alter table progress_events enable row level security;
alter table admin_audit_logs enable row level security;

-- Profiles policies
drop policy if exists "Public profiles are viewable by everyone" on profiles;
create policy "Public profiles are viewable by everyone" on profiles for select using (true);

drop policy if exists "Users can insert own profile" on profiles;
create policy "Users can insert own profile" on profiles for insert with check (auth.uid()::text = id);

drop policy if exists "Users can update own profile" on profiles;
create policy "Users can update own profile" on profiles for update using (auth.uid()::text = id);

drop policy if exists "Admins can manage all profiles" on profiles;
create policy "Admins can manage all profiles" on profiles for all using (
  exists (select 1 from profiles where id = auth.uid()::text and role = 'admin')
);

-- Lab access requests - users can view own, admins all
drop policy if exists "Users can view own requests" on lab_access_requests;
create policy "Users can view own requests" on lab_access_requests for select using (auth.uid()::text = user_id);

drop policy if exists "Users can create own requests" on lab_access_requests;
create policy "Users can create own requests" on lab_access_requests for insert with check (auth.uid()::text = user_id);

drop policy if exists "Admins can manage all requests" on lab_access_requests;
create policy "Admins can manage all requests" on lab_access_requests for all using (
  exists (select 1 from profiles where id = auth.uid()::text and role = 'admin')
);

-- Notifications - owner + admin
drop policy if exists "Users can manage own notifications" on notifications;
create policy "Users can manage own notifications" on notifications for all using (auth.uid()::text = user_id);

drop policy if exists "Admins can manage notifications" on notifications;
create policy "Admins can manage notifications" on notifications for all using (
  exists (select 1 from profiles where id = auth.uid()::text and role = 'admin')
);

-- Progress, bookmarks, attempts - owner only
drop policy if exists "Users can manage own progress" on progress;
create policy "Users can manage own progress" on progress for all using (auth.uid()::text = user_id);

drop policy if exists "Users can manage own bookmarks" on bookmarks;
create policy "Users can manage own bookmarks" on bookmarks for all using (auth.uid()::text = user_id);

drop policy if exists "Users can manage own attempts" on quiz_attempts;
create policy "Users can manage own attempts" on quiz_attempts for all using (auth.uid()::text = user_id);

-- Public read for curriculum (free tier + gated handled in app layer, not RLS)
drop policy if exists "Experiments public read" on experiments;
create policy "Experiments public read" on experiments for select using (true);

drop policy if exists "Books public read" on books;
create policy "Books public read" on books for select using (true);

drop policy if exists "Chapters public read" on chapters;
create policy "Chapters public read" on chapters for select using (true);

drop policy if exists "Sections public read" on sections;
create policy "Sections public read" on sections for select using (true);

drop policy if exists "Quizzes public read" on quizzes;
create policy "Quizzes public read" on quizzes for select using (true);

drop policy if exists "Questions public read" on questions;
create policy "Questions public read" on questions for select using (true);

-- Progress events - owner + admin
drop policy if exists "Users can manage own events" on progress_events;
create policy "Users can manage own events" on progress_events for all using (auth.uid()::text = user_id);

-- Admin audit logs - admin only
drop policy if exists "Admins can view audit logs" on admin_audit_logs;
create policy "Admins can view audit logs" on admin_audit_logs for select using (
  exists (select 1 from profiles where id = auth.uid()::text and role = 'admin')
);

drop policy if exists "Admins can insert audit logs" on admin_audit_logs;
create policy "Admins can insert audit logs" on admin_audit_logs for insert with check (
  exists (select 1 from profiles where id = auth.uid()::text and role = 'admin')
);

-- Verify
select 'RLS policies applied' as status;
