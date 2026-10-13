"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import { Shield, LogIn } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <Card className="w-full max-w-[400px] border-border/60 shadow-sm rounded-[20px]">
        <CardHeader className="pb-4">
          <Logo size={36} />
          <CardTitle className="text-[18px] tracking-[-0.015em]">Sign In to ScienceMaterial</CardTitle>
          <div className="text-[13px] text-ink-muted leading-[1.5] mt-1">English UI · Chinese course content</div>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-ink-muted">Email</label>
              <Input value={email} onChange={e=>setEmail(e.target.value)} placeholder="student@example.com" className="mt-1.5 h-10 rounded-[12px]" required type="email" />
            </div>
            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-ink-muted">Password</label>
              <Input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="••••••••" className="mt-1.5 h-10 rounded-[12px]" required />
            </div>
            {error && <div className="rounded-[10px] bg-oxide-soft border border-oxide/20 p-2.5 text-[12px] text-ink">{error}</div>}
            <Button type="submit" disabled={loading} className="w-full rounded-[12px] h-10 text-[14px] font-[600] gap-2"><LogIn className="h-4 w-4" /> {loading ? "Signing in..." : "Sign In"}</Button>
          </form>
          <div className="text-[12px] text-center text-ink-muted leading-[1.4]">No account? <Link href="/auth/signup" className="text-teal hover:underline font-[500]">Sign up</Link> · Age 13+ required</div>
          <div className="rounded-[12px] bg-surface-muted border border-border/50 p-3 text-[11px] leading-[1.5] text-ink-muted flex gap-2">
            <Shield className="h-4 w-4 text-ink-muted shrink-0 mt-0.5" />
            <span className="break-words">Secure authentication. Admin role assigned via dashboard, never via signup.</span>
          </div>
          <div className="text-[11px] font-mono text-ink-muted text-center pt-2">© 2026 ScienceMaterial</div>
        </CardContent>
      </Card>
    </div>
  )
}
