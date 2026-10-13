"use client"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileQuestion, Clock, TrendingDown, CheckCircle2, AlertCircle, Lock, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"
import { isFreeQuiz, FREE_QUIZ_IDS } from "@/lib/access/free-tier"

const quizzes = [
  { id: "b1-c3-q1", titleZh: "测量 单元测验", chapter: "初一上册 · 第三章", questions: 8, difficulty: "beginner", accuracy: 85 },
  { id: "b2-c2-q1", titleZh: "光和眼 测验", chapter: "初一下册 · 第二章", questions: 10, difficulty: "intermediate", accuracy: 72 },
  { id: "b3-c10-q1", titleZh: "电路 检查点", chapter: "初二上册 · 第十章", questions: 6, difficulty: "beginner", accuracy: null },
  { id: "b4-c10-q1", titleZh: "电生磁和磁生电", chapter: "初二下册 · 第十章", questions: 12, difficulty: "intermediate", accuracy: 60 },
  { id: "b1-c1-q1", titleZh: "科学测量 基础测验", chapter: "初一上册 · 第一章", questions: 5, difficulty: "beginner", accuracy: null },
  { id: "b2-c5-q1", titleZh: "力与压强 测验", chapter: "初一下册 · 第五章", questions: 8, difficulty: "intermediate", accuracy: null },
  { id: "b3-c2-q1", titleZh: "密度 单元测验", chapter: "初二上册 · 第二章", questions: 7, difficulty: "beginner", accuracy: null },
  { id: "b3-c3-q1", titleZh: "溶液 测验", chapter: "初二上册 · 第三章", questions: 9, difficulty: "intermediate", accuracy: null },
]

export default function QuizzesPage() {
  const [accessStatus, setAccessStatus] = useState<string>("none")
  const [canAccessAll, setCanAccessAll] = useState(false)

  useEffect(() => {
    fetch("/api/access/status").then(r => r.json()).then(data => {
      setAccessStatus(data.status || "none")
      setCanAccessAll(data.canAccessAll || false)
    }).catch(() => {})
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-8 py-8 pb-24 lg:pb-8">
        <div className="max-w-[720px]">
          <div className="technical-label">Quizzes · 测验</div>
          <h1 className="mt-2 text-[26px] lg:text-[28px] font-semibold tracking-[-0.02em] leading-tight text-balance">Practise and check your understanding.</h1>
          <p className="mt-2 text-[14px] text-ink-muted leading-[1.6] text-pretty">
            Chinese questions, English UI. Multiple choice, multi-select, numerical, diagram labeling, simulation-based. 
            <span className="font-[600] text-ink"> 5 free quizzes</span> for all users, full access requires approval. Weak detection &lt;70%.
          </p>
          {canAccessAll ? (
            <Badge className="mt-3 bg-mineral text-white">Full Access • {quizzes.length} quizzes</Badge>
          ) : (
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="text-[11px]">Free Tier: 5 quizzes</Badge>
              <Badge variant="secondary" className="text-[11px]">Locked: {quizzes.length - FREE_QUIZ_IDS.length}</Badge>
              <Link href="/onboarding/access" className="text-[11px] text-teal hover:underline">Request full access →</Link>
            </div>
          )}
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-4">
          {quizzes.map(q => {
            const isFree = isFreeQuiz(q.id)
            const locked = !isFree && !canAccessAll
            return (
              <Card key={q.id} className={`card-hover border-border/60 shadow-xs ${locked ? "opacity-90 border-oxide/20" : ""}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary" className="text-[11px]">{q.chapter}</Badge>
                    <Badge variant="outline" className="text-[11px] capitalize">{q.difficulty}</Badge>
                    {isFree ? <Badge className="text-[10px] bg-mineral text-white flex items-center gap-1"><Sparkles className="h-3 w-3" /> Free</Badge> : <Badge variant="outline" className="text-[10px] flex items-center gap-1"><Lock className="h-3 w-3" /> Requires Approval</Badge>}
                    {q.accuracy !== null && q.accuracy < 70 && <Badge variant="oxide" className="text-[11px] flex items-center gap-1"><AlertCircle className="h-3 w-3" /> Weak</Badge>}
                  </div>
                  <CardTitle className="text-[15px] mt-3 tracking-[-0.01em] leading-tight break-words flex items-center gap-2">
                    {locked && <Lock className="h-4 w-4 text-ink-faint" />}
                    {q.titleZh}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-[11px] font-mono text-ink-muted flex-wrap">
                    <span className="flex items-center gap-1 whitespace-nowrap"><FileQuestion className="h-3.5 w-3.5" />{q.questions} QUESTIONS</span>
                    {q.accuracy !== null ? (
                      <span className={`flex items-center gap-1 whitespace-nowrap ${q.accuracy < 70 ? "text-oxide" : "text-mineral"}`}>
                        {q.accuracy < 70 ? <TrendingDown className="h-3.5 w-3.5" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
                        ACC {q.accuracy}% {q.accuracy < 70 ? "· Weak" : ""}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 whitespace-nowrap"><Clock className="h-3.5 w-3.5" /> Not attempted</span>
                    )}
                  </div>
                  <div className="mt-4 flex gap-2">
                    {locked ? (
                      <>
                        <Link href={`/quizzes/${q.id}`}><Button size="sm" variant="outline" className="rounded-[10px] h-8 px-3.5 text-[12px]"><Lock className="h-3 w-3" /> Locked</Button></Link>
                        <Link href="/onboarding/access"><Button size="sm" className="rounded-[10px] h-8 px-3.5 text-[12px] bg-teal">Request Access</Button></Link>
                      </>
                    ) : (
                      <>
                        <Link href={`/quizzes/${q.id}`}><Button size="sm" className="rounded-[10px] h-8 px-3.5 text-[12px]">Start Quiz</Button></Link>
                        <Button size="sm" variant="outline" className="rounded-[10px] h-8 px-3.5 text-[12px]">Review</Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Card className="mt-8 border-border/60 shadow-xs">
          <CardContent className="p-6">
            <div className="technical-label mb-4">Quiz Engine · 架构 + Access Control</div>
            <div className="grid md:grid-cols-3 gap-6 text-[13px] text-ink-muted leading-[1.6]">
              <div className="min-w-0">
                <div className="font-[600] text-ink mb-1.5 tracking-[-0.01em]">Free Tier</div>
                <div className="break-words">5 polished quizzes free for all. Server-enforced, questions not served to non-approved for locked quizzes.</div>
              </div>
              <div className="min-w-0">
                <div className="font-[600] text-ink mb-1.5 tracking-[-0.01em]">Gating</div>
                <div className="break-words">Locked quizzes return 403 + gated overlay with CTA. No client bypass. Free quizzes always 200.</div>
              </div>
              <div className="min-w-0">
                <div className="font-[600] text-ink mb-1.5 tracking-[-0.01em]">Progress</div>
                <div className="break-words">Attempts stored locally + synced. Full access unlocks all. Notifications via bell icon.</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
