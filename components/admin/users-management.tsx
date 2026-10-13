"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, XCircle, Clock, Phone, Mail, Calendar, Shield, Search, Filter, Eye, UserPlus, Ban, Download, RefreshCw, AlertCircle, FlaskConical, FileQuestion } from "lucide-react"
import { FREE_EXPERIMENT_SLUGS, FREE_QUIZ_IDS } from "@/lib/access/free-tier"

interface User {
  id: string
  email: string
  display_name?: string
  displayName?: string
  age?: number
  role: string
  phone?: string
  lab_access_status: string
  labAccessStatus?: string
  lab_access_requested_at?: string
  labAccessRequestedAt?: string
  lab_access_reviewed_at?: string
  labAccessReviewedAt?: string
  lab_access_reject_reason?: string
  labAccessRejectReason?: string
  created_at?: string
  createdAt?: string
  latestRequest?: any
}

export function UsersManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected" | "none">("all")
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [rejectReason, setRejectReason] = useState("")
  const [showRejectModal, setShowRejectModal] = useState<string | null>(null)

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/users")
      if (res.ok) {
        const data = await res.json()
        setUsers(data.users || [])
      }
    } catch {}
    setLoading(false)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleAction = async (userId: string, action: "approve" | "reject", reason?: string) => {
    setActionLoading(userId)
    try {
      const res = await fetch("/api/admin/access/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action, reason }),
      })
      if (res.ok) {
        await fetchUsers()
        setShowRejectModal(null)
        setRejectReason("")
      } else {
        const data = await res.json()
        alert(data.error || "Failed")
      }
    } catch (e: any) {
      alert(e.message)
    }
    setActionLoading(null)
  }

  const filtered = users.filter(u => {
    const status = u.lab_access_status || (u as any).labAccessStatus || "none"
    const matchesFilter = filter === "all" ? true : status === filter
    const searchLower = search.toLowerCase()
    const matchesSearch = !search || 
      u.email.toLowerCase().includes(searchLower) ||
      (u.display_name || (u as any).displayName || "").toLowerCase().includes(searchLower) ||
      (u.phone || "").includes(search)
    return matchesFilter && matchesSearch
  })

  const pendingCount = users.filter(u => (u.lab_access_status || (u as any).labAccessStatus) === "pending").length
  const approvedCount = users.filter(u => (u.lab_access_status || (u as any).labAccessStatus) === "approved").length
  const rejectedCount = users.filter(u => (u.lab_access_status || (u as any).labAccessStatus) === "rejected").length

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved": return <Badge className="bg-mineral text-white text-[10px]"><CheckCircle className="h-3 w-3 mr-1" /> Approved</Badge>
      case "pending": return <Badge variant="secondary" className="bg-brass-soft text-brass border-brass/20 text-[10px]"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>
      case "rejected": return <Badge variant="outline" className="bg-oxide-soft text-oxide border-oxide/20 text-[10px]"><XCircle className="h-3 w-3 mr-1" /> Rejected</Badge>
      default: return <Badge variant="outline" className="text-[10px]">No Request</Badge>
    }
  }

  if (loading) {
    return <div className="p-8 text-center text-[13px] text-ink-muted">Loading users...</div>
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <Card className="border-border/60 shadow-xs lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <CardTitle className="text-[14px] flex items-center gap-2">
              User Management · {users.length} users
              {pendingCount > 0 && <Badge variant="secondary" className="bg-brass-soft text-brass ml-2">{pendingCount} pending</Badge>}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="rounded-[10px] h-8" onClick={fetchUsers}><RefreshCw className="h-4 w-4 mr-1" /> Refresh</Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-faint" />
              <Input placeholder="Search email, name, phone..." className="pl-9 h-8 rounded-[10px] text-[13px]" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="flex items-center gap-1.5">
              {[
                { id: "all", label: "All" },
                { id: "pending", label: `Pending (${pendingCount})` },
                { id: "approved", label: `Approved (${approvedCount})` },
                { id: "rejected", label: `Rejected (${rejectedCount})` },
                { id: "none", label: "No Request" },
              ].map(f => (
                <Button key={f.id} size="sm" variant={filter === f.id ? "default" : "outline"} className={`rounded-[10px] h-8 text-[11px] ${filter === f.id ? "bg-teal" : ""}`} onClick={() => setFilter(f.id as any)}>{f.label}</Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-[600px] overflow-auto pr-1">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-[13px] text-ink-muted">No users match filter</div>
            ) : filtered.map(u => {
              const status = u.lab_access_status || (u as any).labAccessStatus || "none"
              const displayName = u.display_name || (u as any).displayName || u.email.split("@")[0]
              const requestedAt = u.lab_access_requested_at || (u as any).labAccessRequestedAt
              const reviewedAt = u.lab_access_reviewed_at || (u as any).labAccessReviewedAt
              const rejectReason = u.lab_access_reject_reason || (u as any).labAccessRejectReason

              return (
                <div key={u.id} className={`flex items-center gap-3 p-3 rounded-[12px] border transition-colors ${status === "pending" ? "border-brass/30 bg-brass-soft/20" : status === "approved" ? "border-mineral/20 bg-mineral-soft/20" : status === "rejected" ? "border-oxide/20 bg-oxide-soft/20" : "border-border/50 bg-surface-muted/30"} hover:bg-surface-muted/60`}>
                  <div className="h-9 w-9 rounded-full bg-teal-soft border border-teal/20 flex items-center justify-center text-[12px] font-semibold shrink-0">{displayName[0]?.toUpperCase()}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[13px] font-medium truncate">{displayName}</span>
                      {getStatusBadge(status)}
                      {u.role === "admin" && <Badge className="text-[10px] bg-ink text-white">Admin</Badge>}
                    </div>
                    <div className="text-[11px] font-mono text-ink-muted truncate flex items-center gap-2 flex-wrap">
                      <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {u.email}</span>
                      {u.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {u.phone}</span>}
                      {u.age && <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {u.age}y</span>}
                    </div>
                    <div className="text-[10px] font-mono text-ink-faint mt-1 flex items-center gap-2">
                      {requestedAt && <span>Requested: {new Date(requestedAt).toLocaleDateString()}</span>}
                      {reviewedAt && <span>Reviewed: {new Date(reviewedAt).toLocaleDateString()}</span>}
                      {!requestedAt && <span>Joined: {new Date(u.created_at || (u as any).createdAt || Date.now()).toLocaleDateString()}</span>}
                    </div>
                    {status === "rejected" && rejectReason && <div className="text-[11px] text-oxide mt-1">Reason: {rejectReason}</div>}
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-[8px]" onClick={() => setSelectedUser(u)} title="View details"><Eye className="h-3.5 w-3.5" /></Button>
                    {status === "pending" && (
                      <>
                        <Button size="sm" className="h-7 rounded-[8px] bg-mineral hover:bg-mineral/90 text-[11px] px-2.5" disabled={actionLoading === u.id} onClick={() => handleAction(u.id, "approve")}>
                          {actionLoading === u.id ? "..." : <><CheckCircle className="h-3 w-3 mr-1" /> Approve</>}
                        </Button>
                        <Button size="sm" variant="outline" className="h-7 rounded-[8px] text-[11px] px-2.5 border-oxide/20 text-oxide hover:bg-oxide-soft" onClick={() => setShowRejectModal(u.id)}>Reject</Button>
                      </>
                    )}
                    {status === "approved" && (
                      <Button size="sm" variant="outline" className="h-7 rounded-[8px] text-[11px] px-2.5" onClick={() => setShowRejectModal(u.id)}>Revoke</Button>
                    )}
                    {status === "rejected" && (
                      <Button size="sm" className="h-7 rounded-[8px] bg-teal text-[11px] px-2.5" disabled={actionLoading === u.id} onClick={() => handleAction(u.id, "approve")}>Approve</Button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card className="border-border/60 shadow-xs">
          <CardHeader><CardTitle className="text-[13px]">Access Stats</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-[12px]"><span>Total users</span><span className="font-mono font-[600]">{users.length}</span></div>
            <div className="flex justify-between text-[12px]"><span>Pending approval</span><span className="font-mono text-brass font-[600]">{pendingCount}</span></div>
            <div className="flex justify-between text-[12px]"><span>Approved (full access)</span><span className="font-mono text-mineral font-[600]">{approvedCount}</span></div>
            <div className="flex justify-between text-[12px]"><span>Rejected</span><span className="font-mono text-oxide font-[600]">{rejectedCount}</span></div>
            <div className="flex justify-between text-[12px]"><span>No request (5 free labs)</span><span className="font-mono">{users.length - pendingCount - approvedCount - rejectedCount}</span></div>
            <div className="pt-2 border-t border-border/50 space-y-1 text-[11px] text-ink-muted">
              <div>Free tier: 5 labs + 5 quizzes</div>
              <div>Full: 82 labs + all quizzes</div>
              <div>Re-request cooldown: 3 days</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-xs">
          <CardHeader><CardTitle className="text-[13px]">Free Tier (Polished)</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="text-[11px] font-mono text-ink-muted mb-1.5 flex items-center gap-1"><FlaskConical className="h-3 w-3" /> 5 Free Labs</div>
              <div className="flex flex-wrap gap-1">
                {FREE_EXPERIMENT_SLUGS.map(s => <Badge key={s} variant="outline" className="text-[10px]">{s}</Badge>)}
              </div>
            </div>
            <div>
              <div className="text-[11px] font-mono text-ink-muted mb-1.5 flex items-center gap-1"><FileQuestion className="h-3 w-3" /> 5 Free Quizzes</div>
              <div className="flex flex-wrap gap-1">
                {FREE_QUIZ_IDS.map(s => <Badge key={s} variant="outline" className="text-[10px]">{s}</Badge>)}
              </div>
            </div>
            <div className="text-[11px] text-ink-muted leading-[1.5]">These 5 are polished, Apple HIG, high contrast, server-gated only for non-free. Free always 200.</div>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-xs">
          <CardHeader><CardTitle className="text-[13px]">Bulk Actions</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start rounded-[10px]" onClick={() => {
              const csv = ["email,phone,status,age,displayName", ...users.map(u => `${u.email},${u.phone || ""},${u.lab_access_status || (u as any).labAccessStatus},${u.age || ""},${u.display_name || (u as any).displayName || ""}`)].join("\n")
              const blob = new Blob([csv], { type: "text/csv" })
              const url = URL.createObjectURL(blob)
              const a = document.createElement("a")
              a.href = url
              a.download = `users-${new Date().toISOString().slice(0,10)}.csv`
              a.click()
            }}><Download className="h-4 w-4 mr-2" /> Export Users CSV</Button>
            <Button variant="outline" size="sm" className="w-full justify-start rounded-[10px]" onClick={fetchUsers}><RefreshCw className="h-4 w-4 mr-2" /> Refresh</Button>
          </CardContent>
        </Card>

        {selectedUser && (
          <Card className="border-teal/20 bg-teal-soft/10 shadow-xs">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-[13px]">User Details</CardTitle>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setSelectedUser(null)}>✕</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-[12px]">
              <div className="space-y-2">
                <div className="flex justify-between"><span className="text-ink-muted">Email</span><span className="font-[500]">{selectedUser.email}</span></div>
                <div className="flex justify-between"><span className="text-ink-muted">Name</span><span className="font-[500]">{selectedUser.display_name || (selectedUser as any).displayName || "-"}</span></div>
                <div className="flex justify-between"><span className="text-ink-muted">Age</span><span className="font-[500]">{selectedUser.age || "-"}</span></div>
                <div className="flex justify-between"><span className="text-ink-muted">Phone</span><span className="font-[500] font-mono">{selectedUser.phone || "-"}</span></div>
                <div className="flex justify-between"><span className="text-ink-muted">Role</span><Badge variant={selectedUser.role === "admin" ? "default" : "secondary"} className="text-[10px]">{selectedUser.role}</Badge></div>
                <div className="flex justify-between"><span className="text-ink-muted">Status</span>{(() => {
                  const s = selectedUser.lab_access_status || (selectedUser as any).labAccessStatus
                  return s === "approved" ? <Badge className="bg-mineral text-white text-[10px]">Approved</Badge> : s === "pending" ? <Badge variant="secondary" className="text-[10px]">Pending</Badge> : s === "rejected" ? <Badge variant="outline" className="text-[10px]">Rejected</Badge> : <Badge variant="outline" className="text-[10px]">None</Badge>
                })()}</div>
                <div className="flex justify-between"><span className="text-ink-muted">Joined</span><span className="font-mono text-[11px]">{new Date(selectedUser.created_at || (selectedUser as any).createdAt || Date.now()).toLocaleString()}</span></div>
                {(selectedUser.lab_access_requested_at || (selectedUser as any).labAccessRequestedAt) && <div className="flex justify-between"><span className="text-ink-muted">Requested</span><span className="font-mono text-[11px]">{new Date(selectedUser.lab_access_requested_at || (selectedUser as any).labAccessRequestedAt || "").toLocaleString()}</span></div>}
                {(selectedUser.lab_access_reviewed_at || (selectedUser as any).labAccessReviewedAt) && <div className="flex justify-between"><span className="text-ink-muted">Reviewed</span><span className="font-mono text-[11px]">{new Date(selectedUser.lab_access_reviewed_at || (selectedUser as any).labAccessReviewedAt || "").toLocaleString()}</span></div>}
              </div>

              {selectedUser.latestRequest && (
                <div className="pt-3 border-t border-border/50">
                  <div className="text-[11px] font-mono text-ink-muted mb-2">Latest Request</div>
                  <div className="text-[11px] bg-surface-muted p-2.5 rounded-[10px] space-y-1 font-mono">
                    <div>Phone: {selectedUser.latestRequest.phone}</div>
                    <div>Status: {selectedUser.latestRequest.status}</div>
                    <div>At: {new Date(selectedUser.latestRequest.requestedAt || selectedUser.latestRequest.requested_at).toLocaleString()}</div>
                    {selectedUser.latestRequest.reason && <div>Reason: {selectedUser.latestRequest.reason}</div>}
                  </div>
                </div>
              )}

              <div className="pt-2 flex gap-2">
                <Button size="sm" className="flex-1 rounded-[10px] bg-mineral" onClick={() => { handleAction(selectedUser.id, "approve"); setSelectedUser(null) }}>Approve</Button>
                <Button size="sm" variant="outline" className="flex-1 rounded-[10px] border-oxide/20 text-oxide" onClick={() => setShowRejectModal(selectedUser.id)}>Reject</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
          <Card className="w-full max-w-[400px] rounded-[16px] shadow-lg">
            <CardHeader>
              <CardTitle className="text-[14px] flex items-center gap-2"><AlertCircle className="h-4 w-4 text-oxide" /> Reject Request</CardTitle>
              <div className="text-[12px] text-ink-muted">User can re-request after 3 days. Reason will be shown in notification.</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-[11px] font-mono uppercase text-ink-muted">Reason (optional)</label>
                <Input placeholder="e.g. Phone invalid, please check" className="mt-1.5 rounded-[10px]" value={rejectReason} onChange={e => setRejectReason(e.target.value)} />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 rounded-[10px]" onClick={() => { setShowRejectModal(null); setRejectReason("") }}>Cancel</Button>
                <Button className="flex-1 rounded-[10px] bg-oxide hover:bg-oxide/90" disabled={actionLoading === showRejectModal} onClick={() => handleAction(showRejectModal, "reject", rejectReason)}>Reject</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
