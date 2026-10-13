import { NextResponse } from "next/server"
import { createClient, createServiceClient } from "@/lib/supabase/server"
import { isSupabaseConfigured, readProfiles, readRequests } from "@/lib/access/storage"

export async function GET() {
  try {
    if (isSupabaseConfigured()) {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })

      const service = createServiceClient()
      // Check admin
      const { data: profile } = await service.from("profiles").select("role").eq("id", user.id).single()
      if (!profile || profile.role !== "admin") {
        return NextResponse.json({ error: "Admin only" }, { status: 403 })
      }

      const { data: profiles, error: pErr } = await service.from("profiles").select("*").order("created_at", { ascending: false }).limit(200)
      if (pErr) throw pErr

      const { data: requests, error: rErr } = await service.from("lab_access_requests").select("*").order("requested_at", { ascending: false }).limit(200)
      if (rErr) throw rErr

      // Join latest request per user
      const enriched = profiles.map((prof: any) => {
        const latestReq = requests.filter((r: any) => r.user_id === prof.id).sort((a: any, b: any) => new Date(b.requested_at).getTime() - new Date(a.requested_at).getTime())[0] || null
        return {
          ...prof,
          latestRequest: latestReq,
          lab_access_status: prof.lab_access_status || "none",
        }
      })

      // Sort pending first
      enriched.sort((a: any, b: any) => {
        const order: any = { pending: 0, none: 1, rejected: 2, approved: 3 }
        return (order[a.lab_access_status] ?? 4) - (order[b.lab_access_status] ?? 4)
      })

      return NextResponse.json({ users: enriched, requests, total: enriched.length })

    } else {
      // Mock fallback
      const profiles = readProfiles()
      const requests = readRequests()

      // Seed some mock users if empty
      if (profiles.length <= 1) {
        // Add mock pending users
        const mockUsers = [
          { id: "user-2", email: "ali@student.my", displayName: "Ali Ahmad", age: 15, role: "user", phone: "+60123456789", labAccessStatus: "pending" as const, labAccessRequestedAt: new Date(Date.now() - 1000*60*60*2).toISOString(), createdAt: new Date(Date.now() - 1000*60*60*24*2).toISOString() },
          { id: "user-3", email: "siti@student.my", displayName: "Siti Nur", age: 14, role: "user", phone: "+60198765432", labAccessStatus: "approved" as const, labAccessRequestedAt: new Date(Date.now() - 1000*60*60*24*5).toISOString(), labAccessReviewedAt: new Date(Date.now() - 1000*60*60*24*4).toISOString(), createdAt: new Date(Date.now() - 1000*60*60*24*7).toISOString() },
          { id: "user-4", email: "kumar@student.my", displayName: "Kumar Raj", age: 16, role: "user", phone: "+60111223344", labAccessStatus: "rejected" as const, labAccessRequestedAt: new Date(Date.now() - 1000*60*60*24*4).toISOString(), labAccessReviewedAt: new Date(Date.now() - 1000*60*60*24*3).toISOString(), labAccessRejectReason: "Phone invalid", createdAt: new Date(Date.now() - 1000*60*60*24*5).toISOString() },
          { id: "user-5", email: "mei@student.my", displayName: "Mei Ling", age: 15, role: "user", labAccessStatus: "none" as const, createdAt: new Date(Date.now() - 1000*60*60*24*1).toISOString() },
        ]
        profiles.push(...mockUsers as any)
      }

      const enriched = profiles.map((prof: any) => {
        const latestReq = requests.filter((r: any) => r.userId === prof.id).sort((a: any, b: any) => new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime())[0] || null
        return {
          id: prof.id,
          email: prof.email,
          display_name: prof.displayName,
          age: prof.age,
          role: prof.role,
          phone: prof.phone,
          lab_access_status: prof.labAccessStatus,
          lab_access_requested_at: prof.labAccessRequestedAt,
          lab_access_reviewed_at: prof.labAccessReviewedAt,
          lab_access_reject_reason: prof.labAccessRejectReason,
          created_at: prof.createdAt,
          latestRequest: latestReq,
        }
      })

      enriched.sort((a: any, b: any) => {
        const order: any = { pending: 0, none: 1, rejected: 2, approved: 3 }
        return (order[a.lab_access_status] ?? 4) - (order[b.lab_access_status] ?? 4)
      })

      return NextResponse.json({ users: enriched, requests, total: enriched.length, mock: true })
    }
  } catch (e: any) {
    console.error("admin users error", e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
