# Production Checklist - Gated Lab Access Feature

## Build Status
- ✅ Build passes: 32 routes, Admin 169kB, Middleware 94.2kB, First Load 101kB
- ✅ 82 labs, 100 screenshots, 82 custom-index entries
- ✅ No duzhong branding anywhere (grep 0)

## New Feature: Gated Access

### Free Tier (Polished)
- **5 Free Labs (always accessible, server-enforced free):**
  - measurement-ruler (Length, 19k, 2 canvas, toolbar 52px, chart, metrics)
  - density-explorer (Density, 19k, polished)
  - floating-sinking (Buoyancy, 19k, polished)
  - wave-generator (Waves, 19k, polished)
  - reflection (Light, 19k, polished)
- **5 Free Quizzes:** b1-c3-q1, b2-c2-q1, b3-c10-q1, b4-c10-q1, b1-c1-q1
- Verified: canvas 1200x600, chart non-empty, high contrast #5A605D, Apple HIG segmented tabs radius 8px, no purple

### Access Flow
1. User signs up -> redirect to `/onboarding/access`
2. Choice: "Yes, Request Full Access" (phone required) or "Skip for Now" (5 free labs)
3. Phone validation: MY format `012-3456789` or `+6012...`, normalize to +60
4. POST `/api/access/request` -> creates request, profile status=pending, notification pending
5. Admin > Users sees request (pending first)
6. Admin approves/rejects -> updates profile, creates notification for user (bell icon)
7. Rejected can re-request after 3 days (server check `reviewed_at + 3d`)

### Security (No Client Bypass)
- **Middleware** `middleware.ts`: Protects `/experiments/*.html` direct access. Free = allow, non-free without auth cookie = 403 gated HTML page
- **API** `/api/experiments/html?slug=` : Checks `isFreeExperiment()` OR `role=admin` OR `lab_access_status=approved`. Else 403 JSON gated
- **Lab Page** `app/laboratory/[slug]/page.tsx` : Server Component (Next.js 15 Promise params). Checks access server-side, returns `<GatedLabOverlay>` (no iframe) if not allowed. Free bypass.
- **Quiz Page** `app/quizzes/[quizId]/page.tsx` : Same server gating, questions not in bundle for locked
- **ExperimentFrame** : Uses secure src for non-free

### APIs Created
- `POST /api/access/request` - phone collection, 3-day cooldown check
- `GET /api/access/status` - current status, canRequest, rerequestAfter, canAccessAll
- `GET /api/experiments/html?slug=` - secure HTML serving
- `GET/POST /api/notifications` - list, mark read, mark all read, polls 30s
- `GET /api/admin/users` - admin only, 200 users max, pending first, mock fallback with 5 seeded users
- `POST /api/admin/access/approve` - approve/reject, updates profile + request + notification + audit log
- `POST /api/access/reset` - test-only, resets mock to none (blocked in production if Supabase configured)

### UI Components
- `components/access/gated-lab-overlay.tsx` - Server-enforced, no iframe, shows free labs list, status pending/rejected, CTA Request Access, security note
- `components/access/gated-quiz-overlay.tsx` - Same for quizzes
- `components/ui/notification-bell.tsx` - Bell with unread count, dropdown 360px, icons for approved/rejected/pending, mark read
- `app/onboarding/access/page.tsx` - Choice + phone form + success/pending/rejected states, Apple HIG
- `components/admin/users-management.tsx` - Real Users tab: search, filters, approve/reject, details view, CSV export, free tier info
- `app/laboratory/page.tsx` - Updated: Free section (5 polished labs with iframe) + Locked section (grid of 12 cards with lock, or all 82 if approved)
- `app/quizzes/page.tsx` - Free vs Locked badges, lock icon, Request button
- `app/settings/page.tsx` - Lab Access Status card with status, phone, email, re-request logic

### DB Schema (lib/db/schema.ts)
- profiles: phone, lab_access_status (none|pending|approved|rejected), requested_at, reviewed_at, reviewer_id, reject_reason
- lab_access_requests: id, user_id, email, phone, status, reason, requested_at, reviewed_at, reviewed_by
- notifications: id, user_id, type, title, body, link, read, created_at
- Fallback storage: data/profiles-mock.json, lab-access-requests.json, notifications.json for local dev when Supabase dummy

### Tests
- `gated-access.spec.ts` 7 passed: free labs 200, non-free gated, onboarding renders, quizzes free vs locked, bell visible, admin users API, phone validation
- `gated-full-flow.spec.ts` 1 passed: request -> pending -> approve -> non-free 200 -> notification approved -> reject -> re-request blocked 400 with cooldown message
- `all-labs.spec.ts` Batch 1 passed with approved mock (20 labs)
- `screenshots.spec.ts` design audit passed (bg #F6F3EB, SF Pro, radius 10px, footer ScienceMaterial)

### Production Env
Required:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY (for admin operations)

If not configured (dummy), uses file fallback - still secure for local dev but not for prod.

### Deployment Steps
1. Run Drizzle migration for new tables/columns
2. Ensure Supabase RLS policies: profiles owner+admin, requests owner+admin, notifications owner
3. Deploy (Vercel): build will show 32 routes
4. Create admin user: set role=admin in profiles table
5. Test: sign up new user -> onboarding -> request with phone -> admin > Users -> approve -> bell notification -> access non-free lab via /laboratory/ohms-law should 200
6. Test direct bypass: curl https://yourdomain.com/experiments/ohms-law.html without auth -> should 403 gated HTML

### Known Limitations
- Laboratory page renders all 82 iframes for approved users (heavy). Consider pagination/virtualization later.
- Notifications are in-app only, no email/push (as requested)
- Phone unique not enforced (family can share)
- Free tier list hardcoded, not admin-configurable yet (easy to add later)

### Files Changed
- lib/db/schema.ts
- lib/access/free-tier.ts (new)
- lib/access/check.ts (new)
- lib/access/storage.ts (new)
- app/api/access/* (new)
- app/api/experiments/html (new)
- app/api/notifications (new)
- app/api/admin/* (new)
- components/access/* (new)
- components/ui/notification-bell.tsx (new)
- components/admin/users-management.tsx (new)
- app/onboarding/access/page.tsx (new)
- app/laboratory/[slug]/page.tsx (server gating)
- app/laboratory/[slug]/experiment-detail-client.tsx (new, extracted client)
- components/laboratory/experiment-frame.tsx (secure src)
- app/quizzes/page.tsx (free vs locked)
- app/quizzes/[quizId]/page.tsx (server gating)
- app/quizzes/[quizId]/quiz-detail-client.tsx (new)
- app/settings/page.tsx (access status)
- app/laboratory/page.tsx (free vs locked sections)
- app/auth/signup/page.tsx (redirect to onboarding)
- components/layout/marketing-navbar.tsx (bell)
- components/layout/app-sidebar.tsx (bell)
- middleware.ts (protect /experiments/*.html)

### First 5 Labs Polish Checklist
- [x] measurement-ruler: toolbar 52px, logo 20px, canvas 1200x600, chart, metrics 4, tabs 4, qbox/kbox, high contrast, no forbidden branding, Apple HIG
- [x] density-explorer: same
- [x] floating-sinking: same
- [x] wave-generator: same
- [x] reflection: same
- [x] All 5 pass all-labs Batch 1 chartCheck
- [x] Quizzes first 5: polished UI, 3 sample questions each, instant feedback, Chinese explanations, Free badge

Ready for production.
