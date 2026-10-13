"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTheme } from "./theme-provider"
import { Moon, Sun, Search, Command } from "lucide-react"
import { useState, useEffect } from "react"
import { Logo } from "@/components/ui/logo"
import { NotificationBell } from "@/components/ui/notification-bell"

export function MarketingNavbar() {
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-40 w-full border-b transition-all duration-200 motion-premium ${scrolled ? "glass-strong border-border/60 shadow-sm" : "bg-background/80 backdrop-blur-xl border-border/30"}`}>
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8 flex h-[60px] items-center justify-between gap-4">
        <div className="flex items-center gap-8 min-w-0">
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <Logo size={30} className="group-hover:scale-[1.02] transition-transform duration-200 motion-premium" />
            <span className="font-semibold tracking-[-0.02em] text-[15px]">ScienceMaterial</span>
            <span className="hidden xl:inline technical-label ml-2 pl-3 border-l border-border/60 whitespace-nowrap">6 Books · 64 Chapters · 82 Labs</span>
          </Link>
          <nav className="hidden md:flex items-center gap-0.5">
            <Link href="/courses" className="px-3 py-1.5 text-[14px] font-[500] tracking-[-0.01em] text-ink-muted hover:text-ink rounded-[10px] hover:bg-surface-muted transition-colors motion-premium whitespace-nowrap">Courses</Link>
            <Link href="/laboratory" className="px-3 py-1.5 text-[14px] font-[500] tracking-[-0.01em] text-ink-muted hover:text-ink rounded-[10px] hover:bg-surface-muted transition-colors motion-premium whitespace-nowrap">Laboratory</Link>
            <Link href="/progress" className="px-3 py-1.5 text-[14px] font-[500] tracking-[-0.01em] text-ink-muted hover:text-ink rounded-[10px] hover:bg-surface-muted transition-colors motion-premium whitespace-nowrap">Progress</Link>
          </nav>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <Link href="/search" className="hidden md:flex items-center gap-2 h-[32px] px-2.5 rounded-[10px] border border-border bg-surface-muted/70 text-[13px] text-ink-muted hover:text-ink hover:bg-surface-muted transition-colors motion-premium">
            <Search className="h-3.5 w-3.5" />
            <span className="tracking-[-0.01em]">Search</span>
            <span className="ml-1.5 flex items-center gap-0.5 rounded-[6px] bg-surface border border-border px-1.5 py-0.5 text-[10px] font-mono leading-none"><Command className="h-3 w-3" />K</span>
          </Link>
          <NotificationBell />
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme" className="h-[32px] w-[32px] rounded-[10px] motion-premium">
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
          <div className="h-4 w-px bg-border mx-1 hidden md:block" />
          <Link href="/auth/login" className="hidden md:inline-flex text-[14px] font-[500] px-3 py-1.5 text-ink-muted hover:text-ink tracking-[-0.01em] whitespace-nowrap motion-premium">Sign In</Link>
          <Link href="/courses">
            <Button size="sm" className="rounded-[12px] h-[32px] px-4 text-[13px] font-[600] tracking-[-0.01em] btn-press">Start Learning</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
