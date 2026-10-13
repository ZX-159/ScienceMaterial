# DESIGN_SYSTEM.md

## Concept: Instrumental Editorial

ScienceMaterial should feel like: **beautiful science textbook + laboratory notebook + museum exhibit + precision instrument + high-quality educational reference system**

Not: AI chatbot, generic SaaS dashboard, crypto/fintech, neon gaming, children's cartoon, purple gradient AI website.

Core idea: warm paper, graphite/ink, oxidized teal, mineral green, brass/ochre, restrained oxide red, thin technical rules, measurement marks, subtle grid, scientific diagrams, archival labels, instrument-like controls.

## Colors

### Light

| Token | Hex | Purpose |
|-------|-----|---------|
| background | #F3F0E8 | warm paper |
| surface | #FCFBF7 | cards / reading surfaces |
| surface-muted | #E9E6DC | secondary panels |
| border | #D4D0C5 | rules |
| ink | #171B1A | primary text |
| ink-muted | #59605D | secondary text |
| teal | #176C69 | primary interactive |
| teal-soft | #D7E8E4 | selected/soft teal |
| mineral | #62765C | biology/environment |
| brass | #A66F24 | physics/data/highlight |
| oxide | #A64B3C | warnings/important |
| blueprint | #3E6870 | diagrams/technical |

### Dark

| Token | Hex | Purpose |
|-------|-----|---------|
| background | #101413 | charcoal green-black |
| surface | #171C1A | main panels |
| surface-muted | #202623 | elevated |
| border | #343B37 | separators |
| ink | #EEEAE0 | primary text |
| ink-muted | #A8ADA7 | secondary |
| teal | #69B5AE | primary |
| teal-soft | #233C39 | selected |
| mineral | #9BAF8E | biology |
| brass | #D4A75E | physics |
| oxide | #D77A68 | warnings |
| blueprint | #78A7AE | diagrams |

### Why this palette

Intentionally avoids electric purple, generic SaaS blue, excessive cyan, neon gradients, AI-looking violet/indigo.

### Accessibility

- All body text and important controls meet WCAG contrast
- Never encode information by color alone
  - Biology = mineral green **plus** leaf icon/label
  - Physics = brass **plus** wave/force icon
  - Chemistry = oxide **plus** flask icon
  - Earth/Space = blueprint teal **plus** globe/star icon

## Typography

- **Primary UI:** Inter or Geist Sans — 400, 500, 600, 700
- **Chinese content:** `Inter, "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif` — line-height 1.9, letter-spacing 0.02em, 16px, max-width 680–820px
- **Technical labels:** IBM Plex Mono or JetBrains Mono — for measurements, formulas, metadata, experiment controls, coordinates, timestamps, data tables
- **Optional display:** Source Serif 4 for very large marketing headings only, not whole app

## Visual Rules

### No generic AI aesthetic

Never: huge purple-blue blobs behind every section, excessive glassmorphism, glowing cards everywhere, floating neon pills, AI sparkle icons, random gradient text, excessive rounded cards, futuristic sci-fi fonts, generic dashboard templates, oversized floating 3D unrelated to science.

### Shape language

- Small controls: 6–8px
- Cards: 10–14px
- Large panels: 14–18px
- Modals: 16px
- Avoid giant pill

### Borders

Prefer subtle 1px borders over heavy shadows. Shadows soft, low opacity, for hierarchy not decoration.

### Grid

- Desktop: 12-column editorial
- Reading content narrower than dashboard
- Chinese reading width: 680–820px

## Gradients and Shaders

Gradients allowed as secondary materials, not identity. Use subtle radial, paper grain, mesh, restrained shader fields, scientific contour-like backgrounds.

References: Fera UI gradients (mesh, grainy, aurora, wave, radial), ShaderGradient (only landing/marketing hero or showcase, lazy-load, prefers-reduced-motion, static fallback, never behind dense learning text, never required for functionality).

Possible hero: slow-moving dark field with subtle teal/brass light gradients and thin scientific contour lines, resembling scientific visualization or instrument display.

## Components

- **shadcn/ui base:** Card, Button, Badge, Tabs, Progress, Input — source inside project, customizable, accessible
- **Custom:** ExperimentCard, ExperimentFrame, ContentBlockRenderer, ChapterHeader, ReadingView, ProgressRing, ScienceMap, ActivityTimeline
- **Layout:** Navbar (marketing), AppSidebar (app, 240px desktop, bottom nav mobile), ThemeProvider

## Motion

- Subtle, restrained
- Respect `prefers-reduced-motion`: disable shader animation, reduce page transitions, stop decorative particle movement, preserve functionality
- Framer Motion for: card hover -translate-y-0.5, progress width transition 500ms, fade-in 0.5s ease-out

## Iconography

- Lucide React — consistent stroke, 16px/20px sizes
- Subject icons: physics=Atom, chemistry=FlaskConical, biology=Leaf, earth=Globe, space=Rocket

## Responsive

- Desktop: 12-col editorial, persistent sidebar, wide experiment canvas
- Tablet: collapsible nav, two-col course layout
- Mobile: bottom nav, single-col reading, full-width experiment, horizontally scrollable tables where unavoidable, no tiny desktop UI squeezed

## Anti-patterns

- No purple gradient blobs
- No glassmorphism everywhere
- No AI sparkle icons
- No giant pill buttons
- No dense cards around every paragraph
- No excessive gamification / noisy badges
- No color-only information
- No raw DB errors to students
