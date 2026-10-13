# CHANGELOG.md

## [0.1.0] - 2026-09-28 — MVP

### Added

- **Foundation:**
  - Next.js 15 App Router + TypeScript + Tailwind 3.4
  - Instrumental Editorial design system: warm paper #F3F0E8, ink #171B1A, teal #176C69, mineral, brass, oxide, blueprint
  - Light/dark theme with ThemeProvider, prefers-reduced-motion support
  - shadcn/ui pattern components: Button, Card, Badge, Tabs, Progress, Input
  - Layout: Navbar (marketing), AppSidebar (app, 240px desktop, bottom nav mobile)

- **Curriculum:**
  - 6 books, 64 chapters full map with reconstruction notes preserved
  - Books: 初一上 (10), 初一下 (11), 初二上 (11), 初二下 (11), 初三上 (10), 初三下 (11)
  - Reconstructed: 测量, 岩石与土壤, 声音和耳, 指南针为什么能指南北, 家庭电路, 简单机械的应用
  - Chapter page with tabs: Overview, Learn, Laboratory, Quiz
  - ContentBlockRenderer for paragraph, definition, table, callout, experiment, quiz, formula, code
  - Sample rich content for 测量 chapter (定性/定量, 单位, 误差)

- **Landing Page:**
  - Hero with eyebrow UEC JUNIOR SECONDARY SCIENCE, heading Learn science by seeing how it works, CTA Start Learning / Explore Laboratory
  - Shader-like gradient hero (radial teal/brass, measurement marks, subtle blur)
  - Curriculum section (6 books as editorial index)
  - Laboratory section (6 experiment previews)
  - Learning loop READ → EXPLORE → PRACTISE → REVIEW
  - Footer

- **Student Application:**
  - Dashboard: Continue Learning (初二上册·电路 68%), Today, Science Map (constellation), Recent Activity, Quick Revision
  - Course browser: textbook-index style with progress bars, reconstructed badges
  - Chapter reading: persistent ToC, progress, prev/next, bookmark, Chinese content 680–820px
  - Laboratory: 20 experiments, filter by subject/type/difficulty, ExperimentCard
  - Experiment viewer: sandboxed iframe, Reset/Fullscreen, postMessage contract, 5 fully interactive experiments (Measurement Ruler, Density Explorer, Reflection, Refraction, Circuit Builder) + 15 generic interactive
  - Quizzes: list + detail with MCQ, Chinese questions, English UI, immediate feedback, score
  - Progress: overall 42%, per-book, weak areas (<70%), sync status (Dexie), Science Map visualization
  - Bookmarks, Search (Cmd+K, English UI, Chinese indexed), Revision (Quick/Weak/Exam modes), Settings

- **Local-first Progress:**
  - Dexie + IndexedDB implementation (lib/progress/db.ts)
  - saveProgress, getProgress
  - Sync strategy documented: 60–120s + on events, cross-device merge by timestamp
  - Offline: Saved locally / Syncing… / Synced status

- **Admin:**
  - /admin dashboard with metrics (users, chapters, experiments, quiz attempts)
  - CMS editor mock with Tiptap block types (H1, Bold, List, Table, Image, Equation, Definition, Experiment, Quiz)
  - Workflow: Draft → Preview → Publish → Version snapshot
  - Audit log

- **Auth:**
  - Mocked local auth for MVP, production Neon Auth documented
  - No admin signup button, role=admin provisioned separately

- **Documentation:**
  - README.md with features, screenshots structure, architecture, tech stack, curriculum, auth, lab, quiz, progress, CMS, security
  - SETUP.md complete deployment manual (prerequisites, clone, install, env vars, Neon setup, migrations, seed, admin, Vercel, troubleshooting)
  - ARCHITECTURE.md (Next.js, server/client, Neon/Drizzle, auth, content model, experiments, progress, performance, SEO, security)
  - DESIGN_SYSTEM.md (colors, typography, visual rules, gradients, components, motion, responsive, anti-patterns)
  - CMS.md, EXPERIMENTS.md, QUIZ_ENGINE.md, PROGRESS_SYNC.md, SECURITY.md, PRIVACY.md, CONTRIBUTING.md

- **Build:**
  - Production build succeeds (17 routes, 101kB shared)
  - Vercel Hobby target: grouped functions (auth, learning, sync, admin, experiments, analytics) ≤12

### Known Limitations (MVP)

- Database: local JSON seed, not yet Neon PostgreSQL with Drizzle migrations (schema documented, ready for V1)
- Auth: mocked, not Neon Auth JWT (flow documented)
- Experiments: 5 fully custom interactive, 15 generic wave simulation (architecture supports 100+)
- Screenshots: placeholder structure, need real captures from implemented app before production (docs/screenshots/*.png)
- Search: client-side filter, not full-text index
- Quiz: sample questions, not full bank

### Next — Phase 2-11

- Phase 2: Neon + Drizzle + migrations + seed script
- Phase 3: Full curriculum import (all 64 chapters rich content from reconstructed.md)
- Phase 4: Student app polish + bookmarks + search index
- Phase 5: Quiz engine full (all types) + weak area algorithm
- Phase 6: 20 polished experiments + fullscreen protocol
- Phase 7: CMS with Tiptap/editorcn + versioning + rollback
- Phase 8: Local-first progress sync queue + conflict resolution + offline
- Phase 9: Analytics (privacy-conscious) + audit logs
- Phase 10: Landing polish + shader hero + SEO + privacy/terms/cookies + real screenshots
- Phase 11: QA (a11y, responsive, Playwright, security, performance, deployment verification)
