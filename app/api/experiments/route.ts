import { NextResponse } from "next/server"
import { z } from "zod"
import fs from "fs"
import path from "path"

const CUSTOM_INDEX = path.join(process.cwd(), "public/experiments/custom-index.json")

function readCustomIndex() {
  try {
    if (fs.existsSync(CUSTOM_INDEX)) {
      return JSON.parse(fs.readFileSync(CUSTOM_INDEX, "utf-8"))
    }
  } catch {}
  return []
}

function writeCustomIndex(arr: any[]) {
  fs.mkdirSync(path.dirname(CUSTOM_INDEX), { recursive: true })
  fs.writeFileSync(CUSTOM_INDEX, JSON.stringify(arr, null, 2))
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get("slug")
  const chapterId = searchParams.get("chapterId")
  const sectionId = searchParams.get("sectionId")
  const bookSlug = searchParams.get("bookSlug")

  let custom: any[] = []
  try { custom = readCustomIndex() } catch {}

  // Legacy hardcoded removed — now only custom-index
  let all = [...custom]

  // Also scan public/experiments/*.html files not in index (for manual uploads)
  try {
    const dir = path.join(process.cwd(), "public/experiments")
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir).filter(f=>f.endsWith(".html"))
      for (const f of files) {
        const s = f.replace(".html","")
        if (!all.find((e:any)=>e.slug===s)) {
          all.push({ id:s, slug:s, title:s, titleZh:s, description:`User uploaded ${s}`, subject:"physics", type:"simulation", difficulty:"beginner", file:`/experiments/${f}`, size: fs.statSync(path.join(dir,f)).size })
        }
      }
    }
  } catch {}

  if (slug) {
    const exp = all.find((e:any) => e.slug === slug)
    if (!exp) return NextResponse.json({ error: "Not found", hint: "Upload your own via ExperimentUploader in any chapter/section, see experiments.md" }, { status: 404 })
    return NextResponse.json({
      ...exp,
      file: `/experiments/${slug}.html`,
      sandbox: "allow-scripts only"
    })
  }

  if (chapterId) {
    all = all.filter((e:any)=>e.chapterId===chapterId)
  }
  if (sectionId) {
    all = all.filter((e:any)=>e.sectionId===sectionId)
  }
  if (bookSlug) {
    all = all.filter((e:any)=>e.bookSlug===bookSlug)
  }

  return NextResponse.json(all.map((e:any) => ({
    ...e,
    file: `/experiments/${e.slug}.html`
  })))
}

const CreateSchema = z.object({
  slug: z.string().min(2).max(64).regex(/^[a-z0-9-]+$/),
  title: z.string().min(2).max(200),
  titleZh: z.string().min(2).max(200),
  description: z.string().min(10).max(1000),
  subject: z.enum(["physics","chemistry","biology","earth","space","environment","engineering"]),
  type: z.enum(["simulation","experiment","visualizer","animation","graph","interactive"]).optional().default("simulation"),
  difficulty: z.enum(["beginner","intermediate","advanced"]).optional().default("beginner"),
  bookSlug: z.string().optional(),
  chapterId: z.string().optional(),
  sectionId: z.string().optional(),
  html_source: z.string().min(100).max(500_000),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = CreateSchema.parse(body)

    // Validate HTML contains canvas/svg
    if (!parsed.html_source.includes("<canvas") && !parsed.html_source.includes("<svg") && !parsed.html_source.toLowerCase().includes("canvas")) {
      return NextResponse.json({ error: "HTML must contain canvas or svg" }, { status: 400 })
    }
    if (parsed.html_source.includes("allow-same-origin")) {
      return NextResponse.json({ error: "Remove allow-same-origin — only allow-scripts allowed" }, { status: 400 })
    }

    // Ensure public/experiments dir exists
    const expDir = path.join(process.cwd(), "public/experiments")
    fs.mkdirSync(expDir, { recursive: true })

    // Write file to public/experiments/{slug}.html
    const filePath = path.join(expDir, `${parsed.slug}.html`)
    fs.writeFileSync(filePath, parsed.html_source, "utf-8")

    // Update custom-index.json
    const index = readCustomIndex()
    const existingIdx = index.findIndex((e:any)=>e.slug===parsed.slug)
    const entry = {
      id: parsed.slug,
      slug: parsed.slug,
      title: parsed.title,
      titleZh: parsed.titleZh,
      description: parsed.description,
      subject: parsed.subject,
      type: parsed.type,
      difficulty: parsed.difficulty,
      bookSlug: parsed.bookSlug,
      chapterId: parsed.chapterId,
      sectionId: parsed.sectionId,
      file: `/experiments/${parsed.slug}.html`,
      size: parsed.html_source.length,
      createdAt: new Date().toISOString(),
      createdBy: "user-upload",
    }
    if (existingIdx>=0) {
      index[existingIdx] = { ...index[existingIdx], ...entry, updatedAt: new Date().toISOString() }
    } else {
      index.push(entry)
    }
    writeCustomIndex(index)

    return NextResponse.json({ success: true, id: parsed.slug, slug: parsed.slug, version: 1, file: `/experiments/${parsed.slug}.html`, chapterId: parsed.chapterId, sectionId: parsed.sectionId })
  } catch (e:any) {
    if (e.name==="ZodError") {
      return NextResponse.json({ error: "Validation failed", details: e.errors }, { status: 400 })
    }
    return NextResponse.json({ error: "Invalid", details: e instanceof Error ? e.message : "unknown" }, { status: 400 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get("slug")
    if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 })
    const expDir = path.join(process.cwd(), "public/experiments")
    const filePath = path.join(expDir, `${slug}.html`)
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    const index = readCustomIndex()
    const filtered = index.filter((e:any)=>e.slug!==slug)
    writeCustomIndex(filtered)
    return NextResponse.json({ success: true, deleted: slug })
  } catch (e:any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}
