import { FREE_EXPERIMENT_SLUGS, FREE_QUIZ_IDS, isFreeExperiment, isFreeQuiz } from "./free-tier"

export type LabAccessStatus = "none" | "pending" | "approved" | "rejected"

export interface ProfileForAccess {
  id: string
  role: string
  labAccessStatus?: string | null
  labAccessReviewedAt?: Date | string | null
}

export function canAccessExperiment(profile: ProfileForAccess | null, slug: string): boolean {
  // Free tier always accessible
  if (isFreeExperiment(slug)) return true
  // No profile (not logged in) -> only free
  if (!profile) return false
  // Admin always
  if (profile.role === "admin") return true
  // Approved users
  if (profile.labAccessStatus === "approved") return true
  return false
}

export function canAccessQuiz(profile: ProfileForAccess | null, quizId: string): boolean {
  if (isFreeQuiz(quizId)) return true
  if (!profile) return false
  if (profile.role === "admin") return true
  if (profile.labAccessStatus === "approved") return true
  return false
}

export function canRequestAccess(profile: ProfileForAccess | null): { allowed: boolean; reason?: string; rerequestAfter?: Date } {
  if (!profile) return { allowed: false, reason: "Please sign in first" }
  if (profile.role === "admin") return { allowed: false, reason: "Admins already have full access" }
  if (profile.labAccessStatus === "approved") return { allowed: false, reason: "Already approved" }
  if (profile.labAccessStatus === "pending") return { allowed: false, reason: "Request pending review" }
  if (profile.labAccessStatus === "rejected") {
    // Check 3-day cooldown
    const reviewedAt = profile.labAccessReviewedAt ? new Date(profile.labAccessReviewedAt) : null
    if (reviewedAt) {
      const threeDaysMs = 3 * 24 * 60 * 60 * 1000
      const canRerequestAt = new Date(reviewedAt.getTime() + threeDaysMs)
      if (new Date() < canRerequestAt) {
        return { allowed: false, reason: `You can re-request after ${canRerequestAt.toLocaleDateString()}`, rerequestAfter: canRerequestAt }
      }
    }
    return { allowed: true }
  }
  // none
  return { allowed: true }
}

export function getAccessStatusLabel(status: string | null | undefined): { label: string; variant: "default" | "secondary" | "outline" | "destructive" } {
  switch (status) {
    case "approved": return { label: "Approved", variant: "default" }
    case "pending": return { label: "Pending", variant: "secondary" }
    case "rejected": return { label: "Rejected", variant: "destructive" }
    default: return { label: "No Access", variant: "outline" }
  }
}
