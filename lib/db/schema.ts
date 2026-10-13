import { pgTable, text, integer, timestamp, boolean, jsonb, uuid, primaryKey, index } from "drizzle-orm/pg-core"

// Phase 2 — Backend foundation
// Users: Neon Auth owns identity, we store profile with age (13+ COPPA)

export const profiles = pgTable("profiles", {
  id: text("id").primaryKey(), // Neon Auth user id
  email: text("email").notNull().unique(),
  displayName: text("display_name"),
  age: integer("age"), // 13+ required, null for legacy
  role: text("role").notNull().default("user"), // user | admin
  avatarUrl: text("avatar_url"),
  // Lab access gating
  phone: text("phone"),
  labAccessStatus: text("lab_access_status").notNull().default("none"), // none | pending | approved | rejected
  labAccessRequestedAt: timestamp("lab_access_requested_at"),
  labAccessReviewedAt: timestamp("lab_access_reviewed_at"),
  labAccessReviewerId: text("lab_access_reviewer_id"),
  labAccessRejectReason: text("lab_access_reject_reason"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const labAccessRequests = pgTable("lab_access_requests", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").references(() => profiles.id).notNull(),
  email: text("email").notNull(),
  displayName: text("display_name"),
  age: integer("age"),
  phone: text("phone").notNull(),
  status: text("status").notNull().default("pending"), // pending | approved | rejected
  reason: text("reason"), // reject reason
  requestedAt: timestamp("requested_at").defaultNow().notNull(),
  reviewedAt: timestamp("reviewed_at"),
  reviewedBy: text("reviewed_by").references(() => profiles.id),
}, (t) => ({
  userIdx: index("lab_access_requests_user_idx").on(t.userId),
  statusIdx: index("lab_access_requests_status_idx").on(t.status),
}))

export const notifications = pgTable("notifications", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").references(() => profiles.id).notNull(),
  type: text("type").notNull(), // lab_access_approved | lab_access_rejected | lab_access_pending | system
  title: text("title").notNull(),
  body: text("body").notNull(),
  link: text("link"),
  read: boolean("read").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (t) => ({
  userIdx: index("notifications_user_idx").on(t.userId),
  readIdx: index("notifications_read_idx").on(t.read),
}))

export const books = pgTable("books", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  titleZh: text("title_zh").notNull(),
  titleEn: text("title_en").notNull(),
  year: text("year").notNull(),
  chapterCount: integer("chapter_count").notNull(),
  description: text("description"),
  color: text("color"),
  order: integer("order").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const chapters = pgTable("chapters", {
  id: text("id").primaryKey(),
  bookId: text("book_id").references(() => books.id).notNull(),
  slug: text("slug").notNull(),
  titleZh: text("title_zh").notNull(),
  titleEn: text("title_en"),
  order: integer("order").notNull(),
  description: text("description"),
  sourceNote: text("source_note"), // reconstruction notes preserved
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (t) => ({
  bookIdx: index("chapters_book_idx").on(t.bookId),
  slugIdx: index("chapters_slug_idx").on(t.slug),
}))

export const sections = pgTable("sections", {
  id: text("id").primaryKey(),
  chapterId: text("chapter_id").references(() => chapters.id).notNull(),
  slug: text("slug").notNull(),
  titleZh: text("title_zh").notNull(),
  order: integer("order").notNull(),
  estimatedMinutes: integer("estimated_minutes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (t) => ({
  chapterIdx: index("sections_chapter_idx").on(t.chapterId),
}))

export const contentBlocks = pgTable("content_blocks", {
  id: text("id").primaryKey(),
  sectionId: text("section_id").references(() => sections.id).notNull(),
  type: text("type").notNull(), // paragraph, heading, definition, table, experiment, quiz, image, etc.
  content: jsonb("content").notNull(),
  order: integer("order").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (t) => ({
  sectionIdx: index("content_blocks_section_idx").on(t.sectionId),
}))

export const experiments = pgTable("experiments", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  titleZh: text("title_zh").notNull(),
  description: text("description"),
  subject: text("subject").notNull(),
  type: text("type").notNull(),
  difficulty: text("difficulty").notNull(),
  chapterId: text("chapter_id").references(() => chapters.id),
  bookSlug: text("book_slug"),
  htmlSource: text("html_source"),
  thumbnail: text("thumbnail"),
  version: integer("version").default(1).notNull(),
  status: text("status").default("published").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const experimentVersions = pgTable("experiment_versions", {
  id: text("id").primaryKey(),
  experimentId: text("experiment_id").references(() => experiments.id).notNull(),
  htmlSource: text("html_source").notNull(),
  version: integer("version").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: text("created_by").references(() => profiles.id),
}, (t) => ({
  expIdx: index("experiment_versions_exp_idx").on(t.experimentId),
}))

export const quizzes = pgTable("quizzes", {
  id: text("id").primaryKey(),
  chapterId: text("chapter_id").references(() => chapters.id),
  titleZh: text("title_zh").notNull(),
  description: text("description"),
  questionCount: integer("question_count").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const questions = pgTable("questions", {
  id: text("id").primaryKey(),
  quizId: text("quiz_id").references(() => quizzes.id).notNull(),
  type: text("type").notNull(), // multiple_choice, multi_select, true_false, numerical, etc.
  questionZh: text("question_zh").notNull(),
  options: jsonb("options"), // [{id,text}]
  answer: jsonb("answer").notNull(),
  explanationZh: text("explanation_zh"),
  difficulty: text("difficulty").default("medium"),
  points: integer("points").default(1),
  order: integer("order").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (t) => ({
  quizIdx: index("questions_quiz_idx").on(t.quizId),
}))

export const quizAttempts = pgTable("quiz_attempts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").references(() => profiles.id).notNull(),
  quizId: text("quiz_id").references(() => quizzes.id).notNull(),
  score: integer("score").notNull(),
  total: integer("total").notNull(),
  answers: jsonb("answers").notNull(),
  completedAt: timestamp("completed_at").defaultNow().notNull(),
}, (t) => ({
  userIdx: index("quiz_attempts_user_idx").on(t.userId),
  quizIdx: index("quiz_attempts_quiz_idx").on(t.quizId),
}))

export const progress = pgTable("progress", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").references(() => profiles.id).notNull(),
  chapterId: text("chapter_id").references(() => chapters.id).notNull(),
  sectionId: text("section_id").references(() => sections.id),
  status: text("status").notNull().default("not_started"), // not_started, in_progress, completed
  progressPercent: integer("progress_percent").default(0).notNull(),
  lastPosition: text("last_position"),
  quizScore: integer("quiz_score"),
  completedAt: timestamp("completed_at"),
  lastAccessed: timestamp("last_accessed").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (t) => ({
  userChapterIdx: index("progress_user_chapter_idx").on(t.userId, t.chapterId),
  userIdx: index("progress_user_idx").on(t.userId),
}))

export const progressEvents = pgTable("progress_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").references(() => profiles.id).notNull(),
  chapterId: text("chapter_id").notNull(),
  eventType: text("event_type").notNull(), // section_view, quiz_submit, experiment_launch, bookmark
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (t) => ({
  userIdx: index("progress_events_user_idx").on(t.userId),
}))

export const bookmarks = pgTable("bookmarks", {
  userId: text("user_id").references(() => profiles.id).notNull(),
  targetType: text("target_type").notNull(), // chapter, section, experiment, question
  targetId: text("target_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (t) => ({
  pk: primaryKey({ columns: [t.userId, t.targetType, t.targetId] }),
  userIdx: index("bookmarks_user_idx").on(t.userId),
}))

export const adminAuditLogs = pgTable("admin_audit_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").references(() => profiles.id).notNull(),
  action: text("action").notNull(), // publish_chapter, create_experiment, etc.
  targetType: text("target_type").notNull(),
  targetId: text("target_id").notNull(),
  details: jsonb("details"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (t) => ({
  userIdx: index("admin_audit_logs_user_idx").on(t.userId),
}))
