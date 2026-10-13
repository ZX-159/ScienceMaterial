"use client"
import { useEffect, useState } from "react"
import { ExperimentUploader } from "@/components/laboratory/experiment-uploader"
import { ExperimentFrame } from "@/components/laboratory/experiment-frame"
import { IconPhysics, IconChemistry, IconBiology, IconEarth, IconSpace, IconExperiment } from "@/components/ui/custom-icons"
import { Logo } from "@/components/ui/logo"
import { FlaskConical, Beaker, Lock, Sparkles, Phone } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { isFreeExperiment, FREE_EXPERIMENT_SLUGS } from "@/lib/access/free-tier"

interface ExperimentMeta {
  id: string
  slug: string
  title: string
  titleZh: string
  description: string
  subject: string
  type: string
  difficulty: string | number
  chapterId?: string
  sectionId?: string
  bookSlug?: string
  file: string
  size?: number
  version?: string
  tags?: string[]
}

export default function LaboratoryPage() {
  const [experiments, setExperiments] = useState<ExperimentMeta[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("All")
  const [accessStatus, setAccessStatus] = useState<string>("none")
  const [canAccessAll, setCanAccessAll] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/experiments")
      if (res.ok) {
        const data = await res.json()
        setExperiments(Array.isArray(data) ? data : [])
      }
      const statusRes = await fetch("/api/access/status")
      if (statusRes.ok) {
        const statusData = await statusRes.json()
        setAccessStatus(statusData.status || "none")
        setCanAccessAll(statusData.canAccessAll || false)
      }
    } catch {}
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const subjects = [
    { id: "All", label: "All", Icon: IconExperiment },
    { id: "physics", label: "Physics", Icon: IconPhysics },
    { id: "chemistry", label: "Chemistry", Icon: IconChemistry },
    { id: "biology", label: "Biology", Icon: IconBiology },
    { id: "earth", label: "Earth", Icon: IconEarth },
    { id: "space", label: "Space", Icon: IconSpace },
  ]

  const filtered = (() => {
    if(filter==="All") return experiments
    return experiments.filter(e=>e.subject===filter)
  })()

  const freeExperiments = filtered.filter(e => isFreeExperiment(e.slug))
  const lockedExperiments = filtered.filter(e => !isFreeExperiment(e.slug))

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8 py-8 pb-24 lg:pb-8">
        <div className="flex flex-wrap items-start justify-between gap-6 mb-8">
          <div className="min-w-0 max-w-[760px]">
            <div className="technical-label flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-teal animate-pulse" /> Laboratory · {experiments.length} experiments · {FREE_EXPERIMENT_SLUGS.length} free
            </div>
            <h1 className="mt-3 text-[26px] lg:text-[32px] font-semibold tracking-[-0.025em] leading-[1.1] text-balance flex items-center gap-3">
              <Logo size={36} />
              <span>Interactive experiments</span>
              {canAccessAll ? <Badge className="bg-mineral text-white ml-2">Full Access</Badge> : <Badge variant="outline" className="ml-2">5 Free • {experiments.length - FREE_EXPERIMENT_SLUGS.length} Locked</Badge>}
            </h1>
            <p className="mt-3 text-[14px] text-ink-muted leading-[1.6] text-pretty">
              Each lab is self-contained, interactive, and runs in a sandboxed iframe. <span className="font-[600] text-ink">5 polished free labs</span> for all users. Full access (82 labs) requires admin approval with phone number. Server-enforced gating prevents bypass.
            </p>
            {!canAccessAll && (
              <div className="mt-4 flex items-center gap-2">
                <Link href="/onboarding/access"><Button size="sm" className="rounded-[12px] bg-teal gap-2"><Phone className="h-4 w-4" /> Request Full Access</Button></Link>
                <span className="text-[11px] text-ink-muted font-mono">Status: {accessStatus} • Bell icon for notifications</span>
              </div>
            )}
          </div>
          <div className="hidden md:block text-right shrink-0 rounded-[14px] border border-border/60 bg-surface p-4 min-w-[200px]">
            <div className="text-[11px] font-mono text-ink-muted tracking-wider">TOTAL EXPERIMENTS</div>
            <div className="text-[28px] font-semibold tracking-[-0.02em] leading-none mt-1">{loading ? "…" : experiments.length}</div>
            <div className="text-[11px] font-mono text-ink-muted mt-1">Interactive labs</div>
            <div className="mt-3 pt-3 border-t border-border/50 text-[10px] font-mono text-ink-muted text-left leading-[1.5]">
              <div className="flex items-center gap-1"><Sparkles className="h-3 w-3 text-mineral" /> 5 Free polished</div>
              <div className="flex items-center gap-1"><Lock className="h-3 w-3 text-oxide" /> {experiments.length - 5} Requires approval</div>
              <div>• Drag & adjust</div>
              <div>• Real-time data</div>
              <div>• Server-enforced gating</div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <ExperimentUploader variant="lab" onUploaded={load} defaultSubject="physics" />
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          <div className="segmented-control">
            {subjects.map(s => (
              <button key={s.id} className={filter===s.id ? "active flex items-center gap-1.5" : "flex items-center gap-1.5"} onClick={()=>setFilter(s.id)}>
                <s.Icon size={14} className="shrink-0" />
                <span>{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <Card className="border-border/60 shadow-xs"><CardContent className="p-8 text-center text-[13px] text-ink-muted">Loading {experiments.length} experiments...</CardContent></Card>
        ) : filtered.length===0 ? (
          <Card className="border-dashed border-border/70 shadow-xs bg-surface-muted/30">
            <CardContent className="p-12 text-center">
              <Beaker className="h-12 w-12 mx-auto text-ink-faint mb-4" />
              <div className="text-[16px] font-[600] tracking-[-0.01em]">No experiments found for {filter}</div>
              <div className="text-[13px] text-ink-muted mt-2 max-w-[520px] mx-auto leading-[1.6]">
                Check public/experiments/*.html exists and custom-index.json.
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-12">
            {/* Free Tier Section - Polished */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-8 rounded-[10px] bg-mineral-soft border border-mineral/20 flex items-center justify-center"><Sparkles className="h-4 w-4 text-mineral" /></div>
                <div>
                  <h2 className="text-[18px] font-semibold tracking-[-0.015em]">Free Tier — 5 Polished Labs</h2>
                  <div className="text-[12px] text-ink-muted">Always accessible, no approval needed, server-enforced free, very polished</div>
                </div>
                <Badge className="bg-mineral text-white ml-auto">Free for All</Badge>
              </div>
              <div className="space-y-8">
                {freeExperiments.map(exp => (
                  <div key={exp.slug} className="space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className="text-[10px] font-mono">{exp.subject}</Badge>
                      <span className="text-[14px] font-[600] tracking-[-0.01em]">{exp.title} · {exp.titleZh}</span>
                      <Badge className="bg-mineral text-white text-[10px]"><Sparkles className="h-3 w-3 mr-1" /> Free • Polished</Badge>
                      <span className="text-[11px] font-mono text-ink-muted">· {exp.slug} {exp.chapterId ? `· ${exp.chapterId}` : ""} · {exp.size ? `${Math.round(exp.size/1024)}KB` : ""}</span>
                    </div>
                    <ExperimentFrame slug={exp.slug} title={`${exp.title} · ${exp.titleZh}`} />
                    <div className="text-[12px] text-ink-muted leading-[1.5] px-1">{exp.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Locked Tier */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-8 rounded-[10px] bg-oxide-soft border border-oxide/20 flex items-center justify-center"><Lock className="h-4 w-4 text-oxide" /></div>
                <div>
                  <h2 className="text-[18px] font-semibold tracking-[-0.015em]">Full Collection — {lockedExperiments.length} Labs {canAccessAll ? "(Unlocked)" : "(Requires Approval)"}</h2>
                  <div className="text-[12px] text-ink-muted">{canAccessAll ? "You have full access to all labs" : "Request access to unlock all 82 labs. Server-enforced gating prevents client bypass."}</div>
                </div>
                {canAccessAll ? <Badge className="bg-mineral text-white ml-auto">Unlocked</Badge> : <Badge variant="outline" className="ml-auto border-oxide/20 text-oxide"><Lock className="h-3 w-3 mr-1" /> Locked</Badge>}
              </div>

              {canAccessAll ? (
                <div className="space-y-8">
                  {lockedExperiments.map(exp => (
                    <div key={exp.slug} className="space-y-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className="text-[10px] font-mono">{exp.subject}</Badge>
                        <span className="text-[14px] font-[600] tracking-[-0.01em]">{exp.title} · {exp.titleZh}</span>
                        <span className="text-[11px] font-mono text-ink-muted">· {exp.slug} {exp.chapterId ? `· ${exp.chapterId}` : ""} · {exp.size ? `${Math.round(exp.size/1024)}KB` : ""}</span>
                      </div>
                      <ExperimentFrame slug={exp.slug} title={`${exp.title} · ${exp.titleZh}`} />
                      <div className="text-[12px] text-ink-muted leading-[1.5] px-1">{exp.description}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {lockedExperiments.slice(0, 12).map(exp => (
                    <Card key={exp.slug} className="border-border/60 shadow-xs overflow-hidden opacity-90 hover:opacity-100 transition-opacity">
                      <CardContent className="p-0">
                        <div className="h-1 w-full bg-oxide/30" />
                        <div className="p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-[10px]">{exp.subject}</Badge>
                                <Badge variant="outline" className="text-[10px] border-oxide/20 text-oxide"><Lock className="h-3 w-3 mr-1" /> Locked</Badge>
                              </div>
                              <div className="text-[13px] font-[600] mt-2 truncate">{exp.titleZh}</div>
                              <div className="text-[11px] text-ink-muted truncate">{exp.title}</div>
                              <div className="text-[11px] text-ink-muted mt-2 line-clamp-2 leading-[1.5]">{exp.description}</div>
                            </div>
                            <FlaskConical className="h-8 w-8 text-ink-faint shrink-0" />
                          </div>
                          <div className="mt-4 flex gap-2">
                            <Link href={`/laboratory/${exp.slug}`} className="flex-1"><Button size="sm" variant="outline" className="w-full rounded-[10px] h-8 text-[11px]"><Lock className="h-3 w-3" /> View Locked</Button></Link>
                            <Link href="/onboarding/access" className="flex-1"><Button size="sm" className="w-full rounded-[10px] h-8 text-[11px] bg-teal">Request</Button></Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {lockedExperiments.length > 12 && (
                    <Card className="border-dashed border-border/60 bg-surface-muted/30 md:col-span-2">
                      <CardContent className="p-6 text-center">
                        <div className="text-[13px] font-[500]">+{lockedExperiments.length - 12} more locked labs</div>
                        <div className="text-[11px] text-ink-muted mt-1">Request full access to unlock all 82 labs. 5 free labs always available.</div>
                        <Link href="/onboarding/access"><Button size="sm" className="mt-3 rounded-[10px] bg-teal"><Phone className="h-4 w-4 mr-1" /> Request Full Access</Button></Link>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        <footer className="mt-12 pt-6 border-t border-border/50 text-[11px] font-mono text-ink-muted flex justify-between items-center">
          <span>© 2026 ScienceMaterial • 5 Free Labs Polished • Server-enforced gating</span>
          <span className="flex items-center gap-2"><Logo size={16} /> ScienceMaterial • {canAccessAll ? "Full Access" : "Free Tier"}</span>
        </footer>
      </div>
    </div>
  )
}
