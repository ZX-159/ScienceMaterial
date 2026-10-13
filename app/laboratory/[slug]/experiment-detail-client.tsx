"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ExperimentFrame } from "@/components/laboratory/experiment-frame"
import { ExperimentUploader } from "@/components/laboratory/experiment-uploader"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, FlaskConical, BookOpen, Info, Lightbulb, Beaker, FileText } from "lucide-react"
import { IconExperiment } from "@/components/ui/custom-icons"
import { GatedLabOverlay } from "@/components/access/gated-lab-overlay"

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
  createdAt?: string
  license?: string
  version?: string
}

export default function ExperimentDetailClient({ initialAccess, slug: propSlug }: { initialAccess?: { canAccess: boolean; status?: string; isFree?: boolean; canRerequestAfter?: string }, slug?: string }) {
  const params = useParams()
  const slug = propSlug || (params.slug as string)
  const [exp, setExp] = useState<ExperimentMeta | null>(null)
  const [related, setRelated] = useState<ExperimentMeta[]>([])
  const [loading, setLoading] = useState(true)
  const [notFoundFlag, setNotFoundFlag] = useState(false)
  const [accessInfo, setAccessInfo] = useState<any>(initialAccess || null)
  const [gated, setGated] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        // Check access status first
        if (!initialAccess) {
          const statusRes = await fetch("/api/access/status")
          if (statusRes.ok) {
            const statusData = await statusRes.json()
            setAccessInfo({
              canAccess: statusData.canAccessAll,
              status: statusData.status,
              canRerequestAfter: statusData.rerequestAfter,
            })
          }
        }

        const res = await fetch(`/api/experiments?slug=${slug}`)
        if (!res.ok) { setNotFoundFlag(true); setLoading(false); return }
        const data = await res.json()
        setExp(data)

        // Try to fetch secure HTML to see if gated (for non-free)
        // This will 403 if not allowed, and we can show gated
        try {
          const htmlRes = await fetch(`/api/experiments/html?slug=${slug}`)
          if (htmlRes.status === 403) {
            const errData = await htmlRes.json()
            if (errData.gated) {
              setGated(true)
            }
          }
        } catch {}

        // load related
        if (data.subject) {
          const rRes = await fetch(`/api/experiments`)
          if (rRes.ok) {
            const all = await rRes.json()
            setRelated((all as ExperimentMeta[]).filter(e=>e.subject===data.subject && e.slug!==slug).slice(0,3))
          }
        }
      } catch {
        setNotFoundFlag(true)
      }
      setLoading(false)
    }
    load()
  }, [slug, initialAccess])

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center p-8 text-[13px] text-ink-muted">Loading {slug}...</div>
  }

  if (notFoundFlag || !exp) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-[800px] px-6 lg:px-8 py-12">
          <Link href="/laboratory" className="inline-flex items-center gap-1.5 text-[13px] text-ink-muted hover:text-ink mb-6 transition-colors"><ArrowLeft className="h-4 w-4" /> Back to Laboratory</Link>
          <Card className="border-dashed border-border/70 bg-surface-muted/30">
            <CardContent className="p-8 text-center">
              <Beaker className="h-10 w-10 mx-auto text-ink-faint mb-3" />
              <div className="text-[16px] font-[600]">Experiment {slug} not found</div>
              <div className="text-[13px] text-ink-muted mt-2 max-w-[420px] mx-auto leading-[1.6]">Experiment not found. Please check the URL or browse all experiments in the laboratory.</div>
              <div className="mt-6 max-w-[600px] mx-auto"><ExperimentUploader variant="lab" defaultSubject="physics" /></div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // If gated and not free, show gated overlay (server-enforced, but also client check)
  const isFree = ["measurement-ruler","density-explorer","floating-sinking","wave-generator","reflection"].includes(slug)
  if (gated && !isFree && !(accessInfo?.canAccess)) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8 py-6 pb-24 lg:pb-8">
          <Link href="/laboratory" className="inline-flex items-center gap-1.5 text-[13px] text-ink-muted hover:text-ink mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Laboratory
          </Link>
          <GatedLabOverlay slug={slug} title={exp.title} status={accessInfo?.status} canRerequestAfter={accessInfo?.canRerequestAfter || accessInfo?.rerequestAfter} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8 py-6 pb-24 lg:pb-8">
        <Link href="/laboratory" className="inline-flex items-center gap-1.5 text-[13px] text-ink-muted hover:text-ink mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Laboratory
        </Link>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Badge variant="outline" className="text-[11px] capitalize">{exp.subject}</Badge>
              <Badge variant="secondary" className="text-[11px]">{exp.type}</Badge>
              <Badge variant="outline" className="font-mono text-[11px] capitalize">{exp.difficulty}</Badge>
              {exp.chapterId && <Badge variant="outline" className="font-mono text-[11px]">{exp.chapterId}{exp.sectionId ? ` · ${exp.sectionId}` : ""}</Badge>}
              {isFree && <Badge variant="default" className="text-[10px] bg-mineral">Free</Badge>}
            </div>
            <h1 className="text-[24px] lg:text-[26px] font-semibold tracking-[-0.02em] leading-tight break-words">{exp.title}</h1>
            <div className="text-[15px] text-ink-muted mt-1.5 tracking-[-0.01em] break-words">{exp.titleZh}</div>
            <div className="text-[13px] text-ink-muted mt-3 leading-[1.6] max-w-[640px] break-words text-pretty">{exp.description}</div>

            <div className="mt-6">
              <ExperimentFrame slug={exp.slug} title={exp.title} />
              <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-ink-muted flex-wrap">
                <span className="flex items-center gap-1"><Beaker className="h-3 w-3" /> Interactive Lab · ScienceMaterial {isFree && "· Free Tier"}</span>
                <span className="h-1 w-1 rounded-full bg-border hidden sm:block" />
                <span>Drag · Adjust · Observe · Learn</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 lg:sticky lg:top-6 min-w-0">
            <Card className="border-border/60 shadow-xs">
              <CardContent className="p-4">
                <div className="technical-label mb-3 flex items-center gap-2"><Info className="h-3.5 w-3.5" /> Experiment Info</div>
                <div className="space-y-3 text-[13px]">
                  <div className="flex justify-between gap-2"><span className="text-ink-muted shrink-0">Subject</span><span className="font-[500] capitalize">{exp.subject}</span></div>
                  <div className="flex justify-between gap-2"><span className="text-ink-muted shrink-0">Type</span><span className="font-[500] capitalize truncate">{exp.type}</span></div>
                  <div className="flex justify-between gap-2"><span className="text-ink-muted shrink-0">Difficulty</span><span className="font-[500] capitalize">{exp.difficulty}</span></div>
                  <div className="flex justify-between gap-2"><span className="text-ink-muted shrink-0">Chapter</span><span className="font-[500] tracking-[-0.01em] truncate text-right">{exp.bookSlug || "Science"} · {exp.chapterId || "General"}</span></div>
                  <div className="flex justify-between gap-2"><span className="text-ink-muted shrink-0">Access</span><span className="font-[500]">{isFree ? "Free for all" : "Requires approval"}</span></div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Link href={exp.bookSlug && exp.chapterId ? `/courses/${exp.bookSlug}/${exp.chapterId}` : "/courses"}><Button variant="outline" size="sm" className="w-full rounded-[10px] h-8 text-[12px]"><BookOpen className="h-4 w-4" /> Chapter</Button></Link>
                  <Link href="/laboratory"><Button variant="outline" size="sm" className="w-full rounded-[10px] h-8 text-[12px]"><FlaskConical className="h-4 w-4" /> All Labs</Button></Link>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60 shadow-xs">
              <CardContent className="p-4">
                <div className="technical-label mb-3 flex items-center gap-2"><Lightbulb className="h-3.5 w-3.5" /> Learning Notes · 学习笔记</div>
                <div className="text-[13px] leading-[1.6] text-ink-muted space-y-2 break-words">
                  <p>本实验 <span className="text-ink font-[600]">{exp.titleZh}</span> 帮助理解抽象概念，通过动手操作建立直观认识。</p>
                  <p>操作提示：拖动滑块观察参数变化，注意记录数据与现象，思考背后的科学原理。操作完成后，可尝试改变参数，观察不同条件下的现象，记录数据并分析规律。</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60 shadow-xs">
              <CardContent className="p-4">
                <div className="technical-label mb-3">Related Experiments</div>
                <div className="space-y-2">
                  {related.length===0 ? <div className="text-[12px] text-ink-muted">No related yet — upload more in same subject</div> : related.map(r => (
                    <Link key={r.id} href={`/laboratory/${r.slug}`} className="flex gap-2.5 p-2.5 rounded-[10px] hover:bg-surface-muted transition-colors min-w-0">
                      <div className="h-8 w-8 rounded-[8px] bg-surface-muted border border-border flex items-center justify-center shrink-0"><IconExperiment size={14} className="text-ink-muted" /></div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[12px] font-[500] tracking-[-0.01em] truncate">{r.titleZh}</div>
                        <div className="text-[11px] text-ink-muted truncate">{r.title}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
