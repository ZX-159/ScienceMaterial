import { createClient, createServiceClient } from "@/lib/supabase/server"
import { isSupabaseConfigured, readProfiles } from "@/lib/access/storage"
import { canAccessQuiz } from "@/lib/access/check"
import { isFreeQuiz } from "@/lib/access/free-tier"
import { GatedQuizOverlay } from "@/components/access/gated-quiz-overlay"
import QuizDetailClient from "./quiz-detail-client"

interface Props {
  params: Promise<{ quizId: string }>
}

export default async function QuizPage({ params }: Props) {
  const { quizId } = await params

  if (isFreeQuiz(quizId)) {
    return <QuizDetailClient quizId={quizId} />
  }

  try {
    if (isSupabaseConfigured()) {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        return <GatedQuizOverlay quizId={quizId} status="none" />
      }

      const service = createServiceClient()
      const { data: profile } = await service.from("profiles").select("*").eq("id", user.id).single()

      const canAccess = canAccessQuiz(profile ? {
        id: profile.id,
        role: profile.role,
        labAccessStatus: profile.lab_access_status,
      } : null, quizId)

      if (!canAccess) {
        return <GatedQuizOverlay quizId={quizId} status={profile?.lab_access_status || "none"} canRerequestAfter={profile?.lab_access_reviewed_at} />
      }

      return <QuizDetailClient quizId={quizId} />
    } else {
      const profiles = readProfiles()
      const mockProf = profiles.find(p => p.id === "test-user-1") || profiles[0]

      const canAccess = canAccessQuiz(mockProf ? {
        id: mockProf.id,
        role: mockProf.role,
        labAccessStatus: mockProf.labAccessStatus,
      } : null, quizId)

      if (!canAccess) {
        return <GatedQuizOverlay quizId={quizId} status={mockProf?.labAccessStatus || "none"} canRerequestAfter={mockProf?.labAccessReviewedAt} />
      }

      return <QuizDetailClient quizId={quizId} />
    }
  } catch (e) {
    console.error("quiz page error", e)
    if (isFreeQuiz(quizId)) return <QuizDetailClient quizId={quizId} />
    return <GatedQuizOverlay quizId={quizId} status="none" />
  }
}
