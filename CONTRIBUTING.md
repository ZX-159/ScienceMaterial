# CONTRIBUTING.md

## Development Setup

See SETUP.md for full deployment manual.

```bash
git clone <repo>
cd sciencematerial
npm install
npm run dev
```

## Branching

- `main` — production, protected, auto-deploy to Vercel
- `develop` — integration branch
- Feature branches: `feat/laboratory`, `feat/quiz-engine`, `fix/progress-sync`

## Code Style

- TypeScript strict
- ESLint + Next.js config
- Tailwind for styling, use design tokens (var(--teal), etc.), not arbitrary hex
- Components: shadcn/ui pattern, small client components, Server Components by default
- No giant components — split into `components/learning/`, `laboratory/`, etc.
- Zod for all server input validation
- Server Actions preferred over many route handlers (keep ≤12 functions)

## Content Rule

**Never replace Chinese course content with invented English content.**

If a section from source has not yet been converted, mark clearly as unfinished in CMS rather than fabricating educational material.

- UI is English (Dashboard, Courses, Laboratory, etc.)
- Course content is Chinese (科学是什么做的？, 测量, etc.)
- Do not produce awkward bilingual UI like "Progress / 进度 / 進度" — use English chrome around Chinese content: "Progress 本章进度 68%"

## Curriculum Fidelity

- Source of truth: `curriculum-reconstructed.md` — 6 books, 64 chapters
- Preserve reconstruction notes (测量, 岩石与土壤, 声音和耳, 指南针为什么能指南北, 家庭电路, 简单机械的应用)
- Do not silently correct structures — document in CMS metadata

## Security

- No admin signup button
- Verify auth + role + resource permissions server-side
- Treat experiment HTML as untrusted, sandboxed iframe only
- Never expose secrets, use env vars

## Accessibility

- Keyboard navigation, visible focus states, semantic HTML, accessible labels
- Reduced-motion support (disable shader, reduce transitions)
- Sufficient contrast, no color-only information
- Screen-reader-friendly dialogs, accessible charts and experiment controls
- Keyboard alternative for drag/drop where practical

## Testing

```bash
npm run test       # unit
npm run test:e2e   # Playwright
```

Critical flows:

**Student:**
Signup → Login → Browse course → Open chapter → Read section → Launch experiment → Submit quiz → See result → Progress saved → Logout → Login on another device → Progress restored

**Admin:**
Admin login → Open admin → Edit chapter → Save draft → Preview → Publish → Create quiz → Create experiment → Edit experiment → Publish version → View analytics → View users

**Security:**
- user cannot access admin
- user cannot publish
- user cannot modify another user's progress
- experiment cannot access parent DOM
- unauthenticated requests fail
- invalid content rejected

## Design QA

Before calling UI complete:

- Does it look like ScienceMaterial rather than generic SaaS?
- Is warm paper/ink system visible?
- Is teal main interactive color rather than purple?
- Are brass/oxide accents restrained?
- Are gradients atmosphere not decoration everywhere?
- Does app look good in light and dark mode?
- Are Chinese paragraphs highly readable (1.9 line-height, 680–820px)?
- Is English UI consistent?
- Are scientific diagrams coherent?
- Are cards used only when they improve grouping?
- Enough whitespace?
- Animations subtle?
- Reduced motion works?
- Mobile layouts intentional?
- Focus states visible?
- Colors accessible?

## Commit Messages

- `feat: add density explorer experiment`
- `fix: progress sync timestamp merge`
- `docs: update SETUP.md Neon Auth trusted domains`
- `style: instrumental editorial card radii`
- `security: enforce admin role in publish action`

## PR Checklist

- [ ] Follows language separation (English UI, Chinese content)
- [ ] Preserves curriculum reconstruction notes
- [ ] No secrets in code
- [ ] Zod validation for server inputs
- [ ] Accessibility checked (keyboard, focus, contrast)
- [ ] Responsive checked (desktop, tablet, mobile)
- [ ] Progress saves locally + syncs
- [ ] Experiment sandboxed, postMessage only
- [ ] No generic AI aesthetic (purple blobs, etc.)
- [ ] Tests added for critical flow
