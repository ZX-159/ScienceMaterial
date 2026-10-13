# PRIVACY.md

## Overview

ScienceMaterial is designed for students. Privacy and data minimisation are product requirements, not afterthoughts.

## Information Collected

- **Authentication:** Email, password hash (handled by Neon Auth), role, created_at
- **Progress:** chapter_id, section_id, status, progress %, last_position, last_accessed, quiz_score, completed_at
- **Quiz attempts:** quiz_id, score, answers, time spent
- **Bookmarks:** type, ref_id
- **Experiment telemetry:** experiment_id, launch count, time spent (optional, aggregated)
- **Admin audit:** admin_id, action, target, timestamp

We do NOT collect: unnecessary personal data, location, device fingerprinting, advertising IDs.

## Purpose

- Keep learning progress across devices
- Provide revision (weak areas)
- Improve platform (which chapters are difficult, which experiments are popular)
- Security (audit logs)

## Retention

- Progress: until account deletion
- Quiz attempts: until account deletion, aggregated stats retained anonymously
- Audit logs: 1 year, then anonymized
- Auth: per Neon Auth policy

## Authentication

- Neon Auth owns identity
- Application tables reference authenticated user ID
- Do not duplicate passwords in application tables

## Progress Data

- Stored locally in IndexedDB (Dexie) immediately
- Synced to server every 60–120s + on events
- Cross-device merge by newest timestamp
- User can export or delete

## Analytics

- Privacy-conscious, aggregated
- Metrics: registered users, active users, chapters opened/completed, quiz attempts, average score, experiment launches, most difficult questions, 1/7/30-day retention
- No personal data in analytics, no third-party ad tracking
- Optional analytics only after consent via cookie banner

## Cookies / Local Storage

Public pages: `/privacy`, `/terms`, `/cookies`

Cookie banner:

> We use essential storage to keep ScienceMaterial working and optional analytics to improve the platform.

Buttons: Accept All, Essential Only, Preferences

Preferences:
- Essential — Always active (auth, progress local)
- Analytics — Optional (aggregated usage)
- Personalisation — Optional (theme, language)

Do not load optional analytics before consent.

## Experiment Telemetry

- Experiment launches counted locally, synced as aggregated count
- No keystroke logging inside experiments
- postMessage only for Reset/Pause/Resume/Fullscreen

## Account Deletion

- User can request deletion via settings or email
- Deletes: profile, progress, bookmarks, quiz attempts (personal)
- Retains: aggregated anonymous analytics, anonymized audit logs
- Neon Auth account deleted via Neon dashboard

## Third-party Processors

- Neon (PostgreSQL + Auth) — DPA, Singapore region
- Vercel (hosting) — DPA, logs retained 30 days
- No other third parties in MVP

## Student / Minor Considerations

- No advertising
- No behavioral tracking for non-educational purposes
- No selling data
- Parental consent flow for under-13 where required by local law (Malaysia PDPA)
- Data minimisation: collect only what is needed for learning

## Contact

For privacy requests: privacy@sciencematerial.app (placeholder)

Legal copy should be reviewed by qualified counsel before public deployment.
