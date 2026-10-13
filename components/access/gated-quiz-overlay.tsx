"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lock, FileQuestion, Clock, CheckCircle, AlertCircle, Sparkles, Phone, ArrowRight } from "lucide-react"
import { Logo } from "@/components/ui/logo"
import { FREE_QUIZ_IDS } from "@/lib/access/free-tier"

interface Props {
  quizId: string
  title?: string
  status?: string | null
  canRerequestAfter?: Date | string | null
}

export function GatedQuizOverlay({ quizId, title, status, canRerequestAfter }: Props) {
  const rerequestDate = canRerequestAfter ? new Date(canRerequestAfter) : null
  const canRerequest = !rerequestDate || new Date() >= rerequestDate

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[720px] px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2.5 mb-6">
          <Logo size={24} />
          <span className="text-[11px] font-mono text-ink-muted">ScienceMaterial • Gated Quiz</span>
          <Badge variant="secondary" className="ml-2 text-[10px]">Locked</Badge>
        </div>

        <Card className="border-border/60 shadow-md rounded-[20px] overflow-hidden">
          <CardContent className="p-0">
            <div className="h-1 w-full bg-gradient-to-r from-brass via-teal to-mineral" />
            <div className="p-6 lg:p-8">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-[14px] bg-oxide-soft border border-oxide/20 flex items-center justify-center shrink-0">
                  <Lock className="h-6 w-6 text-oxide" />
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-[20px] font-semibold tracking-[-0.015em] leading-tight">Quiz Locked — Requires Approval</h1>
                  <p className="text-[13px] text-ink-muted mt-2 leading-[1.6] text-pretty">
                    <span className="font-[600] text-ink">{quizId}</span> {title ? `· ${title}` : ""} is part of full collection. You have <span className="font-[600] text-ink">5 free quizzes</span>. Request access to unlock all quizzes.
                  </p>
                </div>
              </div>

              {status === "pending" && (
                <div className="mt-6 rounded-[12px] border border-brass/20 bg-brass-soft/50 p-3.5 flex gap-3">
                  <Clock className="h-4 w-4 text-brass shrink-0 mt-0.5" />
                  <div className="text-[12px] leading-[1.5]"><span className="font-[600]">Pending Review</span> — Admin will review within 24h. Check bell icon for notification.</div>
                </div>
              )}

              {status === "rejected" && !canRerequest && (
                <div className="mt-6 rounded-[12px] border border-oxide/20 bg-oxide-soft/50 p-3.5 flex gap-3">
                  <AlertCircle className="h-4 w-4 text-oxide shrink-0 mt-0.5" />
                  <div className="text-[12px] leading-[1.5]">Re-request available after {rerequestDate?.toLocaleDateString()}. {Math.ceil((rerequestDate!.getTime() - Date.now())/(1000*60*60*24))} days left.</div>
                </div>
              )}

              <div className="mt-6">
                <div className="technical-label mb-3 flex items-center gap-2"><Sparkles className="h-3.5 w-3.5" /> Your 5 Free Quizzes</div>
                <div className="grid gap-2">
                  {FREE_QUIZ_IDS.map(qid => (
                    <Link key={qid} href={`/quizzes/${qid}`} className="flex items-center gap-3 p-2.5 rounded-[12px] border border-border/60 hover:border-teal/30 hover:bg-teal-soft/20 transition-colors">
                      <div className="h-8 w-8 rounded-[10px] bg-surface-muted border border-border flex items-center justify-center"><FileQuestion className="h-4 w-4 text-ink-muted" /></div>
                      <div className="flex-1 min-w-0"><div className="text-[12px] font-[500] truncate">{qid}</div><div className="text-[11px] text-ink-muted">Free • No approval needed</div></div>
                      <Badge variant="outline" className="text-[10px]">Free</Badge>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                {status === "pending" ? (
                  <Link href="/quizzes"><Button variant="outline" className="w-full rounded-[12px] h-11">Explore Free Quizzes</Button></Link>
                ) : (
                  <Link href="/onboarding/access"><Button className="w-full rounded-[12px] h-11 gap-2 bg-teal hover:bg-teal-pressed"><Phone className="h-4 w-4" /> Request Full Access <ArrowRight className="h-4 w-4" /></Button></Link>
                )}
                <div className="text-[11px] text-center text-ink-muted font-mono mt-2">Server-enforced • No client bypass • 5 free quizzes always</div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/50 flex items-center gap-2 text-[11px] font-mono text-ink-faint">
                <CheckCircle className="h-3.5 w-3.5 text-mineral" />
                <span>Secure gating • Questions not served to non-approved users</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
