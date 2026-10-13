"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Phone, FlaskConical, CheckCircle, Clock, AlertCircle, Shield } from "lucide-react"
import { FREE_EXPERIMENT_SLUGS } from "@/lib/access/free-tier"

export default function SettingsPage() {
  const [statusInfo, setStatusInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/access/status").then(r => r.json()).then(data => {
      setStatusInfo(data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[720px] px-6 lg:px-8 py-8 pb-24">
        <h1 className="text-[24px] font-semibold tracking-[-0.02em]">Settings</h1>
        <div className="mt-6 space-y-4">
          <Card className="border-border/60 shadow-xs">
            <CardHeader><CardTitle className="text-[14px] flex items-center gap-2"><Shield className="h-4 w-4" /> Lab Access Status</CardTitle></CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-[13px] text-ink-muted">Loading...</div>
              ) : !statusInfo?.authenticated ? (
                <div className="space-y-3">
                  <div className="text-[13px]">Please sign in to request lab access</div>
                  <Link href="/auth/login"><Button size="sm" className="rounded-[10px]">Sign In</Button></Link>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-[13px]">Status:</span>
                    {statusInfo.status === "approved" && <Badge className="bg-mineral text-white"><CheckCircle className="h-3 w-3 mr-1" /> Approved • Full Access</Badge>}
                    {statusInfo.status === "pending" && <Badge variant="secondary" className="bg-brass-soft text-brass"><Clock className="h-3 w-3 mr-1" /> Pending Review</Badge>}
                    {statusInfo.status === "rejected" && <Badge variant="outline" className="bg-oxide-soft text-oxide border-oxide/20"><AlertCircle className="h-3 w-3 mr-1" /> Rejected</Badge>}
                    {statusInfo.status === "none" && <Badge variant="outline">No Request • 5 Free Labs</Badge>}
                    {statusInfo.role === "admin" && <Badge className="bg-ink text-white">Admin • Full Access</Badge>}
                  </div>

                  {statusInfo.phone && <div className="text-[12px]"><span className="text-ink-muted">Phone:</span> <span className="font-mono font-[500]">{statusInfo.phone}</span></div>}
                  {statusInfo.email && <div className="text-[12px]"><span className="text-ink-muted">Email:</span> {statusInfo.email}</div>}

                  {statusInfo.status === "none" && (
                    <div className="space-y-3">
                      <div className="text-[12px] text-ink-muted leading-[1.5]">You have 5 free polished labs: {FREE_EXPERIMENT_SLUGS.join(", ")}. Request full access to unlock all 82 labs + quizzes. Requires phone number, admin reviews within 24h.</div>
                      <Link href="/onboarding/access"><Button size="sm" className="rounded-[10px] bg-teal gap-2"><Phone className="h-4 w-4" /> Request Full Access</Button></Link>
                    </div>
                  )}

                  {statusInfo.status === "pending" && (
                    <div className="text-[12px] text-ink-muted leading-[1.5]">Your request is pending. You still have 5 free labs. Check bell icon for notification when approved.</div>
                  )}

                  {statusInfo.status === "rejected" && (
                    <div className="space-y-3">
                      <div className="text-[12px] text-ink-muted leading-[1.5]">
                        {statusInfo.canRequest ? "You can re-request now." : statusInfo.canRequestReason}
                      </div>
                      {statusInfo.canRequest ? (
                        <Link href="/onboarding/access"><Button size="sm" className="rounded-[10px] bg-teal">Re-request Access</Button></Link>
                      ) : (
                        <Button size="sm" disabled variant="outline" className="rounded-[10px]">Wait 3 days to re-request</Button>
                      )}
                    </div>
                  )}

                  {statusInfo.status === "approved" && (
                    <div className="text-[12px] text-ink-muted leading-[1.5] flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-mineral" /> You have full access to all 82 labs + quizzes. Enjoy!
                    </div>
                  )}

                  <div className="pt-3 border-t border-border/50 text-[11px] font-mono text-ink-faint">
                    Free tier: 5 labs always • Server-enforced gating • No client bypass • Phone collected, no SMS
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card><CardHeader><CardTitle className="text-[14px]">Appearance</CardTitle></CardHeader><CardContent><div className="flex gap-2"><Button variant="outline" size="sm">Light</Button><Button variant="outline" size="sm">Dark</Button><Button variant="outline" size="sm">System</Button></div></CardContent></Card>
          <Card><CardHeader><CardTitle className="text-[14px]">Language</CardTitle></CardHeader><CardContent><div className="text-[13px]">UI: English (fixed per spec) · Content: Chinese (中文)</div><div className="text-[11px] font-mono text-ink-muted mt-2">Do not mix: Progress 本章进度 68% is intentional. Avoid Progress / 进度 / 進度.</div></CardContent></Card>
          <Card><CardHeader><CardTitle className="text-[14px]">Data & Privacy</CardTitle></CardHeader><CardContent><div className="text-[13px] leading-relaxed text-ink-muted">Local-first: IndexedDB + Dexie. Server sync every 60-120s. No personal data collection beyond progress. Cookie preferences respected. Phone only for lab access approval.</div><Button size="sm" variant="outline" className="mt-3">Manage Cookie Preferences</Button></CardContent></Card>
        </div>
      </div>
    </div>
  )
}
