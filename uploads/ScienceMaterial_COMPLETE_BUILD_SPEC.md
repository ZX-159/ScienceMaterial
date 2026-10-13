# ScienceMaterial — Complete Product & Engineering Specification

> **Purpose:** This document is the source-of-truth brief for an AI coding agent or development team building **ScienceMaterial**, an interactive UEC Junior Secondary Science revision platform.
>
> **Critical language rule:** **Product UI is English. Course/learning content is Chinese.** Do not translate the supplied Chinese curriculum into English. UI labels, navigation, settings, admin controls, errors, onboarding, and system messages are English unless explicitly specified otherwise.
>
> **Curriculum source:** the supplied `curriculum-reconstructed.md`, which reconstructs the six-book UEC Junior Secondary Science curriculum as **64 chapters**. The source explicitly notes that some chapter boundaries/titles were reconstructed where the textbook material had been merged or misplaced; preserve those source notes rather than silently rewriting them. fileciteturn0file0L8-L73

---

## 1. Product identity

### Name

**ScienceMaterial**

Do not invent a startup-style name, mascot, acronym, futuristic brand, or artificial product identity.

The visual identity should make **ScienceMaterial** feel like:

- a serious digital science textbook
- a modern laboratory notebook
- an interactive museum/archive
- a precision instrument interface
- a high-quality educational reference system

It should **not** feel like:

- an AI chatbot
- a generic SaaS dashboard
- a crypto/fintech product
- a neon gaming website
- a children's cartoon learning app
- a generic “purple gradient AI” website

### Positioning

ScienceMaterial is an interactive learning and revision environment for the UEC Junior Secondary Science curriculum.

Core loop:

**READ → UNDERSTAND → EXPLORE → PRACTISE → REVIEW**

The platform combines structured Chinese course material with interactive HTML5/JavaScript experiments, simulations, quizzes, progress tracking, and an administrator-controlled CMS.

---

# 2. Non-negotiable requirements

## 2.1 Language separation

### UI language: English

Examples:

- Dashboard
- Courses
- Laboratory
- Quizzes
- Progress
- Search
- Continue Learning
- Mark as Complete
- Launch Experiment
- Fullscreen
- Settings
- Admin
- Publish
- Draft
- Save
- Preview
- Users
- Analytics

### Course content: Chinese

Examples:

- 科学是什么做的？
- 走进科学实验室
- 测量
- 细胞和生物体
- 光和眼
- 电路
- 能量的转化与守恒

Course titles, explanatory paragraphs, definitions, formulas, examples, experiment explanations, question text, answer explanations, diagrams and learning notes must remain Chinese.

### Do not mix languages unnecessarily

A page can have English UI chrome surrounding Chinese learning content:

> **Progress**  
> **本章进度 68%**

This is intentional.

Do not produce awkward bilingual UI such as:

> Progress / 进度 / 進度

Use English UI and Chinese content.

---

# 3. Curriculum source of truth

The supplied curriculum reconstruction contains:

- 6 books
- 64 chapters
- Junior 1 Upper
- Junior 1 Lower
- Junior 2 Upper
- Junior 2 Lower
- Junior 3 Upper
- Junior 3 Lower

The source describes the complete structure and also documents several reconstructed chapter boundaries. fileciteturn0file0L8-L73

## 3.1 Full chapter map

### 第一册·初一上册
- 1. **科学是什么做的？**
- 2. **走进科学实验室**
- 3. **测量**
- 4. **观察生物**
- 5. **细胞和生物体**
- 6. **多细胞生物体的构造**
- 7. **认识物质**
- 8. **物质常见的性质**
- 9. **地球概况**
- 10. **岩石与土壤**

### 第二册·初一下册
- 1. **声音和耳**
- 2. **光和眼**
- 3. **人对信息的获取和处理**
- 4. **自然界中的运动**
- 5. **力和压强**
- 6. **平衡与稳度**
- 7. **生物的生殖**
- 8. **人类的生殖和发育**
- 9. **太阳和太阳系**
- 10. **地球和月球**
- 11. **地球的自转和公转**

### 第三册·初二上册
- 1. **生活中的水**
- 2. **水的密度和压强**
- 3. **水的溶解性**
- 4. **大气压力**
- 5. **大气层的污染和保护**
- 6. **植物的一生**
- 7. **人体的激素调节**
- 8. **人体的神经调节**
- 9. **静电**
- 10. **电路**
- 11. **电流、电阻和电压**

### 第四册·初二下册
- 1. **粒子的模型**
- 2. **元素与元素符号**
- 3. **物质的组成和化学式**
- 4. **空气**
- 5. **氧气和二氧化碳**
- 6. **质量守恒定律**
- 7. **生物中的氧和二氧化碳的循环**
- 8. **植物与土壤**
- 9. **指南针为什么能指南北**
- 10. **电生磁和磁生电**
- 11. **家庭电路**

### 第五册·初三上册
- 1. **酸和氢气**
- 2. **碱和盐**
- 3. **金属与非金属**
- 4. **地球矿物资源的开发和利用**
- 5. **机械能**
- 6. **热**
- 7. **能量的转化与守恒**
- 8. **食物与营养**
- 9. **人体消化系统的结构**
- 10. **物质的运输和排泄**

### 第六册·初三下册
- 1. **物种的多样性**
- 2. **生命的统一性**
- 3. **生物的演化**
- 4. **星和星系**
- 5. **宇宙探秘**
- 6. **简单机械的应用**
- 7. **电的应用**
- 8. **波和信息**
- 9. **地球资源的可持续利用**
- 10. **能源的可持续利用**
- 11. **环境的可持续发展**


### Important curriculum-source notes

Do not silently “correct” these structures.

The supplied source explicitly explains that:

- 初一上册 originally lists nine chapter titles because “岩石与土壤” is embedded in the end of “地球概况”; this project restores it as Chapter 10.
- “测量” is reconstructed as an independent chapter.
- “声音和耳” is reconstructed as an independent chapter.
- “指南针为什么能指南北” and “家庭电路” are restored as independent chapters.
- “简单机械的应用” is moved back into its own chapter.

These are source-document decisions and should remain documented in the CMS/content metadata.

---

# 4. Design research and visual direction

The design direction is informed by the supplied references plus current UI research.

### Reference sources

- UI/UX Pro Max: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- Watermelon UI: https://ui.watermelon.sh/home
- Fera UI gradients: https://feralui.dev/gradients
- shadcn/ui: https://ui.shadcn.com/
- Emil Kowalski skills: https://github.com/emilkowalski/skills
- editorcn: https://www.rtecn.space/
- Bklit: https://bklit.com/
- ShaderGradient: https://shadergradient.co/

### Research-derived implementation principles

**UI/UX Pro Max** is useful as a design-reasoning reference rather than as a visual style to copy. Its current documentation emphasizes searchable design styles, palettes, typography, UX guidelines, charts, icons, motion presets and stack-specific guidance. citeturn0search0turn0search3

**shadcn/ui** should provide the structural component foundation because it supplies accessible, composable components while keeping the component source code inside the project and customizable. citeturn0search1turn0search5

**Watermelon UI** is particularly useful for realistic page composition, dashboards, animated components and implementation-oriented references. citeturn1view0

**Fera UI** demonstrates more expressive gradient construction, including mesh, grainy, aurora, wave, radial and other gradient styles. Use this as a reference for occasional visual atmosphere rather than turning the whole interface into gradients. citeturn1view1

**editorcn** is a strong reference for the admin CMS because it provides customizable Tiptap/shadcn rich-text and block-editor patterns. citeturn1view3

**ShaderGradient** may be used for selected landing-page/hero visuals, but it must remain decorative and lightweight. Never make shader effects necessary for navigation or learning. https://shadergradient.co/

### Design conclusion

ScienceMaterial should combine:

**Editorial science reference book + laboratory instrument + modern web application**

The visual language should be precise, slightly tactile, calm, technical and mature.

---

# 5. New visual system

## 5.1 Design concept: “Instrumental Editorial”

Do not use the previous purple/cyan AI palette.

The core visual idea is:

- warm paper
- graphite/ink
- oxidized teal
- mineral green
- brass/ochre
- restrained oxide red
- thin technical rules
- measurement marks
- subtle grid systems
- scientific diagrams
- archival labels
- instrument-like controls

The interface should feel like a **beautiful scientific reference instrument**, not a software startup.

---

## 5.2 Color palette

### Light theme

| Token | Hex | Purpose |
|---|---|---|
| `background` | `#F3F0E8` | warm paper background |
| `surface` | `#FCFBF7` | cards / reading surfaces |
| `surface-muted` | `#E9E6DC` | secondary panels |
| `border` | `#D4D0C5` | rules and separators |
| `ink` | `#171B1A` | primary text |
| `ink-muted` | `#59605D` | secondary text |
| `teal` | `#176C69` | primary interactive color |
| `teal-soft` | `#D7E8E4` | selected/soft teal surfaces |
| `mineral` | `#62765C` | biology/environment accent |
| `brass` | `#A66F24` | physics/data/highlight accent |
| `oxide` | `#A64B3C` | warnings/important scientific emphasis |
| `blueprint` | `#3E6870` | diagrams/technical visuals |

### Dark theme

| Token | Hex | Purpose |
|---|---|---|
| `background` | `#101413` | charcoal green-black |
| `surface` | `#171C1A` | main panels |
| `surface-muted` | `#202623` | elevated areas |
| `border` | `#343B37` | separators |
| `ink` | `#EEEAE0` | primary text |
| `ink-muted` | `#A8ADA7` | secondary text |
| `teal` | `#69B5AE` | primary interactive color |
| `teal-soft` | `#233C39` | selected surfaces |
| `mineral` | `#9BAF8E` | biology/environment |
| `brass` | `#D4A75E` | physics/data |
| `oxide` | `#D77A68` | warnings/emphasis |
| `blueprint` | `#78A7AE` | diagrams |

### Why this palette

It intentionally avoids:

- electric purple
- generic SaaS blue
- excessive cyan
- neon gradients
- AI-looking violet/indigo backgrounds

The combination of warm paper, ink, teal, brass and oxide gives ScienceMaterial a recognizable scientific/editorial identity.

### Accessibility

Do not choose colors only because they look good.

All body text and important controls must meet practical WCAG contrast requirements.

Never encode information by color alone.

Example:

- Biology = mineral green **plus** leaf icon/label
- Physics = brass **plus** wave/force icon
- Chemistry = oxide **plus** flask icon
- Earth/Space = blueprint teal **plus** globe/star icon

---

# 6. Typography

Use a restrained editorial type system.

### Primary UI

**Inter** or **Geist Sans**

### Chinese learning content

Use a system Chinese sans stack:

```css
font-family:
  Inter,
  "Noto Sans SC",
  "PingFang SC",
  "Microsoft YaHei",
  sans-serif;
```

### Technical labels

Use:

**IBM Plex Mono** or **JetBrains Mono**

Only for:

- measurement values
- formulas
- metadata
- experiment controls
- coordinate labels
- scientific notation
- timestamps
- data tables

Do not use monospace for normal paragraphs.

### Optional editorial display face

If needed, use a restrained serif such as **Source Serif 4** only for very large marketing/editorial headings.

Do not make the whole app serif.

---

# 7. Visual rules

## 7.1 No generic AI aesthetic

Never use:

- huge purple-blue gradient blobs behind every section
- excessive glassmorphism
- glowing cards everywhere
- floating neon pills
- AI sparkle icons
- random gradient text
- excessive rounded cards
- “futuristic” sci-fi fonts
- generic dashboard templates
- oversized floating 3D objects unrelated to science

## 7.2 Shape language

Use moderate corner radii:

- small controls: 6–8px
- cards: 10–14px
- large panels: 14–18px
- modals: 16px

Avoid everything being a giant pill.

## 7.3 Borders

Prefer subtle 1px borders over heavy shadows.

Shadows should be:

- soft
- low opacity
- used for hierarchy, not decoration

## 7.4 Grid

Use an editorial 12-column desktop grid.

Reading content should have a narrower measure than dashboard content.

Recommended Chinese reading width:

`680–820px`

---

# 8. Gradients and shaders

Gradients are allowed, but they are **secondary materials**, not the identity.

Use:

- subtle radial gradients
- paper grain
- mesh gradients
- restrained shader fields
- scientific contour-like backgrounds

Use Fera UI and ShaderGradient as references.

For ShaderGradient:

- only use on landing page/marketing hero or special showcase areas
- lazy-load where possible
- respect `prefers-reduced-motion`
- provide a static fallback
- never put it behind dense learning text
- never make it required for app functionality

A possible hero visual:

A slow-moving dark field containing subtle teal/brass light gradients and thin scientific contour lines.

It should resemble a scientific visualization or instrument display.

---

# 9. Landing page

Route:

`/`

## Navbar

Left:

**ScienceMaterial**

Center/right:

- Courses
- Laboratory
- Features
- About

Right:

- Theme toggle
- Sign In
- Start Learning

No huge navigation bar.

## Hero

Eyebrow:

`UEC JUNIOR SECONDARY SCIENCE`

Main heading:

**Learn science by seeing how it works.**

Supporting text:

`Structured Chinese course material, interactive experiments, and revision tools for the complete Junior Secondary Science curriculum.`

CTA:

- `Start Learning`
- `Explore Laboratory`

Hero visual:

- shader/mesh science visualization
- measurement ticks
- subtle particle or wave motion
- scientific labels
- interactive cursor response

Avoid generic stock illustrations.

## Curriculum section

Heading:

**The complete science curriculum, organized.**

Show six book groups.

Use editorial book-index styling rather than generic SaaS cards.

## Laboratory section

Show interactive experiment previews.

Examples:

- Density
- Reflection
- Refraction
- Circuit Builder
- Ohm’s Law
- Particle Model
- Moon Phases
- Solar System

## Learning loop

Display:

`READ → EXPLORE → PRACTISE → REVIEW`

Each step has a small scientific diagram.

## Screenshots section

Show real application screenshots.

Do not use fake browser mockups with meaningless UI.

Screenshots should be generated from the actual application after implementation.

Required screenshots:

1. Landing page
2. Dashboard
3. Course browser
4. Chapter reading page
5. Laboratory
6. Experiment fullscreen
7. Quiz
8. Progress
9. Admin CMS
10. Admin experiment editor

## Footer

Links:

- Courses
- Laboratory
- Privacy
- Terms
- Cookie Preferences
- GitHub
- Documentation

---

# 10. Student application

## Main navigation

Desktop sidebar:

- Dashboard
- Courses
- Laboratory
- Quizzes
- Progress
- Bookmarks
- Search

Bottom/secondary:

- Settings
- Account

Mobile:

- bottom navigation
- drawer for secondary navigation

---

# 11. Dashboard

The dashboard should not resemble a generic analytics dashboard.

Top:

**Continue Learning**

Large current chapter item.

Example:

`初二上册 · 第十章 · 电路`

Show:

- Chinese chapter title
- progress
- last section
- `Continue` button

Then:

### Today

- unfinished section
- pending quiz
- recent experiment

### Your Science Map

A visual overview of six curriculum domains.

### Recent Activity

Simple timeline.

### Quick Revision

Buttons:

- 5 min
- 10 min
- Weak Areas
- Random Review

---

# 12. Course browser

Route:

`/courses`

Hierarchy:

```text
Courses
├── 初一上册
├── 初一下册
├── 初二上册
├── 初二下册
├── 初三上册
└── 初三下册
```

Each book displays:

- Chinese book title
- chapter count
- completion percentage
- last opened chapter

Chapter rows should feel like a textbook index.

Example:

```text
01  科学是什么做的？                         82%
02  走进科学实验室                           100%
03  测量                                      46%
...
```

Use progress bars sparingly.

---

# 13. Chapter page

Route:

`/courses/[bookSlug]/[chapterSlug]`

Header:

- Book
- Chapter number
- Chinese chapter title
- progress

Tabs:

- Overview
- Learn
- Laboratory
- Quiz

The tab labels are English.

## Learn mode

Chinese content is the dominant visual content.

Support:

- headings
- paragraphs
- lists
- formulas
- tables
- diagrams
- images
- definitions
- callouts
- examples
- comparison blocks
- experiment embeds
- quiz checkpoints
- interactive graphs

---

# 14. Reading experience

The reading experience is one of the most important parts of ScienceMaterial.

Think:

**digital textbook + scientific notebook**

Features:

- persistent reading position
- estimated reading time
- table of contents
- previous/next section
- bookmark
- highlight
- responsive diagrams
- equations
- inline definitions
- expandable explanations
- experiment insertion
- checkpoint questions

Avoid:

- giant cards around every paragraph
- excessive animations
- unnecessary gamification
- noisy badges

---

# 15. Content model

Use:

```text
Book
  └── Chapter
        └── Section
              └── ContentBlock
```

Do not store the whole course as one HTML blob.

Content blocks should be structured JSON.

Example:

```json
{
  "type": "paragraph",
  "content": "..."
}
```

```json
{
  "type": "definition",
  "term": "密度",
  "definition": "..."
}
```

```json
{
  "type": "experiment",
  "experimentId": "density-explorer"
}
```

```json
{
  "type": "quiz",
  "quizId": "chapter-2-density-checkpoint"
}
```

This allows the CMS to edit individual components without destroying the course structure.

---

# 16. Admin CMS

Route:

`/admin`

Only users with the Neon Auth `admin` role may access it.

Normal signup must never expose an admin-registration option.

Admin accounts are provisioned separately through Neon Auth/admin tooling.

## Admin navigation

- Overview
- Users
- Courses
- Chapters
- Sections
- Content
- Quizzes
- Laboratory
- Media
- Analytics
- Audit Log
- Settings

## CMS editor

Use Tiptap/editorcn-style architecture.

The editor should support:

- paragraph
- heading
- bold
- italic
- underline
- highlight
- lists
- table
- image
- link
- quote
- callout
- code
- equation
- definition
- warning
- tip
- diagram
- chart
- experiment
- quiz
- accordion
- divider

The editor should have:

- autosave draft
- explicit Save
- Preview
- Publish
- revision history
- rollback
- unsaved-changes warning

---

# 17. Experiment system

Experiments are single-file HTML5/JavaScript applications.

Example:

```text
density-explorer.html
```

The file may contain:

- HTML
- CSS
- JavaScript
- canvas
- SVG
- p5.js
- Three.js
- charts

## Storage

Store source in the database for V1.

Suggested fields:

```text
id
slug
title
description
subject
chapter_id
html_source
thumbnail
version
status
created_at
updated_at
published_at
```

## Security

Experiments must run inside a sandboxed iframe.

Do not give experiments access to:

- parent DOM
- parent cookies
- authentication tokens
- database credentials
- server secrets

Use `postMessage()` for communication.

Example contract:

```js
window.SCIENCEMATERIAL = {
  reset() {},
  pause() {},
  resume() {},
  getState() { return {}; }
};
```

Parent controls:

- Reset
- Pause
- Resume
- Fullscreen

Use a strict sandbox.

Do not combine `allow-scripts` and `allow-same-origin` for same-origin untrusted content.

For higher-security future deployment, experiments may be served from a separate origin.

---

# 18. Laboratory

Route:

`/laboratory`

Filters:

- All
- Biology
- Chemistry
- Physics
- Earth
- Space
- Environment
- Engineering

Types:

- Simulation
- Experiment
- Visualizer
- Animation
- Graph
- Interactive Model

Difficulty:

- Beginner
- Intermediate
- Advanced

Cards:

```text
Density Explorer
Physics
初二上册 · 第二章

[Launch]
```

The title may be English for the UI/library name, while the explanatory course content remains Chinese.

---

# 19. Initial experiment library

Build the architecture so the library can eventually support 100+ activities.

Initial priority:

1. Measurement / Ruler
2. Density Explorer
3. Floating and Sinking
4. Wave Generator
5. Reflection
6. Refraction
7. Lens Simulator
8. Force and Friction
9. Pressure
10. Circuit Builder
11. Ohm’s Law
12. Magnetic Field
13. Particle Model
14. pH Visualizer
15. Solar System
16. Moon Phases
17. Photosynthesis Visualizer
18. Human Circulation Explorer
19. Plant Transport
20. Earth Structure

Potential future categories:

- measurement
- cells
- classification
- plant biology
- human biology
- sound
- optics
- mechanics
- pressure
- water
- electricity
- magnetism
- chemistry
- heat
- energy
- astronomy
- sustainability

For chemistry involving hazardous substances, implement the concept as a virtual simulation rather than instructions for real-world handling.

---

# 20. Quiz engine

Generic engine.

Supported types:

- multiple choice
- multi-select
- true/false
- fill in the blank
- numerical
- matching
- drag and drop
- ordering
- diagram labeling
- graph interpretation
- simulation-based question

Question object:

```json
{
  "type": "multiple_choice",
  "question": "以下哪一项……？",
  "options": [
    { "id": "a", "text": "……" },
    { "id": "b", "text": "……" },
    { "id": "c", "text": "……" },
    { "id": "d", "text": "……" }
  ],
  "answer": "b",
  "explanation": "……",
  "difficulty": "medium",
  "points": 1
}
```

Important:

Question content and answer explanations are Chinese.

UI controls remain English.

Example:

`Submit Answer`

followed by Chinese feedback.

---

# 21. Quiz templates

Implement reusable templates:

### Concept MCQ

One correct answer.

### Multi-select

Several correct answers.

### Classification

Drag concepts into categories.

### Ordering

Arrange stages/processes.

### Diagram labeling

Place labels on a diagram.

### Graph interpretation

Read and interpret a graph.

### Numerical

Enter a calculated answer.

### Simulation question

Interact with a simulation, then answer.

---

# 22. Revision mode

Route:

`/revision`

Modes:

- Quick Revision
- Chapter Revision
- Weak Areas
- Exam Mode

Weak-area logic can initially be simple:

```text
quiz accuracy < 70% → weak topic
```

No AI recommendation engine is required for V1.

---

# 23. Progress system

Use local-first persistence.

### Local

Use:

- IndexedDB
- Dexie

Write progress locally immediately.

### Server synchronization

Do not send a request for every scroll or button click.

Sync:

- approximately every 60–120 seconds
- on chapter completion
- after quiz submission
- on logout
- after major navigation
- when connection becomes available

### Cross-device

At login:

1. fetch server progress
2. compare local and server timestamps
3. merge
4. continue from the newest valid state

Suggested progress fields:

```text
user_id
chapter_id
section_id
status
progress
last_position
last_accessed
quiz_score
completed_at
updated_at
```

---

# 24. Bookmarks

Allow students to bookmark:

- chapters
- sections
- experiments
- quiz questions

Route:

`/bookmarks`

---

# 25. Search

Global search:

`Ctrl/Cmd + K`

Search:

- chapters
- sections
- concepts
- experiments
- quizzes

Search results can show:

```text
测量
初一上册 · 第三章
Section: 单位与国际单位制

Laboratory
Measurement / Ruler
```

The command palette UI is English; the indexed content is Chinese.

---

# 26. “Science Map” visualization

Create a signature progress visualization.

Do not make it a childish game map.

Use a scientific network/constellation concept:

- each chapter = node
- completed = solid
- current = highlighted
- locked = muted
- weak = outlined with oxide accent
- related chapters = connected

The six books form six major regions.

This can become the platform’s visual identity.

---

# 27. Database

Use:

**Neon PostgreSQL**

Recommended tables:

```text
profiles
books
chapters
sections
content_blocks
experiments
experiment_versions
quizzes
questions
question_options
quiz_attempts
quiz_answers
progress
progress_events
bookmarks
admin_audit_logs
```

Neon Auth owns identity/authentication.

Application tables should reference the authenticated user ID.

Do not duplicate passwords or authentication credentials in application tables.

---

# 28. Authentication

Use:

**Neon Auth**

Normal signup:

```text
email/password
    ↓
Neon Auth
    ↓
role = user
```

Admin:

```text
Admin provisioned separately
    ↓
Neon Auth
    ↓
role = admin
    ↓
normal login page
    ↓
/admin
```

Do not create an admin signup button.

Do not rely on hiding `/admin`.

Every protected server action must verify:

1. authenticated user
2. correct role
3. requested resource permissions

---

# 29. Vercel architecture

Target:

**Vercel Hobby**

Use:

**Next.js App Router + TypeScript**

Prefer:

- Server Components
- Server Actions
- route handlers only where necessary

The goal is to keep the deployment comfortably below the requested maximum of **12 serverless functions**.

Do not create one API endpoint per tiny operation.

Group operations into logical server boundaries.

Suggested logical groups:

1. Auth
2. Learning data
3. Progress sync
4. Admin/CMS
5. Experiments
6. Analytics

Next.js on Vercel can bundle dynamic application code into fewer functions than a simplistic one-route-one-function architecture, so use the framework architecture rather than manually creating dozens of tiny functions.

---

# 30. Suggested route structure

```text
app/
├── page.tsx
├── courses/
│   ├── page.tsx
│   └── [bookSlug]/
│       └── [chapterSlug]/
│           └── page.tsx
├── laboratory/
│   ├── page.tsx
│   └── [slug]/
│       └── page.tsx
├── quizzes/
│   ├── page.tsx
│   └── [quizId]/
│       └── page.tsx
├── revision/
│   └── page.tsx
├── progress/
│   └── page.tsx
├── bookmarks/
│   └── page.tsx
├── search/
│   └── page.tsx
├── settings/
│   └── page.tsx
├── auth/
│   ├── login/
│   └── signup/
├── admin/
│   ├── page.tsx
│   ├── users/
│   ├── courses/
│   ├── quizzes/
│   ├── laboratory/
│   ├── analytics/
│   └── settings/
└── api/
    ├── sync/
    ├── experiments/
    └── analytics/
```

Use Server Actions wherever they reduce the need for route handlers.

---

# 31. Recommended stack

```text
Next.js
TypeScript
Tailwind CSS
shadcn/ui
Lucide
Motion
Neon PostgreSQL
Neon Auth
Drizzle ORM
Tiptap / editorcn
Zod
Dexie
IndexedDB
Recharts
p5.js
ShaderGradient
Vercel
GitHub
```

Use dependencies only when they provide real value.

---

# 32. Component architecture

```text
components/
├── ui/
├── layout/
├── navigation/
├── learning/
│   ├── ChapterHeader
│   ├── ReadingView
│   ├── ContentBlockRenderer
│   ├── DefinitionBlock
│   ├── ExperimentBlock
│   └── QuizBlock
├── laboratory/
│   ├── ExperimentCard
│   ├── ExperimentFrame
│   ├── ExperimentControls
│   └── FullscreenExperiment
├── quiz/
│   ├── QuizRenderer
│   ├── MultipleChoice
│   ├── MultiSelect
│   ├── DragDrop
│   ├── Ordering
│   ├── DiagramQuestion
│   └── GraphQuestion
├── progress/
│   ├── ProgressRing
│   ├── ScienceMap
│   └── ActivityTimeline
└── admin/
    ├── CmsEditor
    ├── CourseTree
    ├── ExperimentEditor
    ├── QuizEditor
    └── AnalyticsDashboard
```

---

# 33. Admin CMS content workflow

```text
Draft
  ↓
Edit
  ↓
Preview
  ↓
Validation
  ↓
Publish
  ↓
Version snapshot
```

Never overwrite the only copy of published content.

Use versions.

For experiments:

```text
Draft HTML
↓
Preview in sandbox
↓
Validate metadata
↓
Publish version
```

---

# 34. Analytics

Admin analytics should include:

- registered users
- active users
- chapters opened
- chapters completed
- quiz attempts
- average quiz score
- experiment launches
- most difficult questions
- most completed chapters
- 1/7/30-day retention

Avoid unnecessary collection of personal data.

Because the platform is intended for students, privacy and data minimisation must be treated as product requirements, not afterthoughts.

---

# 35. Privacy / cookies

Public pages:

```text
/privacy
/terms
/cookies
```

Cookie banner:

> We use essential storage to keep ScienceMaterial working and optional analytics to improve the platform.

Buttons:

- Accept All
- Essential Only
- Preferences

Preferences:

- Essential — Always active
- Analytics — Optional
- Personalisation — Optional

Do not load optional analytics before consent.

The privacy policy should explain:

- information collected
- purpose
- retention
- authentication
- progress data
- analytics
- cookies/local storage
- experiment telemetry
- account deletion
- third-party processors
- student/minor considerations

Legal copy should be reviewed appropriately before public deployment.

---

# 36. Accessibility

Minimum requirements:

- keyboard navigation
- visible focus states
- semantic HTML
- accessible labels
- reduced-motion support
- sufficient contrast
- no color-only information
- screen-reader-friendly dialogs
- accessible charts
- accessible experiment controls
- keyboard alternative for drag/drop where practical

For `prefers-reduced-motion`:

- disable shader animation
- reduce page transitions
- stop decorative particle movement
- preserve functionality

---

# 37. Responsive design

Desktop:

- 12-column editorial layout
- persistent sidebar for app
- wide experiment canvas

Tablet:

- collapsible navigation
- two-column course layout

Mobile:

- bottom navigation
- single-column reading
- full-width experiment
- horizontally scrollable tables where unavoidable
- no tiny desktop UI squeezed into mobile

---

# 38. Performance

Priorities:

1. fast first load
2. fast course reading
3. minimal JavaScript for static learning content
4. lazy-load experiments
5. lazy-load shaders
6. lazy-load charts
7. avoid giant client components
8. cache public course content where appropriate

Experiments should not block the main chapter from becoming interactive.

---

# 39. SEO

Public pages should have metadata.

Examples:

```text
ScienceMaterial — UEC Junior Secondary Science
ScienceMaterial Laboratory
ScienceMaterial Courses
```

Course content pages can have appropriate Chinese titles while surrounding site metadata remains coherent.

Use:

- Open Graph
- Twitter/X metadata if desired
- sitemap
- robots.txt
- canonical URLs

---

# 40. Error handling

Errors must be human-readable.

UI is English:

`We couldn't save your progress. Your local progress is safe and we'll retry automatically.`

Course content remains Chinese.

Never show raw database errors to students.

---

# 41. Offline/local-first behavior

If the network disappears:

- reading already-loaded content continues
- progress is saved locally
- quiz progress is preserved
- experiment state can remain local
- sync resumes when online

Show a small status indicator:

`Saved locally`

or

`Syncing…`

or

`Synced`

Do not use alarming red UI for ordinary offline mode.

---

# 42. Security requirements

Never expose:

- Neon connection string
- database credentials
- admin secrets
- auth secrets
- private environment variables
- server-side tokens

Use environment variables.

Validate all server inputs with Zod.

Authorize every mutation server-side.

Sanitize/render rich text safely.

Treat uploaded experiment HTML as untrusted.

Never execute experiment source directly in the main application document.

---

# 43. Testing

Use:

- unit tests
- integration tests
- Playwright end-to-end tests

Critical flows:

### Student

```text
Signup
Login
Browse course
Open chapter
Read section
Launch experiment
Submit quiz
See result
Progress saved
Logout
Login on another device/session
Progress restored
```

### Admin

```text
Admin login
Open admin
Edit chapter
Save draft
Preview
Publish
Create quiz
Create experiment
Edit experiment
Publish version
View analytics
View users
```

### Security

Test:

- user cannot access admin
- user cannot publish
- user cannot modify another user's progress
- experiment cannot access parent DOM
- unauthenticated requests fail
- invalid content is rejected

---

# 44. Seed data

Create a seed/import system for all six books and 64 chapters.

Do not hard-code curriculum pages individually.

Recommended seed format:

```text
data/
├── curriculum/
│   ├── book-01.json
│   ├── book-02.json
│   ├── book-03.json
│   ├── book-04.json
│   ├── book-05.json
│   └── book-06.json
├── experiments/
└── quizzes/
```

The supplied curriculum reconstruction should be imported carefully.

Preserve Chinese terminology exactly unless the content source explicitly provides a correction.

---

# 45. README.md requirement

The AI developer must create a **professional GitHub README.md**.

It must include:

## Header

ScienceMaterial logo/name.

Short description:

> Interactive UEC Junior Secondary Science learning platform with structured Chinese course material, simulations, experiments, quizzes and progress tracking.

## Screenshots

The README must include real screenshots from the finished application.

Required:

```text
docs/screenshots/
├── landing.png
├── dashboard.png
├── courses.png
├── chapter.png
├── laboratory.png
├── experiment.png
├── quiz.png
├── progress.png
├── admin-dashboard.png
└── cms-editor.png
```

README example:

```md
## Screenshots

### Learning Dashboard

![ScienceMaterial Dashboard](docs/screenshots/dashboard.png)

### Interactive Laboratory

![ScienceMaterial Laboratory](docs/screenshots/laboratory.png)
```

Do not use placeholder screenshots in the final README.

## README sections

- Overview
- Features
- Screenshots
- Architecture
- Tech Stack
- Curriculum
- Authentication
- Laboratory
- Quiz Engine
- Progress Sync
- CMS
- Security
- Local Development
- Environment Variables
- Database Setup
- Deployment
- Project Structure
- Testing
- Design System
- Contributing
- License

---

# 46. SETUP.md requirement

Create:

```text
SETUP.md
```

It must be a complete deployment manual.

## Required sections

### 1. Prerequisites

- Node.js version
- package manager
- Git
- Neon account
- Vercel account
- GitHub repository

### 2. Clone

```bash
git clone <repository>
cd sciencematerial
```

### 3. Install

```bash
npm install
```

### 4. Environment variables

Create:

```text
.env.local
```

Document every variable.

Example:

```env
DATABASE_URL=
NEON_AUTH_BASE_URL=
NEON_AUTH_CLIENT_ID=
NEON_AUTH_CLIENT_SECRET=
NEXT_PUBLIC_APP_URL=
```

Do not invent variables that the actual implementation does not use.

### 5. Neon setup

Document:

- create project
- create database
- configure Neon Auth
- configure allowed/trusted domains
- run migrations
- seed curriculum
- create first admin
- assign admin role

### 6. Local database migration

Document exact commands.

### 7. Local development

```bash
npm run dev
```

### 8. Vercel

Document:

- import GitHub repository
- configure environment variables
- configure production URL
- deploy
- verify Neon Auth redirect/trusted domain
- run migration/seed process

### 9. Admin setup

Explain:

```text
Create user through Neon Auth
→ assign admin role
→ log in through normal login
→ /admin becomes available
```

Do not create an admin signup page.

### 10. Troubleshooting

Include:

- database connection problems
- auth redirect errors
- role not detected
- migration failures
- experiment iframe errors
- deployment errors
- environment variable mistakes
- CORS/sandbox issues

---

# 47. Additional documentation files

Create:

```text
README.md
SETUP.md
ARCHITECTURE.md
DESIGN_SYSTEM.md
CMS.md
EXPERIMENTS.md
QUIZ_ENGINE.md
PROGRESS_SYNC.md
SECURITY.md
PRIVACY.md
CONTRIBUTING.md
CHANGELOG.md
```

## ARCHITECTURE.md

Explain:

- Next.js architecture
- server/client boundaries
- Neon
- Neon Auth
- Drizzle
- server actions
- API routes
- function-count strategy

## DESIGN_SYSTEM.md

Document:

- colors
- typography
- spacing
- radii
- shadows
- motion
- iconography
- components
- responsive rules
- accessibility
- anti-patterns

## CMS.md

Document:

- content hierarchy
- block types
- publishing
- versioning
- rollback
- permissions

## EXPERIMENTS.md

Document:

- HTML contract
- sandbox
- postMessage
- fullscreen
- reset/pause/resume
- versioning
- security

## QUIZ_ENGINE.md

Document:

- question schemas
- scoring
- validation
- question types
- quiz attempts
- result storage

## PROGRESS_SYNC.md

Document:

- IndexedDB
- Dexie
- local state
- sync queue
- conflict resolution
- retries
- offline behavior

## SECURITY.md

Document:

- authentication
- authorization
- experiment sandbox
- input validation
- secrets
- XSS
- CSRF considerations
- audit logging
- privacy

---

# 48. Suggested repository structure

```text
sciencematerial/
├── app/
├── components/
├── lib/
│   ├── auth/
│   ├── db/
│   ├── curriculum/
│   ├── experiments/
│   ├── progress/
│   ├── quizzes/
│   └── validation/
├── db/
│   ├── schema/
│   ├── migrations/
│   └── seed/
├── data/
│   ├── curriculum/
│   ├── experiments/
│   └── quizzes/
├── public/
│   ├── images/
│   ├── diagrams/
│   └── screenshots/
├── docs/
│   ├── screenshots/
│   └── diagrams/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── scripts/
├── README.md
├── SETUP.md
├── ARCHITECTURE.md
├── DESIGN_SYSTEM.md
├── CMS.md
├── EXPERIMENTS.md
├── QUIZ_ENGINE.md
├── PROGRESS_SYNC.md
├── SECURITY.md
├── PRIVACY.md
├── CONTRIBUTING.md
└── CHANGELOG.md
```

---

# 49. AI coding-agent instructions

The coding agent must behave as a senior product engineer and UI designer.

## Before coding

1. Read this entire specification.
2. Inspect the supplied curriculum source.
3. Inspect the referenced UI/UX resources.
4. Establish the design tokens first.
5. Establish the database schema.
6. Establish authentication.
7. Establish content models.
8. Establish component architecture.
9. Only then implement pages.

## While coding

Prefer:

- reusable components
- typed schemas
- server-side authorization
- Server Actions
- progressive enhancement
- accessible controls
- small client components
- data-driven course rendering

Avoid:

- duplicated page code
- hard-coded chapter pages
- fake API calls
- placeholder dashboards
- unnecessary client-side state
- excessive dependencies
- giant components
- one API endpoint per tiny action

## Content rule

Never replace Chinese course content with invented English content.

If a section from the source has not yet been converted into structured content, mark it clearly as unfinished in the CMS rather than fabricating educational material.

---

# 50. Design QA checklist

Before calling the UI complete, verify:

- Does it look like ScienceMaterial rather than a generic SaaS?
- Is the warm paper/ink system visible?
- Is teal the main interactive color rather than purple?
- Are brass/oxide accents restrained?
- Are gradients used as atmosphere rather than decoration everywhere?
- Does the app look good in both light and dark mode?
- Are Chinese paragraphs highly readable?
- Does the English UI remain consistent?
- Are scientific diagrams visually coherent?
- Are cards used only when they improve grouping?
- Is there enough whitespace?
- Are animations subtle?
- Does reduced motion work?
- Are mobile layouts intentional?
- Are focus states visible?
- Are colors accessible?

---

# 51. Product QA checklist

### Student

- [ ] Signup works
- [ ] Login works
- [ ] Logout works
- [ ] Course browsing works
- [ ] 6 books exist
- [ ] 64 chapters are represented
- [ ] Chinese content renders correctly
- [ ] Experiments launch
- [ ] Fullscreen works
- [ ] Quizzes work
- [ ] Progress saves locally
- [ ] Progress syncs
- [ ] Cross-device progress restores
- [ ] Search works
- [ ] Bookmarks work

### Admin

- [ ] Admin cannot be created from signup
- [ ] Admin role works
- [ ] Normal users cannot access admin
- [ ] Course editor works
- [ ] Rich text editor works
- [ ] Draft/publish works
- [ ] Versioning works
- [ ] Experiment upload works
- [ ] Experiment preview works
- [ ] Quiz editor works
- [ ] Analytics work
- [ ] Audit log works

### Deployment

- [ ] Production build works
- [ ] Vercel deployment works
- [ ] Neon connection works
- [ ] Neon Auth redirects work
- [ ] Production domain is trusted
- [ ] Environment variables documented
- [ ] Migrations documented
- [ ] Seed process documented
- [ ] Function architecture remains within target
- [ ] README screenshots are real
- [ ] SETUP.md is reproducible

---

# 52. Recommended implementation phases

## Phase 1 — Foundation

- Next.js
- TypeScript
- Tailwind
- shadcn/ui
- design tokens
- typography
- dark/light mode
- layout

## Phase 2 — Backend

- Neon
- Drizzle
- schema
- migrations
- Neon Auth
- roles

## Phase 3 — Curriculum

- six books
- 64 chapters
- sections
- content blocks
- source import pipeline

## Phase 4 — Student application

- dashboard
- course browser
- reading
- search
- bookmarks

## Phase 5 — Quiz

- engine
- question schemas
- results
- progress integration

## Phase 6 — Laboratory

- iframe architecture
- experiment registry
- first 15–20 experiments
- fullscreen
- experiment protocol

## Phase 7 — CMS

- admin dashboard
- course editor
- Tiptap/editorcn
- quiz editor
- experiment editor
- publishing/versioning

## Phase 8 — Local-first progress

- IndexedDB
- Dexie
- sync queue
- conflict resolution
- offline mode

## Phase 9 — Analytics

- admin metrics
- audit logs
- privacy-conscious telemetry

## Phase 10 — Public website

- landing page
- shader/gradient hero
- screenshots
- SEO
- privacy
- terms
- cookie preferences

## Phase 11 — QA

- accessibility
- responsive
- Playwright
- security
- performance
- deployment verification
- documentation

---

# 53. V1 definition of done

ScienceMaterial V1 is complete when it has:

- professional landing page
- light/dark mode
- English UI
- Chinese course content
- six books
- 64 chapters represented
- chapter reading
- search
- bookmarks
- student authentication
- admin authentication/role
- CMS
- quizzes
- at least 15 interactive experiments
- fullscreen experiment mode
- local-first progress
- database sync
- admin analytics
- privacy/cookie pages
- Vercel deployment
- Neon database
- Neon Auth
- professional README
- real screenshots
- complete SETUP.md
- architecture/security/design documentation

---

# 54. Final design principle

ScienceMaterial should feel like someone took a **beautiful science textbook, a laboratory notebook, a museum exhibit and a modern web application**, then combined them into one coherent system.

The interface should make students want to explore because the **information itself is visually interesting**.

Do not rely on artificial “AI-looking” visual effects to create excitement.

Use:

**typography + diagrams + scientific visualization + interaction + editorial layout + restrained motion**

as the primary visual language.

---

# 55. Reference library

Keep these references available to the developer/design agent:

- UI/UX Pro Max: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- Watermelon UI: https://ui.watermelon.sh/home
- Fera UI: https://feralui.dev/
- Fera UI Gradients: https://feralui.dev/gradients
- shadcn/ui: https://ui.shadcn.com/
- Emil Kowalski Skills: https://github.com/emilkowalski/skills
- editorcn: https://www.rtecn.space/
- Bklit: https://bklit.com/
- ShaderGradient: https://shadergradient.co/

These are references and inspiration sources, not instructions to copy another site's branding.

---

# 56. Important source/research notes

The curriculum structure above is derived from the supplied curriculum reconstruction. The source itself identifies the six-book structure and the 64-chapter organization. fileciteturn0file0L8-L73

The source also contains detailed sections on measurement, including units, measurement scales, error, area/volume, mass/weight, temperature and time. fileciteturn0file0L224-L324

Current UI research confirms that shadcn/ui provides a broad set of composable components including cards, charts, data tables, dialogs, drawers, command menus, progress, sidebar, tabs, tooltips and more. citeturn0search1

Current Watermelon UI documentation emphasizes animated components, blocks, dashboards, templates and showcase compositions as implementation-oriented references. citeturn1view0

Current Fera UI documentation supports using mesh, grainy, animated, aurora, wave, radial, conic and related gradient techniques. citeturn1view1

---

# 57. Instruction to the implementing AI

**Build the actual application described by this document. Do not merely generate a visual prototype.**

The final repository must contain:

1. Working application
2. Working database integration
3. Working authentication
4. Working student flow
5. Working admin flow
6. Working CMS
7. Working quiz engine
8. Working experiment system
9. Working progress persistence
10. Working deployment configuration
11. Professional README.md
12. Complete SETUP.md
13. Architecture/security/design documentation
14. Real screenshots captured from the implemented application

When a requirement is ambiguous, prioritize:

**source curriculum fidelity → security → accessibility → maintainability → performance → visual polish**

Do not sacrifice learning usability for visual effects.
