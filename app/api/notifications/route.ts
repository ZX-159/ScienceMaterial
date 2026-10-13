import { NextResponse } from "next/server"
import { createClient, createServiceClient } from "@/lib/supabase/server"
import { isSupabaseConfigured, readNotifications, writeNotifications } from "@/lib/access/storage"

export async function GET() {
  try {
    if (isSupabaseConfigured()) {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })

      const service = createServiceClient()
      const { data, error } = await service.from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(50)

      if (error) throw error

      const unread = data.filter((n: any) => !n.read).length

      return NextResponse.json({ notifications: data, unreadCount: unread })
    } else {
      const all = readNotifications()
      const userId = "test-user-1"
      const userNotifs = all.filter(n => n.userId === userId).sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0,50)
      const unread = userNotifs.filter(n => !n.read).length
      return NextResponse.json({ notifications: userNotifs, unreadCount: unread, mock: true })
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { action, notificationId, markAll } = body

    if (isSupabaseConfigured()) {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })

      const service = createServiceClient()

      if (markAll) {
        await service.from("notifications").update({ read: true }).eq("user_id", user.id).eq("read", false)
        return NextResponse.json({ success: true })
      }

      if (action === "read" && notificationId) {
        await service.from("notifications").update({ read: true }).eq("id", notificationId).eq("user_id", user.id)
        return NextResponse.json({ success: true })
      }

      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    } else {
      const all = readNotifications()
      if (markAll) {
        all.forEach(n => { if (n.userId === "test-user-1") n.read = true })
        writeNotifications(all)
        return NextResponse.json({ success: true, mock: true })
      }
      if (action === "read" && notificationId) {
        const idx = all.findIndex(n => n.id === notificationId)
        if (idx >= 0) {
          all[idx].read = true
          writeNotifications(all)
        }
        return NextResponse.json({ success: true, mock: true })
      }
      return NextResponse.json({ error: "Invalid" }, { status: 400 })
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
