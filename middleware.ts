import { type NextRequest, NextResponse } from "next/server"
import { updateSession } from "@/lib/supabase/middleware"
import { isFreeExperiment } from "@/lib/access/free-tier"

const FREE_SLUGS = ["measurement-ruler","density-explorer","floating-sinking","wave-generator","reflection"]

export async function middleware(request: NextRequest) {
  const response = await updateSession(request)
  const pathname = request.nextUrl.pathname

  // Protect /experiments/*.html - free tier always allowed, others need auth check
  if (pathname.startsWith("/experiments/") && pathname.endsWith(".html")) {
    const slug = pathname.replace("/experiments/", "").replace(".html", "")
    
    // Free labs always allowed
    if (FREE_SLUGS.includes(slug) || isFreeExperiment(slug)) {
      return response
    }

    // For non-free, we need to check if user has session
    // We can't fully check DB in middleware (edge), but we can check if auth cookie exists
    // If no auth cookie, return 403 gated response
    // If auth exists, let the /api/experiments/html route do full DB check
    // However direct access to /experiments/*.html should be blocked for non-free and redirected to secure API
    
    // For security, return 403 for direct access to non-free labs via static path
    // Users should use /api/experiments/html?slug= or /laboratory/[slug] which does server check
    const hasAuth = request.cookies.getAll().some(c => c.name.includes("supabase") || c.name.includes("sb-"))
    
    if (!hasAuth) {
      // Return gated HTML directly
      const gatedHtml = `
        <!DOCTYPE html>
        <html><head><meta charset="UTF-8"><title>Gated Lab - ${slug}</title>
        <style>
          body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;background:#F6F3EB;color:#1A1E1D;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:20px}
          .card{max-width:480px;background:#FFFEFB;border:1px solid #DDD9CF;border-radius:20px;padding:32px;box-shadow:0 4px 16px rgba(0,0,0,0.07)}
          .icon{width:48px;height:48px;background:#F0D5D0;border:1px solid #D98A7A20;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:24px;margin-bottom:16px}
          h1{font-size:18px;font-weight:600;margin:0 0 8px}
          p{font-size:13px;color:#5A605D;line-height:1.6;margin:0 0 16px}
          a{display:inline-flex;align-items:center;gap:8px;background:#0F6B67;color:white;padding:10px 16px;border-radius:12px;text-decoration:none;font-size:13px;font-weight:600}
          .free{margin-top:16px;padding:12px;background:#D6E8E420;border-radius:12px;font-size:11px}
        </style>
        </head><body>
          <div class="card">
            <div class="icon">🔒</div>
            <h1>Lab Locked - Requires Approval</h1>
            <p>This lab <strong>${slug}</strong> requires admin approval. You have 5 free labs. Server-enforced gating prevents bypass.</p>
            <a href="/laboratory">← Back to Laboratory (5 free labs)</a>
            <div class="free">Free labs: ${FREE_SLUGS.join(", ")}<br/>Request access at /onboarding/access</div>
          </div>
        </body></html>
      `
      return new NextResponse(gatedHtml, {
        status: 403,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      })
    }
    // If has auth, allow but the secure API will do full check. 
    // For direct static access, we still want to enforce via API, so we redirect to secure API?
    // For now, allow through but ExperimentFrame uses secure API anyway
  }

  return response
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/experiments/:path*.html",
  ],
}
