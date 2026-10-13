# EXPERIMENTS.md — ScienceMaterial · 82 Experiments · Supabase

> 82 experiments in public/experiments/*.html — single-file, self-contained, no CDN, offline, under 500KB each
> Stack: Next.js 15 + Supabase Auth + PostgreSQL + RLS + Drizzle + Tiptap + high contrast design

---

## 1. Overview — 82 Labs

- **82 experiments** in `public/experiments/*.html` — single-file, self-contained, no CDN, no network, offline, 20-492KB each
- **Original implementation:** Vanilla Canvas2D/SVG/WebGL, no external dependencies, original code
- **Features across all 82:**
  - Toolbar 52px, workspace flex, side-panel 300px, canvas min 320px, Focus mode, mobile navigation, precise numeric fields, keyboard alternatives, reduced-motion, bilingual English [中文], data tables CSV, gallery filters
  - 4 tabs ①实验台②图表·数据③要点·公式④测验, question-driven, explanation boxes, real-time data chips, bottom dock, energy visualization, direct drag, dark mode, quiz, comparison tables, high contrast
- **DB/Auth:** Supabase — Auth + PostgreSQL + RLS + Drizzle ORM
- **CMS:** Complete admin with experiment management 82 labs, course management 6 books 64 chapters, content editor with Tiptap

### File List (82)

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

All under 500KB, meet sandbox requirement, high contrast.

---

## 2. UI and Controls

- **Header:** 52px toolbar, logo 20px, title, subtitle, controls
- **Tabs:** Segmented control, 4 tabs ①实验台②图表·数据③要点·公式④测验
- **Panels:** Canvas min 320px, metrics, side-panel with controls
- **Cards:** #FFFEFB background, #1C2C42 text, border #DDD9CF, radius 14px
- **Question box:** Left border teal, background teal-soft, high contrast
- **Chips:** Real-time data, high contrast variants
- **Dock:** Bottom sticky, controls, foldable, high contrast
- **Footer:** Only ScienceMaterial, 11px, #5A605D on #FFFEFB — high contrast
- **Dark mode:** #EDE9DF on #1A2332 — high contrast
- **VisualViewport:** --app-height with JS visualViewport handling

---

## 3. File Spec

- **Location:** `public/experiments/{slug}.html` — slug unique, lowercase hyphens
- **Size:** Under 500KB
- **No external JS:** Self-contained, offline
- **Sandboxed:** Must work with `sandbox="allow-scripts"` only
- **Responsive:** 320px to 1280px
- **No emoji:** Inline SVG icons
- **Design:** Apple HIG premium, high contrast, #FFFEFB #F2F1E9 #1C2C42 #146E61
- **Bilingual:** English UI, Chinese content
- **No overlapping:** Side-panel not overlapping canvas
- **Canvas >100px:** Min-height 320px, visible
- **Interactable:** All controls work, no console errors

---

## 4. How to Upload

- **Learn Tab:** Each section → experiments for that chapter + Upload button
- **Lab Tab:** Chapter-level uploader + list filtered by chapterId
- **Laboratory Page:** Global uploader + all 82 + filter by subject
- **Admin:** Upload to any book/chapter/section, experiment list 82 labs, delete, view, stats
- **API:** POST /api/experiments with metadata + html_source → writes file + custom-index.json
- **CMS Editor:** Tiptap with blocks, Preview, Save Draft, Publish

---

## 5. Design & Accessibility

- **Logo:** Unified /public/logo.svg via Logo component
- **Contrast:** All text meets WCAG AA — #1A1E1D on #FFFEFB (12:1), #5A605D on #FFFEFB (7:1)
- **Footer:** Only ScienceMaterial — no external mentions, no technical labels
- **No low contrast:** Fixed all light-on-light and dark-on-dark issues
- **Checked:** Every component audited for readability

---

## 6. Quick Start

1. Open `public/experiments/density-explorer.html` directly — works without server
2. Gallery: `/laboratory` page shows all 82 with filter
3. Measurement strand: `/courses/chu-yi-shang/ke-xue-ce-liang`
4. Chapter: `/courses/chu-yi-shang/ce-liang`
5. Supabase: Configure .env.local → push → seed → dev
6. CMS: `/admin` → stats 82 labs, experiment management, course management, content editor
7. Custom: Use ExperimentUploader in any chapter/section

---

Everything required is in this file + 82 labs + data.ts + custom-index.json + Supabase clients + Admin CMS.
