# ScienceMaterial MVP — Summary

**Date:** 2026-09-28  
**Status:** ✅ MVP Complete, Production Build Passing, Dev Server Running

## What Was Built

### 1. Foundation (Phase 1)
- Next.js 15 App Router + TypeScript + Tailwind 3.4
- Instrumental Editorial design system (warm paper #F3F0E8, ink #171B1A, teal #176C69, mineral, brass, oxide, blueprint) — no purple/cyan AI palette
- Light/dark theme, IBM Plex Mono for technical, Noto Sans SC for Chinese content, 680–820px reading measure
- shadcn/ui pattern components, Lucide icons, Framer Motion
- Root layout with ThemeProvider, Navbar (marketing), AppSidebar (app)

### 2. Curriculum (Phase 3)
- Full 6 books, 64 chapters map with reconstruction notes preserved:
  - 初一上 10 chapters (测量, 岩石与土壤 reconstructed)
  - 初一下 11 chapters (声音和耳 reconstructed)
  - 初二上 11 chapters
  - 初二下 11 chapters (指南针, 家庭电路 reconstructed)
  - 初三上 10 chapters
  - 初三下 11 chapters (简单机械的应用 reconstructed)
- Sample rich content for 测量 chapter with definition, table, experiment embed, quiz checkpoint
- Chapter page: tabs Overview/Learn/Laboratory/Quiz, ToC, progress, prev/next, bookmark

### 3. Student Application (Phase 4)
- **Landing:** Hero with UEC badge, shader-like gradient, measurement marks, 6 book cards, lab preview, READ→EXPLORE→PRACTISE→REVIEW loop
- **Dashboard:** Continue Learning (初二上·电路 68%), Today, Science Map constellation, Recent Activity, Quick Revision (5min/10min/Weak)
- **Courses:** Textbook-index style, 6 books, 64 chapters, progress, reconstructed badges
- **Book & Chapter:** /courses/[bookSlug]/[chapterSlug] dynamic routes
- **Laboratory:** /laboratory with 20 experiments, filter by subject/type/difficulty, ExperimentCard
- **Experiment Detail:** /laboratory/[slug] with sandboxed iframe, Reset/Fullscreen, info, related
- **Quizzes:** List + detail /quizzes/[quizId] with Chinese MCQ, English UI, immediate feedback
- **Progress:** Overall, per-book, weak areas (<70%), sync status, Science Map viz
- **Bookmarks, Search (Cmd+K), Revision, Settings, Privacy**

### 4. Laboratory (Phase 6)
- Architecture: single-file HTML5 stored in DB (for V1, in lib/experiments/html.ts), sandboxed iframe `allow-scripts` only, postMessage contract (reset/pause/resume/getState)
- 20 experiments defined, 5 fully interactive:
  - measurement-ruler (accurate + estimate)
  - density-explorer (ρ=m/V, float/sink, Archimedes)
  - reflection (入射角=反射角)
  - refraction (Snell, air n=1.0 → water n=1.33)
  - circuit-builder (series/parallel, clickable bulbs)
  - 15 generic wave visualizations with slider
- Security: no parent DOM/cookies/tokens access

### 5. Quiz Engine (Phase 5)
- Types: multiple_choice, multi_select, etc. (schema documented)
- Chinese content, English UI
- Weak area: accuracy <70%
- Sample questions for 测量 and 水的密度

### 6. Progress Sync (Phase 8)
- Dexie + IndexedDB implementation (lib/progress/db.ts)
- Immediate local write, sync every 60-120s + on events, cross-device merge by timestamp
- Offline: reading continues, Saved locally / Syncing… / Synced indicator

### 7. Admin CMS (Phase 7)
- /admin dashboard with metrics, content management, Tiptap block editor mock, workflow Draft→Publish→Version, audit log
- Role=admin only, provisioned via Neon Auth dashboard, no signup button

### 8. Backend & Architecture (Phase 2, 9, 10)
- Neon PostgreSQL schema documented, Drizzle planned
- Neon Auth flow documented
- API routes grouped: /api/sync, /api/experiments, /api/analytics (3 functions) + Server Actions preferred → under 12 target
- Performance: lazy-load experiments, fast first load, Server Components
- SEO: metadata, Open Graph

### 9. Documentation (Phase 11)
- README.md with screenshots structure (10 images generated via AI mockups in docs/screenshots/)
- SETUP.md complete deployment manual
- ARCHITECTURE.md, DESIGN_SYSTEM.md, CMS.md, EXPERIMENTS.md, QUIZ_ENGINE.md, PROGRESS_SYNC.md, SECURITY.md, PRIVACY.md, CONTRIBUTING.md, CHANGELOG.md

### Build Status
```
Route (app)                                 Size  First Load JS
○ /                                         194 B         105 kB
○ /courses                                  546 B         114 kB
ƒ /courses/[bookSlug]                       194 B         105 kB
ƒ /courses/[bookSlug]/[chapterSlug]         2.67 kB       123 kB
○ /laboratory                               3.42 kB       116 kB
ƒ /laboratory/[slug]                        188 B         120 kB
...
ƒ /api/sync, /api/experiments, /api/analytics
✓ Compiled successfully
```

Dev server: http://localhost:3000 (running)

## How to Use MVP

1. Landing: http://localhost:3000/ → Start Learning
2. Courses: /courses → select book → chapter
3. Chapter: /courses/chu-yi-shang/ce-liang → tabs Learn/Lab/Quiz
4. Laboratory: /laboratory → density-explorer → interact with sliders
5. Quizzes: /quizzes → start quiz → Chinese feedback
6. Progress: /progress → Science Map + weak areas
7. Admin: /admin → metrics + CMS editor mock

## Language Separation Verified

- UI: English (Dashboard, Courses, Laboratory, Quizzes, Progress, Search, Continue Learning, Launch Experiment, Submit Answer, etc.)
- Content: Chinese (科学是什么做的？, 测量, 密度, 光和眼, 电路, etc.)
- Intentional mixing: "Progress 本章进度 68%" — English chrome around Chinese content, not awkward bilingual "Progress / 进度 / 進度"

## Design QA

- Warm paper/ink visible ✓
- Teal primary, not purple ✓
- Brass/oxide restrained ✓
- Gradients as atmosphere, not everywhere ✓
- Light/dark mode ✓
- Chinese readable (1.9 line-height, 680–820px) ✓
- English UI consistent ✓
- No generic AI aesthetic ✓
- Mobile bottom nav, desktop sidebar ✓

## Next Steps for V1

- Implement Neon + Drizzle migrations + seed script for all 64 chapters rich content
- Full Tiptap/editorcn block editor with real DB
- 20 polished experiments (canvas/WebGL)
- Full quiz bank (100+ questions)
- Real screenshots captured from implemented app (replace AI mockups)
- Playwright E2E tests
- Vercel deploy + Neon trusted domains verification

## Files Delivered

- app/ (landing, dashboard, courses, laboratory, quizzes, progress, bookmarks, search, revision, settings, admin, api)
- components/ (ui, layout, learning, laboratory)
- lib/ (curriculum/data, experiments/data+html, progress/db, utils)
- docs/screenshots/ (10 PNGs)
- README.md, SETUP.md, ARCHITECTURE.md, DESIGN_SYSTEM.md, CMS.md, EXPERIMENTS.md, QUIZ_ENGINE.md, PROGRESS_SYNC.md, SECURITY.md, PRIVACY.md, CONTRIBUTING.md, CHANGELOG.md, MVP_SUMMARY.md
