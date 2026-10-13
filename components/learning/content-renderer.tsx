"use client"
import { ContentBlock } from "@/lib/curriculum/types"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { FlaskConical, HelpCircle, AlertTriangle, Lightbulb, Info, FileText, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ExperimentFrame } from "@/components/laboratory/experiment-frame"
import { experiments } from "@/lib/experiments/data"
import { Logo } from "@/components/ui/logo"

export function ContentBlockRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => (
        <div key={i} className="min-w-0">
          {block.type === "paragraph" && (
            <p className="chinese-content text-[15px] leading-[1.85] break-words text-pretty" dangerouslySetInnerHTML={{ __html: block.content || "" }} />
          )}
          {block.type === "heading" && (
            <h3 className="text-[16px] font-semibold mt-8 mb-3 tracking-[-0.01em] break-words">{block.content}</h3>
          )}
          {block.type === "list" && (
            <ul className="list-disc pl-5 space-y-1.5 chinese-content text-[14.5px]">
              {block.items?.map((it, idx) => (
                <li key={idx} className="break-words leading-[1.7]">{it}</li>
              ))}
            </ul>
          )}
          {block.type === "definition" && (
            <Card className="border-teal/15 bg-teal-soft/40 shadow-xs">
              <CardContent className="p-4">
                <div className="flex gap-3 min-w-0">
                  <Badge variant="default" className="h-fit shrink-0 text-[11px]">定义</Badge>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-[14px] tracking-[-0.01em] break-words">{block.term}</div>
                    <div className="text-[13.5px] text-ink-muted mt-1.5 leading-[1.65] break-words" dangerouslySetInnerHTML={{ __html: block.definition || "" }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          {block.type === "callout" && (
            <div className={`rounded-[12px] border p-4 text-[13.5px] leading-[1.65] flex gap-3 ${block.variant === "warning" ? "bg-oxide-soft border-oxide/20 text-ink" : block.variant === "tip" ? "bg-mineral-soft border-mineral/20 text-ink" : "bg-blueprint-soft border-blueprint/20 text-ink"}`}>
              <div className="shrink-0 mt-0.5">
                {block.variant === "warning" ? <AlertTriangle className="h-4 w-4 text-oxide" /> : block.variant === "tip" ? <Lightbulb className="h-4 w-4 text-mineral" /> : <Info className="h-4 w-4 text-blueprint" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-mono text-[11px] uppercase tracking-wider opacity-70 mb-1">{block.variant}</div>
                <div className="break-words" dangerouslySetInnerHTML={{ __html: block.content || "" }} />
              </div>
            </div>
          )}
          {block.type === "table" && (
            <div className="overflow-x-auto rounded-[12px] border border-border/60 shadow-xs">
              <table className="w-full text-sm min-w-[480px]">
                <thead className="bg-surface-muted">
                  <tr>
                    {block.headers?.map((h, idx) => (
                      <th key={idx} className="text-left p-3 font-mono text-[11px] uppercase tracking-wider text-ink-muted border-b border-border/60 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows?.map((row, rIdx) => (
                    <tr key={rIdx} className="border-b border-border/50 last:border-0 hover:bg-surface-muted/40">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="p-3 text-[13px] tracking-[-0.01em] break-words">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {block.type === "formula" && (
            <div className="rounded-[12px] bg-surface-muted border border-border/60 p-4 font-mono text-[14px] text-center tracking-[-0.01em] shadow-xs break-words">
              {block.content}
            </div>
          )}
          {block.type === "code" && (
            <pre className="rounded-[12px] bg-ink text-surface p-4 text-[13px] overflow-x-auto font-mono leading-[1.6] shadow-xs break-words whitespace-pre-wrap">{block.content}</pre>
          )}
          {block.type === "experiment" && (() => {
            const exp = experiments.find(e=>e.slug===block.experimentId || e.id===block.experimentId)
            if(!exp){
              return (
                <Card className="overflow-hidden border-border/60 shadow-xs">
                  <CardContent className="p-4 text-[13px] text-ink-muted flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" /> Experiment {block.experimentId} not found
                  </CardContent>
                </Card>
              )
            }
            return (
              <Card className="overflow-hidden border-teal/20 shadow-xs">
                <div className="bg-teal-soft/60 px-4 py-3 flex items-center justify-between gap-2 border-b border-teal/15">
                  <div className="flex items-center gap-2 text-[13px] font-[600] tracking-[-0.01em] min-w-0">
                    <Logo size={20} />
                    <span className="truncate">{exp.titleZh} · {exp.title}</span>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    <Link href={`/laboratory/${exp.slug}`}><Button variant="outline" size="sm" className="h-7 rounded-[8px] text-[11px]"><Eye className="h-3 w-3 mr-1" /> Open</Button></Link>
                    <Link href="/EXPERIMENTS.md" target="_blank" className="text-[11px] font-mono uppercase tracking-wider text-teal hover:underline whitespace-nowrap flex items-center gap-1"><FileText className="h-3 w-3" /> Guide</Link>
                  </div>
                </div>
                <CardContent className="p-0">
                  <ExperimentFrame slug={exp.slug} title={exp.title} />
                  <div className="px-4 py-2.5 bg-surface-muted/50 border-t border-border/50 flex flex-wrap gap-1.5 items-center">
                    <Badge variant="outline" className="text-[10px] font-mono">{exp.subject}</Badge>
                    <Badge variant="outline" className="text-[10px] font-mono">{exp.chapterId}</Badge>
                    <span className="text-[11px] text-ink-muted ml-auto truncate">{exp.description}</span>
                  </div>
                </CardContent>
              </Card>
            )
          })()}
          {block.type === "quiz" && (
            <Card className="border-brass/20 shadow-xs">
              <CardContent className="p-4 flex items-center gap-3 min-w-0">
                <div className="h-9 w-9 rounded-[10px] bg-brass-soft border border-brass/15 flex items-center justify-center shrink-0"><HelpCircle className="h-5 w-5 text-brass" /></div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-[600] tracking-[-0.01em]">Checkpoint Quiz</div>
                  <div className="text-[12px] text-ink-muted truncate">检验本节理解程度 · 错题解析</div>
                </div>
                <Link href={`/quizzes/${block.quizId || "sample"}`} className="text-[12px] px-3.5 py-2 rounded-[10px] bg-brass text-white font-[500] hover:bg-brass/90 transition-colors whitespace-nowrap shrink-0">开始答题</Link>
              </CardContent>
            </Card>
          )}
        </div>
      ))}
    </div>
  )
}
