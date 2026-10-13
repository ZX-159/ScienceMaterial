# QUIZ_ENGINE.md

## Overview

Generic quiz engine with Chinese question content, English UI controls.

## Supported Types

- multiple_choice (one correct)
- multi_select (several correct)
- true_false
- fill_blank
- numerical (calculated answer, tolerance)
- matching (drag concepts into categories)
- drag_drop (classification)
- ordering (arrange stages)
- diagram_labeling (place labels on diagram)
- graph_interpretation (read and interpret graph)
- simulation_based (interact with simulation then answer)

## Question Object Schema (Zod)

```ts
const QuestionSchema = z.object({
  id: z.string(),
  type: z.enum(["multiple_choice","multi_select","true_false","fill_blank","numerical","matching","drag_drop","ordering","diagram_labeling","graph_interpretation","simulation_based"]),
  question: z.string(), // Chinese
  options: z.array(z.object({ id: z.string(), text: z.string() })).optional(),
  answer: z.union([z.string(), z.array(z.string()), z.number()]),
  explanation: z.string(), // Chinese
  difficulty: z.enum(["easy","medium","hard"]),
  points: z.number().default(1),
  experimentId: z.string().optional(), // for simulation_based
  diagramUrl: z.string().optional(),
  tolerance: z.number().optional(), // for numerical
})

const QuizSchema = z.object({
  id: z.string(),
  chapterId: z.string(),
  titleZh: z.string(),
  questions: z.array(QuestionSchema),
  timeLimit: z.number().optional(), // seconds, for exam mode
})
```

## Example

```json
{
  "type": "multiple_choice",
  "question": "以下哪一项是测量值的正确表示？",
  "options": [
    { "id": "a", "text": "仅包含准确值" },
    { "id": "b", "text": "准确值 + 一位估计值" },
    { "id": "c", "text": "仅包含估计值" },
    { "id": "d", "text": "单位 + 误差" }
  ],
  "answer": "b",
  "explanation": "测量值 = 准确值 + 一位估计值。准确值的倒数第一位为最小刻度。",
  "difficulty": "medium",
  "points": 1
}
```

## UI

- English controls: Submit Answer, Next Question, Finish, Review
- Chinese content: question text, options, explanation
- Immediate feedback after submit: correct/incorrect + Chinese explanation
- Progress bar, score, weak area flag

## Scoring

- Points per question (default 1)
- Total score = sum correct points / total points
- Accuracy per chapter tracked
- Weak area logic V1: `quiz accuracy < 70% → weak topic`
- No AI recommendation engine required for V1

## Validation

- Server validates with Zod before saving
- Prevents injection, checks answer in allowed set
- For numerical: tolerance check (e.g., ±0.01 or ±1%)

## Storage

```
quizzes (id, chapter_id, title_zh, time_limit)
questions (id, quiz_id, type, question_zh, explanation_zh, difficulty, points, order, experiment_id, diagram_url, tolerance)
question_options (id, question_id, option_id, text_zh, is_correct)
quiz_attempts (id, user_id, quiz_id, score, total_points, completed_at, time_spent)
quiz_answers (id, attempt_id, question_id, answer, is_correct, answered_at)
```

- Attempts stored locally first (Dexie), synced to server
- Answers never contain correct answer in client payload before submission (server checks)

## Templates

Reusable templates for admin to quickly create:

- **Concept MCQ:** One correct answer, 4 options, explanation
- **Multi-select:** Several correct, partial credit optional
- **Classification:** Drag concepts into categories (e.g., 导体 vs 绝缘体)
- **Ordering:** Arrange stages (e.g., 植物一生, 月相变化)
- **Diagram labeling:** Place labels on diagram (e.g., 耳的构造, 眼的结构)
- **Graph interpretation:** Read graph, answer numerical or MCQ
- **Simulation question:** Launch experiment, observe, then answer

## Revision Mode

- Quick Revision: 5/10 min random from recent chapters
- Chapter Revision: all questions from chapter
- Weak Areas: filter where accuracy <70%
- Exam Mode: timed, mixed chapters, no hints, no immediate feedback until finish
