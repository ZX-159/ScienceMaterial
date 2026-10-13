# SECURITY.md

## Authentication

- **Provider:** Neon Auth (production), mocked for MVP
- **Normal signup:** email/password → Neon Auth → role=user (default)
- **Admin:** Provisioned separately via Neon dashboard → role=admin → normal login → /admin
- **No admin signup button** — critical security requirement
- **JWT:** Contains user id + role, verified server-side on every protected action

## Authorization

Every protected server action must verify:

1. Authenticated user (JWT valid, not expired)
2. Correct role (user for learning, admin for CMS)
3. Requested resource permissions (e.g., user cannot modify another user's progress, user cannot publish)

```ts
// Example Server Action
export async function publishChapterAction(chapterId: string) {
  const session = await getSession()
  if (!session) throw new Error("Unauthorized")
  if (session.role !== "admin") throw new Error("Forbidden")
  // validate input with Zod
  // perform DB operation
  // log to audit log
}
```

- Do not rely on hiding `/admin` — server checks role
- Test: user cannot access admin, user cannot publish, user cannot modify another user's progress

## Experiment Sandbox

- Experiments are single-file HTML5 apps, treated as **untrusted**
- Must run inside sandboxed iframe: `<iframe sandbox="allow-scripts" ...>`
- Do NOT combine `allow-scripts` and `allow-same-origin` for same-origin untrusted content — would allow escaping sandbox
- No access to parent DOM, cookies, auth tokens, DB credentials, server secrets
- Communication only via `postMessage()` with origin check
- For higher-security future: serve experiments from separate origin (e.g., `experiments.sciencematerial.app`)
- For chemistry involving hazardous substances, implement as virtual simulation, not real-world handling instructions

## Input Validation

- All server inputs validated with Zod
- Rich text sanitized (Tiptap content, prevent XSS)
- Quiz answers validated server-side, correct answer not leaked before submission
- File uploads (experiment HTML, images) size-limited, type-checked

## Secrets

Never expose:

- Neon connection string
- Database credentials
- Admin secrets
- Auth secrets
- Private environment variables
- Server-side tokens

Use environment variables, not hard-coded. Client components only access `NEXT_PUBLIC_` vars.

## XSS / CSRF

- **XSS:** Sanitize/render rich text safely, CSP headers, no `dangerouslySetInnerHTML` with untrusted content (experiment srcDoc is sandboxed, not in main document)
- **CSRF:** Next.js Server Actions have built-in CSRF protection, use SameSite cookies for auth
- **Clickjacking:** `X-Frame-Options: DENY` for main app, allow only for experiment iframe via CSP `frame-ancestors`

## Audit Logging

```
admin_audit_logs (id, admin_id, action, target_type, target_id, ip, user_agent, created_at)
```

- All admin actions logged: publish, edit, delete, role assignment, experiment version publish
- Retained for security review
- No PII beyond admin id and action

## Privacy

- Platform intended for students — privacy and data minimisation are product requirements
- Avoid unnecessary collection of personal data
- Analytics: only chapters opened, completed, quiz attempts, average score, experiment launches, most difficult questions, retention — aggregated, no personal tracking for ads
- Cookie banner: Essential always active, Analytics optional, Personalisation optional — do not load optional analytics before consent
- Account deletion: user can request deletion, progress and personal data removed, audit logs anonymized
- See PRIVACY.md, /privacy, /terms, /cookies pages

## Testing Security

- User cannot access /admin (403)
- User cannot publish (403)
- User cannot modify another user's progress (403)
- Experiment cannot access parent DOM (sandbox test)
- Unauthenticated requests fail (401)
- Invalid content rejected (400, Zod errors)
- Playwright E2E for all above
