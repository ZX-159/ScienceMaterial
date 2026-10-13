"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTheme } from "./theme-provider"
import { Moon, Sun, Shield, LayoutDashboard, ArrowLeft } from "lucide-react"

export function AdminNavbar() {
  const { theme, toggle } = useTheme()
  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-500/20 bg-amber-50/80 dark:bg-amber-950/30 backdrop-blur-2xl">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8 flex h-[52px] items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <Link href="/" className="flex items-center gap-2 shrink-0 text-[12px] font-mono text-ink-muted hover:text-ink"><ArrowLeft className="h-3.5 w-3.5" /> Exit admin</Link>
          <div className="h-4 w-px bg-amber-500/20 hidden md:block" />
          <div className="flex items-center gap-2">
            <div className="h-[26px] w-[26px] rounded-[8px] bg-amber-600 flex items-center justify-center text-white shadow-sm"><Shield className="h-4 w-4" /></div>
            <span className="font-semibold tracking-[-0.02em] text-[14px]">Admin</span>
            <span className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 border border-amber-500/20 px-2.5 py-0.5 text-[11px] font-[600] tracking-[-0.01em] text-amber-800 dark:text-amber-200">CMS · Role protected</span>
          </div>
          <nav className="hidden md:flex items-center gap-1 ml-4">
            <Link href="/admin" className="px-3 py-1.5 text-[13px] font-[500] rounded-[10px] bg-amber-500/15 text-amber-900 dark:text-amber-100">Overview</Link>
            <Link href="/admin/content" className="px-3 py-1.5 text-[13px] font-[500] rounded-[10px] text-ink-muted hover:bg-surface-muted hover:text-ink">Content</Link>
            <Link href="/admin/experiments" className="px-3 py-1.5 text-[13px] font-[500] rounded-[10px] text-ink-muted hover:bg-surface-muted hover:text-ink">Experiments</Link>
          </nav>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <Button variant="ghost" size="icon" onClick={toggle} className="h-[32px] w-[32px] rounded-[10px]"><span className="sr-only">Toggle</span>{theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}</Button>
          <Link href="/dashboard"><Button size="sm" variant="outline" className="rounded-[10px] h-[30px] text-[12px] gap-1.5"><LayoutDashboard className="h-3.5 w-3.5" /> App</Button></Link>
        </div>
      </div>
    </header>
  )
}
