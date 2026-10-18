-- ScienceMaterial Initial Migration - 82 Labs + Gated Access
-- Generated from lib/db/schema.ts
-- Includes: profiles extended with phone + lab_access_status, lab_access_requests, notifications, plus all curriculum tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Profiles - users with lab access gating
CREATE TABLE IF NOT EXISTS "profiles" (
  "id" text PRIMARY KEY NOT NULL,
  "email" text NOT NULL UNIQUE,
  "display_name" text,
  "age" integer,
  "role" text DEFAULT 'user' NOT NULL,
  "avatar_url" text,
  "phone" text,
  "lab_access_status" text DEFAULT 'none' NOT NULL,
  "lab_access_requested_at" timestamp,
  "lab_access_reviewed_at" timestamp,
  "lab_access_reviewer_id" text,
  "lab_access_reject_reason" text,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

-- Lab access requests - phone collection, admin approval, 3-day cooldown for rejected
CREATE TABLE IF NOT EXISTS "lab_access_requests" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" text NOT NULL REFERENCES "profiles"("id"),
  "email" text NOT NULL,
  "display_name" text,
  "age" integer,
  "phone" text NOT NULL,
  "status" text DEFAULT 'pending' NOT NULL,
  "reason" text,
  "requested_at" timestamp DEFAULT now() NOT NULL,
  "reviewed_at" timestamp,
  "reviewed_by" text REFERENCES "profiles"("id")
);
CREATE INDEX IF NOT EXISTS "lab_access_requests_user_idx" ON "lab_access_requests" ("user_id");
CREATE INDEX IF NOT EXISTS "lab_access_requests_status_idx" ON "lab_access_requests" ("status");

-- Notifications - in-app bell, no email
CREATE TABLE IF NOT EXISTS "notifications" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" text NOT NULL REFERENCES "profiles"("id"),
  "type" text NOT NULL,
  "title" text NOT NULL,
  "body" text NOT NULL,
  "link" text,
  "read" boolean DEFAULT false NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "notifications_user_idx" ON "notifications" ("user_id");
CREATE INDEX IF NOT EXISTS "notifications_read_idx" ON "notifications" ("read");

-- Books - 6 books
CREATE TABLE IF NOT EXISTS "books" (
  "id" text PRIMARY KEY NOT NULL,
  "slug" text NOT NULL UNIQUE,
  "title_zh" text NOT NULL,
  "title_en" text NOT NULL,
  "year" text NOT NULL,
  "chapter_count" integer NOT NULL,
  "description" text,
  "color" text,
  "order" integer NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL
);

-- Chapters - 64 chapters
CREATE TABLE IF NOT EXISTS "chapters" (
  "id" text PRIMARY KEY NOT NULL,
  "book_id" text NOT NULL REFERENCES "books"("id"),
  "slug" text NOT NULL,
  "title_zh" text NOT NULL,
  "title_en" text,
  "order" integer NOT NULL,
  "description" text,
  "source_note" text,
  "created_at" timestamp DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "chapters_book_idx" ON "chapters" ("book_id");
CREATE INDEX IF NOT EXISTS "chapters_slug_idx" ON "chapters" ("slug");

-- Sections
CREATE TABLE IF NOT EXISTS "sections" (
  "id" text PRIMARY KEY NOT NULL,
  "chapter_id" text NOT NULL REFERENCES "chapters"("id"),
  "slug" text NOT NULL,
  "title_zh" text NOT NULL,
  "order" integer NOT NULL,
  "estimated_minutes" integer,
  "created_at" timestamp DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "sections_chapter_idx" ON "sections" ("chapter_id");

-- Content Blocks
CREATE TABLE IF NOT EXISTS "content_blocks" (
  "id" text PRIMARY KEY NOT NULL,
  "section_id" text NOT NULL REFERENCES "sections"("id"),
  "type" text NOT NULL,
  "content" jsonb NOT NULL,
  "order" integer NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "content_blocks_section_idx" ON "content_blocks" ("section_id");

-- Experiments - 82 labs
CREATE TABLE IF NOT EXISTS "experiments" (
  "id" text PRIMARY KEY NOT NULL,
  "slug" text NOT NULL UNIQUE,
  "title" text NOT NULL,
  "title_zh" text NOT NULL,
  "description" text,
  "subject" text NOT NULL,
  "type" text NOT NULL,
  "difficulty" text NOT NULL,
  "chapter_id" text REFERENCES "chapters"("id"),
  "book_slug" text,
  "html_source" text,
  "thumbnail" text,
  "version" integer DEFAULT 1 NOT NULL,
  "status" text DEFAULT 'published' NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

-- Experiment Versions
CREATE TABLE IF NOT EXISTS "experiment_versions" (
  "id" text PRIMARY KEY NOT NULL,
  "experiment_id" text NOT NULL REFERENCES "experiments"("id"),
  "html_source" text NOT NULL,
  "version" integer NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "created_by" text REFERENCES "profiles"("id")
);
CREATE INDEX IF NOT EXISTS "experiment_versions_exp_idx" ON "experiment_versions" ("experiment_id");

-- Quizzes
CREATE TABLE IF NOT EXISTS "quizzes" (
  "id" text PRIMARY KEY NOT NULL,
  "chapter_id" text REFERENCES "chapters"("id"),
  "title_zh" text NOT NULL,
  "description" text,
  "question_count" integer DEFAULT 0,
  "created_at" timestamp DEFAULT now() NOT NULL
);

-- Questions
CREATE TABLE IF NOT EXISTS "questions" (
  "id" text PRIMARY KEY NOT NULL,
  "quiz_id" text NOT NULL REFERENCES "quizzes"("id"),
  "type" text NOT NULL,
  "question_zh" text NOT NULL,
  "options" jsonb,
  "answer" jsonb NOT NULL,
  "explanation_zh" text,
  "difficulty" text DEFAULT 'medium',
  "points" integer DEFAULT 1,
  "order" integer NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "questions_quiz_idx" ON "questions" ("quiz_id");

-- Quiz Attempts
CREATE TABLE IF NOT EXISTS "quiz_attempts" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" text NOT NULL REFERENCES "profiles"("id"),
  "quiz_id" text NOT NULL REFERENCES "quizzes"("id"),
  "score" integer NOT NULL,
  "total" integer NOT NULL,
  "answers" jsonb NOT NULL,
  "completed_at" timestamp DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "quiz_attempts_user_idx" ON "quiz_attempts" ("user_id");
CREATE INDEX IF NOT EXISTS "quiz_attempts_quiz_idx" ON "quiz_attempts" ("quiz_id");

-- Progress
CREATE TABLE IF NOT EXISTS "progress" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" text NOT NULL REFERENCES "profiles"("id"),
  "chapter_id" text NOT NULL REFERENCES "chapters"("id"),
  "section_id" text REFERENCES "sections"("id"),
  "status" text DEFAULT 'not_started' NOT NULL,
  "progress_percent" integer DEFAULT 0 NOT NULL,
  "last_position" text,
  "quiz_score" integer,
  "completed_at" timestamp,
  "last_accessed" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "progress_user_chapter_idx" ON "progress" ("user_id", "chapter_id");
CREATE INDEX IF NOT EXISTS "progress_user_idx" ON "progress" ("user_id");

-- Progress Events
CREATE TABLE IF NOT EXISTS "progress_events" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" text NOT NULL REFERENCES "profiles"("id"),
  "chapter_id" text NOT NULL,
  "event_type" text NOT NULL,
  "metadata" jsonb,
  "created_at" timestamp DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "progress_events_user_idx" ON "progress_events" ("user_id");

-- Bookmarks
CREATE TABLE IF NOT EXISTS "bookmarks" (
  "user_id" text NOT NULL REFERENCES "profiles"("id"),
  "target_type" text NOT NULL,
  "target_id" text NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  PRIMARY KEY ("user_id", "target_type", "target_id")
);
CREATE INDEX IF NOT EXISTS "bookmarks_user_idx" ON "bookmarks" ("user_id");

-- Admin Audit Logs
CREATE TABLE IF NOT EXISTS "admin_audit_logs" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" text NOT NULL REFERENCES "profiles"("id"),
  "action" text NOT NULL,
  "target_type" text NOT NULL,
  "target_id" text NOT NULL,
  "details" jsonb,
  "created_at" timestamp DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "admin_audit_logs_user_idx" ON "admin_audit_logs" ("user_id");

-- Seed books (6 books)
INSERT INTO "books" ("id", "slug", "title_zh", "title_en", "year", "chapter_count", "description", "color", "order")
VALUES
  ('book-1', 'chu-yi-shang', '第一册·初一上册', 'Junior 1 Upper', '初一上', 10, '科学方法、实验室、测量、生物观察、细胞、物质与地球基础', 'mineral', 1),
  ('book-2', 'chu-yi-xia', '第二册·初一下册', 'Junior 1 Lower', '初一下', 11, '声光与感官、运动与力、生物生殖、太阳系与地球运动', 'blueprint', 2),
  ('book-3', 'chu-er-shang', '第三册·初二上册', 'Junior 2 Upper', '初二上', 11, '水的性质、大气、植物生命、激素与神经、电学基础', 'teal', 3),
  ('book-4', 'chu-er-xia', '第四册·初二下册', 'Junior 2 Lower', '初二下', 11, '粒子模型、元素、空气与氧、质量守恒、植物与土壤、磁与电', 'oxide', 4),
  ('book-5', 'chu-san-shang', '第五册·初三上册', 'Junior 3 Upper', '初三上', 10, '酸碱盐、金属、矿物、机械能、热与能量守恒、食物与消化循环', 'brass', 5),
  ('book-6', 'chu-san-xia', '第六册·初三下册', 'Junior 3 Lower', '初三下', 11, '物种多样性、生命统一性、演化、星系宇宙、机械应用、电与波、资源与环境', 'mineral', 6)
ON CONFLICT (id) DO NOTHING;

-- Note: Chapters and experiments are seeded via npm run db:seed which reads lib/curriculum/data.ts and public/experiments/custom-index.json
-- For quick local dev, you can use drizzle-kit push instead of migrate
