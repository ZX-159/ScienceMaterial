"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { chapters } from "@/lib/curriculum/data"
import { experiments } from "@/lib/experiments/data"
import { Search, BookOpen, FlaskConical, Command } from "lucide-react"

export default function SearchPage() {
  const [q, setQ] = useState("")
  const filteredChapters = chapters.filter(c => !q || c.titleZh.includes(q) || c.slug.includes(q.toLowerCase())).slice(0, 8)
  const filteredExps = experiments.filter(e => !q || e.titleZh.includes(q) || e.title.toLowerCase().includes(q.toLowerCase())).slice(0, 6)

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[800px] px-6 lg:px-8 py-8 pb-24">
        <div className="max-w-[640px]">
          <div className="technical-label flex items-center gap-2"><Search className="h-3.5 w-3.5" /> Search · 搜索</div>
          <h1 className="mt-2 text-[24px] font-semibold tracking-[-0.02em] leading-tight text-balance">Search chapters, concepts, experiments, quizzes.</h1>
        </div>

        <div className="mt-6">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
            <Input placeholder="搜索：测量、密度、电路、光的折射..." value={q} onChange={e => setQ(e.target.value)} className="h-12 text-[15px] pl-10 rounded-[14px] border-border/60 shadow-xs" autoFocus />
          </div>
          <div className="text-[11px] font-mono text-ink-muted mt-2.5 flex items-center gap-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1 rounded-[6px] bg-surface-muted border border-border px-1.5 py-0.5"><Command className="h-3 w-3" />K</span>
            <span>anywhere to open command palette · English UI, Chinese content indexed, custom SVG</span>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-ink-muted mb-3 flex items-center gap-2"><BookOpen className="h-3.5 w-3.5" /> Chapters · {filteredChapters.length}</div>
            <div className="space-y-2">
              {filteredChapters.map(c => (
                <Link key={c.id} href={`/courses/${c.bookSlug}/${c.slug}`} className="block min-w-0">
                  <Card className="hover:bg-surface-muted/50 transition-colors border-border/60 shadow-xs card-hover">
                    <CardContent className="p-3.5 flex items-center gap-3 min-w-0">
                      <Badge variant="outline" className="font-mono text-[11px] shrink-0">{c.bookSlug}</Badge>
                      <span className="text-[14px] font-[500] tracking-[-0.01em] truncate flex-1">{c.titleZh}</span>
                      <span className="text-[11px] font-mono text-ink-muted whitespace-nowrap shrink-0 hidden sm:block">Section: {c.titleZh.slice(0, 6)}</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-ink-muted mb-3 flex items-center gap-2"><FlaskConical className="h-3.5 w-3.5" /> Laboratory · {filteredExps.length}</div>
            <div className="space-y-2">
              {filteredExps.map(e => (
                <Link key={e.id} href={`/laboratory/${e.slug}`} className="block min-w-0">
                  <Card className="hover:bg-surface-muted/50 transition-colors border-border/60 shadow-xs card-hover">
                    <CardContent className="p-3.5 flex items-center gap-3 min-w-0">
                      <Badge variant="secondary" className="text-[11px] shrink-0 capitalize">{e.subject}</Badge>
                      <span className="text-[14px] tracking-[-0.01em] truncate flex-1">{e.titleZh} · {e.title}</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
