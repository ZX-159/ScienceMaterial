import Link from "next/link"
import { books, getChaptersByBook } from "@/lib/curriculum/data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock } from "lucide-react"
import { Logo } from "@/components/ui/logo"

function deterministicProgress(id: string) {
  let hash = 0
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) % 100
  return 20 + (hash % 70)
}

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-8 py-8 pb-24 lg:pb-8">
        <div className="mb-8 max-w-[720px]">
          <div className="technical-label flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-teal animate-pulse" /> Courses · 课程</div>
          <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.02em] leading-tight text-balance">The complete curriculum, organized as a textbook index.</h1>
          <p className="mt-2 text-[14px] text-ink-muted leading-[1.6] text-pretty">六册 64 章 · 依课本页序重建 · English UI, Chinese content</p>
        </div>

        <div className="space-y-6">
          {books.map(book => {
            const chs = getChaptersByBook(book.slug)
            const bookProgress = deterministicProgress(book.id)
            return (
              <Card key={book.id} className="overflow-hidden border-border/60 shadow-xs motion-premium card-hover">
                <div className="grid lg:grid-cols-[300px_1fr]">
                  <div className="p-6 bg-surface-muted/60 border-b lg:border-b-0 lg:border-r border-border">
                    <Badge variant={book.color as any} className="font-mono text-[11px]">{book.year}</Badge>
                    <h2 className="mt-3 text-[17px] font-semibold leading-tight tracking-[-0.01em] break-words">{book.titleZh}</h2>
                    <div className="text-[12px] text-ink-muted mt-1 tracking-[-0.01em]">{book.titleEn} · {book.chapterCount} chapters</div>
                    <div className="text-[13px] text-ink-muted mt-3 leading-[1.5] break-words">{book.description}</div>
                    <div className="mt-5">
                      <div className="flex justify-between text-[11px] font-mono text-ink-muted mb-2">
                        <span>PROGRESS</span>
                        <span>{bookProgress}%</span>
                      </div>
                      <Progress value={bookProgress} />
                    </div>
                  </div>
                  <CardContent className="p-0">
                    <div className="divide-y divide-border/60">
                      {chs.map(ch => {
                        const chProgress = deterministicProgress(ch.id)
                        return (
                          <Link key={ch.id} href={`/courses/${book.slug}/${ch.slug}`} className="flex items-center gap-3 sm:gap-4 p-4 hover:bg-surface-muted/60 transition-colors group min-w-0">
                            <span className="font-mono text-[12px] text-ink-muted w-7 shrink-0 tabular-nums">{String(ch.number).padStart(2, "0")}</span>
                            <span className="flex-1 text-[14px] font-[500] tracking-[-0.01em] group-hover:text-teal transition-colors truncate">{ch.titleZh}</span>
                            {ch.isReconstructed && <Badge variant="outline" className="text-[10px] shrink-0 hidden sm:inline-flex">Reconstructed</Badge>}
                            <span className="text-[11px] font-mono text-ink-muted hidden md:inline-flex items-center gap-1 shrink-0 whitespace-nowrap"><Clock className="h-3 w-3" />{ch.estimatedMinutes} MIN</span>
                            <div className="w-14 sm:w-16 hidden md:block shrink-0"><Progress value={chProgress} /></div>
                            <span className="text-[11px] font-mono text-ink-muted group-hover:text-teal shrink-0">→</span>
                          </Link>
                        )
                      })}
                    </div>
                  </CardContent>
                </div>
              </Card>
            )
          })}
        </div>

        <footer className="mt-12 pt-6 border-t border-border/50 text-[11px] font-mono text-ink-muted flex justify-between">
          <span>© 2026 ScienceMaterial</span>
          <span className="flex items-center gap-2"><Logo size={16} /> ScienceMaterial</span>
        </footer>
      </div>
    </div>
  )
}
