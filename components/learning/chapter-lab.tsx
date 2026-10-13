"use client"
import { useEffect, useState } from "react"
import { ExperimentFrame } from "@/components/laboratory/experiment-frame"
import { ExperimentUploader } from "@/components/laboratory/experiment-uploader"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FlaskConical, Beaker } from "lucide-react"
import { experiments as localExps } from "@/lib/experiments/data"
import { Logo } from "@/components/ui/logo"

interface ExperimentMeta {
  id: string
  slug: string
  title: string
  titleZh: string
  description: string
  subject: string
  chapterId?: string
  sectionId?: string
  bookSlug?: string
  file: string
  tags?: string[]
  size?: number
}

export function ChapterLab({ bookSlug, chapterId, chapterTitle }: { bookSlug: string; chapterId: string; chapterTitle: string }) {
  const [exps, setExps] = useState<ExperimentMeta[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      const res = await fetch(`/api/experiments?chapterId=${chapterId}`)
      if (res.ok) {
        const data = await res.json()
        if(Array.isArray(data) && data.length>0){
          setExps(data)
        } else {
          setExps(localExps.filter(e=>e.chapterId===chapterId) as any)
        }
      } else {
        setExps(localExps.filter(e=>e.chapterId===chapterId) as any)
      }
    } catch {
      setExps(localExps.filter(e=>e.chapterId===chapterId) as any)
    }
    setLoading(false)
  }

  useEffect(() => { load() }, [chapterId])

  const handleUploaded = (slug: string) => {
    load()
  }

  return (
    <div className="space-y-4">
      <div className="rounded-[12px] bg-teal-soft/50 border border-teal/15 p-4 flex items-center gap-3">
        <Logo size={24} />
        <div className="min-w-0 flex-1">
          <div className="text-[13px] font-[600] tracking-[-0.01em]">本章相关实验 · {chapterTitle} · {chapterId}</div>
          <div className="text-[12px] text-ink-muted truncate">
            {loading ? "Loading..." : `${exps.length} experiment${exps.length>1?"s":""} for this chapter`}
          </div>
        </div>
        <Badge variant="secondary" className="text-[10px] font-mono shrink-0">{exps.length} labs</Badge>
      </div>

      <ExperimentUploader bookSlug={bookSlug} chapterId={chapterId} variant="chapter" onUploaded={handleUploaded} defaultSubject="physics" />

      {loading ? (
        <Card className="border-border/60 shadow-xs"><CardContent className="p-6 text-[13px] text-ink-muted">Loading experiments...</CardContent></Card>
      ) : exps.length===0 ? (
        <Card className="border-dashed border-border/70 shadow-xs bg-surface-muted/30">
          <CardContent className="p-8 text-center">
            <Beaker className="h-10 w-10 mx-auto text-ink-faint mb-3" />
            <div className="text-[14px] font-[600]">No experiments yet for {chapterId}</div>
            <div className="text-[12px] text-ink-muted mt-1 max-w-[460px] mx-auto leading-[1.6]">
              Upload your own single-file HTML experiment for this chapter using the uploader above.
              See guide for template with tabs, controls, charts and quiz.
            </div>
            <div className="mt-4 flex justify-center gap-2 flex-wrap">
              <Badge variant="outline" className="text-[10px] font-mono">single-file .html</Badge>
              <Badge variant="outline" className="text-[10px] font-mono">&lt;500KB</Badge>
              <Badge variant="outline" className="text-[10px] font-mono">interactive</Badge>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {exps.map(exp => (
            <div key={exp.slug} className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="text-[10px] font-mono">{exp.subject}</Badge>
                <span className="text-[13px] font-[600] tracking-[-0.01em] truncate">{exp.title} · {exp.titleZh}</span>
                <span className="text-[11px] font-mono text-ink-muted truncate">· {exp.slug}{exp.sectionId ? ` · ${exp.sectionId}` : ""}</span>
              </div>
              <ExperimentFrame slug={exp.slug} title={`${exp.title} · ${exp.titleZh}`} />
              <div className="text-[11px] text-ink-muted leading-[1.5] px-1">
                {exp.description}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function SectionExperiments({ bookSlug, chapterId, sectionId, sectionTitle }: { bookSlug: string; chapterId: string; sectionId: string; sectionTitle: string }) {
  const [exps, setExps] = useState<ExperimentMeta[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      const res = await fetch(`/api/experiments?sectionId=${sectionId}&chapterId=${chapterId}`)
      if (res.ok) {
        const data = await res.json()
        setExps(Array.isArray(data) ? data : [])
      }
    } catch {}
    setLoading(false)
  }

  useEffect(() => { load() }, [sectionId, chapterId])

  return (
    <div className="mt-6 pt-5 border-t border-border/40 space-y-3">
      <div className="flex items-center gap-2 flex-wrap">
        <Logo size={20} />
        <span className="text-[12px] font-[600] tracking-[-0.01em]">Experiments for {sectionTitle} · {sectionId}</span>
        {!loading && <span className="text-[11px] font-mono text-ink-muted">· {exps.length} uploaded</span>}
        <Badge variant="outline" className="text-[10px] font-mono ml-auto">every section uploadable</Badge>
      </div>

      {!loading && exps.length>0 && (
        <div className="space-y-4">
          {exps.map(exp => (
            <div key={exp.slug}>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Badge variant="outline" className="text-[10px] font-mono">{exp.slug}</Badge>
                <span className="text-[12px] font-[500] truncate">{exp.title} · {exp.titleZh}</span>
              </div>
              <ExperimentFrame slug={exp.slug} title={`${exp.title} · ${exp.titleZh}`} />
            </div>
          ))}
        </div>
      )}

      <ExperimentUploader bookSlug={bookSlug} chapterId={chapterId} sectionId={sectionId} variant="section" onUploaded={load} />
    </div>
  )
}
