# SETUP.md — Production Deployment Manual — ScienceMaterial · 82 Labs + Gated Access

> From local workspace → GitHub → Supabase → Vercel → Production

---

## 0. Overview

**Stack:** Next.js 15 App Router, React 19, Supabase Auth + PostgreSQL, Drizzle ORM, Tailwind, 82 interactive labs (static + secure API), gated access with free tier 5 labs, admin approval, in-app notifications.

**New Feature (Gated Access):**
- Free tier: 5 polished labs + 5 quizzes for all users (no auth needed for free)
- Full access: 82 labs + all quizzes requires phone + admin approval
- Server-enforced gating (no client CSS bypass), middleware protects `/experiments/*.html`, secure API `/api/experiments/html?slug=`
- Admin > Users: view requests, phone, approve/reject, 3-day re-request cooldown, notifications via bell icon

**Build:** 32 routes, Admin 169kB, Middleware 94.2kB, First Load 101kB

---

## 1. Prerequisites

- **Node.js 20+** (20.11 LTS recommended, Node 22 also works)
- **npm 10+**
- **Git**
- **Supabase account** — https://supabase.com
- **Vercel account** — https://vercel.com
- **GitHub account**

Check versions:

```bash
node -v   # should be >=20
npm -v    # >=10
git --version
npx drizzle-kit --version
```

---

## 2. Local Workspace Setup (Starting Point)

You already have local workspace at `/home/user` or your machine:

```bash
pwd
ls -la
# Should see: app/, components/, lib/, public/experiments/*.html (82), package.json, SETUP.md, etc.
```

### 2.1 Install dependencies

```bash
npm install
```

This installs:
- `next@15.3.3`, `react@19.1.0`
- `@supabase/supabase-js@2.109.0`, `@supabase/ssr@0.12.7` (Auth + SSR)
- `drizzle-orm@0.45.3`, `drizzle-kit@0.31.11`, `postgres@3.4.9` (DB)
- `tsx@4.19.1` (for seed script)
- `@playwright/test` (e2e)
- Tiptap, Dexie, etc.

If `npm install` fails due to peer deps:

```bash
npm install --legacy-peer-deps
```

### 2.2 Environment - Local Dev (Dummy Mode)

For local dev without Supabase, we have fallback file-based storage:

`.env.local` (already exists with dummy):

```env
NEXT_PUBLIC_SUPABASE_URL=https://dummy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy
SUPABASE_SERVICE_ROLE_KEY=dummy
```

In dummy mode:
- `data/profiles-mock.json` holds mock users (admin + test-user)
- `data/lab-access-requests.json` holds requests
- `data/notifications.json` holds notifications
- All 5 free labs work without auth, non-free gated via mock profile status

Run dev:

```bash
npm run dev
# → http://localhost:3000
```

Test free tier:

```bash
curl http://localhost:3000/api/experiments/html?slug=measurement-ruler # 200
curl http://localhost:3000/api/experiments/html?slug=ohms-law # 403 gated if mock=none
```

---

## 3. GitHub - Push Local Workspace

### 3.1 Init Git (if not already)

```bash
git status
# If not a git repo:
git init
git add .
git commit -m "feat: 82 labs + gated access free tier 5 + admin approval + notifications"
```

### 3.2 Create GitHub Repo

1. Go to https://github.com/new
2. Name: `sciencematerial` or `science-material`
3. Private or Public
4. **Do NOT** init with README (you already have)
5. Create

### 3.3 Push

```bash
git remote add origin https://github.com/YOUR_USERNAME/sciencematerial.git
git branch -M main
git push -u origin main
```

If you already have origin:

```bash
git remote -v
git add .
git commit -m "feat: gated access + seed + prod checklist"
git push origin main
```

### 3.4 Verify

- GitHub repo shows 82 labs in `public/experiments/`
- `drizzle/0000_initial.sql` exists
- `scripts/seed.ts` exists
- `package.json` has `db:seed`, `db:generate`, `db:migrate`, `db:push`

---

## 4. Supabase Setup (Production DB)

### 4.1 Create Project

1. https://supabase.com → Dashboard → New Project
2. Name: `sciencematerial`
3. DB Password: generate strong, save to password manager
4. Region: **Singapore (ap-southeast-1)** for MY users
5. Pricing: Free tier works for start (500MB DB)
6. Wait ~2 mins for provisioning

### 4.2 Get Connection Strings

Dashboard → Project Settings → Database → Connection String:

**For App Runtime (Pooler, port 6543):**
```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
```
Copy to `DATABASE_URL` (app)

**For Migrations (Direct, port 5432):**
```
postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```
Copy to `DATABASE_URL_MIGRATE` or use as `DATABASE_URL` when running `db:migrate`

**Pooler vs Direct:**
- Pooler (6543 + pgbouncer=true) → Use in Vercel env `DATABASE_URL`, supports serverless
- Direct (5432) → Use locally for `drizzle-kit migrate` (needs direct)

### 4.3 Get API Keys

Dashboard → Project Settings → API:

- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL` = `https://[PROJECT-REF].supabase.co`
- **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `eyJ...` (long JWT)
- **service_role** → `SUPABASE_SERVICE_ROLE_KEY` = `eyJ...` (secret, server only, never expose to client)

### 4.4 Configure Auth

Dashboard → Authentication → Providers:
- Enable **Email** provider (default)
- Disable others (or keep as needed)

Dashboard → Authentication → URL Configuration:
- **Site URL:** `http://localhost:3000` for local, later add production `https://yourdomain.com`
- **Redirect URLs:** Add:
  ```
  http://localhost:3000/auth/callback
  http://localhost:3000/*
  https://yourdomain.com/auth/callback
  https://yourdomain.com/*
  ```

### 4.5 Create Tables

**Option A: Drizzle Push (Quick, for dev):**

```bash
# Use direct connection for push
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres" npm run db:push
```

This pushes schema from `lib/db/schema.ts` directly to DB (no migration file needed). Creates:
- profiles (with phone, lab_access_status, etc)
- lab_access_requests
- notifications
- books, chapters, sections, content_blocks, experiments, experiment_versions, quizzes, questions, quiz_attempts, progress, progress_events, bookmarks, admin_audit_logs

**Option B: Drizzle Migrate (Production, recommended):**

```bash
# Generate migration file from schema
npm run db:generate
# This creates drizzle/0000_xxx.sql + meta/_journal.json (we already have 0000_initial.sql)

# Apply migration with direct connection
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres" npm run db:migrate
```

If `drizzle/` folder missing, we already have `drizzle/0000_initial.sql` committed. It contains CREATE TABLE for all.

**Verify in Supabase Dashboard → Table Editor:** You should see 15 tables.

### 4.6 Enable RLS and Policies (Critical!)

Go to Supabase Dashboard → SQL Editor → New Query, paste:

```sql
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

-- Lab access requests
drop policy if exists "Users can view own requests" on lab_access_requests;
create policy "Users can view own requests" on lab_access_requests for select using (auth.uid()::text = user_id);

drop policy if exists "Users can create own requests" on lab_access_requests;
create policy "Users can create own requests" on lab_access_requests for insert with check (auth.uid()::text = user_id);

drop policy if exists "Admins can manage all requests" on lab_access_requests;
create policy "Admins can manage all requests" on lab_access_requests for all using (
  exists (select 1 from profiles where id = auth.uid()::text and role = 'admin')
);

-- Notifications
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

-- Public read for curriculum
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

-- Admin audit logs - admin only
drop policy if exists "Admins can view audit logs" on admin_audit_logs;
create policy "Admins can view audit logs" on admin_audit_logs for select using (
  exists (select 1 from profiles where id = auth.uid()::text and role = 'admin')
);
```

Click **Run**. Should say Success.

**If RLS blocks signup:** Use service role client in signup route (we already do `createServiceClient()` for profile upsert).

### 4.7 Seed Data

```bash
# Copy .env.example to .env.local and fill real Supabase values first
cp .env.example .env.local
# Edit .env.local with real DATABASE_URL (direct), NEXT_PUBLIC_SUPABASE_URL, etc.

# Then seed
npm run db:seed
```

What seed does (`scripts/seed.ts`):
- If DATABASE_URL dummy → file-based fallback: creates `data/profiles-mock.json` with admin + test-user, empty requests/notifications, verifies 82 HTML files + 100 screenshots
- If DATABASE_URL real → connects via postgres-js, inserts 6 books, logs chapter count from data.ts, inserts 82 experiments from custom-index.json (with htmlSource first 10k), logs profiles will be created via Auth flow

Expected output:
```
🌱 ScienceMaterial Seed - 82 Labs + Curriculum
✅ Seeded 2 mock profiles
✅ Found 82 experiment HTML files
✅ custom-index.json has 82 entries
✅ Free tier: 5/5 labs
🎉 Seed complete!
```

If seed fails due to connection, it falls back to file-based.

---

## 5. Local Development (After Supabase Setup)

Create `.env.local` with real values:

```env
DATABASE_URL=postgresql://postgres.[ref]:[pass]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true
NEXT_PUBLIC_SUPABASE_URL=https://[ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Run:

```bash
npm run dev
# → http://localhost:3000
# Landing: /
# Dashboard: /dashboard (requires auth)
# Courses: /courses (6 books, 64 chapters)
# Laboratory: /laboratory (82 labs, 5 free polished + 77 locked)
# Onboarding: /onboarding/access (request flow)
# Admin: /admin (requires role=admin)
# Settings: /settings (shows access status)
```

**Auth Flow (New):**
1. Signup `/auth/signup` → Supabase Auth signUp + profiles upsert age 13+ role=user lab_access_status=none
2. Redirect to `/onboarding/access` → Choice Yes/Skip, phone form
3. Request → POST `/api/access/request` → pending
4. Admin approves in `/admin` Users tab → notification via bell
5. User sees notification, now can access all labs

**Test Free Tier:**
```bash
# Free labs should 200 without auth
curl http://localhost:3000/api/experiments/html?slug=measurement-ruler

# Locked labs should 401 if not auth, 403 if auth but not approved
curl http://localhost:3000/api/experiments/html?slug=ohms-law

# Direct static access to locked should 403 via middleware
curl http://localhost:3000/experiments/ohms-law.html
```

**Test Full Flow:**
```bash
npm run test:e2e:gated
# Should show 7 passed + 1 passed full flow
```

---

## 6. Git Push to GitHub (Production Source)

```bash
# Ensure .env.local is gitignored (it is, check .gitignore)
cat .gitignore | grep env

# Add all
git add .

# Commit
git commit -m "feat: prod ready - seed, RLS, gated access, free tier 5 polished, notifications, admin users"

# Push to GitHub
git push origin main
```

If you need to set remote:

```bash
git remote add origin https://github.com/YOUR_USERNAME/sciencematerial.git
git branch -M main
git push -u origin main
```

---

## 7. Vercel Deployment

### 7.1 Import Project

1. Vercel Dashboard → Add New → Project → Import Git Repository → Select `sciencematerial`
2. Framework Preset: **Next.js**
3. Root Directory: `./` (default)
4. Build Command: `npm run build` (default)
5. Output Directory: `.next` (default)
6. Install Command: `npm install`

### 7.2 Environment Variables

Vercel → Project → Settings → Environment Variables → Add:

| Variable | Value | Env |
|----------|-------|-----|
| `DATABASE_URL` | Pooler URL `postgresql://postgres.[ref]:[pass]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://[ref].supabase.co` | All |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon key | All |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role key (secret) | All |
| `NEXT_PUBLIC_APP_URL` | `https://yourdomain.vercel.app` (or custom domain) | Production |

**Important:** Use Pooler (6543) for `DATABASE_URL` in Vercel, not Direct (5432). Direct is only for local `db:migrate`.

### 7.3 Deploy

Click **Deploy**. Wait ~2 mins.

First deploy may fail if DB not migrated yet — that's okay, we migrate next.

### 7.4 Update Supabase Auth URLs for Production

Supabase Dashboard → Authentication → URL Configuration:

- **Site URL:** `https://yourdomain.vercel.app`
- **Redirect URLs:** Add:
  ```
  https://yourdomain.vercel.app/auth/callback
  https://yourdomain.vercel.app/*
  ```

### 7.5 Run Migration & Seed on Production DB

Locally, using **Direct** connection (5432):

```bash
# Set direct URL temporarily
export DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres"

# Push schema (if you didn't already)
npm run db:push
# or
npm run db:migrate

# Seed
npm run db:seed
```

Expected: Books 6, experiments 82 seeded.

Alternatively, you can run SQL directly in Supabase SQL Editor using `drizzle/0000_initial.sql` content.

### 7.6 Verify Production

- Open `https://yourdomain.vercel.app` → Landing should show ScienceMaterial, no duzhong, footer © 2026 ScienceMaterial
- `/laboratory` → Should show 5 free polished labs with iframe, 77 locked cards with lock icon
- `/onboarding/access` → Should show choice + free list
- `/quizzes` → 5 free + locked
- Bell icon visible in navbar

---

## 8. Admin Setup (First Admin)

1. **Sign up normally:** Go to `https://yourdomain.vercel.app/auth/signup` → create account with your email, age 13+
2. **Get UID:** Supabase Dashboard → Authentication → Users → copy UID of your user
3. **Make admin:** Dashboard → Table Editor → `profiles` → find your email → edit `role` = `admin`, `lab_access_status` = `approved`
4. **Or via SQL:**

```sql
update profiles set role='admin', lab_access_status='approved' where email='your-email@example.com';
```

5. **Login:** Go to `/auth/login` → login → `/admin` → should see Admin Dashboard
6. **Users Tab:** Should show all users, pending first, with phone, approve/reject buttons

No admin signup page by design (security).

---

## 9. Experiments — 82 Labs + Free Tier Polished

- **Location:** `public/experiments/*.html` (82 files, 19k-141k each)
- **Index:** `public/experiments/custom-index.json` (82 entries, no duzhong, no license)
- **Screenshots:** `public/screenshots/*.png` (100) + `docs/screenshots/` (101)
- **Free Tier:** First 5 are very polished (toolbar 52px, logo 20px, canvas 1200x600, chart, metrics, tabs, qbox/kbox, dock, high contrast)
  - measurement-ruler, density-explorer, floating-sinking, wave-generator, reflection
- **Serving:**
  - Free: `/experiments/slug.html` direct (200) + `/api/experiments/html?slug=` (200)
  - Locked: `/experiments/slug.html` direct → 403 gated HTML via middleware, `/api/experiments/html?slug=` → 403 JSON gated unless approved
  - Lab page `/laboratory/[slug]` → Server Component checks access, returns GatedLabOverlay (no iframe) if not allowed
- **UI:** Unified logo `/logo.svg` via Logo component, #f9fbf3 cards, 52px toolbar, high contrast #5A605D secondary

---

## 10. Gated Access Feature - Technical Details

### Free vs Full

```ts
// lib/access/free-tier.ts
FREE_EXPERIMENT_SLUGS = 5
FREE_QUIZ_IDS = 5

// lib/access/check.ts
canAccessExperiment(profile, slug):
  if isFreeExperiment(slug) => true
  if profile.role=admin => true
  if profile.lab_access_status=approved => true
  else false

canRequestAccess:
  none => allowed
  pending => not allowed (pending review)
  approved => not allowed (already)
  rejected => check reviewed_at + 3 days cooldown
```

### Phone Validation

MY format: `012-3456789`, `+6012-3456789`, `60123456789`, 9-11 digits, normalize to +60

### Notifications

- In-app only, no email (as requested)
- Bell polls `/api/notifications` every 30s
- Types: lab_access_pending, approved, rejected
- Mark read / mark all read

### Re-request Cooldown

Rejected users can re-request after 3 days. Server checks `reviewed_at + 3*24*60*60*1000`. UI shows countdown.

---

## 11. Useful Commands

```bash
# Dev
npm run dev

# Build
npm run build
npm run start

# DB
npm run db:generate   # Generate migration from schema.ts -> drizzle/
npm run db:migrate    # Apply migrations (use direct DATABASE_URL)
npm run db:push       # Push schema directly (quick, no migration file)
npm run db:seed       # Seed books + experiments + mock profiles (file fallback if dummy)
npm run db:studio     # Open Drizzle Studio to view DB
npm run db:check      # Check for schema drift

# Tests
npm run test:e2e                # All e2e
npm run test:e2e:all-labs       # 82 labs
npm run test:e2e:gated          # Gated access 7 + full flow 1

# Direct playwright
npx playwright test --project=chromium --reporter=list
npx playwright test tests/e2e/gated-access.spec.ts --project=chromium
npx playwright install chromium --with-deps
```

---

## 12. Troubleshooting

**Supabase Auth not working:**
- Check `NEXT_PUBLIC_SUPABASE_URL` and `ANON_KEY` correct, no trailing slash
- Check cookies enabled, middleware matcher includes `/auth/*`, `/laboratory/*`, `/experiments/*`
- Check Supabase Auth URL Configuration has your domain

**DATABASE_URL pgbouncer error:**
- App runtime: use Pooler `...:6543/...?pgbouncer=true` + `prepare: false` in postgres-js (already in lib/db/index.ts)
- Migrations: use Direct `...:5432/...` (no pgbouncer)

**RLS blocks profile insert:**
- Use service role client for signup (we do in `app/api/auth/signup` and `lib/supabase/server.ts createServiceClient()`)
- Check policies in SQL Editor

**Experiments not loading:**
- Check `public/experiments/*.html` exists (82 files)
- Check `custom-index.json` has 82 entries
- For non-free, check mock profile status is approved for all-labs tests: `data/profiles-mock.json` labAccessStatus=approved
- For free tier test, set mock to none

**Build fails:**
- `npm install` (ensure tsx installed)
- Check `drizzle/` folder exists (we have 0000_initial.sql)
- Check `lib/db/schema.ts` syntax
- Run `npm run build -- --no-lint` to skip lint

**Gated labs always 403 even after approve:**
- Check `/api/access/status` returns approved + canAccessAll true
- Check mock file `data/profiles-mock.json` status
- If Supabase real, check `profiles.lab_access_status` in Table Editor
- Check `isFreeExperiment()` list includes slug

**Admin Users tab empty:**
- Check `/api/admin/users` returns mock=true with 5 users in dummy mode
- In prod, need admin role + Supabase configured + profiles table has data
- Check RLS policies for admin

**Notifications not showing:**
- Check `/api/notifications` returns data
- Check bell component polls every 30s, unreadCount
- After approve/reject, notification created via `lab_access_requests` -> `notifications` insert

**Phone validation fails:**
- Accepts MY formats: 0123456789, 012-3456789, +60123456789, 60123456789
- Regex in `app/api/access/request/route.ts` validatePhone()

---

## 13. Production Checklist

- [ ] GitHub repo pushed with 82 labs, seed, drizzle migration
- [ ] Supabase project created Singapore region
- [ ] DATABASE_URL (pooler 6543) + direct (5432) obtained
- [ ] API keys obtained (URL, anon, service_role)
- [ ] `.env.local` filled locally, Vercel env vars filled
- [ ] `npm run db:push` or `db:migrate` executed with direct URL
- [ ] RLS policies SQL executed in Supabase SQL Editor
- [ ] `npm run db:seed` executed (books 6 + experiments 82)
- [ ] First admin created via SQL `update profiles set role='admin'...`
- [ ] Vercel deployed, 32 routes, build passes
- [ ] Supabase Auth URLs updated with production domain
- [ ] Tested: signup → onboarding → request with phone → admin Users → approve → bell notification → access locked lab (ohms-law) 200
- [ ] Tested direct bypass: `curl /experiments/ohms-law.html` without auth → 403 gated HTML
- [ ] Tested free tier: 5 free labs always 200 even without auth
- [ ] Tested re-request cooldown: reject → immediate re-request → 400 with date
- [ ] Verified no duzhong branding anywhere (grep 0)
- [ ] Verified footer only ScienceMaterial
- [ ] Verified high contrast, Apple HIG

---

**Full Stack:** Next.js 15 + Supabase Auth + PostgreSQL + RLS + Drizzle ORM + 82 Labs (5 free polished) + Gated Access (phone + admin approval + 3-day cooldown + notifications) + Admin Users Management + Complete CMS + High Contrast + ScienceMaterial Branding Only

---

## 14. Accessing Setup Docs in Production

- Raw markdown: `https://yourdomain.com/setup.md` (served from `public/setup.md`)
- Rendered page: `https://yourdomain.com/setup` (Next.js page that reads `SETUP.md`)
- RLS SQL standalone: `scripts/setup-rls.sql`
- Seed script: `scripts/seed.ts` via `npm run db:seed`
- Migration SQL: `drizzle/0000_initial.sql`
- Env template: `.env.example`
