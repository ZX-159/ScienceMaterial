import { notFound } from "next/navigation"
import Link from "next/link"
import { getBookBySlug, getChapterBySlug, getChaptersByBook, sampleChapterContent } from "@/lib/curriculum/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ContentBlockRenderer } from "@/components/learning/content-renderer"
import { ChapterLab, SectionExperiments } from "@/components/learning/chapter-lab"
import { Progress } from "@/components/ui/progress"
import { Bookmark, Clock, FlaskConical, HelpCircle, Share2, FileText, ArrowLeft, ArrowRight, AlertCircle } from "lucide-react"
import { Logo } from "@/components/ui/logo"

export default async function ChapterPage({ params }: { params: Promise<{ bookSlug: string; chapterSlug: string }> }) {
  const { bookSlug, chapterSlug } = await params
  const book = getBookBySlug(bookSlug)
  const chapter = getChapterBySlug(bookSlug, chapterSlug)
  if (!book || !chapter) return notFound()

  const allChapters = getChaptersByBook(bookSlug)
  const idx = allChapters.findIndex(c => c.slug === chapterSlug)
  const prev = idx > 0 ? allChapters[idx-1] : null
  const next = idx < allChapters.length-1 ? allChapters[idx+1] : null

  const content = (sampleChapterContent as any)[chapter.slug] || {
    title: chapter.titleZh,
    sections: [
      { id: "s1", titleZh: "概述", blocks: [{ type: "paragraph", content: `本章为 ${chapter.titleZh}，属于 ${book.titleZh}。内容涵盖核心概念、定义、公式与实验。` }, { type: "definition", term: chapter.titleZh, definition: "本章核心概念，包含关键定义与科学原理，配合实验与练习巩固理解。" }, { type: "callout", variant: "tip", content: "学习建议：先阅读定义，再进行实验探索，最后完成测验。" }] },
      { id: "s2", titleZh: "重点概念", blocks: [{ type: "table", headers: ["概念", "定义", "例子"], rows: [["核心概念1","本章第一个重点","日常现象"],["核心概念2","本章第二个重点","实验观察"],["公式/定律","定量关系","p = F/A 或 ρ = m/V"]] }, { type: "quiz", quizId: `${chapter.id}-q1` }] }
    ]
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-8 py-6 pb-24 lg:pb-8">
        <div className="flex items-center gap-2 text-[12px] font-mono text-ink-muted mb-4 flex-wrap">
          <Link href="/courses" className="hover:text-ink transition-colors">Courses</Link>
          <span className="text-ink-faint">/</span>
          <Link href={`/courses/${book.slug}`} className="hover:text-ink transition-colors truncate max-w-[160px]">{book.titleZh}</Link>
          <span className="text-ink-faint">/</span>
          <span className="text-ink truncate max-w-[200px]">{chapter.titleZh}</span>
        </div>

        <div className="grid lg:grid-cols-[1fr_280px] gap-8 items-start">
          <div className="min-w-0">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant={book.color as any} className="text-[11px]">{book.year} · 第{chapter.number}章</Badge>
                  {chapter.isReconstructed && <Badge variant="outline" className="text-[11px]">Reconstructed</Badge>}
                </div>
                <h1 className="mt-3 text-[26px] lg:text-[28px] font-bold tracking-[-0.02em] leading-tight break-words flex items-center gap-2">
                  <Logo size={24} /> {chapter.titleZh}
                </h1>
                {chapter.reconstructedNote && (
                  <div className="mt-3 text-[12px] text-ink-muted border-l-[2.5px] border-brass pl-3 py-2 bg-brass-soft/40 rounded-r-[8px] flex gap-2">
                    <AlertCircle className="h-4 w-4 text-brass shrink-0 mt-0.5" />
                    <span className="break-words leading-[1.5]">{chapter.reconstructedNote}</span>
                  </div>
                )}
              </div>
              <div className="hidden md:flex gap-1 shrink-0">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-[10px]" aria-label="Bookmark"><Bookmark className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-[10px]" aria-label="Share"><Share2 className="h-4 w-4" /></Button>
              </div>
            </div>

            <Tabs defaultValue="learn" className="w-full">
              <TabsList className="segmented-control h-auto p-1 bg-surface-muted border border-border rounded-[12px] mb-6">
                <TabsTrigger value="overview" className="rounded-[8px] data-[state=active]:bg-surface data-[state=active]:shadow-xs data-[state=active]:border data-[state=active]:border-border px-4 py-1.5 text-[13px] font-[500]">Overview</TabsTrigger>
                <TabsTrigger value="learn" className="rounded-[8px] data-[state=active]:bg-surface data-[state=active]:shadow-xs data-[state=active]:border data-[state=active]:border-border px-4 py-1.5 text-[13px] font-[500]">Learn</TabsTrigger>
                <TabsTrigger value="lab" className="rounded-[8px] data-[state=active]:bg-surface data-[state=active]:shadow-xs data-[state=active]:border data-[state=active]:border-border px-4 py-1.5 text-[13px] font-[500]">Laboratory</TabsTrigger>
                <TabsTrigger value="quiz" className="rounded-[8px] data-[state=active]:bg-surface data-[state=active]:shadow-xs data-[state=active]:border data-[state=active]:border-border px-4 py-1.5 text-[13px] font-[500]">Quiz</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-0">
                <Card className="border-border/60 shadow-xs">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-3 mb-6">
                      <div className="rounded-[12px] bg-surface-muted p-3.5 border border-border/50">
                        <div className="text-[11px] font-mono uppercase text-ink-muted tracking-wider">Estimated</div>
                        <div className="flex items-center gap-1.5 mt-1.5"><Clock className="h-4 w-4 text-ink-muted" /><span className="text-[14px] font-[600]">{chapter.estimatedMinutes} min</span></div>
                      </div>
                      <div className="rounded-[12px] bg-surface-muted p-3.5 border border-border/50">
                        <div className="text-[11px] font-mono uppercase text-ink-muted tracking-wider">Sections</div>
                        <div className="text-[14px] font-[600] mt-1.5">{content.sections.length} sections</div>
                      </div>
                      <div className="rounded-[12px] bg-surface-muted p-3.5 border border-border/50">
                        <div className="text-[11px] font-mono uppercase text-ink-muted tracking-wider">Progress</div>
                        <div className="mt-2"><Progress value={32} /></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {content.sections.map((sec: any) => (
                        <div key={sec.id} className="flex gap-3 p-2.5 rounded-[10px] hover:bg-surface-muted/60 transition-colors">
                          <div className="h-6 w-6 rounded-[6px] bg-surface-muted border border-border flex items-center justify-center text-[11px] font-mono shrink-0">{sec.id}</div>
                          <div className="min-w-0">
                            <div className="text-[14px] font-[500] tracking-[-0.01em] truncate">{sec.titleZh}</div>
                            <div className="text-[12px] text-ink-muted">{sec.blocks.length} blocks</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="learn" className="mt-0">
                <div className="space-y-6">
                  {content.sections.map((sec: any) => (
                    <div key={sec.id} className="rounded-[16px] border border-border/60 bg-surface p-6 shadow-xs">
                      <h2 className="text-[17px] font-semibold mb-4 flex items-center gap-2 tracking-[-0.01em]">
                        <span className="h-6 w-6 rounded-[8px] bg-teal-soft text-teal flex items-center justify-center text-[11px] font-mono border border-teal/15 shrink-0">{sec.id}</span>
                        <span className="truncate">{sec.titleZh}</span>
                      </h2>
                      <ContentBlockRenderer blocks={sec.blocks} />
                      <SectionExperiments bookSlug={book.slug} chapterId={chapter.id} sectionId={sec.id} sectionTitle={sec.titleZh} />
                    </div>
                  ))}
                  <div className="flex justify-between gap-3 pt-6 border-t border-border/60">
                    {prev ? <Link href={`/courses/${book.slug}/${prev.slug}`} className="min-w-0"><Button variant="outline" className="rounded-[12px] max-w-[45%] truncate"><ArrowLeft className="h-4 w-4 shrink-0" /> <span className="truncate">{prev.titleZh}</span></Button></Link> : <div />}
                    {next ? <Link href={`/courses/${book.slug}/${next.slug}`} className="min-w-0"><Button className="rounded-[12px] max-w-[45%] truncate"><span className="truncate">{next.titleZh}</span> <ArrowRight className="h-4 w-4 shrink-0" /></Button></Link> : <div />}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="lab" className="mt-0">
                <ChapterLab bookSlug={book.slug} chapterId={chapter.id} chapterTitle={chapter.titleZh} />
              </TabsContent>

              <TabsContent value="quiz" className="mt-0">
                <Card className="border-border/60 shadow-xs">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-5">
                      <div className="h-8 w-8 rounded-[10px] bg-brass-soft border border-brass/15 flex items-center justify-center"><HelpCircle className="h-4 w-4 text-brass" /></div>
                      <div className="text-[14px] font-[600] tracking-[-0.01em]">Chapter Quiz · {chapter.titleZh}</div>
                    </div>
                    <div className="space-y-4">
                      <div className="rounded-[12px] border border-border p-4">
                        <div className="text-[14px] font-[500] tracking-[-0.01em] break-words">1. 测量值由哪两部分组成？</div>
                        <div className="mt-3 space-y-2">
                          {["仅准确值","准确值 + 一位估计值","仅估计值","单位 + 误差"].map((opt,i)=>(
                            <label key={i} className="flex items-center gap-3 p-3 rounded-[10px] border border-border hover:bg-surface-muted cursor-pointer transition-colors group">
                              <input type="radio" name="q1" className="shrink-0" />
                              <span className="text-[13px] break-words">{String.fromCharCode(65+i)}. {opt}</span>
                            </label>
                          ))}
                        </div>
                        <Button size="sm" className="mt-4 rounded-[10px]">Submit Answer</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <footer className="mt-8 pt-6 border-t border-border/50 text-[11px] font-mono text-ink-muted flex justify-between">
              <span>© 2026 ScienceMaterial</span>
              <span className="flex items-center gap-2"><Logo size={16} /> ScienceMaterial</span>
            </footer>
          </div>

          <div className="hidden lg:block sticky top-8 space-y-4">
            <Card className="border-border/60 shadow-xs">
              <CardContent className="p-4">
                <div className="technical-label mb-3 flex items-center gap-2"><FileText className="h-3.5 w-3.5" /> Table of Contents</div>
                <div className="space-y-1">
                  {content.sections.map((sec: any, i: number) => (
                    <div key={sec.id} className="text-[13px] text-ink-muted hover:text-ink cursor-pointer py-1.5 border-l-2 border-transparent hover:border-teal pl-3 transition-colors truncate">{i+1}. {sec.titleZh} · {sec.id}</div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border/60">
                  <div className="text-[11px] font-mono uppercase text-ink-muted mb-2 tracking-wider">Progress 68%</div>
                  <Progress value={68} />
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/60 shadow-xs">
              <CardContent className="p-4">
                <div className="technical-label mb-3">Chapters in {book.year}</div>
                <div className="space-y-0.5 max-h-[320px] overflow-auto pr-1">
                  {allChapters.map(c => (
                    <Link key={c.id} href={`/courses/${book.slug}/${c.slug}`} className={`block text-[12.5px] py-2 px-2.5 rounded-[8px] transition-colors truncate ${c.slug===chapter.slug ? "bg-teal-soft text-teal font-[600] border border-teal/15" : "text-ink-muted hover:bg-surface-muted hover:text-ink"}`}>{c.number}. {c.titleZh}</Link>
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
