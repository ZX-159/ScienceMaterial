"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import { UserPlus, Shield, Calendar } from "lucide-react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const [age, setAge] = useState("")
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const ageNum = parseInt(age, 10)
    if (!age || isNaN(ageNum)) {
      setError("Please enter your age.")
      return
    }
    if (ageNum < 13) {
      setError("You must be at least 13 years old to create an account.")
      return
    }
    if (ageNum > 120) {
      setError("Please enter a valid age.")
      return
    }
    setError("")
    setLoading(true)
    try {
      const supabase = createClient()
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { age: ageNum }
        }
      })
      if (signUpError) throw signUpError

      if (data.user) {
        const { error: profileError } = await supabase
          .from("profiles")
          .upsert({
            id: data.user.id,
            email,
            age: ageNum,
            role: "user"
          }, { onConflict: "id" })
        if (profileError) console.warn("Profile upsert warning:", profileError)
      }

      setSuccess(true)
      setTimeout(() => router.push("/onboarding/access"), 2000)
    } catch (err: any) {
      setError(err.message || "Signup failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <Card className="w-full max-w-[420px] border-border/60 shadow-sm rounded-[20px]">
        <CardHeader className="pb-4">
          <Logo size={36} />
          <CardTitle className="text-[18px] tracking-[-0.015em]">Create Account</CardTitle>
          <div className="text-[13px] text-ink-muted leading-[1.5] mt-1">Join ScienceMaterial</div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-ink-muted">Email</label>
              <Input placeholder="you@school.my" className="mt-1.5 h-10 rounded-[12px]" value={email} onChange={e=>setEmail(e.target.value)} required type="email" />
            </div>
            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-ink-muted">Password</label>
              <Input type="password" placeholder="••••••••" className="mt-1.5 h-10 rounded-[12px]" value={password} onChange={e=>setPassword(e.target.value)} required minLength={8} />
              <div className="text-[10px] text-ink-faint mt-1 font-mono">Min 8 characters</div>
            </div>
            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-ink-muted flex items-center gap-1.5"><Calendar className="h-3 w-3" /> Age</label>
              <Input placeholder="e.g. 15" className="mt-1.5 h-10 rounded-[12px]" value={age} onChange={e=>{ setAge(e.target.value); if(error) setError("") }} required type="number" min={13} max={120} inputMode="numeric" />
              <div className="text-[10px] text-ink-faint mt-1.5 leading-[1.4] flex gap-1.5">
                <Shield className="h-3 w-3 shrink-0 mt-0.5" />
                <span>Must be 13+. Age stored securely, not precise date of birth.</span>
              </div>
            </div>
            {error && <div className="rounded-[10px] bg-oxide-soft border border-oxide/20 p-2.5 text-[12px] text-oxide leading-[1.4]">{error}</div>}
            {success && <div className="rounded-[10px] bg-teal-soft border border-teal/15 p-2.5 text-[12px] text-teal leading-[1.4]">Account created! Check email for confirmation, then sign in.</div>}
            <Button type="submit" disabled={loading} className="w-full rounded-[12px] h-10 text-[14px] font-[600] gap-2"><UserPlus className="h-4 w-4" /> {loading ? "Creating..." : "Create Account"}</Button>
            <div className="text-[12px] text-center text-ink-muted">Already have account? <Link href="/auth/login" className="text-teal hover:underline font-[500]">Sign in</Link></div>
          </form>
          <div className="mt-6 text-[11px] font-mono text-ink-muted text-center">© 2026 ScienceMaterial</div>
        </CardContent>
      </Card>
    </div>
  )
}
