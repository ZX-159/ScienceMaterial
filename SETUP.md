# SETUP.md — Complete Deployment Manual — ScienceMaterial · 82 Labs

## 1. Prerequisites

- Node.js 20+ (recommended 20.11 LTS)
- npm 10+
- Git
- Supabase account (https://supabase.com) — PostgreSQL + Auth
- Vercel account

Check:

```bash
node -v
npm -v
git --version
```

## 2. Clone

```bash
git clone <repository-url>
cd sciencematerial
```

## 3. Install

```bash
npm install
```

Dependencies:
- `@supabase/supabase-js` — Supabase client
- `@supabase/ssr` — SSR auth helpers
- `postgres` — postgres-js driver for Drizzle
- Drizzle ORM, Tiptap, Dexie, etc.

## 4. Environment Variables

Create `.env.local` in project root:

```env
# Supabase PostgreSQL — from Supabase Dashboard > Project Settings > Database
DATABASE_URL=postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true

# Supabase Auth — from Supabase Dashboard > Project Settings > API
NEXT_PUBLIC_SUPABASE_URL=https://[project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon-key]
SUPABASE_SERVICE_ROLE_KEY=[service-role-key]

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Required variables

| Variable | Purpose | Where used |
|----------|---------|------------|
| DATABASE_URL | Supabase PostgreSQL connection | lib/db, Drizzle |
| NEXT_PUBLIC_SUPABASE_URL | Supabase project URL | lib/supabase/*, auth |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Supabase anon key | Browser client, SSR |
| SUPABASE_SERVICE_ROLE_KEY | Service role key (server only) | lib/supabase/server.ts |
| NEXT_PUBLIC_APP_URL | Canonical URL | SEO, redirects |

## 5. Supabase Setup

1. **Create project:** https://supabase.com → New Project → name `sciencematerial` → region Singapore → set DB password

2. **Get connection strings:**
   - Dashboard → Project Settings → Database → Connection string
     - Use **Pooler** (port 6543, pgbouncer=true) for app runtime
     - Use **Direct** (port 5432) for migrations

3. **Get API keys:**
   - Dashboard → Project Settings → API
     - `Project URL` → NEXT_PUBLIC_SUPABASE_URL
     - `anon public` → NEXT_PUBLIC_SUPABASE_ANON_KEY
     - `service_role` → SUPABASE_SERVICE_ROLE_KEY

4. **Configure Auth:**
   - Dashboard → Authentication → Providers → Enable Email
   - Dashboard → Authentication → URL Configuration →
     - Site URL: `http://localhost:3000` (dev), production domain for prod
     - Redirect URLs: `http://localhost:3000/auth/callback`, production callbacks

5. **Create tables via Drizzle:**
```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

Tables: `profiles`, `books`, `chapters`, `sections`, `content_blocks`, `experiments`, `experiment_versions`, `quizzes`, `questions`, `quiz_attempts`, `progress`, `progress_events`, `bookmarks`, `admin_audit_logs`

6. **Enable RLS and policies:**
In Supabase SQL Editor:

```sql
alter table profiles enable row level security;
alter table progress enable row level security;
alter table bookmarks enable row level security;
alter table quiz_attempts enable row level security;

create policy "Public profiles are viewable by everyone" on profiles for select using (true);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

create policy "Users can manage own progress" on progress for all using (auth.uid() = user_id);
create policy "Users can manage own bookmarks" on bookmarks for all using (auth.uid() = user_id);
create policy "Users can manage own attempts" on quiz_attempts for all using (auth.uid() = user_id);

alter table experiments enable row level security;
create policy "Experiments public read" on experiments for select using (true);
alter table books enable row level security;
create policy "Books public read" on books for select using (true);
alter table chapters enable row level security;
create policy "Chapters public read" on chapters for select using (true);
```

7. **Seed curriculum:**
```bash
npm run db:seed
```

8. **Create first admin:**
```bash
# 1. Sign up through normal flow: /auth/signup
# 2. In Supabase Dashboard → Authentication → Users → copy UID
# 3. In Table Editor → profiles → edit role = admin
# Or via SQL:
# update profiles set role='admin' where email='your-email@example.com';
```

## 6. Local Database Migration

```bash
# Generate migration from schema
npx drizzle-kit generate --config=drizzle.config.ts

# Apply (use direct connection)
DATABASE_URL=postgresql://postgres:[password]@db.[ref].supabase.co:5432/postgres npx drizzle-kit migrate

# Seed
npm run db:seed
```

## 7. Local Development

```bash
npm run dev
# → http://localhost:3000
# Landing: /
# Dashboard: /dashboard (requires Auth)
# Courses: /courses — 6 books, 64 chapters
# Lab: /laboratory — 82 experiments
# Admin: /admin (requires role=admin)
```

**Auth flow:**
- Signup: /auth/signup → Supabase Auth signUp + profiles upsert with age 13+
- Login: /auth/login → Supabase Auth signInWithPassword
- Middleware: lib/supabase/middleware.ts refreshes session

**Local-first progress:**
- Dexie + IndexedDB ScienceMaterialDB — progress, bookmarks
- Saves locally, syncs every 60-120s via /api/sync

**Experiments (82 labs):**
- 82 files in public/experiments/*.html — self-contained, under 500KB
- Load via ExperimentFrame → iframe src="/experiments/{slug}.html" sandbox="allow-scripts"
- Chapter mapping via bookSlug/chapterId from custom-index.json
- High contrast design, unified logo, ScienceMaterial branding only

**CMS:**
- Admin dashboard: stats from /api/experiments, 82 labs management with filter, delete, view, upload
- Course management: 6 books, 64 chapters, sections, editing, reordering, export
- Content Editor: Tiptap with blocks, Preview, Save Draft, Publish
- User management, analytics, settings

## 8. Vercel Deployment

1. **Import GitHub repository:** Vercel Dashboard → Add New → Project → Import

2. **Configure environment variables:** Vercel → Project → Settings → Environment Variables
   - Add: DATABASE_URL (pooler), NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, NEXT_PUBLIC_APP_URL

3. **Configure build:** Framework preset: Next.js, Build command: `npm run build`

4. **Deploy:** Trigger deploy

5. **Verify Auth redirect:** Supabase Dashboard → Authentication → URL Configuration → add Vercel production domain

6. **Run migration/seed on production:**
```bash
DATABASE_URL=direct_url npx drizzle-kit migrate
DATABASE_URL=direct_url npm run db:seed
```

## 9. Admin Setup

```
Normal signup: /auth/signup → Supabase Auth → profiles insert age 13+ role=user
Admin: Supabase Dashboard → Table Editor → profiles → role=admin → login → /admin
```

No admin signup page by design.

## 10. Experiments — 82 Labs

- **82 labs** in public/experiments/ — see EXPERIMENTS.md for full list
- **Curriculum fit:** lib/curriculum/data.ts — 6 books, 64 chapters, 82 labs mapped
- **UI:** Toolbar 52px, workspace flex, side-panel 300px, canvas min 320px, Focus mode, mobile dock, Investigate mode, data tables CSV, 4 tabs, question-driven, high contrast, unified ScienceMaterial branding
- **Parent integration:** sandbox allow-scripts only, postMessage API
- **Hosting:** Serve as text/html; charset=utf-8, 20-492KB each

## 11. Troubleshooting

- **Supabase Auth not working:** Check URL and ANON_KEY, cookies enabled, middleware matcher
- **DATABASE_URL pgbouncer error:** Use prepare: false in postgres-js (already configured), port 6543 with ?pgbouncer=true for app, direct 5432 for migrations
- **RLS blocks profile insert:** Check policies, or use service role client for signup route
- **Experiments not loading:** Check public/experiments/*.html exists (82 files)
- **Build fails:** npm install, check next package

---

**Full stack: Supabase Auth + PostgreSQL + RLS + Drizzle ORM + 82 experiments + Complete CMS + High Contrast Design + ScienceMaterial Branding**
