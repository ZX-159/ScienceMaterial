import { createClient, createServiceClient } from "@/lib/supabase/server"
import { isSupabaseConfigured, readProfiles } from "@/lib/access/storage"
import { canAccessExperiment } from "@/lib/access/check"
import { isFreeExperiment } from "@/lib/access/free-tier"
import { GatedLabOverlay } from "@/components/access/gated-lab-overlay"
import ExperimentDetailClient from "./experiment-detail-client"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface Props {
  params: Promise<{ slug: string }>
}

export default async function ExperimentPage({ params }: Props) {
  const { slug } = await params

  // Free tier - no auth needed, directly show client
  if (isFreeExperiment(slug)) {
    return <ExperimentDetailClient slug={slug} initialAccess={{ canAccess: true, isFree: true, status: "free" }} />
  }

  // For non-free, check access server-side
  try {
    if (isSupabaseConfigured()) {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        // Not authenticated - show gated but with free info
        return (
          <div className="min-h-screen bg-background">
            <div className="mx-auto max-w-[1280px] px-6 lg:px-8 py-6">
              <Link href="/laboratory" className="inline-flex items-center gap-1.5 text-[13px] text-ink-muted hover:text-ink mb-6">
                <ArrowLeft className="h-4 w-4" /> Back to Laboratory
              </Link>
              <GatedLabOverlay slug={slug} status="none" />
            </div>
          </div>
        )
      }

      const service = createServiceClient()
      const { data: profile } = await service.from("profiles").select("*").eq("id", user.id).single()

      const canAccess = canAccessExperiment(profile ? {
        id: profile.id,
        role: profile.role,
        labAccessStatus: profile.lab_access_status,
      } : null, slug)

      if (!canAccess) {
        return (
          <div className="min-h-screen bg-background">
            <div className="mx-auto max-w-[1280px] px-6 lg:px-8 py-6">
              <Link href="/laboratory" className="inline-flex items-center gap-1.5 text-[13px] text-ink-muted hover:text-ink mb-6">
                <ArrowLeft className="h-4 w-4" /> Back to Laboratory
              </Link>
              <GatedLabOverlay slug={slug} status={profile?.lab_access_status || "none"} canRerequestAfter={profile?.lab_access_reviewed_at} />
            </div>
          </div>
        )
      }

      // Allowed
      return <ExperimentDetailClient slug={slug} initialAccess={{ canAccess: true, status: profile?.lab_access_status }} />

    } else {
      // Mock fallback - use mock profile
      const profiles = readProfiles()
      const mockProf = profiles.find(p => p.id === "test-user-1") || profiles[0]

      const canAccess = canAccessExperiment(mockProf ? {
        id: mockProf.id,
        role: mockProf.role,
        labAccessStatus: mockProf.labAccessStatus,
      } : null, slug)

      if (!canAccess) {
        return (
          <div className="min-h-screen bg-background">
            <div className="mx-auto max-w-[1280px] px-6 lg:px-8 py-6">
              <Link href="/laboratory" className="inline-flex items-center gap-1.5 text-[13px] text-ink-muted hover:text-ink mb-6">
                <ArrowLeft className="h-4 w-4" /> Back to Laboratory
              </Link>
              <GatedLabOverlay slug={slug} status={mockProf?.labAccessStatus || "none"} canRerequestAfter={mockProf?.labAccessReviewedAt} />
            </div>
          </div>
        )
      }

      return <ExperimentDetailClient slug={slug} initialAccess={{ canAccess: true, status: mockProf?.labAccessStatus }} />
    }
  } catch (e) {
    console.error("lab page error", e)
    // On error, allow free check only, else gated
    if (isFreeExperiment(slug)) {
      return <ExperimentDetailClient slug={slug} initialAccess={{ canAccess: true, isFree: true }} />
    }
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8 py-6">
          <Link href="/laboratory" className="inline-flex items-center gap-1.5 text-[13px] text-ink-muted hover:text-ink mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Laboratory
          </Link>
          <GatedLabOverlay slug={slug} status="none" />
        </div>
      </div>
    )
  }
}
