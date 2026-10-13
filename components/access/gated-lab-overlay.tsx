"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lock, FlaskConical, Clock, CheckCircle, AlertCircle, Sparkles, Beaker, Phone, ArrowRight } from "lucide-react"
import { Logo } from "@/components/ui/logo"
import { FREE_EXPERIMENT_SLUGS } from "@/lib/access/free-tier"

interface Props {
  slug: string
  title?: string
  status?: string | null
  canRerequestAfter?: Date | string | null
  isFree?: boolean
}

export function GatedLabOverlay({ slug, title, status, canRerequestAfter, isFree }: Props) {
  const rerequestDate = canRerequestAfter ? new Date(canRerequestAfter) : null
  const canRerequest = !rerequestDate || new Date() >= rerequestDate

  return (
    <div className="relative w-full h-[min(680px,70vh)] lg:h-[min(720px,78vh)] rounded-[16px] overflow-hidden border border-border bg-surface shadow-sm flex flex-col">
      {/* Header same as ExperimentFrame for consistency */}
      <div className="h-10 min-h-[40px] border-b border-border/60 bg-surface-muted/80 backdrop-blur-xl flex items-center justify-between px-3.5 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <Logo size={20} />
          <span className="ml-1 text-[12px] font-medium tracking-[-0.01em] truncate">{title || slug}</span>
          <Badge variant="secondary" className="text-[10px] ml-1">Locked</Badge>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-ink-muted">
          <Lock className="h-3 w-3" /> Requires Approval
        </div>
      </div>

      <div className="flex-1 min-h-0 bg-[#F6F3EB] relative overflow-hidden flex items-center justify-center p-6 lg:p-8">
        {/* Background pattern - subtle */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231A1E1D' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />

        <div className="relative w-full max-w-[520px]">
          <Card className="border-border/60 shadow-md rounded-[20px] overflow-hidden">
            <CardContent className="p-0">
              {/* Top accent */}
              <div className="h-1 w-full bg-gradient-to-r from-teal via-mineral to-brass" />

              <div className="p-6 lg:p-8">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-[14px] bg-oxide-soft border border-oxide/20 flex items-center justify-center shrink-0">
                    <Lock className="h-6 w-6 text-oxide" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[18px] font-semibold tracking-[-0.015em] leading-tight">Interactive Lab Locked</h3>
                    <p className="text-[13px] text-ink-muted mt-1.5 leading-[1.6] text-pretty">
                      This lab is part of the full collection. You have <span className="font-[600] text-ink">5 free labs</span> to explore. Request access to unlock all 82 labs + quizzes.
                    </p>
                  </div>
                </div>

                {/* Status */}
                {status === "pending" && (
                  <div className="mt-6 rounded-[12px] border border-brass/20 bg-brass-soft/50 p-3.5 flex gap-3">
                    <Clock className="h-4 w-4 text-brass shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[12px] font-[600] tracking-[-0.01em]">Request Pending Review</div>
                      <div className="text-[12px] text-ink-muted mt-1 leading-[1.5]">Admin will review within 24h. You still have 5 free labs. Check notifications for updates.</div>
                    </div>
                  </div>
                )}

                {status === "rejected" && (
                  <div className="mt-6 rounded-[12px] border border-oxide/20 bg-oxide-soft/50 p-3.5 flex gap-3">
                    <AlertCircle className="h-4 w-4 text-oxide shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[12px] font-[600]">Request Not Approved</div>
                      <div className="text-[12px] text-ink-muted mt-1 leading-[1.5]">
                        {canRerequest ? "You can re-request now. Make sure phone number is correct." : `You can re-request after ${rerequestDate?.toLocaleDateString()}. Countdown: ${Math.ceil((rerequestDate!.getTime() - Date.now()) / (1000*60*60*24))} days left.`}
                      </div>
                    </div>
                  </div>
                )}

                {/* Free labs list */}
                <div className="mt-6">
                  <div className="technical-label mb-3 flex items-center gap-2"><Sparkles className="h-3.5 w-3.5" /> Your 5 Free Labs</div>
                  <div className="grid grid-cols-1 gap-2">
                    {FREE_EXPERIMENT_SLUGS.map((freeSlug) => (
                      <Link key={freeSlug} href={`/laboratory/${freeSlug}`} className="flex items-center gap-3 p-2.5 rounded-[12px] border border-border/60 hover:border-teal/30 hover:bg-teal-soft/20 transition-colors group">
                        <div className="h-8 w-8 rounded-[10px] bg-surface-muted border border-border flex items-center justify-center shrink-0 group-hover:bg-teal-soft/50 transition-colors">
                          <Beaker className="h-4 w-4 text-ink-muted group-hover:text-teal" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-[12px] font-[500] tracking-[-0.01em] truncate">{freeSlug.replace(/-/g, " ")}</div>
                          <div className="text-[11px] text-ink-muted">Free • No approval needed</div>
                        </div>
                        <Badge variant="outline" className="text-[10px]">Free</Badge>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {status === "pending" ? (
                    <>
                      <Link href="/laboratory"><Button variant="outline" className="w-full rounded-[12px] h-10 text-[12px]"><FlaskConical className="h-4 w-4" /> Explore Free Labs</Button></Link>
                      <Link href="/settings"><Button variant="outline" className="w-full rounded-[12px] h-10 text-[12px]">Check Status</Button></Link>
                    </>
                  ) : status === "rejected" && !canRerequest ? (
                    <>
                      <Link href="/laboratory"><Button variant="outline" className="w-full rounded-[12px] h-10 text-[12px]">Free Labs</Button></Link>
                      <Button disabled className="w-full rounded-[12px] h-10 text-[12px]"><Clock className="h-4 w-4" /> Wait {Math.ceil((rerequestDate!.getTime() - Date.now()) / (1000*60*60*24))}d</Button>
                    </>
                  ) : (
                    <>
                      <Link href="/onboarding/access" className="col-span-2">
                        <Button className="w-full rounded-[12px] h-11 text-[13px] font-[600] gap-2 bg-teal hover:bg-teal-pressed">
                          <Phone className="h-4 w-4" /> Request Full Access <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                      <div className="col-span-2 text-[11px] text-center text-ink-muted font-mono mt-1">
                        Requires phone number • Admin reviews within 24h • 82 labs + quizzes
                      </div>
                    </>
                  )}
                </div>

                {/* Security note */}
                <div className="mt-6 pt-4 border-t border-border/50 flex items-center gap-2 text-[11px] font-mono text-ink-faint">
                  <CheckCircle className="h-3.5 w-3.5 text-mineral" />
                  <span>Server-enforced gating • No client bypass • Free tier: 5 labs always available</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bottom hint */}
          <div className="mt-4 text-center text-[11px] text-ink-faint font-mono">
            Lab <span className="font-[600] text-ink-muted">{slug}</span> requires approval • Free labs: {FREE_EXPERIMENT_SLUGS.join(", ")}
          </div>
        </div>
      </div>

      <div className="h-7 min-h-[28px] border-t border-border/40 bg-surface-muted/60 px-3 flex items-center gap-3 text-[11px] font-mono text-ink-muted shrink-0">
        <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-oxide animate-pulse" /> Gated • ScienceMaterial</span>
        <span className="ml-auto">© 2026 ScienceMaterial • 5 Free Labs</span>
      </div>
    </div>
  )
}
