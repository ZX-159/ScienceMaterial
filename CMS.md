# CMS.md

## Content Hierarchy

```
Book
 └── Chapter
       └── Section
             └── ContentBlock (structured JSON)
```

- Not stored as one HTML blob
- Enables editing individual components without destroying course structure

## Block Types

| Type | Example | Purpose |
|------|---------|---------|
| paragraph | `{"type":"paragraph","content":"..."}` | Chinese body text |
| heading | `{"type":"heading","level":2,"content":"定性与定量"}` | Section headings |
| list | `{"type":"list","items":["..."]}` | Bulleted/numbered |
| definition | `{"type":"definition","term":"密度","definition":"ρ=m/V"}` | Key terms |
| table | `{"type":"table","headers":[],"rows":[]}` | Comparison data |
| callout | `{"type":"callout","variant":"tip","content":"..."}` | Tip/warning/info/example |
| formula | `{"type":"formula","content":"p = F/A"}` | Equations, mono |
| diagram | `{"type":"diagram","content":"ASCII or image ref"}` | Visuals |
| code | `{"type":"code","content":"...","language":"text"}` | Technical |
| experiment | `{"type":"experiment","experimentId":"density-explorer"}` | Embed lab |
| quiz | `{"type":"quiz","quizId":"b1-c3-q1"}` | Checkpoint |

## Editor

Use Tiptap / editorcn-style architecture.

Supported in toolbar:
- paragraph, heading, bold, italic, underline, highlight, lists, table, image, link, quote, callout, code, equation, definition, warning, tip, diagram, chart, experiment, quiz, accordion, divider

Features:
- Autosave draft (local + server debounce)
- Explicit Save button
- Preview (renders ContentBlockRenderer)
- Publish (creates version snapshot)
- Revision history list
- Rollback to previous version
- Unsaved-changes warning (beforeunload + navigation guard)

## Publishing Workflow

```
Draft
  ↓
Edit
  ↓
Preview (render actual chapter page)
  ↓
Validation (Zod: required fields, Chinese content not empty, experimentId exists, quizId exists)
  ↓
Publish
  ↓
Version snapshot (immutable copy in experiment_versions / content_blocks_versions)
```

- Never overwrite only copy of published content — always version
- Draft and published are separate rows / status field
- Rollback = create new draft from old version, then publish

## Experiment Workflow

```
Draft HTML (single file, HTML+CSS+JS)
  ↓
Preview in sandbox iframe (srcDoc, allow-scripts, no allow-same-origin)
  ↓
Validate metadata (slug unique, subject/type/difficulty, chapter_id exists)
  ↓
Publish version (increment version, set published_at)
```

- Thumbnail auto-generated or uploaded
- HTML source treated as untrusted — never executed in main document

## Permissions

- Only `role=admin` may access `/admin/*`
- Normal signup → role=user, never admin
- Admin provisioned via Neon Auth dashboard
- Every mutation server-side checks:
  1. authenticated user (JWT valid)
  2. correct role (admin for CMS)
  3. resource permissions (e.g., cannot edit another admin's draft without permission)

- Audit log: all admin actions logged to `admin_audit_logs` (admin_id, action, target_type, target_id, timestamp)

## Seed Data

```
data/
├── curriculum/
│   ├── book-01.json ... book-06.json (6 books, 64 chapters, sections, blocks)
├── experiments/
└── quizzes/
```

Import pipeline preserves Chinese terminology exactly unless source explicitly provides correction. Reconstruction notes stored in `chapters.is_reconstructed` + `reconstructed_note`.

## Admin Navigation

- Overview (metrics)
- Users
- Courses (book tree)
- Chapters
- Sections
- Content (blocks)
- Quizzes
- Laboratory
- Media
- Analytics
- Audit Log
- Settings
