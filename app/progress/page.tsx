import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { books, chapters } from "@/lib/curriculum/data"
import { AlertTriangle, CheckCircle2, Database, Clock } from "lucide-react"

function deterministicProgress(id: string) {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 100
  return 25 + (h % 60)
}

export default function ProgressPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-8 py-8 pb-24 lg:pb-8">
        <div className="max-w-[720px]">
          <div className="technical-label">Progress · 进度</div>
          <h1 className="mt-2 text-[26px] lg:text-[28px] font-semibold tracking-[-0.02em] leading-tight text-balance">Your learning journey, visualized.</h1>
        </div>

        <div className="mt-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <Card className="border-border/60 shadow-xs">
            <CardHeader><CardTitle className="text-[16px] tracking-[-0.01em]">Overall Progress</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 rounded-[12px] bg-surface-muted border border-border/50">
                  <div className="text-[26px] font-semibold tracking-[-0.02em] leading-none">27</div>
                  <div className="text-[11px] font-mono text-ink-muted mt-1.5 tracking-wider">CHAPTERS DONE</div>
                </div>
                <div className="text-center p-3 rounded-[12px] bg-teal-soft/50 border border-teal/15">
                  <div className="text-[26px] font-semibold tracking-[-0.02em] leading-none text-teal">42%</div>
                  <div className="text-[11px] font-mono text-ink-muted mt-1.5 tracking-wider">TOTAL</div>
                </div>
                <div className="text-center p-3 rounded-[12px] bg-surface-muted border border-border/50">
                  <div className="text-[26px] font-semibold tracking-[-0.02em] leading-none">12</div>
                  <div className="text-[11px] font-mono text-ink-muted mt-1.5 tracking-wider">EXPERIMENTS</div>
                </div>
              </div>
              <div className="space-y-3.5">
                {books.map(book => {
                  const prog = deterministicProgress(book.id)
                  return (
                    <div key={book.id} className="flex items-center gap-3 min-w-0">
                      <div className="w-20 text-[12px] font-[500] tracking-[-0.01em] shrink-0 truncate">{book.year}</div>
                      <div className="flex-1 min-w-0"><Progress value={prog} className="h-2" /></div>
                      <div className="w-10 text-[11px] font-mono text-ink-muted text-right shrink-0 tabular-nums">{prog}%</div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6 min-w-0">
            <Card className="border-border/60 shadow-xs">
              <CardHeader className="pb-3"><CardTitle className="flex items-center gap-2 text-[15px]"><AlertTriangle className="h-4 w-4 text-oxide" /> Weak Areas · 薄弱环节</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {[
                  { title: "电路 · 欧姆定律", acc: "58%", color: "oxide" },
                  { title: "大气压力", acc: "64%", color: "brass" },
                  { title: "质量守恒定律", acc: "68%", color: "brass" },
                ].map(item => (
                  <div key={item.title} className="flex items-center justify-between gap-2 p-3 rounded-[12px] border border-border bg-surface hover:bg-surface-muted/50 transition-colors min-w-0">
                    <span className="text-[13px] tracking-[-0.01em] truncate">{item.title}</span>
                    <Badge variant={item.color as any} className="shrink-0 whitespace-nowrap text-[11px]">{item.acc} · Weak</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border/60 shadow-xs">
              <CardHeader className="pb-3"><CardTitle className="flex items-center gap-2 text-[15px]"><Database className="h-4 w-4" /> Sync Status</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2.5 text-[12px] font-mono">
                  <div className="flex justify-between gap-2"><span className="text-ink-muted">Local (IndexedDB)</span><span className="text-mineral flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5" /> Saved</span></div>
                  <div className="flex justify-between gap-2"><span className="text-ink-muted">Server</span><span className="text-mineral flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5" /> Synced · 2m ago</span></div>
                  <div className="flex justify-between gap-2"><span className="text-ink-muted">Strategy</span><span className="whitespace-nowrap">60-120s + events</span></div>
                </div>
                <div className="mt-4 rounded-[12px] bg-surface-muted border border-border/50 p-3 text-[11px] leading-[1.5] text-ink-muted break-words">
                  Local-first: Dexie + IndexedDB. Progress saved immediately locally. Sync on chapter completion, quiz submission, logout, and when online. Cross-device merge by newest timestamp.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="mt-6 border-border/60 shadow-xs">
          <CardHeader><CardTitle className="flex items-center gap-2 text-[15px]"><Clock className="h-4 w-4" /> Science Map · Progress Visualization</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[320px] rounded-[14px] border border-border/60 bg-surface-muted p-4 relative overflow-hidden">
              <svg viewBox="0 0 800 300" className="w-full h-full" role="img" aria-label="Chapter progress map">
                {chapters.slice(0, 20).map((ch, i) => {
                  const x = 40 + (i % 10) * 80
                  const y = 60 + Math.floor(i / 10) * 140
                  const completed = deterministicProgress(ch.id) > 50
                  const weak = deterministicProgress(ch.id + "weak") < 35
                  return (
                    <g key={ch.id}>
                      {i > 0 && i % 10 !== 0 && <line x1={x - 80} y1={y} x2={x} y2={y} stroke="#DDD9CF" strokeWidth="1" opacity="0.6" />}
                      {i >= 10 && <line x1={x} y1={y - 140} x2={x} y2={y} stroke="#DDD9CF" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />}
                      <circle cx={x} cy={y} r="14" fill={completed ? "#0F6B67" : "#FFFEFB"} stroke={weak ? "#A04A3A" : "#DDD9CF"} strokeWidth={weak ? 2 : 1.2} />
                      <text x={x} y={y + 4} textAnchor="middle" fontSize="8" fill={completed ? "white" : "#6B706D"} fontFamily="ui-monospace" fontWeight={completed ? "600" : "400"}>{ch.number}</text>
                      {weak && <circle cx={x + 10} cy={y - 10} r="3" fill="#A04A3A" />}
                    </g>
                  )
                })}
              </svg>
              <div className="absolute bottom-3 left-3 flex gap-2 flex-wrap">
                <span className="text-[10px] font-mono px-2 py-1 rounded-full bg-teal text-white flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-white" /> Completed</span>
                <span className="text-[10px] font-mono px-2 py-1 rounded-full bg-surface border border-border">Not started</span>
                <span className="text-[10px] font-mono px-2 py-1 rounded-full bg-oxide/10 text-oxide border border-oxide/20">Weak &lt;70%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
