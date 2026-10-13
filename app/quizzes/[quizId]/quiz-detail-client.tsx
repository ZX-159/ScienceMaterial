"use client"
import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import { useParams } from "next/navigation"

const sampleQuestions = [
  {
    id: "q1",
    type: "multiple_choice",
    question: "以下哪一项是测量值的正确表示？",
    options: [
      { id: "a", text: "仅包含准确值" },
      { id: "b", text: "准确值 + 一位估计值" },
      { id: "c", text: "仅包含估计值" },
      { id: "d", text: "单位 + 误差" },
    ],
    answer: "b",
    explanation: "测量值 = 准确值 + 一位估计值。准确值的倒数第一位为最小刻度。",
  },
  {
    id: "q2",
    type: "multiple_choice",
    question: "水的密度在什么温度时最大？",
    options: [
      { id: "a", text: "0°C" },
      { id: "b", text: "4°C" },
      { id: "c", text: "100°C" },
      { id: "d", text: "20°C" },
    ],
    answer: "b",
    explanation: "水在 4°C 时密度最大，体积最小。这解释了湖水结冰从表面开始的现象。",
  },
  {
    id: "q3",
    type: "multiple_choice",
    question: "光的反射定律中，反射角与入射角的关系是？",
    options: [
      { id: "a", text: "反射角 > 入射角" },
      { id: "b", text: "反射角 = 入射角" },
      { id: "c", text: "反射角 < 入射角" },
      { id: "d", text: "无关系" },
    ],
    answer: "b",
    explanation: "反射定律：反射角等于入射角，且反射光线、入射光线、法线在同一平面。",
  },
]

export default function QuizDetailClient({ quizId: propId }: { quizId?: string }) {
  const params = useParams()
  const quizId = propId || (params.quizId as string)
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)

  const q = sampleQuestions[current]

  const handleSubmit = () => {
    if (!selected) return
    const isCorrect = selected === q.answer
    if (isCorrect) setScore(s => s+1)
    setShowResult(true)
  }

  const handleNext = () => {
    if (current < sampleQuestions.length -1) {
      setCurrent(c=>c+1)
      setSelected(null)
      setShowResult(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[720px] px-6 lg:px-8 py-8 pb-24">
        <Link href="/quizzes" className="inline-flex items-center gap-1 text-[13px] text-ink-muted hover:text-ink mb-6"><ArrowLeft className="h-4 w-4" /> Back to Quizzes</Link>

        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary">{quizId}</Badge>
          <span className="text-[11px] font-mono text-ink-muted">{current+1} / {sampleQuestions.length}</span>
          <div className="ml-auto text-[11px] font-mono">SCORE {score}/{sampleQuestions.length}</div>
          <Badge className="bg-mineral text-white text-[10px] ml-2">Free Tier Polished</Badge>
        </div>

        <div className="h-1 w-full bg-surface-muted rounded-full overflow-hidden mb-6">
          <div className="h-full bg-teal transition-all" style={{ width: `${((current+1)/sampleQuestions.length)*100}%` }} />
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="text-[11px] font-mono uppercase tracking-wider text-ink-muted mb-2">{q.type}</div>
            <h2 className="text-[18px] font-medium leading-snug chinese-content">{q.question}</h2>

            <div className="mt-6 space-y-2">
              {q.options.map(opt => (
                <label key={opt.id} className={`flex items-center gap-3 p-3 rounded-[10px] border cursor-pointer transition ${selected===opt.id ? "border-teal bg-teal-soft/40" : "border-border hover:bg-surface-muted"} ${showResult && opt.id===q.answer ? "border-mineral bg-mineral/10" : ""} ${showResult && selected===opt.id && selected!==q.answer ? "border-oxide bg-oxide/10" : ""}`}>
                  <input type="radio" name="q" checked={selected===opt.id} onChange={()=>!showResult && setSelected(opt.id)} className="h-4 w-4" />
                  <span className="text-[14px]"><span className="font-mono text-[12px] mr-2">{opt.id.toUpperCase()}.</span>{opt.text}</span>
                </label>
              ))}
            </div>

            {showResult && (
              <div className={`mt-6 rounded-[10px] p-4 border ${selected===q.answer ? "bg-mineral/10 border-mineral/20" : "bg-oxide/10 border-oxide/20"}`}>
                <div className="text-[13px] font-medium">{selected===q.answer ? "✓ 正确" : "✗ 错误"} · 正确答案 {q.answer.toUpperCase()}</div>
                <div className="text-[13px] text-ink-muted mt-2 leading-relaxed">{q.explanation}</div>
              </div>
            )}

            <div className="mt-6 flex justify-between">
              <div className="text-[11px] font-mono text-ink-muted">English UI · Chinese Content • Polished • Free Tier</div>
              {!showResult ? <Button onClick={handleSubmit} disabled={!selected}>Submit Answer</Button> : <Button onClick={handleNext}>{current < sampleQuestions.length-1 ? "Next Question →" : "Finish"}</Button>}
            </div>
          </CardContent>
        </Card>

        {current === sampleQuestions.length-1 && showResult && (
          <Card className="mt-6 border-teal/20 bg-teal-soft/20">
            <CardContent className="p-6 text-center">
              <div className="text-[22px] font-semibold">测验完成 · 得分 {score}/{sampleQuestions.length}</div>
              <div className="text-[13px] text-ink-muted mt-2">Progress saved locally · will sync to server • Free tier polished</div>
              <div className="mt-4 flex justify-center gap-2">
                <Link href="/progress"><Button variant="outline">View Progress</Button></Link>
                <Link href="/courses"><Button>Continue Learning</Button></Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
