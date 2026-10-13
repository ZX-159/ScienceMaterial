import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Clock, Target, FileCheck, AlertTriangle } from "lucide-react"

export default function RevisionPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[800px] px-6 lg:px-8 py-8 pb-24">
        <div className="max-w-[640px]">
          <div className="technical-label">Revision · 复习</div>
          <h1 className="mt-2 text-[26px] font-semibold tracking-[-0.02em] leading-tight text-balance">Revision modes for focused learning.</h1>
          <p className="mt-2 text-[14px] text-ink-muted leading-[1.6] text-pretty">Quick sessions, weak areas, exam mode. Apple HIG premium, custom SVG icons.</p>
        </div>
        <div className="mt-8 grid gap-4">
          <Card className="border-border/60 shadow-xs card-hover">
            <CardHeader className="pb-3"><CardTitle className="flex items-center gap-2 text-[15px]"><Clock className="h-4 w-4" /> Quick Revision · 快速复习</CardTitle></CardHeader>
            <CardContent>
              <p className="text-[13px] text-ink-muted leading-[1.5]">5 or 10 minute sessions from your recent chapters. Spaced repetition.</p>
              <div className="mt-4 flex gap-2">
                <Button size="sm" className="rounded-[10px] h-8 px-4">5 min</Button>
                <Button size="sm" variant="outline" className="rounded-[10px] h-8 px-4">10 min</Button>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/60 shadow-xs card-hover">
            <CardHeader className="pb-3"><CardTitle className="flex items-center gap-2 text-[15px]"><Target className="h-4 w-4 text-oxide" /> Weak Areas · 薄弱环节</CardTitle></CardHeader>
            <CardContent>
              <p className="text-[13px] text-ink-muted leading-[1.5] flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-oxide shrink-0 mt-0.5" /> Quiz accuracy &lt; 70% → weak topic. Focused practice on weak chapters. Deterministic progress, no random.</p>
              <Link href="/quizzes"><Button size="sm" className="mt-4 rounded-[10px] h-8 px-4">Practise Weak Areas</Button></Link>
            </CardContent>
          </Card>
          <Card className="border-border/60 shadow-xs card-hover">
            <CardHeader className="pb-3"><CardTitle className="flex items-center gap-2 text-[15px]"><FileCheck className="h-4 w-4" /> Exam Mode · 考试模式</CardTitle></CardHeader>
            <CardContent>
              <p className="text-[13px] text-ink-muted leading-[1.5]">Timed, mixed chapters, no hints. Simulate exam conditions..</p>
              <Button size="sm" variant="outline" className="mt-4 rounded-[10px] h-8 px-4">Start Exam Mode</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
