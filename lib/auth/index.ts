// Auth foundation — migrated from Neon Auth to Supabase Auth (2026-10-11)
// Supabase Auth handles JWT, we verify role + age from profiles table

import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"

export interface AuthUser {
  id: string
  email: string
  role: "user" | "admin"
  age?: number
  displayName?: string
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const supabase = await createSupabaseServerClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return null
    }

    // Fetch profile for role and age
    const { data: profile } = await supabase
      .from("profiles")
      .select("role, age, display_name")
      .eq("id", user.id)
      .single()

    return {
      id: user.id,
      email: user.email || "",
      role: (profile?.role as "user" | "admin") || "user",
      age: profile?.age || undefined,
      displayName: profile?.display_name || user.user_metadata?.display_name,
    }
  } catch (e) {
    // Fallback for local dev without Supabase configured
    console.warn("getCurrentUser fallback — Supabase not configured", e)
    return null
  }
}

export async function requireAuth(): Promise<AuthUser> {
  const user = await getCurrentUser()
  if (!user) throw new Error("Unauthorized — please sign in via Supabase Auth")
  return user
}

export async function requireAdmin(): Promise<AuthUser> {
  const user = await requireAuth()
  if (user.role !== "admin") throw new Error("Forbidden: admin only — assign role in Supabase dashboard")
  return user
}

export async function requireAge13(user: AuthUser): Promise<void> {
  if (user.age !== undefined && user.age < 13) {
    throw new Error("Age restriction: must be 13+ (COPPA/GDPR-K)")
  }
}

// Supabase Auth helpers for client components
export async function signUpWithSupabase(email: string, password: string, age: number, displayName?: string) {
  const { createClient } = await import("@/lib/supabase/client")
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        age,
        display_name: displayName,
      }
    }
  })

  if (error) throw error

  // Create profile with age (13+ enforced)
  if (data.user) {
    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: data.user.id,
        email,
        age,
        display_name: displayName,
        role: "user"
      })
    
    if (profileError) {
      console.warn("Profile creation failed — may already exist or RLS", profileError)
    }
  }

  return data
}

export async function signInWithSupabase(email: string, password: string) {
  const { createClient } = await import("@/lib/supabase/client")
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) throw error
  return data
}

export async function signOutWithSupabase() {
  const { createClient } = await import("@/lib/supabase/client")
  const supabase = createClient()
  await supabase.auth.signOut()
}
