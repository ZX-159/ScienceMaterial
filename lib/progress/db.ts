"use client"
import Dexie, { Table } from "dexie"

export interface ProgressRecord {
  id?: number
  userId: string
  chapterId: string
  sectionId?: string
  status: "not_started" | "in_progress" | "completed"
  progress: number
  lastPosition?: string
  lastAccessed: number
  quizScore?: number
  completedAt?: number
  updatedAt: number
}

export interface BookmarkRecord {
  id?: number
  userId: string
  type: "chapter" | "section" | "experiment" | "question"
  refId: string
  createdAt: number
}

export class ScienceMaterialDB extends Dexie {
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

export const db = new ScienceMaterialDB()

export async function saveProgress(record: Omit<ProgressRecord, "id" | "updatedAt" | "lastAccessed"> & Partial<Pick<ProgressRecord, "lastAccessed">>) {
  const now = Date.now()
  await db.progress.put({
    ...record,
    lastAccessed: record.lastAccessed || now,
    updatedAt: now,
  } as ProgressRecord)
}

export async function getProgress(userId: string) {
  return db.progress.where("userId").equals(userId).toArray()
}
