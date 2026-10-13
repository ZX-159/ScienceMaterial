"use client"
import { useEffect, useState } from "react"
import { Bell, CheckCircle, AlertCircle, Clock, X, FlaskConical, FileQuestion } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

interface Notification {
  id: string
  type: string
  title: string
  body: string
  link?: string
  read: boolean
  created_at?: string
  createdAt?: string
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchNotifs = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/notifications")
      if (res.ok) {
        const data = await res.json()
        setNotifications(data.notifications || [])
        setUnreadCount(data.unreadCount || 0)
      }
    } catch {}
    setLoading(false)
  }

  useEffect(() => {
    fetchNotifs()
    const interval = setInterval(fetchNotifs, 30000) // poll every 30s
    return () => clearInterval(interval)
  }, [])

  const markRead = async (id: string) => {
    try {
      await fetch("/api/notifications", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "read", notificationId: id }) })
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
      setUnreadCount(prev => Math.max(0, prev - 1))
    } catch {}
  }

  const markAllRead = async () => {
    try {
      await fetch("/api/notifications", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ markAll: true }) })
      setNotifications(prev => prev.map(n => ({ ...n, read: true })))
      setUnreadCount(0)
    } catch {}
  }

  const getIcon = (type: string) => {
    if (type.includes("approved")) return <CheckCircle className="h-4 w-4 text-mineral" />
    if (type.includes("rejected")) return <AlertCircle className="h-4 w-4 text-oxide" />
    if (type.includes("pending")) return <Clock className="h-4 w-4 text-brass" />
    return <Bell className="h-4 w-4 text-ink-muted" />
  }

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-[10px] relative" onClick={() => setOpen(!open)} aria-label="Notifications">
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-4 min-w-[16px] px-1 rounded-full bg-oxide text-white text-[10px] font-[700] flex items-center justify-center leading-none">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </Button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <Card className="absolute right-0 top-10 z-50 w-[360px] max-w-[90vw] shadow-lg border-border/60 rounded-[16px] overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-4 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <span className="text-[13px] font-[600] tracking-[-0.01em]">Notifications</span>
                  {unreadCount > 0 && <Badge variant="secondary" className="text-[10px]">{unreadCount} new</Badge>}
                </div>
                <div className="flex items-center gap-1">
                  {unreadCount > 0 && <Button variant="ghost" size="sm" className="h-7 text-[11px] rounded-[8px]" onClick={markAllRead}>Mark all read</Button>}
                  <Button variant="ghost" size="icon" className="h-7 w-7 rounded-[8px]" onClick={() => setOpen(false)}><X className="h-3.5 w-3.5" /></Button>
                </div>
              </div>

              <div className="max-h-[380px] overflow-auto">
                {loading && notifications.length === 0 ? (
                  <div className="p-8 text-center text-[12px] text-ink-muted">Loading...</div>
                ) : notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell className="h-8 w-8 mx-auto text-ink-faint mb-2" />
                    <div className="text-[12px] font-[500]">No notifications</div>
                    <div className="text-[11px] text-ink-muted mt-1">Lab access updates will appear here</div>
                  </div>
                ) : (
                  <div className="divide-y divide-border/50">
                    {notifications.map(n => (
                      <div key={n.id} className={`p-3.5 flex gap-3 hover:bg-surface-muted/50 transition-colors ${!n.read ? "bg-teal-soft/20" : ""}`}>
                        <div className="shrink-0 mt-0.5">{getIcon(n.type)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="text-[12px] font-[600] tracking-[-0.01em] leading-tight">{n.title}</div>
                            {!n.read && <div className="h-2 w-2 rounded-full bg-teal shrink-0 mt-1" />}
                          </div>
                          <div className="text-[11px] text-ink-muted mt-1 leading-[1.5] line-clamp-2">{n.body}</div>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-[10px] font-mono text-ink-faint">{new Date(n.created_at || n.createdAt || Date.now()).toLocaleString()}</span>
                            {n.link && <Link href={n.link} onClick={() => setOpen(false)} className="text-[11px] text-teal hover:underline font-[500]">View →</Link>}
                          </div>
                        </div>
                        {!n.read && (
                          <Button variant="ghost" size="sm" className="h-6 text-[10px] rounded-[6px] shrink-0" onClick={() => markRead(n.id)}>Read</Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-3 border-t border-border/50 bg-surface-muted/30 flex items-center justify-between text-[11px] font-mono text-ink-muted">
                <span>© 2026 ScienceMaterial</span>
                <Link href="/settings" onClick={() => setOpen(false)} className="hover:text-ink transition-colors">Settings</Link>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
