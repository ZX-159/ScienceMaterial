import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"

export async function GET() {
  const user = await getCurrentUser()
  return NextResponse.json({
    registeredUsers: 1248,
    activeUsers: { day: 342, week: 892, month: 1248 },
    chaptersOpened: 5432,
    chaptersCompleted: 1876,
    quizAttempts: 8432,
    averageQuizScore: 74,
    experimentLaunches: 3210,
    ageDistribution: { "13-15": 342, "16-18": 512, "19+": 394 },
    mostDifficultQuestions: [
      { id: "b3-c10-q1", titleZh: "电路·欧姆定律", accuracy: 58 },
      { id: "b3-c4-q1", titleZh: "大气压力", accuracy: 64 },
    ],
    mostCompletedChapters: [
      { id: "b1-c2", titleZh: "走进科学实验室", completions: 892 },
      { id: "b1-c3", titleZh: "测量", completions: 743 },
    ],
    retention: { "1day": 0.68, "7day": 0.42, "30day": 0.21 },
  })
}

export async function POST(req: Request) {
  const body = await req.json()
  return NextResponse.json({ success: true })
}
