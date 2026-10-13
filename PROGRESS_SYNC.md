# PROGRESS_SYNC.md

## Overview

Local-first progress with Dexie + IndexedDB, periodic server sync, offline support, cross-device merge.

## Why Local-first

- Reading should continue even if network disappears
- Progress must not be lost on flaky mobile connections
- Fast, immediate feedback — no waiting for server roundtrip on every scroll

## Local Storage

**Library:** Dexie 4.x (IndexedDB wrapper)

```ts
import Dexie, { Table } from "dexie"

class ScienceMaterialDB extends Dexie {
  progress!: Table<ProgressRecord>
  bookmarks!: Table<BookmarkRecord>
  constructor() {
    super("ScienceMaterialDB")
    this.version(1).stores({
      progress: "++id, userId, chapterId, status, lastAccessed",
      bookmarks: "++id, userId, type, refId",
    })
  }
}
```

**Fields:**

```
user_id
chapter_id
section_id (optional)
status (not_started|in_progress|completed)
progress (0-100)
last_position (e.g., section id or scroll %)
last_accessed (timestamp)
quiz_score
completed_at
updated_at
```

- Write locally immediately on any progress event
- No network request for every scroll — debounce scroll to 1s, save position locally

## Server Synchronization

**When to sync:**

- Approximately every 60–120 seconds (interval, only if dirty)
- On chapter completion
- After quiz submission
- On logout
- After major navigation (book → chapter)
- When connection becomes available (online event)

**How:**

- Maintain dirty queue in IndexedDB
- Sync function:

```ts
async function syncProgress() {
  const dirty = await db.progress.where('updatedAt').above(lastSynced).toArray()
  if (dirty.length === 0) return
  try {
    await fetch('/api/sync', { method:'POST', body: JSON.stringify(dirty) })
    lastSynced = Date.now()
    setStatus('Synced')
  } catch {
    setStatus('Saved locally')
    // retry with exponential backoff
  }
}
```

- Do not send request for every scroll or button click — batch

## Cross-device

At login:

1. Fetch server progress: `GET /api/sync?userId=...`
2. Compare local and server by `updatedAt` timestamp per chapter
3. Merge: newest valid state wins per chapter (last write wins, but keep completed status if either completed)
4. Continue from newest valid state
5. Save merged result locally + server

**Conflict resolution:**

- If local completed and server in_progress, keep completed (higher progress wins)
- If both in_progress, higher `progress` % wins, but keep both `last_position` if possible
- Quiz scores: keep highest score, but keep attempt history

## Offline Behavior

If network disappears:

- Reading already-loaded content continues (static content cached by Next.js)
- Progress saved locally (Dexie)
- Quiz progress preserved locally
- Experiment state can remain local (getState via postMessage, save locally)
- Sync resumes when online (listen to `window.addEventListener('online', sync)`)

**Status indicator (small, not alarming red):**

- `Saved locally` — offline or sync failed, local safe
- `Syncing…` — in progress
- `Synced` — server up to date, show timestamp "Synced · 2 min ago"

Do not use alarming red UI for ordinary offline mode.

## Progress Events

For analytics (privacy-conscious):

```
progress_events (id, user_id, chapter_id, event_type, created_at)
event_type: chapter_opened, section_completed, experiment_launched, quiz_started, quiz_completed, bookmark_added
```

- Used for admin analytics: chapters opened, completed, experiment launches, etc.
- No PII, aggregated

## Bookmarks

Same local-first pattern:

- Bookmark chapters, sections, experiments, quiz questions
- Stored in `bookmarks` table
- Synced similarly
- Route `/bookmarks` shows all

## Testing

- Unit: Dexie operations, merge logic
- Integration: offline → online transition, sync retry
- E2E: signup → browse → open chapter → progress saved → logout → login on another session → progress restored

## Future Improvements

- CRDT for more complex merge (not needed V1)
- Background Sync API where available
- Periodic Background Sync for prefetching next chapter
