# ARCHITECTURE.md

## Overview

ScienceMaterial is built as **Next.js App Router + TypeScript + Tailwind + shadcn/ui pattern** targeting **Vercel Hobby** (≤12 functions) and **Neon PostgreSQL + Neon Auth**.

Core principle: **Server Components by default, small client components only where needed** (interactive experiments, progress, search).

## Next.js Architecture

```
app/
├── layout.tsx (root, ThemeProvider, Navbar, Sidebar)
├── page.tsx (landing — static, shader hero lazy-loaded)
├── courses/
│   ├── page.tsx (static, lists 6 books)
│   └── [bookSlug]/
│       ├── page.tsx (static, book overview)
│       └── [chapterSlug]/page.tsx (dynamic, Tabs: Overview/Learn/Lab/Quiz)
├── laboratory/
│   ├── page.tsx (static, filterable grid)
│   └── [slug]/page.tsx (dynamic, iframe + info)
├── quizzes/
│   ├── page.tsx (static)
│   └── [quizId]/page.tsx (client, stateful)
├── dashboard, progress, bookmarks, search, revision, settings
├── admin/page.tsx (protected, role=admin)
└── api/
    ├── sync/ (progress sync — grouped)
    ├── experiments/ (CRUD + versioning)
    └── analytics/ (privacy-conscious)
```

- **Server Components:** Course listing, chapter content fetching, experiment metadata
- **Client Components:** ExperimentFrame (iframe + controls), QuizRenderer, Progress DB (Dexie), Search (Cmd+K), Theme toggle
- **Route Groups:** Not heavily used in MVP to keep simple; can add `(app)` and `(marketing)` later

## Server/Client Boundaries

- **Server:** DB queries (books, chapters, sections, content_blocks), auth verification (Neon Auth JWT), admin checks, SEO metadata
- **Client:** IndexedDB progress, experiment iframe interaction, quiz state, command palette, theme
- **Server Actions:** Preferred over route handlers to reduce function count
  - `saveProgressAction`
  - `publishChapterAction`
  - `createExperimentVersionAction`
  - `submitQuizAttemptAction`

## Neon + Drizzle

**Tables (planned V1):**

```
profiles (id FK Neon Auth, role, created_at)
books (id, slug, title_zh, title_en, chapter_count)
chapters (id, book_id, number, title_zh, slug, is_reconstructed, reconstructed_note, estimated_minutes)
sections (id, chapter_id, title_zh, order)
content_blocks (id, section_id, type, content JSONB, order)
experiments (id, slug, title, title_zh, description, subject, type, difficulty, chapter_id, html_source, thumbnail, version, status)
experiment_versions (id, experiment_id, html_source, version, created_at)
quizzes (id, chapter_id, title_zh)
questions (id, quiz_id, type, question_zh, explanation_zh, difficulty, points, order)
question_options (id, question_id, option_id, text_zh, is_correct)
quiz_attempts (id, user_id, quiz_id, score, completed_at)
quiz_answers (id, attempt_id, question_id, answer, is_correct)
progress (user_id, chapter_id, section_id, status, progress, last_position, last_accessed, quiz_score, completed_at, updated_at)
progress_events (id, user_id, chapter_id, event_type, created_at)
bookmarks (user_id, type, ref_id, created_at)
admin_audit_logs (id, admin_id, action, target_type, target_id, created_at)
```

- **Neon Auth owns identity** — application tables reference authenticated user ID, do not duplicate passwords
- **Drizzle ORM** for typed queries, migrations via `drizzle-kit`

## Authentication

- **Neon Auth:** Email/password, JWT, role claim
- **Normal signup:** `email/password → Neon Auth → role=user`
- **Admin:** Provisioned separately via Neon dashboard → role=admin → normal login → /admin
- **Middleware:** Protects `/admin/*` and API routes, verifies JWT + role
- **No admin signup button** — security requirement

## Server Actions vs Route Handlers

Goal: **≤12 serverless functions** on Vercel Hobby.

- Group operations into logical server boundaries:
  1. Auth (login, signup, session)
  2. Learning data (books, chapters, sections, content_blocks)
  3. Progress sync (save, fetch, merge)
  4. Admin/CMS (publish, versioning, audit)
  5. Experiments (CRUD, preview, publish version)
  6. Analytics (privacy-conscious telemetry)

- Next.js on Vercel bundles dynamic app code into fewer functions than one-route-one-function, so use framework architecture rather than manually creating dozens of tiny functions
- Prefer Server Actions where they reduce need for route handlers

## Content Model

```
Book
 └── Chapter
       └── Section
             └── ContentBlock (structured JSON)
```

- Not stored as one HTML blob
- Blocks: paragraph, heading, list, definition, table, callout, formula, diagram, experiment, quiz, code, etc.
- Allows CMS to edit individual components without destroying structure

Example:

```json
{ "type": "paragraph", "content": "测量结果含数字及单位两部分..." }
{ "type": "definition", "term": "密度", "definition": "ρ = m / V" }
{ "type": "experiment", "experimentId": "density-explorer" }
{ "type": "quiz", "quizId": "chapter-2-density-checkpoint" }
```

## Experiment System

- Single-file HTML5/JS apps stored in DB (`html_source`)
- Run inside sandboxed iframe: `sandbox="allow-scripts"` (no `allow-same-origin` for untrusted same-origin)
- Communication via `postMessage()`
- Parent controls: Reset, Pause, Resume, Fullscreen
- Future: Serve from separate origin for higher security

## Local-first Progress

- **Dexie + IndexedDB:** Immediate local write
- **Sync:** 60–120s interval + on chapter completion, quiz submission, logout, major navigation, when online
- **Cross-device:** On login, fetch server progress, compare timestamps, merge newest valid state
- **Offline:** Reading continues, progress saved locally, sync resumes when online, status indicator: Saved locally / Syncing… / Synced

## Performance

- Fast first load: static landing, server components for course content
- Lazy-load experiments, shaders, charts
- Avoid giant client components
- Cache public course content where appropriate
- Experiments should not block main chapter from becoming interactive

## SEO

- Public pages have metadata (Open Graph, Twitter)
- Course pages have Chinese titles with coherent surrounding metadata
- Sitemap, robots.txt, canonical URLs

## Security

See SECURITY.md

## Deployment

- **Vercel:** GitHub → Vercel → env vars → deploy → verify Neon Auth trusted domain
- **Neon:** Singapore region for MY, pooled connection, sslmode=require
- **Migrations:** `drizzle-kit generate` + `migrate`, documented in SETUP.md
