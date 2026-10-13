// File-based fallback storage for local dev when Supabase env is dummy
import fs from "fs"
import path from "path"

const DATA_DIR = path.join(process.cwd(), "data")
const REQUESTS_FILE = path.join(DATA_DIR, "lab-access-requests.json")
const PROFILES_FILE = path.join(DATA_DIR, "profiles-mock.json")
const NOTIFS_FILE = path.join(DATA_DIR, "notifications.json")

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
}

export interface MockRequest {
  id: string
  userId: string
  email: string
  displayName?: string
  age?: number
  phone: string
  status: "pending" | "approved" | "rejected"
  reason?: string
  requestedAt: string
  reviewedAt?: string
  reviewedBy?: string
}

export interface MockProfile {
  id: string
  email: string
  displayName?: string
  age?: number
  role: string
  phone?: string
  labAccessStatus: "none" | "pending" | "approved" | "rejected"
  labAccessRequestedAt?: string
  labAccessReviewedAt?: string
  labAccessReviewerId?: string
  labAccessRejectReason?: string
  createdAt: string
}

export interface MockNotification {
  id: string
  userId: string
  type: string
  title: string
  body: string
  link?: string
  read: boolean
  createdAt: string
}

export function readRequests(): MockRequest[] {
  ensureDir()
  try {
    if (fs.existsSync(REQUESTS_FILE)) return JSON.parse(fs.readFileSync(REQUESTS_FILE, "utf-8"))
  } catch {}
  return []
}

export function writeRequests(arr: MockRequest[]) {
  ensureDir()
  fs.writeFileSync(REQUESTS_FILE, JSON.stringify(arr, null, 2))
}

export function readProfiles(): MockProfile[] {
  ensureDir()
  try {
    if (fs.existsSync(PROFILES_FILE)) return JSON.parse(fs.readFileSync(PROFILES_FILE, "utf-8"))
  } catch {}
  // Seed with admin
  return [
    {
      id: "admin-1",
      email: "admin@sciencematerial.my",
      displayName: "Admin",
      role: "admin",
      labAccessStatus: "approved",
      createdAt: new Date().toISOString(),
    }
  ]
}

export function writeProfiles(arr: MockProfile[]) {
  ensureDir()
  fs.writeFileSync(PROFILES_FILE, JSON.stringify(arr, null, 2))
}

export function readNotifications(): MockNotification[] {
  ensureDir()
  try {
    if (fs.existsSync(NOTIFS_FILE)) return JSON.parse(fs.readFileSync(NOTIFS_FILE, "utf-8"))
  } catch {}
  return []
}

export function writeNotifications(arr: MockNotification[]) {
  ensureDir()
  fs.writeFileSync(NOTIFS_FILE, JSON.stringify(arr, null, 2))
}

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return !!(url && key && !url.includes("dummy") && !url.includes("example"))
}
