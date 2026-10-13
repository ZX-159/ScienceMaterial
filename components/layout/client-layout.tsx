"use client"
import { usePathname } from "next/navigation"
import { MarketingNavbar } from "./marketing-navbar"
import { AppSidebar } from "./app-sidebar"
import { AdminNavbar } from "./admin-navbar"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/"
  const isAuth = pathname.startsWith("/auth")
  const isAdmin = pathname.startsWith("/admin")
  const isApp = !isAuth && !isAdmin && (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/courses") ||
    pathname.startsWith("/laboratory") ||
    pathname.startsWith("/quizzes") ||
    pathname.startsWith("/progress") ||
    pathname.startsWith("/bookmarks") ||
    pathname.startsWith("/search") ||
    pathname.startsWith("/revision") ||
    pathname.startsWith("/settings")
  )

  if (isAuth) {
    return (
      <div className="min-h-app flex flex-col bg-background">
        <main className="flex-1 flex items-center justify-center p-6 lg:p-8">
          {children}
        </main>
      </div>
    )
  }

  if (isAdmin) {
    return (
      <div className="min-h-app bg-background">
        <AdminNavbar />
        <main className="mx-auto max-w-[1280px] px-6 lg:px-8 py-8">{children}</main>
      </div>
    )
  }

  if (isApp) {
    return (
      <div className="min-h-app bg-background">
        <AppSidebar />
        <div className="lg:pl-[260px] transition-[padding] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]">
          <main className="min-h-app pb-[88px] lg:pb-0">
            <div className="mx-auto max-w-[1280px] px-6 lg:px-8 py-8">{children}</div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-app bg-background">
      <MarketingNavbar />
      <main>{children}</main>
    </div>
  )
}
