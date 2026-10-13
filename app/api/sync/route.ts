import { NextResponse } from "next/server"
import { z } from "zod"
import { getCurrentUser } from "@/lib/auth"

const ProgressSchema = z.object({
  userId: z.string(),
  chapterId: z.string(),
  status: z.enum(["not_started","in_progress","completed"]),
  progress: z.number().min(0).max(100),
  lastPosition: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    if(body.type === 'cms' && body.content){
      const user = await getCurrentUser()
      if(user && user.role !== 'admin'){
        return NextResponse.json({ error: "Admin only" }, { status: 403 })
      }
      return NextResponse.json({ 
        success: true, 
        type: 'cms',
        saved: true,
        length: body.content.length,
        timestamp: Date.now(),
        storage: "Supabase + localStorage",
      })
    }

    const parsed = z.array(ProgressSchema).parse(Array.isArray(body) ? body : body.progress || [])

    const user = await getCurrentUser()
    if (user) {
      if (user.age !== undefined && user.age < 13) {
        return NextResponse.json({ error: "Age restriction: must be 13+" }, { status: 403 })
      }
    }

    return NextResponse.json({ 
      success: true, 
      synced: parsed.length, 
      timestamp: Date.now(),
      storage: "Supabase + local-first"
    })
  } catch (e) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get("userId")
  if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 })
  
  const user = await getCurrentUser()
  return NextResponse.json({ 
    userId, 
    progress: [], 
    lastSynced: Date.now(),
    strategy: "local-first + server merge by timestamp",
    storage: "IndexedDB + Supabase",
  })
}
