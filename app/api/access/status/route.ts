import { NextResponse } from "next/server"
import { createClient, createServiceClient } from "@/lib/supabase/server"
import { isSupabaseConfigured, readProfiles, readRequests } from "@/lib/access/storage"
import { canRequestAccess } from "@/lib/access/check"

export async function GET() {
  try {
    if (isSupabaseConfigured()) {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return NextResponse.json({ authenticated: false, status: "none", canAccessAll: false })
      }

      const service = createServiceClient()
      const { data: profile } = await service.from("profiles").select("*").eq("id", user.id).single()

      if (!profile) {
        return NextResponse.json({ authenticated: true, status: "none", canAccessAll: false })
      }

      const check = canRequestAccess({
        id: profile.id,
        role: profile.role,
        labAccessStatus: profile.lab_access_status,
        labAccessReviewedAt: profile.lab_access_reviewed_at,
      })

      // Get latest request
      const { data: latestReq } = await service.from("lab_access_requests")
        .select("*")
        .eq("user_id", user.id)
        .order("requested_at", { ascending: false })
        .limit(1)
        .single()

      return NextResponse.json({
        authenticated: true,
        userId: user.id,
        email: profile.email,
        role: profile.role,
        status: profile.lab_access_status || "none",
        phone: profile.phone,
        requestedAt: profile.lab_access_requested_at,
        reviewedAt: profile.lab_access_reviewed_at,
        canRequest: check.allowed,
        canRequestReason: check.reason,
        rerequestAfter: check.rerequestAfter,
        latestRequest: latestReq || null,
        canAccessAll: profile.role === "admin" || profile.lab_access_status === "approved",
      })

    } else {
      // Mock fallback
      const profiles = readProfiles()
      const prof = profiles.find(p => p.id === "test-user-1") || profiles[0]

      const check = canRequestAccess(prof ? {
        id: prof.id,
        role: prof.role,
        labAccessStatus: prof.labAccessStatus,
        labAccessReviewedAt: prof.labAccessReviewedAt,
      } : null)

      const requests = readRequests()
      const latest = requests.filter(r => r.userId === prof.id).sort((a,b) => new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime())[0] || null

      return NextResponse.json({
        authenticated: true,
        userId: prof.id,
        email: prof.email,
        role: prof.role,
        status: prof.labAccessStatus || "none",
        phone: prof.phone,
        requestedAt: prof.labAccessRequestedAt,
        reviewedAt: prof.labAccessReviewedAt,
        canRequest: check.allowed,
        canRequestReason: check.reason,
        rerequestAfter: check.rerequestAfter,
        latestRequest: latest,
        canAccessAll: prof.role === "admin" || prof.labAccessStatus === "approved",
        mock: true,
      })
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
