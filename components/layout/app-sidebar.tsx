"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Search, LayoutDashboard, Library, FlaskConical, Bookmark, BarChart3, PanelLeftClose, PanelLeftOpen, Settings, HelpCircle } from "lucide-react"
import { Logo } from "@/components/ui/logo"
import { NotificationBell } from "@/components/ui/notification-bell"

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, desc: "Overview" },
  { href: "/courses", label: "Courses", icon: Library, desc: "6 books · 64 ch" },
  { href: "/laboratory", label: "Laboratory", icon: FlaskConical, desc: "82 labs" },
  { href: "/quizzes", label: "Quizzes", icon: Bookmark, desc: "Practise" },
  { href: "/progress", label: "Progress", icon: BarChart3, desc: "Map" },
  { href: "/bookmarks", label: "Bookmarks", icon: Bookmark, desc: "Saved" },
  { href: "/search", label: "Search", icon: Search, desc: "⌘K" },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      <aside className={`hidden lg:flex fixed left-0 top-0 bottom-0 border-r border-border/60 bg-surface/90 backdrop-blur-2xl flex-col z-30 transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${collapsed ? "w-[64px]" : "w-[260px]"} h-app`}>
        <div className="h-[60px] px-3 flex items-center border-b border-border/50 gap-3 shrink-0">
          <Logo size={28} />
          {!collapsed && <span className="font-semibold text-[14px] tracking-[-0.01em] truncate">ScienceMaterial</span>}
          <Button variant="ghost" size="icon" className="ml-auto h-7 w-7 rounded-[8px] shrink-0" onClick={() => setCollapsed(!collapsed)} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
            {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </Button>
        </div>

        <nav className="flex-1 p-3 space-y-6 overflow-y-auto overflow-x-hidden">
          <div>
            {!collapsed && <div className="technical-label px-2.5 py-2 text-[11px]">Navigation</div>}
            <div className="space-y-1">
              {items.map(item => {
                const active = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-[14px] transition-all ${active ? "bg-teal-soft text-teal font-[600] shadow-xs border border-teal/15" : "text-ink-muted hover:text-ink hover:bg-surface-muted border border-transparent"} ${collapsed ? "justify-center" : ""}`}
                    title={collapsed ? item.label : undefined}
                  >
                    <item.icon className={`h-[18px] w-[18px] shrink-0 ${active ? "text-teal" : "text-ink-muted group-hover:text-ink"}`} />
                    {!collapsed && (
                      <>
                        <span className="flex-1 tracking-[-0.01em] truncate">{item.label}</span>
                        <span className="text-[11px] font-mono text-ink-muted hidden xl:block whitespace-nowrap">{item.desc}</span>
                      </>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>

          {!collapsed && (
            <div className="px-2">
              <div className="rounded-[14px] bg-surface-muted/80 border border-border p-3 shadow-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="h-9 w-9 rounded-[10px] bg-teal-soft border border-teal/15 flex items-center justify-center shrink-0">
                    <Library className="h-4 w-4 text-teal" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-[600] tracking-[-0.01em] truncate">Continue</div>
                    <div className="text-[11px] text-ink-muted truncate">初二上册 · 电路</div>
                  </div>
                </div>
                <div className="mt-3 h-1.5 bg-border rounded-full overflow-hidden">
                  <div className="h-full bg-teal w-[68%] rounded-full" />
                </div>
                <div className="mt-2 flex flex-col gap-1">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-ink-muted">Progress</span>
                    <span className="text-teal font-[600]">68%</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </nav>

        <div className="p-3 border-t border-border/50 shrink-0 space-y-2">
          {!collapsed && (
            <div className="flex gap-1">
              <Link href="/settings" className="flex-1"><Button variant="ghost" size="sm" className="w-full h-8 rounded-[10px] justify-start gap-2 text-[12px]"><Settings className="h-4 w-4" /> Settings</Button></Link>
              <Link href="/privacy"><Button variant="ghost" size="icon" className="h-8 w-8 rounded-[10px]"><HelpCircle className="h-4 w-4" /></Button></Link>
            </div>
          )}
          <div className={`text-[11px] leading-[1.4] text-ink-faint px-2 py-1 break-words ${collapsed ? "text-center" : ""}`}>{collapsed ? "SM" : "ScienceMaterial"}</div>
        </div>
      </aside>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 border-t border-border/60 glass-strong flex pb-[env(safe-area-inset-bottom)]">
        {items.slice(0, 5).map(item => {
          const active = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href))
          return (
            <Link key={item.href} href={item.href} className={`flex-1 flex flex-col items-center py-2.5 gap-1 transition-colors ${active ? "text-teal" : "text-ink-muted"}`}>
              <item.icon className="h-[22px] w-[22px] shrink-0" strokeWidth={active ? 2.2 : 1.7} />
              <span className="text-[10px] font-[500] tracking-[-0.01em] whitespace-nowrap">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </>
  )
}

export function AppTopbar({ collapsed }: { collapsed?: boolean }) {
  const pathname = usePathname()
  return (
    <div className={`hidden lg:flex h-[60px] border-b border-border/50 bg-surface/80 backdrop-blur-xl items-center px-6 gap-4 sticky top-0 z-20 ${collapsed ? "lg:pl-[64px]" : "lg:pl-[260px]"} transition-all duration-300`}>
      <div className="flex items-center gap-2 text-[12px] font-mono text-ink-muted">
        <span className="text-ink font-[500]">{pathname?.split('/')[1] || 'dashboard'}</span>
        <span className="text-ink-faint">/</span>
        <span className="truncate max-w-[200px]">{pathname?.split('/').slice(2).join(' / ') || 'overview'}</span>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <NotificationBell />
        <div className="text-[11px] font-mono text-ink-muted hidden xl:block">ScienceMaterial · Local-first</div>
      </div>
    </div>
  )
}
