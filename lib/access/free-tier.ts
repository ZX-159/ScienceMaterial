// Free tier - first 5 labs and quizzes are polished and unlocked for all users
// These are the most foundational labs, high quality, Apple HIG compliant

export const FREE_EXPERIMENT_SLUGS = [
  "measurement-ruler",      // 1 - Length measurement, high polish
  "density-explorer",       // 2 - Mass/volume/density, high polish  
  "floating-sinking",       // 3 - Buoyancy, high polish
  "wave-generator",         // 4 - Waves, high polish
  "reflection",             // 5 - Light reflection, high polish
] as const

export const FREE_QUIZ_IDS = [
  "b1-c3-q1", // Measurement
  "b2-c2-q1", // Light and eyes
  "b3-c10-q1", // Circuits checkpoint
  "b4-c10-q1", // Electromagnetism
  "b1-c1-q1", // Science measurement (extra)
] as const

export type FreeExperimentSlug = typeof FREE_EXPERIMENT_SLUGS[number]
export type FreeQuizId = typeof FREE_QUIZ_IDS[number]

export function isFreeExperiment(slug: string): boolean {
  return (FREE_EXPERIMENT_SLUGS as readonly string[]).includes(slug)
}

export function isFreeQuiz(quizId: string): boolean {
  return (FREE_QUIZ_IDS as readonly string[]).includes(quizId)
}

export const FREE_TIER_INFO = {
  experimentCount: FREE_EXPERIMENT_SLUGS.length,
  quizCount: FREE_QUIZ_IDS.length,
  description: "5 free interactive labs + 5 free quizzes for all users. Full access requires approval.",
}
