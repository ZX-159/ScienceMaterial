import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { createClient, createServiceClient } from "@/lib/supabase/server"
import { isSupabaseConfigured, readProfiles } from "@/lib/access/storage"
import { canAccessExperiment } from "@/lib/access/check"
import { isFreeExperiment } from "@/lib/access/free-tier"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get("slug")

  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 })

  // Free tier always allowed - no auth needed
  if (isFreeExperiment(slug)) {
    try {
      const filePath = path.join(process.cwd(), "public/experiments", `${slug}.html`)
      if (!fs.existsSync(filePath)) return NextResponse.json({ error: "Not found" }, { status: 404 })
      const html = fs.readFileSync(filePath, "utf-8")
      return new NextResponse(html, {
        headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=60" },
      })
    } catch (e: any) {
      return NextResponse.json({ error: e.message }, { status: 500 })
    }
  }

  // For non-free, check access
  let profile: any = null
  let userId: string | null = null

  try {
    if (isSupabaseConfigured()) {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return NextResponse.json({ error: "Authentication required", gated: true, freeSlugs: ["measurement-ruler","density-explorer","floating-sinking","wave-generator","reflection"] }, { status: 401 })
      }
      userId = user.id
      const service = createServiceClient()
      const { data: prof } = await service.from("profiles").select("*").eq("id", userId).single()
      profile = prof ? {
        id: prof.id,
        role: prof.role,
        labAccessStatus: prof.lab_access_status,
      } : null
    } else {
      // Mock fallback - check mock profile
      const profiles = readProfiles()
      // For local dev, treat test user as whatever status it has
      const mockProf = profiles.find(p => p.id === "test-user-1") || profiles[0]
      profile = mockProf ? {
        id: mockProf.id,
        role: mockProf.role,
        labAccessStatus: mockProf.labAccessStatus,
      } : null
      userId = mockProf?.id || null
    }

    const canAccess = canAccessExperiment(profile ? {
      id: profile.id,
      role: profile.role,
      labAccessStatus: profile.labAccessStatus,
    } : null, slug)

    if (!canAccess) {
      return NextResponse.json({
        error: "Lab access requires approval",
        gated: true,
        slug,
        status: profile?.labAccessStatus || "none",
        message: "This interactive lab requires admin approval. You have 5 free labs. Request access to unlock all 82 labs.",
        freeSlugs: ["measurement-ruler","density-explorer","floating-sinking","wave-generator","reflection"],
      }, { status: 403 })
    }

    // Allowed - serve HTML
    const filePath = path.join(process.cwd(), "public/experiments", `${slug}.html`)
    if (!fs.existsSync(filePath)) return NextResponse.json({ error: "Not found" }, { status: 404 })
    const html = fs.readFileSync(filePath, "utf-8")
    return new NextResponse(html, {
      headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "private, max-age=60" },
    })

  } catch (e: any) {
    console.error("html serve error", e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
