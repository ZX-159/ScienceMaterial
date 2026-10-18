# ScienceMaterial

> Junior Secondary Science learning platform with structured course material, 82 interactive experiments, quizzes and progress tracking. Built with Apple HIG premium design, unified logo, and ScienceMaterial branding.

**ScienceMaterial** is a serious digital science textbook + laboratory notebook + interactive museum. It is **not** a generic AI chatbot or SaaS dashboard.

- **Product UI:** English
- **Course content:** Chinese (中文)
- **Curriculum:** 6 books, 64 chapters — Junior Secondary Science, with reconstructed chapter notes, 82 labs placed at corresponding sections, unified style
- **Laboratory:** 82 standalone experiments — original implementation, vanilla JS/SVG/Canvas2D/WebGL, 20-492KB each, sandbox allow-scripts only, Focus mode, 4 tabs ①实验台②图表·数据③要点·公式④测验, question-driven, expandable explanations, real-time data chips, bottom dock, dark mode, direct drag, data tables CSV, bilingual English [中文], unified ScienceMaterial branding
- **Auth & DB:** Supabase — Auth + PostgreSQL + RLS + Drizzle ORM
- **CMS:** Complete admin dashboard with experiment management, course management, content editor with Tiptap, role-based access

```
READ → UNDERSTAND → EXPLORE → PRACTISE → REVIEW
```

---

## Features

- **Complete Curriculum:** 6 books (初一上 to 初三下), 64 chapters, with reconstructed notes, 82 labs covering:
  - Measurement strand: ruler, caliper, micrometer, cylinder, balance, stopwatch, thermometer, error analysis
  - Physics: density, floating, waves, reflection, refraction, lenses, friction, pressure, circuits, Ohm's law, magnetic fields, energy, mechanics
  - Chemistry: particle model, pH, dissolution, equations, diffusion, states of matter
  - Biology: photosynthesis, circulation, plant transport, cell explorer, ecosystems
  - Earth & Space: earth structure, water cycle, solar system, moon phases, seasons, gravity
- **Apple HIG Premium Design:** Warm paper #FFFEFB #F2F1E9, ink #1C2C42, teal #146E61, hot #D9542B, warm #B88A43, cool #2C7D8C, green #2F7D4F, gold #C9A227 — Liquid Glass, 8pt grid, SF Pro, subtle motion, high contrast for readability
- **Pedagogy:**
  - Direct manipulation — drag, adjust, observe
  - 4 tabs: ①实验台②图表·数据③要点·公式④测验
  - Question-driven — current parameters generate questions
  - Explanation boxes with expandable details
  - Real-time data chips and metrics
  - Bottom dock with persistent controls
  - Energy visualization, column charts, direct SVG drag
  - Dark mode for projection
  - Quiz with scoring and explanations
  - Comparison tables
- **Reading Experience:** Digital textbook + scientific notebook, 680–820px measure, persistent position, ToC, bookmarks, highlights, experiment iframe embed
- **Laboratory (82 labs):**
  - Measurement strand (9 labs): measuring-cylinder, vernier-caliper (0.02mm), micrometer (0.001mm), digital-balance, stopwatch, thermometer, error-simulator, average-lab, graph-challenge
  - Physics labs: density-explorer (6 specimens), floating-sinking, wave-generator, reflection, refraction, lens-simulator, force-friction (7 bodies), pressure, circuit-builder, ohms-law, magnetic-field, particle-model, solar-system (WebGL), moon-phases, and more
  - Chemistry & Biology: ph-visualizer (18 liquids), photosynthesis, human-circulation, plant-transport, earth-structure, dissolution, equation-balancing, force-vectors, water-cycle, plant-cell-explorer, sound-synthesizer, ecosystem-sandbox, physics-playground
  - Advanced labs: resistance-factors, current-magnetic-effect, diffusion, states-of-matter, transformer, electromagnet, echo-sonar, gas-pressure, electroscope, hooke-law, center-of-gravity, seasons, and v2 variants
- **Quiz Engine:** MCQ, multi-select, true/false, numerical, diagram labeling, graph interpretation, simulation-based
- **Progress:** Local-first Dexie + IndexedDB, sync via Supabase, cross-device merge
- **Search:** Cmd+K command palette, English UI, Chinese indexed content
- **Admin CMS:** Complete dashboard with experiment management (82 labs with filter), course management (6 books, 64 chapters, sections), content editor with Tiptap, user management, analytics, settings — unified ScienceMaterial branding, high contrast, accessible
- **Security:** Supabase Auth JWT, RLS policies, sandboxed iframe allow-scripts only
- **Design System:** Unified logo /public/logo.svg via Logo component (20px base, 52px toolbar), segmented tabs, #f9fbf3 cards, 52px toolbar, high contrast text (#1A1E1D on #FFFEFB, #5A605D for secondary), no low-contrast combinations

---

## Laboratory — 82 Experiments

All labs in `public/experiments/*.html` — single-file, self-contained, no CDN, offline, under 500KB.

| No | Slug | Title | Subject | Chapter |
|---:|---|---|---|---|
|01|measurement-ruler|Measurement / Ruler|physics|b1-c3|
|02|density-explorer|Density Explorer|physics|b3-c2|
|03|floating-sinking|Floating and Sinking|physics|b3-c2|
|04|wave-generator|Wave Generator|physics|b6-c8|
|05|reflection|Reflection|physics|b2-c2|
|06|refraction|Refraction|physics|b2-c2|
|07|lens-simulator|Lens Simulator|physics|b2-c2|
|08|force-friction|Force and Friction|physics|b2-c5|
|09|pressure|Pressure|physics|b2-c5|
|10|circuit-builder|Circuit Builder|physics|b3-c10|
|11|ohms-law|Ohm's Law|physics|b3-c11|
|12|magnetic-field|Magnetic Field|physics|b4-c9|
|13|particle-model|Particle Model|chemistry|b4-c1|
|14|ph-visualizer|pH Visualizer|chemistry|b5-c2|
|15|solar-system|Solar System|space|b2-c9|
|16|moon-phases|Moon Phases|space|b2-c10|
|17|photosynthesis-visualizer|Photosynthesis|biology|b4-c7|
|18|human-circulation|Human Circulation|biology|b5-c10|
|19|plant-transport|Plant Transport|biology|b4-c8|
|20|earth-structure|Earth Structure|earth|b1-c9|
|21|measuring-cylinder-simulator|Measuring Cylinder|physics|b1-c1|
|22|heat-transfer-laboratory|Heat Transfer|physics|b3-c4|
|23|dissolution|Dissolution|chemistry|b4-c1|
|24|equation-balancing|Equation Balancing|chemistry|b5-c2|
|25|force-vectors|Force Vectors|physics|b4-c3|
|26|water-cycle|Water Cycle|earth|b2-c4|
|27|plant-cell-explorer|Plant Cell Explorer|biology|b1-c2|
|28|sound-synthesizer|Sound Synthesizer|physics|b3-c2|
|29|ecosystem-sandbox|Ecosystem Sandbox|biology|b2-c6|
|30|physics-playground|Physics Playground|physics|b4-c4|
|31|vernier-caliper-simulator|Vernier Caliper|physics|b1-c1|
|32|micrometer-simulator|Micrometer|physics|b1-c1|
|33|digital-balance|Digital Balance|physics|b1-c1|
|34|stopwatch-challenge|Stopwatch Challenge|physics|b1-c1|
|35|thermometer-simulator|Thermometer Simulator|physics|b1-c1|
|36|measurement-error-simulator|Measurement Error|physics|b1-c1|
|37|average-measurement-laboratory|Average Measurement|physics|b1-c1|
|38|graph-interpretation-challenge|Graph Interpretation|physics|b1-c1|
|39|resistance-factors-lab|Resistance Factors|physics|b3-c11|
|40|current-magnetic-effect|Current Magnetic Effect|physics|b4-c10|
|41|diffusion-lab|Diffusion Lab|chemistry|b4-c1|
|42|states-of-matter-lab|States of Matter|physics|b3-c1|
|43|transformer-lab|Transformer Lab|physics|b4-c10|
|44|electromagnet-lab|Electromagnet Lab|physics|b4-c10|
|45|echo-sonar-lab|Echo and Sonar|physics|b2-c1|
|46|gas-pressure-lab|Gas Pressure|physics|b3-c4|
|47|electroscope-lab|Electroscope|physics|b3-c9|
|48|hooke-law-lab|Hooke's Law|physics|b2-c5|
|49|center-of-gravity-lab|Center of Gravity|physics|b2-c6|
|50|seasons-lab|Seasons and Solar Motion|earth|b2-c11|
|51|moon-eclipse-tide-lab|Moon Eclipse Tide|space|b2-c10|
|52|density-buoyancy-lab|Density Buoyancy|physics|b3-c2|
|53|atomic-structure-lab|Atomic Structure|chemistry|b4-c2|
|54|water-electrolysis-lab|Water Electrolysis|chemistry|b5-c3|
|55|friction-lab|Friction Lab|physics|b2-c5|
|56|mechanical-energy-lab|Mechanical Energy|physics|b5-c5|
|57|electromagnetic-induction-lab|Electromagnetic Induction|physics|b4-c10|
|58|series-parallel-circuit-lab|Series Parallel Circuit|physics|b3-c10|
|59|acid-base-ph-lab|Acid Base pH|chemistry|b5-c2|
|60|static-electricity-lab|Static Electricity|physics|b3-c9|
|61|liquid-pressure-lab|Liquid Pressure|physics|b2-c5|
|62|car-engine-lab|Car Engine|physics|b5-c7|
|63|transverse-longitudinal-waves-lab|Transverse Longitudinal Waves|physics|b2-c1|
|64|saturated-solution-lab|Saturated Solution|chemistry|b4-c1|
|65|force-three-elements-lab|Force Three Elements|physics|b2-c5|
|66|sound-three-elements-lab|Sound Three Elements|physics|b2-c1|
|67|resistance-factors-lab-v2|Resistance Factors v2|physics|b3-c11|
|68|current-magnetic-effect-v2|Current Magnetic Effect v2|physics|b4-c10|
|69|diffusion-lab-v2|Diffusion v2|chemistry|b4-c1|
|70|states-of-matter-lab-v2|States of Matter v2|physics|b3-c1|
|71|pendulum-roller-lab|Pendulum and Roller|physics|b5-c5|
|72|circuit-building-lab|Circuit Building Lab|physics|b3-c10|
|73|mechanical-energy-conversion-lab|Mechanical Energy Conversion|physics|b5-c5|
|74|transformer-lab-v2|Transformer Lab v2|physics|b4-c10|
|75|pressure-inquiry-lab|Pressure Inquiry|physics|b2-c5|
|76|gas-pressure-lab-v2|Gas Pressure v2|physics|b3-c4|
|77|electroscope-lab-v2|Electroscope v2|physics|b3-c9|
|78|power-generation-lab|Power Generation|physics|b5-c7|
|79|center-of-gravity-lab-v2|Center of Gravity v2|physics|b2-c6|
|80|seasons-lab-v2|Seasons v2|earth|b2-c11|
|81|doppler-effect-lab|Doppler Effect|physics|b2-c1|
|82|titration-lab|Titration Lab|chemistry|b5-c2|

All under 500KB, meet sandbox requirement, high contrast for readability.

---

## Quick Start

1. **Install:** `npm install`
2. **Env:** Copy `.env.example` to `.env.local`, fill Supabase URL/keys/DATABASE_URL
3. **DB:** `npx drizzle-kit push` then `npm run db:seed`
4. **Dev:** `npm run dev` → http://localhost:3000
5. **Labs:** Open `/laboratory` → 82 labs with filter All/Physics/Chemistry/Biology/Earth/Space → each lab 4 tabs ①实验台②图表③要点④测验
6. **Measurement strand:** `/courses/chu-yi-shang/ke-xue-ce-liang` → 4 sections: instruments table, error & average, graph challenge, instrument practice
7. **Admin CMS:** `/admin` → stats 82 labs, experiment management with filter, upload to any chapter/section, course management with books/chapters/sections editing, content editor with Tiptap, user management, analytics, settings — all with ScienceMaterial branding, high contrast
8. **Build:** `npm run build` — 24 pages

---

## Tech Stack

- Next.js 15 (App Router), React 19, TypeScript 5
- Supabase Auth + PostgreSQL + RLS + Drizzle ORM + postgres-js + @supabase/ssr
- Tailwind CSS 4, Radix UI, Lucide Icons, Tiptap
- Dexie + IndexedDB (local-first progress)
- Vanilla JS/SVG/Canvas2D/WebGL experiments, original implementation

---

## Design & Accessibility

- **Logo:** Unified /public/logo.svg via Logo component, 20px base, 52px toolbar
- **Cards:** #f9fbf3 / #FFFEFB background with #1A1E1D text (contrast ratio > 12:1)
- **Secondary text:** #5A605D on #FFFEFB (contrast ratio ~7:1) — no light gray on light background
- **Footer:** Only "© 2026 ScienceMaterial" + ScienceMaterial branding — no license badges, no external academy mentions, no technical labels like dvh/svh
- **Buttons:** Teal #0F6B67 background with white text (contrast > 7:1), or white background with #1A1E1D text
- **Contrast checked:** All UI components audited for light-on-light and dark-on-dark issues, fixed to ensure readability
- **Segmented controls:** Active state with white background, dark text, shadow — clear visibility

---

## User Flows

- **Landing → Courses → Chapter → Lab → Quiz:** Complete learning path with progress tracking
- **Dashboard → Continue Learning → Lab:** Personalized continuation
- **Laboratory → Search → Filter → Launch → iframe:** Experiment discovery and interaction
- **Admin → Experiments → Upload → Map → Preview:** Content management
- **Admin → Courses → Edit → Save → Export:** Curriculum editing
- **Auth → Login/Signup → Dashboard:** Secure authentication with age verification (13+)
- **Search → CMD+K → Bookmarks → Progress:** Discovery and tracking

---

Everything required is in this README + 82 labs + lib/curriculum/data.ts + lib/experiments/data.ts + custom-index.json + Supabase clients + Admin CMS.
