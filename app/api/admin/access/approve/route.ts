import { NextResponse } from "next/server"
import { createClient, createServiceClient } from "@/lib/supabase/server"
import { isSupabaseConfigured, readProfiles, writeProfiles, readRequests, writeRequests, readNotifications, writeNotifications } from "@/lib/access/storage"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { userId, action, reason } = body // action: approve | reject

    if (!userId || !action || !["approve", "reject"].includes(action)) {
      return NextResponse.json({ error: "userId and action (approve|reject) required" }, { status: 400 })
    }

    if (isSupabaseConfigured()) {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })

      const service = createServiceClient()
      const { data: adminProfile } = await service.from("profiles").select("role").eq("id", user.id).single()
      if (!adminProfile || adminProfile.role !== "admin") {
        return NextResponse.json({ error: "Admin only" }, { status: 403 })
      }

      const now = new Date().toISOString()
      const newStatus = action === "approve" ? "approved" : "rejected"

      // Update profile
      const { error: pErr } = await service.from("profiles").update({
        lab_access_status: newStatus,
        lab_access_reviewed_at: now,
        lab_access_reviewer_id: user.id,
        lab_access_reject_reason: action === "reject" ? (reason || "Not approved") : null,
        updated_at: now,
      }).eq("id", userId)

      if (pErr) throw pErr

      // Update latest request
      const { data: latestReq } = await service.from("lab_access_requests")
        .select("*")
        .eq("user_id", userId)
        .order("requested_at", { ascending: false })
        .limit(1)
        .single()

      if (latestReq) {
        await service.from("lab_access_requests").update({
          status: newStatus,
          reviewed_at: now,
          reviewed_by: user.id,
          reason: reason || null,
        }).eq("id", latestReq.id)
      }

      // Create notification for user
      const notifTitle = action === "approve" ? "Lab access approved! 🎉" : "Lab access request update"
      const notifBody = action === "approve"
        ? "Your request has been approved. You now have access to all 82 interactive labs and quizzes."
        : `Your request was not approved. Reason: ${reason || "Please check your info"}. You can re-request after 3 days. You still have 5 free labs.`

      await service.from("notifications").insert({
        user_id: userId,
        type: action === "approve" ? "lab_access_approved" : "lab_access_rejected",
        title: notifTitle,
        body: notifBody,
        link: action === "approve" ? "/laboratory" : "/onboarding/access",
      })

      // Audit log
      await service.from("admin_audit_logs").insert({
        user_id: user.id,
        action: `lab_access_${action}`,
        target_type: "profile",
        target_id: userId,
        details: { reason, previousStatus: latestReq?.status },
      })

      return NextResponse.json({ success: true, status: newStatus })

    } else {
      // Mock fallback
      const profiles = readProfiles()
      const profIdx = profiles.findIndex(p => p.id === userId)
      if (profIdx === -1) return NextResponse.json({ error: "User not found" }, { status: 404 })

      const now = new Date().toISOString()
      const newStatus = action === "approve" ? "approved" : "rejected"

      profiles[profIdx].labAccessStatus = newStatus as any
      profiles[profIdx].labAccessReviewedAt = now
      profiles[profIdx].labAccessReviewerId = "admin-1"
      if (action === "reject") profiles[profIdx].labAccessRejectReason = reason || "Not approved"
      else profiles[profIdx].labAccessRejectReason = undefined

      writeProfiles(profiles)

      const requests = readRequests()
      const latestIdx = requests.map((r, i) => ({ r, i })).filter(x => x.r.userId === userId).sort((a,b) => new Date(b.r.requestedAt).getTime() - new Date(a.r.requestedAt).getTime())[0]?.i
      if (latestIdx !== undefined) {
        requests[latestIdx].status = newStatus as any
        requests[latestIdx].reviewedAt = now
        requests[latestIdx].reviewedBy = "admin-1"
        if (reason) requests[latestIdx].reason = reason
        writeRequests(requests)
      }

      const notifs = readNotifications()
      notifs.push({
        id: `notif-${Date.now()}`,
        userId,
        type: action === "approve" ? "lab_access_approved" : "lab_access_rejected",
        title: action === "approve" ? "Lab access approved! 🎉" : "Lab access request update",
        body: action === "approve"
          ? "Your request has been approved. You now have access to all 82 interactive labs and quizzes."
          : `Your request was not approved. Reason: ${reason || "Please check"}. You can re-request after 3 days.`,
        link: action === "approve" ? "/laboratory" : "/onboarding/access",
        read: false,
        createdAt: now,
      })
      writeNotifications(notifs)

      return NextResponse.json({ success: true, status: newStatus, mock: true })
    }

  } catch (e: any) {
    console.error("approve error", e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
