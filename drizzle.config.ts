import type { Config } from "drizzle-kit"

export default {
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/postgres",
  },
  // For Supabase: DATABASE_URL should be your Supabase postgres connection string
  // Format: postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true
  // Or direct: postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
  // For local Supabase: postgresql://postgres:postgres@127.0.0.1:54322/postgres
} satisfies Config
