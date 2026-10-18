import fs from "fs"
import path from "path"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText, Download } from "lucide-react"
import { Logo } from "@/components/ui/logo"

export default function SetupPage() {
  let content = ""
  try {
    const setupPath = path.join(process.cwd(), "SETUP.md")
    if (fs.existsSync(setupPath)) {
      content = fs.readFileSync(setupPath, "utf-8")
    }
  } catch {}

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[900px] px-6 lg:px-8 py-8 pb-24">
        <Link href="/" className="inline-flex items-center gap-1.5 text-[13px] text-ink-muted hover:text-ink mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <Logo size={32} />
          <div>
            <h1 className="text-[24px] font-semibold tracking-[-0.02em]">SETUP.md — Production Deployment Manual</h1>
            <div className="text-[12px] font-mono text-ink-muted">ScienceMaterial · 82 Labs + Gated Access · From local workspace → GitHub → Supabase → Vercel</div>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <a href="/setup.md" download><Button size="sm" variant="outline" className="rounded-[10px] gap-2"><Download className="h-4 w-4" /> Download setup.md</Button></a>
          <Link href="/admin"><Button size="sm" variant="outline" className="rounded-[10px]">Admin</Button></Link>
        </div>

        <Card className="border-border/60 shadow-xs">
          <CardContent className="p-6 lg:p-8">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <pre className="whitespace-pre-wrap break-words text-[12px] leading-[1.6] font-mono bg-surface-muted p-4 rounded-[12px] border border-border overflow-auto max-h-[80vh]">
                {content || "SETUP.md not found"}
              </pre>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-[11px] font-mono text-ink-muted">
          <div>Also available at: <a href="/setup.md" className="text-teal hover:underline">/setup.md</a> (raw markdown)</div>
          <div>Full checklist: <a href="/PRODUCTION_CHECKLIST.md" className="text-teal hover:underline">/PRODUCTION_CHECKLIST.md</a></div>
        </div>
      </div>
    </div>
  )
}
