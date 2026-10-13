import { NextResponse } from "next/server"
import { signupSchema } from "@/lib/auth/validation"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = signupSchema.parse(body)

    if (parsed.age < 13) {
      return NextResponse.json({ error: "Must be 13+ (COPPA/GDPR-K compliance)" }, { status: 400 })
    }

    const supabase = await createSupabaseServerClient()

    // Create user via Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email: parsed.email,
      password: parsed.password,
      options: {
        data: {
          age: parsed.age,
          display_name: parsed.displayName,
        }
      }
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Create profile with age — RLS should allow insert for authenticated user
    if (data.user) {
      const { error: profileError } = await supabase
        .from("profiles")
        .upsert({
          id: data.user.id,
          email: parsed.email,
          age: parsed.age,
          display_name: parsed.displayName || null,
          role: "user",
        }, { onConflict: "id" })

      if (profileError) {
        console.warn("Profile upsert failed:", profileError)
        // Don't fail signup — profile can be created via trigger or later
      }
    }

    return NextResponse.json({ 
      success: true, 
      email: parsed.email, 
      age: parsed.age,
      userId: data.user?.id,
      message: "Account created — age verified 13+ — check email for confirmation",
      supabase: true
    })
  } catch (e) {
    return NextResponse.json({ error: "Invalid signup data", details: e instanceof Error ? e.message : "unknown" }, { status: 400 })
  }
}
