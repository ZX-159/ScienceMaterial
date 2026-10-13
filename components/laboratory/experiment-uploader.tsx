"use client"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Upload, FileCode, Check, AlertTriangle, X, FileText, Sparkles, Info, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Logo } from "@/components/ui/logo"

interface Props {
  bookSlug?: string
  chapterId?: string
  sectionId?: string
  defaultSubject?: string
  onUploaded?: (slug: string) => void
  variant?: "section" | "chapter" | "lab"
}

const SUBJECTS = ["physics","chemistry","biology","earth","space","environment","engineering"] as const
const TYPES = ["simulation","experiment","visualizer","animation","graph","interactive"] as const
const DIFFICULTIES = ["beginner","intermediate","advanced"] as const

export function ExperimentUploader({ bookSlug, chapterId, sectionId, defaultSubject="physics", onUploaded, variant="section" }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [html, setHtml] = useState("")
  const [fileName, setFileName] = useState("")
  const [slug, setSlug] = useState("")
  const [title, setTitle] = useState("")
  const [titleZh, setTitleZh] = useState("")
  const [description, setDescription] = useState("")
  const [subject, setSubject] = useState(defaultSubject)
  const [type, setType] = useState("simulation")
  const [difficulty, setDifficulty] = useState("beginner")
  const [status, setStatus] = useState<"idle"|"uploading"|"success"|"error">("idle")
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    if (!file.name.endsWith(".html")) { setError("Only .html files allowed"); return }
    if (file.size > 500_000) { setError(`File too large ${Math.round(file.size/1024)}KB > 500KB`); return }
    const text = await file.text()
    setHtml(text)
    setFileName(file.name)
    if (!slug) setSlug(file.name.replace(/\.html$/, "").toLowerCase().replace(/[^a-z0-9-]/g,"-").replace(/--+/g,"-").slice(0,64))
    setError("")
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer.files[0]
    if (f) handleFile(f)
  }

  const onPasteHtml = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHtml(e.target.value)
    setFileName("pasted.html")
  }

  const validate = () => {
    if (!slug || slug.length<2) return "Slug min 2 chars, lowercase hyphens, unique"
    if (!/^[a-z0-9-]+$/.test(slug)) return "Slug only lowercase letters, numbers, hyphens"
    if (!title || title.length<2) return "Title min 2 chars"
    if (!titleZh || titleZh.length<2) return "TitleZh min 2 chars"
    if (!description || description.length<10) return "Description min 10 chars"
    if (!html || html.length<100) return "HTML source required, min 100 chars"
    if (html.length>500_000) return "HTML max 500KB"
    if (!html.includes("<canvas") && !html.includes("<svg") && !html.includes("canvas")) return "HTML must contain canvas or svg"
    if (html.includes("allow-same-origin")) return "Remove allow-same-origin — only allow-scripts allowed"
    return null
  }

  const handleUpload = async () => {
    const v = validate()
    if (v) { setError(v); setStatus("error"); return }
    setStatus("uploading")
    setError("")
    try {
      const res = await fetch("/api/experiments", {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({
          slug,
          title,
          titleZh,
          description,
          subject,
          type,
          difficulty,
          bookSlug,
          chapterId,
          sectionId,
          html_source: html,
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || data.details || "Upload failed")
      setStatus("success")
      onUploaded?.(slug)
      setTimeout(()=>{ setIsOpen(false); setStatus("idle") }, 1500)
    } catch (e:any) {
      setStatus("error")
      setError(e.message || "Upload failed")
    }
  }

  if (!isOpen) {
    return (
      <div className={`rounded-[12px] border border-dashed border-border/70 bg-surface-muted/40 p-3.5 flex items-center justify-between gap-3 ${variant==="section" ? "" : "mb-4"}`}>
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="h-8 w-8 rounded-[10px] bg-surface border border-border flex items-center justify-center shrink-0"><Upload className="h-4 w-4 text-ink-muted" /></div>
          <div className="min-w-0">
            <div className="text-[13px] font-[600] tracking-[-0.01em] truncate">
              {variant==="section" ? `Upload Experiment for ${sectionId || "this section"}` : variant==="chapter" ? `Upload Experiment for Chapter ${chapterId}` : "Upload Experiment"}
            </div>
            <div className="text-[11px] font-mono text-ink-muted truncate">
              {chapterId && `${chapterId}`} {sectionId && `· ${sectionId}`} {bookSlug && `· ${bookSlug}`} · single-file .html · &lt;500KB
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link href="/EXPERIMENTS.md" target="_blank" className="hidden sm:inline-flex"><Button variant="ghost" size="sm" className="h-8 rounded-[10px] text-[12px]"><FileText className="h-3.5 w-3.5 mr-1" /> Guide</Button></Link>
          <Button size="sm" className="h-8 rounded-[10px] text-[12px]" onClick={()=>setIsOpen(true)}><Sparkles className="h-3.5 w-3.5 mr-1" /> Upload</Button>
        </div>
      </div>
    )
  }

  return (
    <Card className="border-border/60 shadow-sm overflow-hidden">
      <div className="h-10 border-b border-border/60 bg-surface-muted/80 backdrop-blur-xl flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Logo size={20} />
          <span className="text-[13px] font-[600] tracking-[-0.01em]">Upload Experiment — {chapterId || "custom"}{sectionId ? ` · ${sectionId}` : ""}</span>
          <Badge variant="outline" className="text-[10px] font-mono ml-2">single-file html</Badge>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-[8px]" onClick={()=>setIsOpen(false)}><X className="h-4 w-4" /></Button>
      </div>
      <CardContent className="p-5 space-y-5">
        <div
          onDragOver={e=>{e.preventDefault(); setDragOver(true)}}
          onDragLeave={()=>setDragOver(false)}
          onDrop={onDrop}
          className={`rounded-[12px] border-2 border-dashed p-6 text-center transition-colors ${dragOver ? "border-teal bg-teal-soft/50" : "border-border bg-surface-muted/40"}`}
        >
          <FileCode className="h-8 w-8 mx-auto text-ink-faint mb-2" />
          <div className="text-[13px] font-[500]">Drag & drop your .html file here</div>
          <div className="text-[11px] font-mono text-ink-muted mt-1">Single file, &lt;500KB, must contain canvas, responsive</div>
          <div className="mt-3 flex justify-center gap-2">
            <Button variant="outline" size="sm" className="rounded-[10px] h-8 text-[12px]" onClick={()=>fileInputRef.current?.click()}>Browse File</Button>
            <span className="text-[11px] text-ink-faint self-center">or paste below</span>
          </div>
          <input ref={fileInputRef} type="file" accept=".html" className="hidden" onChange={e=>{ const f=e.target.files?.[0]; if(f) handleFile(f) }} />
          {fileName && <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-mono bg-surface border border-border rounded-[8px] px-2.5 py-1"><Check className="h-3.5 w-3.5 text-teal" /> {fileName} · {Math.round(html.length/1024)}KB</div>}
        </div>

        <div>
          <Label className="text-[11px] font-mono uppercase tracking-wider text-ink-muted mb-2 block">HTML Source</Label>
          <Textarea value={html} onChange={onPasteHtml} placeholder="<!DOCTYPE html><html>... your single-file experiment ...</html>" className="min-h-[180px] font-mono text-[12px] rounded-[12px]" />
          <div className="mt-1.5 flex items-center gap-2 text-[10px] font-mono text-ink-faint"><Info className="h-3 w-3" /> Must work in sandboxed iframe, responsive 320px-1280px, canvas min-height 320px. See guide.</div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div><Label className="text-[11px] font-mono uppercase">Slug *</Label><Input value={slug} onChange={e=>setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g,"-"))} placeholder="my-density-test" className="mt-1.5 rounded-[10px] h-9 text-[13px]" /></div>
          <div><Label className="text-[11px] font-mono uppercase">Subject *</Label><select value={subject} onChange={e=>setSubject(e.target.value)} className="mt-1.5 w-full h-9 rounded-[10px] border border-border bg-surface px-3 text-[13px]">{SUBJECTS.map(s=><option key={s} value={s}>{s}</option>)}</select></div>
          <div><Label className="text-[11px] font-mono uppercase">Title (English) *</Label><Input value={title} onChange={e=>setTitle(e.target.value)} placeholder="My Density Test" className="mt-1.5 rounded-[10px] h-9 text-[13px]" /></div>
          <div><Label className="text-[11px] font-mono uppercase">TitleZh (Chinese) *</Label><Input value={titleZh} onChange={e=>setTitleZh(e.target.value)} placeholder="我的密度测试" className="mt-1.5 rounded-[10px] h-9 text-[13px]" /></div>
          <div className="sm:col-span-2"><Label className="text-[11px] font-mono uppercase">Description *</Label><Input value={description} onChange={e=>setDescription(e.target.value)} placeholder="ρ=m/V experiment with mass/volume sliders" className="mt-1.5 rounded-[10px] h-9 text-[13px]" /></div>
          <div><Label className="text-[11px] font-mono uppercase">Type</Label><select value={type} onChange={e=>setType(e.target.value)} className="mt-1.5 w-full h-9 rounded-[10px] border border-border bg-surface px-3 text-[13px]">{TYPES.map(t=><option key={t} value={t}>{t}</option>)}</select></div>
          <div><Label className="text-[11px] font-mono uppercase">Difficulty</Label><select value={difficulty} onChange={e=>setDifficulty(e.target.value)} className="mt-1.5 w-full h-9 rounded-[10px] border border-border bg-surface px-3 text-[13px]">{DIFFICULTIES.map(d=><option key={d} value={d}>{d}</option>)}</select></div>
          <div><Label className="text-[11px] font-mono uppercase">BookSlug</Label><Input value={bookSlug||""} readOnly className="mt-1.5 rounded-[10px] h-9 text-[13px] bg-surface-muted" /></div>
          <div><Label className="text-[11px] font-mono uppercase">ChapterId + SectionId</Label><Input value={`${chapterId||""} ${sectionId ? "· "+sectionId : ""}`} readOnly className="mt-1.5 rounded-[10px] h-9 text-[13px] bg-surface-muted" /></div>
        </div>

        <div className="rounded-[10px] bg-surface-muted border border-border/60 p-3 text-[11px] leading-[1.6] font-mono text-ink-muted">
          <div className="font-[600] text-ink mb-1.5 flex items-center gap-1.5"><AlertTriangle className="h-3.5 w-3.5 text-brass" /> Checklist</div>
          <div>• single .html &lt;500KB • canvas min 320px • responsive • no overlap • <span className="inline-flex items-center gap-1"><Logo size={14} /> ScienceMaterial</span> logo • English UI Chinese content • sandboxed</div>
        </div>

        {error && <div className="rounded-[10px] bg-oxide-soft border border-oxide/20 p-3 text-[12px] text-ink flex gap-2"><AlertTriangle className="h-4 w-4 text-oxide shrink-0 mt-0.5" /><span className="break-words">{error}</span></div>}
        {status==="success" && <div className="rounded-[10px] bg-teal-soft border border-teal/15 p-3 text-[12px] text-ink flex gap-2"><Check className="h-4 w-4 text-teal shrink-0" /> Uploaded to /experiments/{slug}.html</div>}

        <div className="flex gap-2 justify-between items-center pt-2">
          <Link href="/EXPERIMENTS.md" target="_blank" className="text-[11px] font-mono text-ink-muted hover:text-ink flex items-center gap-1"><ExternalLink className="h-3 w-3" /> Guide</Link>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-[10px] h-9 text-[13px]" onClick={()=>setIsOpen(false)}>Cancel</Button>
            <Button className="rounded-[10px] h-9 text-[13px]" onClick={handleUpload} disabled={status==="uploading"}>{status==="uploading" ? "Uploading..." : status==="success" ? "Uploaded ✓" : "Upload & Publish"}</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
