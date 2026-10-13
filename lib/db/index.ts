import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js"
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"
import postgres from "postgres"
import * as schema from "./schema"

const databaseUrl = process.env.DATABASE_URL
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

// Lazy connection — supports both Supabase (postgres-js) and Neon (neon-http)
// Priority: Supabase if DATABASE_URL contains supabase.co or postgres-js available, else Neon

function createDb() {
  if (!databaseUrl) {
    console.warn("DATABASE_URL not set — using mock DB for local dev (Supabase local or file-based fallback)")
    return null as any
  }

  // Supabase uses standard postgres connection string — use postgres-js driver
  // Neon uses neon-http driver
  const isSupabase = databaseUrl.includes("supabase.co") || databaseUrl.includes("supabase") || !!supabaseUrl

  if (isSupabase) {
    try {
      const client = postgres(databaseUrl, { prepare: false })
      return drizzlePostgres(client, { schema })
    } catch (e) {
      console.warn("Failed to create postgres-js client, falling back to neon-http", e)
    }
  }

  // Fallback to Neon HTTP driver (still supported for backward compat)
  try {
    const sql = neon(databaseUrl)
    return drizzleNeon(sql, { schema })
  } catch (e) {
    console.warn("Failed to create neon client", e)
    return null as any
  }
}

export const db = createDb()
export { schema }

// Supabase client helper for direct queries (when needed)
export { createClient as createSupabaseBrowserClient } from "@/lib/supabase/client"
export { createClient as createSupabaseServerClient } from "@/lib/supabase/server"
