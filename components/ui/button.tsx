import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[12px] text-[14px] font-medium tracking-[-0.011em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 font-sans btn-press select-none",
  {
    variants: {
      variant: {
        default: "bg-teal text-white hover:bg-teal-pressed shadow-[0_1px_2px_rgba(0,0,0,0.06),0_4px_12px_rgba(15,107,103,0.18)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.08),0_8px_24px_rgba(15,107,103,0.22)] active:shadow-[0_1px_2px_rgba(0,0,0,0.04)]",
        secondary: "bg-surface-muted text-ink hover:bg-surface-hover border border-border shadow-[0_1px_2px_rgba(0,0,0,0.04)]",
        outline: "border border-border bg-surface text-ink hover:bg-surface-muted shadow-xs",
        ghost: "hover:bg-surface-muted text-ink-muted hover:text-ink",
        glass: "glass text-ink hover:bg-surface/90",
        link: "text-teal underline-offset-4 hover:underline shadow-none",
      },
      size: {
        default: "h-[36px] px-[16px]",
        sm: "h-[30px] px-[12px] text-[13px] rounded-[10px]",
        lg: "h-[44px] px-[24px] text-[15px] rounded-[14px]",
        icon: "h-[36px] w-[36px] rounded-[12px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
