"use client"
import * as React from "react"

type LogoProps = {
  size?: number | "sm" | "md" | "lg" | "xl" | "2xl"
  className?: string
  showWordmark?: boolean
  variant?: "default" | "mono" | "inverse"
}

const sizeMap = {
  sm: 20,
  md: 28,
  lg: 36,
  xl: 48,
  "2xl": 64,
} as const

export function Logo({ size = "md", className, showWordmark = false, variant = "default" }: LogoProps) {
  const px = typeof size === "number" ? size : sizeMap[size]

  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`} style={{ lineHeight: 0 }}>
      <span
        className="relative inline-flex items-center justify-center rounded-[10px] overflow-hidden shrink-0"
        style={{ width: px, height: px }}
        aria-hidden
      >
        <img
          src="/logo.svg"
          alt="ScienceMaterial"
          width={px}
          height={px}
          className="h-full w-full object-contain"
          draggable={false}
        />
      </span>
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-semibold tracking-[-0.02em] text-[15px]">ScienceMaterial</span>
        </span>
      )}
    </span>
  )
}

export function LogoMark({ size = 28, className }: { size?: number; className?: string }) {
  return <Logo size={size} className={className} />
}
