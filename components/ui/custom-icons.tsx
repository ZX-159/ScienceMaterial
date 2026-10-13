"use client"
import * as React from "react"

// Apple HIG premium custom SVG icons — no emoji, precise stroke, 1.5px default
// All icons use currentColor, 20x20 viewBox, rounded caps

export function IconPhysics({ className, size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <circle cx="10" cy="10" r="2.2" fill="currentColor" opacity="0.9" />
      <ellipse cx="10" cy="10" rx="7.5" ry="3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <ellipse cx="10" cy="10" rx="7.5" ry="3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" transform="rotate(60 10 10)" />
      <ellipse cx="10" cy="10" rx="7.5" ry="3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" transform="rotate(120 10 10)" />
    </svg>
  )
}

export function IconChemistry({ className, size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path d="M7 3H13M8.5 3V6.5C8.5 6.5 8.5 8.5 6.5 10.5C4.5 12.5 6 16.5 10 16.5C14 16.5 15.5 12.5 13.5 10.5C11.5 8.5 11.5 6.5 11.5 6.5V3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="12" r="1.2" fill="currentColor" opacity="0.6" />
      <circle cx="12.2" cy="13.5" r="0.8" fill="currentColor" opacity="0.4" />
    </svg>
  )
}

export function IconBiology({ className, size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path d="M10 16.5V8M10 8C10 8 7 7.5 6 5.5C5 3.5 7.5 2 10 4M10 8C10 8 13 7.5 14 5.5C15 3.5 12.5 2 10 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.2 13.2C8.2 13.2 6.5 13 5.5 11.5M11.8 12.5C11.8 12.5 13.5 12 14.5 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export function IconEarth({ className, size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M3.5 10H16.5M10 3.5C10 3.5 12 6 12 10C12 14 10 16.5 10 16.5M10 3.5C10 3.5 8 6 8 10C8 14 10 16.5 10 16.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M5 7C5 7 7 7.5 8.5 7M12.5 13C12.5 13 14 13.5 15 13" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    </svg>
  )
}

export function IconSpace({ className, size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <circle cx="10" cy="10" r="1" fill="currentColor" />
      <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="1.5 2" opacity="0.8" />
      <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="14.5" cy="6.5" r="0.8" fill="currentColor" opacity="0.7" />
      <circle cx="6" cy="14" r="0.6" fill="currentColor" opacity="0.5" />
    </svg>
  )
}

export function IconMeasurement({ className, size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <rect x="3" y="4" width="14" height="2.5" rx="0.8" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5 4V6.5M7 4V6.5M9 4V6M11 4V6.5M13 4V6.5M15 4V6M3 11H17M3 11V15.5C3 16.3 3.7 17 4.5 17H15.5C16.3 17 17 16.3 17 15.5V11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="10" cy="14" r="1" fill="currentColor" opacity="0.6" />
    </svg>
  )
}

export function IconExperiment({ className, size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path d="M6 4H14L12.5 9.5C12.5 9.5 13.5 12 11 14.5C8.5 12 9.5 9.5 9.5 9.5L8 4H6Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M8 4V3C8 2.4 8.4 2 9 2H11C11.6 2 12 2.4 12 3V4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="10" cy="11" r="1" fill="currentColor" opacity="0.5" />
    </svg>
  )
}

export function IconBookStack({ className, size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path d="M3 5C3 4.4 3.6 4 4.5 4H12.5C13.3 4 14 4.4 14 5V15C14 15.6 13.3 16 12.5 16H4.5C3.6 16 3 15.6 3 15V5Z" stroke="currentColor" strokeWidth="1.3" />
      <path d="M14 5C14 4.4 14.6 4 15.5 4C16.3 4 17 4.4 17 5V14C17 14.6 16.3 15 15.5 15H14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M6 7H11M6 10H11M6 13H9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export function IconQuiz({ className, size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <rect x="3" y="3" width="14" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M7 8.5C7 8.5 8 7 10 7C12 7 13 8.5 13 8.5C13 8.5 12 10 10 10.5V11.5M10 14H10.01" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Science Map node — custom precise dot
export function ScienceMapNode({ active, weak, size = 28 }: { active?: boolean; weak?: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden>
      <circle cx="14" cy="14" r={active ? "12" : "11"} fill={active ? "#0F6B67" : "#FFFEFB"} stroke={weak ? "#A04A3A" : active ? "#0F6B67" : "#DDD9CF"} strokeWidth={weak ? "2" : "1.2"} />
      {active && <circle cx="14" cy="14" r="3" fill="white" opacity="0.9" />}
    </svg>
  )
}
