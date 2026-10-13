import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { books, chapters } from "@/lib/curriculum/data"
import { experiments } from "@/lib/experiments/data"
import { Clock, FlaskConical, Target, TrendingUp, ArrowRight, BookOpen, Sparkles } from "lucide-react"
import { IconPhysics, IconChemistry, IconBiology } from "@/components/ui/custom-icons"
import { Logo } from "@/components/ui/logo"

function deterministicProgress(id: string) {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 100
  return 20 + (h % 75)
}

export default function DashboardPage() {
  const currentChapter = chapters.find(c => c.slug === "dian-lu") || chapters[20]
  const book = books.find(b => b.id === currentChapter.bookId)
  const progress = 68

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-8 py-8 pb-24 lg:pb-8">
        <div className="mb-8">
          <div className="technical-label mb-3 flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-teal animate-pulse" /> Continue Learning · 继续学习</div>
          <Card className="overflow-hidden border-teal/15 shadow-sm motion-premium card-hover">
            <div className="grid md:grid-cols-[1.2fr_0.8fr]">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <Badge variant="brass" className="text-[11px]">{book?.year} · 第{currentChapter.number}章</Badge>
                  <span className="text-[11px] font-mono text-ink-muted whitespace-nowrap">12 MIN LEFT · {progress}% COMPLETE</span>
                </div>
                <h2 className="text-[20px] lg:text-[22px] font-semibold tracking-[-0.015em] leading-tight break-words">{currentChapter.titleZh}</h2>
                <div className="text-[13px] text-ink-muted mt-1.5 truncate">{book?.titleZh} · {currentChapter.slug}</div>
                <Progress value={progress} className="mt-4 h-2" />
                <div className="mt-5 flex gap-2 flex-wrap">
                  <Link href={`/courses/${currentChapter.bookSlug}/${currentChapter.slug}`}>
                    <Button className="rounded-[12px] h-9 px-4 text-[13px]">Continue <ArrowRight className="h-4 w-4 ml-1" /></Button>
                  </Link>
                  <Link href={`/laboratory/${experiments.find(e=>e.chapterId===currentChapter.id)?.slug || "circuit-builder"}`}>
                    <Button variant="outline" className="rounded-[12px] h-9 px-4 text-[13px]"><FlaskConical className="h-4 w-4" /> Lab</Button>
                  </Link>
                </div>
              </CardContent>
              <div className="bg-surface-muted/60 p-6 border-t md:border-t-0 md:border-l border-border/60">
                <div className="text-[11px] font-mono uppercase tracking-wider text-ink-muted mb-3">Up Next</div>
                <div className="space-y-3">
                  <div className="flex gap-3 min-w-0">
                    <div className="h-8 w-8 rounded-[8px] bg-surface border border-border flex items-center justify-center text-[11px] font-mono shrink-0">01</div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-[500] tracking-[-0.01em] truncate">电路的组成</div>
                      <div className="text-[11px] text-ink-muted truncate">电池 · 导线 · 开关</div>
                    </div>
                  </div>
                  <div className="flex gap-3 min-w-0">
                    <div className="h-8 w-8 rounded-[8px] bg-surface border border-border flex items-center justify-center text-[11px] font-mono shrink-0">02</div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-[500] tracking-[-0.01em] truncate">欧姆定律实验</div>
                      <div className="text-[11px] text-ink-muted truncate">I = V/R · 模拟</div>
                    </div>
                  </div>
                  <div className="flex gap-3 min-w-0">
                    <div className="h-8 w-8 rounded-[8px] bg-surface border border-border flex items-center justify-center text-[11px] font-mono shrink-0">03</div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-[500] tracking-[-0.01em] truncate">家庭电路</div>
                      <div className="text-[11px] text-ink-muted truncate">安全用电 · 实践</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
          {/* Today + Quick Revision */}
          <div className="space-y-6 min-w-0">
            <Card className="border-border/60 shadow-xs">
              <CardHeader className="pb-3"><CardTitle className="flex items-center gap-2 text-[15px]"><Clock className="h-4 w-4" /> Today</CardTitle></CardHeader>
              <CardContent className="space-y-2.5">
                <div className="flex items-center gap-3 p-3 rounded-[12px] bg-teal-soft/50 border border-teal/15 min-w-0">
                  <div className="h-2 w-2 rounded-full bg-teal shrink-0" />
                  <div className="text-[13px] tracking-[-0.01em] truncate flex-1">完成 测量 单元测验 · 得分 85%</div>
                  <span className="text-[11px] font-mono text-ink-muted whitespace-nowrap shrink-0">2h ago</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-[12px] bg-surface-muted border border-border/60 min-w-0">
                  <div className="h-2 w-2 rounded-full bg-brass shrink-0" />
                  <div className="text-[13px] tracking-[-0.01em] truncate flex-1">进行中 密度探索器实验</div>
                  <span className="text-[11px] font-mono text-ink-muted whitespace-nowrap shrink-0">昨日</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-[12px] bg-surface-muted border border-border/60 min-w-0">
                  <div className="h-2 w-2 rounded-full bg-mineral shrink-0" />
                  <div className="text-[13px] tracking-[-0.01em] truncate flex-1">复习 光的反射 3 次</div>
                  <span className="text-[11px] font-mono text-ink-muted whitespace-nowrap shrink-0">2日前</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60 shadow-xs">
              <CardHeader className="pb-3"><CardTitle className="flex items-center gap-2 text-[15px]"><Target className="h-4 w-4" /> Quick Revision</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm" className="rounded-[10px] h-9">5 min</Button>
                  <Button variant="outline" size="sm" className="rounded-[10px] h-9">10 min</Button>
                  <Button variant="outline" size="sm" className="rounded-[10px] h-9">Weak</Button>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Link href="/revision" className="rounded-[12px] border border-border p-3 hover:bg-surface-muted transition-colors min-w-0">
                    <div className="text-[12px] font-[600] tracking-[-0.01em] flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5" /> 随机复习</div>
                    <div className="text-[11px] text-ink-muted mt-1">Random Review</div>
                  </Link>
                  <Link href="/quizzes" className="rounded-[12px] border border-border p-3 hover:bg-surface-muted transition-colors min-w-0">
                    <div className="text-[12px] font-[600] tracking-[-0.01em] flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5" /> 错题重练</div>
                    <div className="text-[11px] text-ink-muted mt-1">Weak Topics</div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Science Map — custom SVG no emoji */}
          <div className="space-y-6 min-w-0">
            <Card className="border-border/60 shadow-xs">
              <CardHeader className="pb-3"><CardTitle className="flex items-center gap-2 text-[15px]"><TrendingUp className="h-4 w-4" /> Your Science Map</CardTitle></CardHeader>
              <CardContent>
                <div className="relative h-[280px] rounded-[14px] bg-surface-muted border border-border/60 overflow-hidden p-4">
                  <svg viewBox="0 0 300 220" className="w-full h-full" role="img" aria-label="Science Map">
                    {/* Central YOU */}
                    <circle cx="150" cy="110" r="22" fill="#F3F0E8" stroke="#0F6B67" strokeWidth="1.5" />
                    <text x="150" y="114" textAnchor="middle" fontSize="10" fontFamily="ui-monospace" fill="#0F6B67" fontWeight="600">YOU</text>
                    {books.map((book, i) => {
                      const angle = (i / books.length) * Math.PI * 2 - Math.PI/2
                      const r = 82
                      const x = 150 + Math.cos(angle) * r
                      const y = 110 + Math.sin(angle) * r
                      const prog = deterministicProgress(book.id)
                      const active = i === 2
                      return (
                        <g key={book.id}>
                          <line x1="150" y1="110" x2={x} y2={y} stroke="#DDD9CF" strokeWidth="1" strokeDasharray="4 4" opacity="0.7" />
                          <circle cx={x} cy={y} r={active ? "19" : "16"} fill={active ? "#0F6B67" : "#FFFEFB"} stroke={active ? "#0F6B67" : "#DDD9CF"} strokeWidth={active ? "1.5" : "1.2"} />
                          <text x={x} y={y+3.5} textAnchor="middle" fontSize="9" fill={active ? "white" : "#6B706D"} fontFamily="ui-monospace" fontWeight={active ? "600" : "400"}>{book.year.slice(0,2)}</text>
                          {prog > 60 && !active && <circle cx={x+8} cy={y-8} r="4" fill="#5A724F" />}
                        </g>
                      )
                    })}
                  </svg>
                  <div className="absolute bottom-2 left-2 right-2 flex gap-1.5 flex-wrap">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal text-white border border-teal/20">Completed</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface border border-border">Current</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-oxide/10 text-oxide border border-oxide/20">Weak</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60 shadow-xs">
              <CardHeader className="pb-3"><CardTitle className="text-[15px]">Recent Activity</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2.5 text-[12px] font-mono text-ink-muted">
                  <div className="flex justify-between gap-2"><span className="truncate">打开章节 测量</span><span className="whitespace-nowrap shrink-0">09:42</span></div>
                  <div className="flex justify-between gap-2"><span className="truncate">完成实验 密度探索器</span><span className="whitespace-nowrap shrink-0">昨日 21:15</span></div>
                  <div className="flex justify-between gap-2"><span className="truncate">测验 声音和耳 · 72%</span><span className="whitespace-nowrap shrink-0">2日前</span></div>
                  <div className="flex justify-between gap-2"><span className="truncate">收藏 光的折射</span><span className="whitespace-nowrap shrink-0">3日前</span></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <footer className="mt-12 pt-6 border-t border-border/50 text-[11px] font-mono text-ink-muted flex justify-between">
          <span>© 2026 ScienceMaterial</span>
          <span className="flex items-center gap-2"><Logo size={16} /> ScienceMaterial</span>
        </footer>
      </div>
    </div>
  )
}
