import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Bookmark, FlaskConical, BookOpen, FileText } from "lucide-react"

export default function BookmarksPage() {
  const bookmarks = [
    { type: "chapter", title: "光的折射", meta: "初一下册 · 第二章", id: "guang-de-zhe-she", Icon: BookOpen },
    { type: "experiment", title: "Density Explorer", meta: "Physics · 密度探索器", id: "density-explorer", Icon: FlaskConical },
    { type: "section", title: "阿基米德原理", meta: "初二上册 · 水的密度和压强", id: "a-ji-mi-de", Icon: FileText },
  ]
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[800px] px-6 lg:px-8 py-8 pb-24">
        <div className="max-w-[640px]">
          <div className="technical-label flex items-center gap-2"><Bookmark className="h-3.5 w-3.5" /> Bookmarks · 收藏</div>
          <h1 className="mt-2 text-[26px] font-semibold tracking-[-0.02em] leading-tight text-balance">Your saved chapters, sections, experiments and questions.</h1>
        </div>
        <div className="mt-8 space-y-3">
          {bookmarks.map(b => (
            <Card key={b.id} className="border-border/60 shadow-xs card-hover">
              <CardContent className="p-4 flex items-center gap-3 min-w-0">
                <div className="h-9 w-9 rounded-[10px] bg-surface-muted border border-border flex items-center justify-center shrink-0">
                  <b.Icon className="h-4 w-4 text-ink-muted" />
                </div>
                <Badge variant="secondary" className="text-[11px] shrink-0 hidden sm:inline-flex">{b.type}</Badge>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-[500] tracking-[-0.01em] truncate">{b.title}</div>
                  <div className="text-[11px] font-mono text-ink-muted truncate">{b.meta}</div>
                </div>
                <Link href={b.type === "experiment" ? `/laboratory/${b.id}` : `/courses/chu-yi-xia/guang-he-yan`} className="shrink-0">
                  <Button size="sm" variant="outline" className="rounded-[10px] h-8 px-3.5 text-[12px]">Open</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
