export type BookId = `book-${number}`

export interface Book {
  id: BookId
  slug: string
  titleZh: string
  titleEn: string
  subtitle: string
  year: string
  chapterCount: number
  description: string
  color: string
  icon: string
}

export interface Chapter {
  id: string
  bookId: BookId
  bookSlug: string
  number: number
  titleZh: string
  slug: string
  description?: string
  sections?: Section[]
  estimatedMinutes?: number
  isReconstructed?: boolean
  reconstructedNote?: string
}

export interface Section {
  id: string
  titleZh: string
  contentBlocks: ContentBlock[]
}

export type ContentBlockType =
  | "paragraph"
  | "heading"
  | "list"
  | "definition"
  | "table"
  | "callout"
  | "formula"
  | "diagram"
  | "experiment"
  | "quiz"
  | "code"

export interface ContentBlock {
  type: ContentBlockType
  content?: string
  level?: number
  items?: string[]
  term?: string
  definition?: string
  headers?: string[]
  rows?: string[][]
  variant?: "tip" | "warning" | "info" | "example"
  experimentId?: string
  quizId?: string
  language?: string
}

export interface CurriculumMap {
  books: Book[]
  chapters: Chapter[]
}
