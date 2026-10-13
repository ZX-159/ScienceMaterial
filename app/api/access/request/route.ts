import { NextResponse } from "next/server"
import { createClient, createServiceClient } from "@/lib/supabase/server"
import { isSupabaseConfigured, readRequests, writeRequests, readProfiles, writeProfiles, readNotifications, writeNotifications } from "@/lib/access/storage"
import { canRequestAccess } from "@/lib/access/check"

function validatePhone(phone: string): boolean {
  // MY format: allow +60, 0, 01x-xxxxxxx, 10-11 digits after normalization
  const cleaned = phone.replace(/[\s\-\(\)]/g, "")
  // Accept +60xxxxxxxxx, 0xxxxxxxxx, 01xxxxxxxx
  return /^(\+?60|0)?1[0-9]{8,9}$/.test(cleaned) || /^(\+?60)?[0-9]{9,10}$/.test(cleaned)
}

function normalizePhone(phone: string): string {
  let cleaned = phone.replace(/[\s\-\(\)]/g, "")
  if (cleaned.startsWith("0")) cleaned = "+60" + cleaned.slice(1)
  if (!cleaned.startsWith("+")) cleaned = "+60" + cleaned
  return cleaned
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { phone, displayName } = body

    if (!phone || typeof phone !== "string" || phone.trim().length < 9) {
      return NextResponse.json({ error: "Phone number required (min 9 chars)" }, { status: 400 })
    }
    if (!validatePhone(phone)) {
      return NextResponse.json({ error: "Invalid MY phone format. Example: 012-3456789 or +6012-3456789" }, { status: 400 })
    }

    const normalizedPhone = normalizePhone(phone)

    // Get user
    let userId: string | null = null
    let email: string | null = null
    let profile: any = null

    if (isSupabaseConfigured()) {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
      userId = user.id
      email = user.email || ""

      const service = createServiceClient()
      const { data: prof } = await service.from("profiles").select("*").eq("id", userId).single()
      profile = prof

      // Check can request
      const check = canRequestAccess(profile ? {
        id: profile.id,
        role: profile.role,
        labAccessStatus: profile.lab_access_status,
        labAccessReviewedAt: profile.lab_access_reviewed_at,
      } : null)

      if (!check.allowed) {
        return NextResponse.json({ error: check.reason, rerequestAfter: check.rerequestAfter }, { status: 400 })
      }

      // Create request
      const { data: newReq, error } = await service.from("lab_access_requests").insert({
        user_id: userId,
        email: email,
        display_name: displayName || profile?.display_name || email,
        age: profile?.age,
        phone: normalizedPhone,
        status: "pending",
      }).select().single()

      if (error) throw error

      // Update profile
      await service.from("profiles").update({
        phone: normalizedPhone,
        lab_access_status: "pending",
        lab_access_requested_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }).eq("id", userId)

      // Create notification for user (pending)
      await service.from("notifications").insert({
        user_id: userId,
        type: "lab_access_pending",
        title: "Lab access request sent",
        body: "Your request is pending admin review. You still have 5 free labs to explore.",
        link: "/laboratory",
      })

      return NextResponse.json({ success: true, request: newReq, status: "pending" })

    } else {
      // Fallback mock storage
      // For local dev, mock user as test user if no auth
      const mockUserId = "test-user-1"
      const mockEmail = "test@sciencematerial.my"

      let profiles = readProfiles()
      let prof = profiles.find(p => p.id === mockUserId)
      if (!prof) {
        prof = {
          id: mockUserId,
          email: mockEmail,
          displayName: displayName || "Test User",
          role: "user",
          labAccessStatus: "none",
          createdAt: new Date().toISOString(),
        }
        profiles.push(prof)
      }

      const check = canRequestAccess({
        id: prof.id,
        role: prof.role,
        labAccessStatus: prof.labAccessStatus,
        labAccessReviewedAt: prof.labAccessReviewedAt,
      })

      if (!check.allowed) {
        return NextResponse.json({ error: check.reason, rerequestAfter: check.rerequestAfter }, { status: 400 })
      }

      const requests = readRequests()
      const newReq = {
        id: `req-${Date.now()}`,
        userId: mockUserId,
        email: mockEmail,
        displayName: displayName || prof.displayName,
        age: prof.age,
        phone: normalizedPhone,
        status: "pending" as const,
        requestedAt: new Date().toISOString(),
      }
      requests.push(newReq)
      writeRequests(requests)

      // Update profile
      prof.phone = normalizedPhone
      prof.labAccessStatus = "pending"
      prof.labAccessRequestedAt = new Date().toISOString()
      writeProfiles(profiles)

      const notifs = readNotifications()
      notifs.push({
        id: `notif-${Date.now()}`,
        userId: mockUserId,
        type: "lab_access_pending",
        title: "Lab access request sent",
        body: "Your request is pending admin review. You still have 5 free labs to explore.",
        link: "/laboratory",
        read: false,
        createdAt: new Date().toISOString(),
      })
      writeNotifications(notifs)

      return NextResponse.json({ success: true, request: newReq, status: "pending" })
    }

  } catch (e: any) {
    console.error("access request error", e)
    return NextResponse.json({ error: e.message || "Failed to create request" }, { status: 500 })
  }
}
