"use client"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Experiment } from "@/lib/experiments/data"
import { IconPhysics, IconChemistry, IconBiology, IconEarth, IconSpace, IconExperiment } from "@/components/ui/custom-icons"

const subjectConfig: Record<string, { Icon: any; variant: any; label: string }> = {
  physics: { Icon: IconPhysics, variant: "brass", label: "Physics" },
  chemistry: { Icon: IconChemistry, variant: "oxide", label: "Chemistry" },
  biology: { Icon: IconBiology, variant: "mineral", label: "Biology" },
  earth: { Icon: IconEarth, variant: "blueprint", label: "Earth" },
  space: { Icon: IconSpace, variant: "blueprint", label: "Space" },
  environment: { Icon: IconBiology, variant: "mineral", label: "Environment" },
  engineering: { Icon: IconExperiment, variant: "secondary", label: "Engineering" },
}

export function ExperimentCard({ exp }: { exp: Experiment }) {
  const cfg = subjectConfig[exp.subject] || subjectConfig.physics
  return (
    <Link href={`/laboratory/${exp.slug}`} className="group min-w-0">
      <Card className="h-full overflow-hidden card-hover border-border/60">
        <div className="h-[132px] bg-surface-muted relative overflow-hidden border-b border-border/50">
          <div className="absolute inset-0 opacity-50 group-hover:opacity-70 transition-opacity" style={{
            background: `radial-gradient(480px circle at 10% 0%, var(--teal-soft), transparent 60%), radial-gradient(360px circle at 90% 100%, var(--surface-muted), transparent)`
          }} />
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
            <div className="flex gap-1.5 flex-wrap min-w-0">
              <Badge variant={cfg.variant as any} className="flex items-center gap-1 text-[10px] shrink-0"><cfg.Icon size={12} />{cfg.label}</Badge>
              <Badge variant="secondary" className="text-[10px] shrink-0">{exp.type}</Badge>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-ink-muted border border-border rounded-[6px] px-1.5 py-0.5 bg-surface/80 backdrop-blur shrink-0 whitespace-nowrap">{exp.difficulty}</span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-14 w-14 rounded-[14px] bg-surface border border-border flex items-center justify-center shadow-xs group-hover:scale-105 group-hover:shadow-sm transition-all">
              <cfg.Icon size={24} className="text-ink-muted group-hover:text-teal transition-colors" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-border/60">
            <div className="h-full bg-teal w-0 group-hover:w-full transition-all duration-700 ease-out" />
          </div>
        </div>
        <CardContent className="p-4">
          <div className="min-w-0">
            <h3 className="font-semibold text-[13.5px] leading-tight tracking-[-0.01em] line-clamp-2 break-words group-hover:text-teal transition-colors">{exp.title}</h3>
            <div className="text-[12.5px] text-ink-muted mt-1.5 leading-snug line-clamp-2 break-words">{exp.description}</div>
          </div>
          <div className="mt-3 flex items-center gap-2 min-w-0">
            <div className="text-[11px] text-ink-muted truncate flex-1">{exp.titleZh}</div>
            <div className="text-[11px] text-teal font-[550] group-hover:underline whitespace-nowrap shrink-0">Launch →</div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
