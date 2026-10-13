import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-[8px] border px-[8px] py-[3px] text-[11px] font-medium font-mono tracking-[0.04em] uppercase transition-colors select-none",
  {
    variants: {
      variant: {
        default: "border-transparent bg-teal text-white shadow-xs",
        secondary: "border-border bg-surface-muted text-ink-muted",
        outline: "text-ink-muted border-border bg-surface",
        mineral: "bg-mineral/12 text-mineral border-mineral/20",
        brass: "bg-brass/12 text-brass border-brass/20",
        oxide: "bg-oxide/12 text-oxide border-oxide/20",
        blueprint: "bg-blueprint/12 text-blueprint border-blueprint/20",
        glass: "glass text-ink-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
