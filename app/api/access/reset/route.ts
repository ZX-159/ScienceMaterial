import { NextResponse } from "next/server"
import { isSupabaseConfigured, readProfiles, writeProfiles, writeRequests, writeNotifications } from "@/lib/access/storage"

export async function POST() {
  if (isSupabaseConfigured()) {
    return NextResponse.json({ error: "Not available in production" }, { status: 400 })
  }
  const profiles = readProfiles()
  const idx = profiles.findIndex(p => p.id === "test-user-1")
  if (idx >= 0) {
    profiles[idx].labAccessStatus = "none"
    profiles[idx].labAccessRequestedAt = undefined
    profiles[idx].labAccessReviewedAt = undefined
    profiles[idx].labAccessRejectReason = undefined
    profiles[idx].phone = undefined
    writeProfiles(profiles)
  }
  writeRequests([])
  writeNotifications([])
  return NextResponse.json({ success: true, reset: true })
}
