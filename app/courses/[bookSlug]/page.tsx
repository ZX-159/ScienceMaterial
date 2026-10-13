import { notFound } from "next/navigation"
import Link from "next/link"
import { getBookBySlug, getChaptersByBook } from "@/lib/curriculum/data"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, FileText } from "lucide-react"

function deterministicMinutes(id: string) {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 20
  return 8 + h
}

export default async function BookPage({ params }: { params: Promise<{ bookSlug: string }> }) {
  const { bookSlug } = await params
  const book = getBookBySlug(bookSlug)
  if (!book) return notFound()
  const chs = getChaptersByBook(bookSlug)
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[800px] px-6 lg:px-8 py-8 pb-24">
        <Link href="/courses" className="inline-flex items-center gap-1.5 text-[13px] text-ink-muted hover:text-ink mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Courses
        </Link>
        <div className="flex items-start gap-4 mb-8 min-w-0">
          <div className="min-w-0 flex-1">
            <Badge variant={book.color as any} className="text-[11px]">{book.year}</Badge>
            <h1 className="mt-3 text-[24px] font-semibold tracking-[-0.02em] leading-tight break-words">{book.titleZh}</h1>
            <div className="text-[13px] text-ink-muted mt-1.5 tracking-[-0.01em]">{book.titleEn} · {book.chapterCount} chapters</div>
            <div className="text-[13px] text-ink-muted mt-3 leading-[1.5] break-words">{book.description}</div>
          </div>
        </div>
        <div className="grid gap-2">
          {chs.map(ch => (
            <Link key={ch.id} href={`/courses/${book.slug}/${ch.slug}`} className="flex items-center gap-3 p-4 rounded-[12px] border border-border/60 bg-surface hover:bg-surface-muted hover:border-border transition-colors group min-w-0 shadow-xs">
              <div className="h-8 w-8 rounded-[8px] bg-surface-muted border border-border flex items-center justify-center text-[11px] font-mono text-ink-muted shrink-0">{String(ch.number).padStart(2, "0")}</div>
              <span className="flex-1 text-[14px] font-[500] tracking-[-0.01em] truncate group-hover:text-teal transition-colors">{ch.titleZh}</span>
              {ch.isReconstructed && <Badge variant="outline" className="text-[10px] shrink-0 hidden sm:inline-flex">Reconstructed</Badge>}
              <span className="text-[11px] font-mono text-ink-muted flex items-center gap-1 shrink-0 whitespace-nowrap"><Clock className="h-3 w-3" />{deterministicMinutes(ch.id)} MIN</span>
              <FileText className="h-4 w-4 text-ink-faint group-hover:text-teal transition-colors shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
