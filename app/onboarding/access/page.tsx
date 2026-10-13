"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Logo } from "@/components/ui/logo"
import { Phone, FlaskConical, FileQuestion, CheckCircle, Clock, Shield, Sparkles, ArrowRight, BookOpen, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FREE_EXPERIMENT_SLUGS, FREE_QUIZ_IDS } from "@/lib/access/free-tier"

export default function AccessOnboardingPage() {
  const [step, setStep] = useState<"choice" | "phone" | "success" | "pending" | "rejected">("choice")
  const [phone, setPhone] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [statusInfo, setStatusInfo] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    fetch("/api/access/status").then(r => r.json()).then(data => {
      setStatusInfo(data)
      if (data.status === "pending") setStep("pending")
      else if (data.status === "approved") router.push("/laboratory")
      else if (data.status === "rejected") {
        // Check if can rerequest
        if (data.canRequest) setStep("choice")
        else setStep("rejected")
      }
    }).catch(() => {})
  }, [router])

  const handleRequest = async () => {
    setError("")
    if (!phone.trim() || phone.trim().length < 9) {
      setError("Please enter valid MY phone number (e.g. 012-3456789)")
      return
    }
    setLoading(true)
    try {
      const res = await fetch("/api/access/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phone.trim(), displayName: displayName.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed")
      setStep("success")
      setTimeout(() => setStep("pending"), 2000)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSkip = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-[560px]">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Logo size={28} />
          <span className="text-[11px] font-mono text-ink-muted">ScienceMaterial • Access</span>
        </div>

        {step === "choice" && (
          <Card className="border-border/60 shadow-sm rounded-[20px] overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-teal via-mineral to-brass" />
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-[10px]">Step 1 of 2</Badge>
                <span className="text-[11px] font-mono text-ink-muted">Optional • Takes 30s</span>
              </div>
              <CardTitle className="text-[22px] tracking-[-0.02em] leading-tight mt-3 text-balance">Want full access to interactive labs & quizzes?</CardTitle>
              <div className="text-[13px] text-ink-muted leading-[1.6] mt-2 text-pretty">
                Normal material (chapters, notes) is free forever. Interactive labs (82) & quizzes require admin approval. You get <span className="font-[600] text-ink">5 free labs + 5 free quizzes</span> to try.
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Free vs Full comparison */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-[14px] border border-border/60 bg-surface p-3.5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-ink-muted flex items-center gap-1.5"><BookOpen className="h-3 w-3" /> Free Tier</div>
                  <div className="mt-2 space-y-1.5 text-[12px]">
                    <div className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-mineral" /> All chapters & notes</div>
                    <div className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-mineral" /> 5 polished labs</div>
                    <div className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-mineral" /> 5 quizzes</div>
                    <div className="flex items-center gap-2 text-ink-muted"><span className="h-3.5 w-3.5 flex items-center justify-center">•</span> 77 labs locked</div>
                  </div>
                </div>
                <div className="rounded-[14px] border border-teal/20 bg-teal-soft/30 p-3.5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-teal flex items-center gap-1.5"><Sparkles className="h-3 w-3" /> Full Access</div>
                  <div className="mt-2 space-y-1.5 text-[12px]">
                    <div className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-teal" /> All 82 labs</div>
                    <div className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-teal" /> All quizzes</div>
                    <div className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-teal" /> Progress sync</div>
                    <div className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-teal" /> Admin support</div>
                  </div>
                </div>
              </div>

              {/* Free labs preview */}
              <div>
                <div className="technical-label mb-2 flex items-center gap-2"><FlaskConical className="h-3.5 w-3.5" /> Your 5 Free Labs (Polished)</div>
                <div className="flex flex-wrap gap-1.5">
                  {FREE_EXPERIMENT_SLUGS.map(slug => (
                    <Badge key={slug} variant="outline" className="text-[11px] rounded-[8px]">{slug.replace(/-/g, " ")}</Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 pt-2">
                <Button onClick={() => setStep("phone")} className="w-full rounded-[12px] h-11 text-[13px] font-[600] gap-2 bg-teal hover:bg-teal-pressed">
                  <Phone className="h-4 w-4" /> Yes, Request Full Access <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={handleSkip} className="w-full rounded-[12px] h-11 text-[13px]">
                  Skip for Now — Explore Free Tier
                </Button>
                <div className="text-[11px] text-center text-ink-faint font-mono leading-[1.4]">
                  Requires phone number • Admin reviews within 24h • No SMS • In-app notification
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {step === "phone" && (
          <Card className="border-border/60 shadow-sm rounded-[20px] overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-teal to-mineral" />
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-[10px]">Step 2 of 2</Badge>
                <span className="text-[11px] font-mono text-ink-muted">Phone required</span>
              </div>
              <CardTitle className="text-[18px] tracking-[-0.015em] mt-3 flex items-center gap-2"><Phone className="h-5 w-5 text-teal" /> Enter Phone Number</CardTitle>
              <div className="text-[12px] text-ink-muted mt-1 leading-[1.5]">MY format: 012-3456789 or +6012-3456789. Admin will see this + your signup info (email, age). No SMS verification.</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-ink-muted">Display Name (optional)</label>
                <Input placeholder="e.g. Ali" className="mt-1.5 h-10 rounded-[12px]" value={displayName} onChange={e => setDisplayName(e.target.value)} />
              </div>
              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-ink-muted flex items-center gap-1.5"><Phone className="h-3 w-3" /> Phone Number *</label>
                <Input placeholder="012-3456789" className="mt-1.5 h-10 rounded-[12px]" value={phone} onChange={e => { setPhone(e.target.value); setError("") }} required inputMode="tel" />
                <div className="text-[10px] text-ink-faint mt-1.5 flex gap-1.5"><Shield className="h-3 w-3 shrink-0 mt-0.5" /><span>Stored securely, only admin can see. Used for access approval.</span></div>
              </div>

              {error && <div className="rounded-[10px] bg-oxide-soft border border-oxide/20 p-2.5 text-[12px] text-oxide flex gap-2"><AlertCircle className="h-4 w-4 shrink-0" /> {error}</div>}

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button variant="outline" onClick={() => setStep("choice")} className="rounded-[12px] h-10">Back</Button>
                <Button onClick={handleRequest} disabled={loading} className="rounded-[12px] h-10 bg-teal hover:bg-teal-pressed gap-2">
                  {loading ? "Sending..." : <><CheckCircle className="h-4 w-4" /> Send Request</>}
                </Button>
              </div>

              <div className="text-[11px] text-center text-ink-muted">
                Already have 5 free labs: {FREE_EXPERIMENT_SLUGS.slice(0,2).join(", ")}...
              </div>
            </CardContent>
          </Card>
        )}

        {step === "success" && (
          <Card className="border-mineral/20 bg-mineral-soft/20 rounded-[20px]">
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-10 w-10 text-mineral mx-auto mb-3" />
              <div className="text-[18px] font-[600]">Request Sent!</div>
              <div className="text-[13px] text-ink-muted mt-2 leading-[1.5]">Admin will review within 24h. You can explore 5 free labs meanwhile. Check bell icon for notification.</div>
            </CardContent>
          </Card>
        )}

        {step === "pending" && (
          <Card className="border-brass/20 bg-brass-soft/30 rounded-[20px]">
            <CardContent className="p-8 text-center">
              <Clock className="h-10 w-10 text-brass mx-auto mb-3" />
              <div className="text-[18px] font-[600]">Pending Review</div>
              <div className="text-[13px] text-ink-muted mt-2 leading-[1.5]">Your request is being reviewed. You have 5 free labs + 5 free quizzes. Notifications will appear in bell icon.</div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Link href="/laboratory"><Button variant="outline" className="w-full rounded-[12px]"><FlaskConical className="h-4 w-4" /> Free Labs</Button></Link>
                <Link href="/dashboard"><Button className="w-full rounded-[12px] bg-teal">Dashboard</Button></Link>
              </div>
            </CardContent>
          </Card>
        )}

        {step === "rejected" && (
          <Card className="border-oxide/20 bg-oxide-soft/20 rounded-[20px]">
            <CardContent className="p-8 text-center">
              <AlertCircle className="h-10 w-10 text-oxide mx-auto mb-3" />
              <div className="text-[18px] font-[600]">Request Update</div>
              <div className="text-[13px] text-ink-muted mt-2 leading-[1.5]">
                {statusInfo?.canRequest ? "You can re-request now." : statusInfo?.canRequestReason || "Not approved yet. You can re-request after 3 days."}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Link href="/laboratory"><Button variant="outline" className="w-full rounded-[12px]">Free Labs</Button></Link>
                {statusInfo?.canRequest ? <Button onClick={() => setStep("phone")} className="w-full rounded-[12px] bg-teal">Re-request</Button> : <Button disabled className="w-full rounded-[12px]">Wait 3 days</Button>}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-6 text-center text-[11px] font-mono text-ink-faint">
          © 2026 ScienceMaterial • 5 Free Labs: {FREE_EXPERIMENT_SLUGS.join(", ")} • Server-enforced gating
        </div>
      </div>
    </div>
  )
}
