import { z } from "zod";

// ============================================
// User Schema
// ============================================
export const userSchema = z.object({
  _id: z.string(),
  email: z.string().email(),
  passwordHash: z.string(),
  displayName: z.string(),
  createdAt: z.date(),
});

export const insertUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  displayName: z.string().min(2),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type User = z.infer<typeof userSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginCredentials = z.infer<typeof loginSchema>;

// ============================================
// Course Schema
// ============================================
export const courseSchema = z.object({
  _id: z.string(),
  slug: z.string(),
  titleHE: z.string(),
  descriptionHE: z.string(),
  order: z.number(),
  topics: z.array(z.string()),
  levelRange: z.string(),
  coverIcon: z.string(),
});

export type Course = z.infer<typeof courseSchema>;

// ============================================
// Lesson Schema
// ============================================
export const exampleSchema = z.object({
  titleHE: z.string(),
  code: z.string(),
  expectedOutput: z.string(),
});

export const lessonSchema = z.object({
  _id: z.string(),
  courseSlug: z.string(),
  slug: z.string(),
  titleHE: z.string(),
  order: z.number(),
  contentHE: z.string(),
  examples: z.array(exampleSchema),
  requiresScore: z.number(), // 100 for completion
});

export type Lesson = z.infer<typeof lessonSchema>;
export type Example = z.infer<typeof exampleSchema>;

// ============================================
// Quiz Schema
// ============================================
export const questionSchema = z.object({
  promptHE: z.string(),
  choicesHE: z.array(z.string()).length(4),
  correctIndex: z.number().min(0).max(3),
});

export const quizSchema = z.object({
  _id: z.string(),
  lessonId: z.string(),
  questions: z.array(questionSchema).length(5),
});

export type Quiz = z.infer<typeof quizSchema>;
export type Question = z.infer<typeof questionSchema>;

// Client-side quiz (without correct answers)
export const clientQuestionSchema = z.object({
  promptHE: z.string(),
  choicesHE: z.array(z.string()).length(4),
});

export const clientQuizSchema = z.object({
  lessonId: z.string(),
  questions: z.array(clientQuestionSchema).length(5),
});

export type ClientQuiz = z.infer<typeof clientQuizSchema>;

// Quiz submission
export const quizSubmissionSchema = z.object({
  answers: z.array(z.number().min(0).max(3)).length(5),
});

export type QuizSubmission = z.infer<typeof quizSubmissionSchema>;

// Quiz result
export const answerResultSchema = z.object({
  questionIndex: z.number(),
  chosenIndex: z.number(),
  isCorrect: z.boolean(),
  correctIndex: z.number(),
});

export const quizResultSchema = z.object({
  correctCount: z.number(),
  score: z.number(),
  passed: z.boolean(),
  results: z.array(answerResultSchema),
});

export type QuizResult = z.infer<typeof quizResultSchema>;
export type AnswerResult = z.infer<typeof answerResultSchema>;

// ============================================
// Progress Schema
// ============================================
export const progressSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  courseSlug: z.string(),
  lessonSlug: z.string(),
  status: z.enum(["locked", "in-progress", "done"]),
  score: z.number(),
  answers: z.array(
    z.object({
      questionIndex: z.number(),
      chosenIndex: z.number(),
      isCorrect: z.boolean(),
    })
  ),
  updatedAt: z.date(),
});

export type Progress = z.infer<typeof progressSchema>;

// ============================================
// API Response Types
// ============================================
export const courseWithProgressSchema = courseSchema.extend({
  completedLessons: z.number(),
  totalLessons: z.number(),
  progressPercentage: z.number(),
});

export type CourseWithProgress = z.infer<typeof courseWithProgressSchema>;

export const lessonWithStatusSchema = lessonSchema.extend({
  status: z.enum(["locked", "in-progress", "done"]),
});

export type LessonWithStatus = z.infer<typeof lessonWithStatusSchema>;

export const progressOverviewSchema = z.object({
  overallPercentage: z.number(),
  completedLessons: z.number(),
  totalLessons: z.number(),
  courseProgress: z.array(
    z.object({
      courseSlug: z.string(),
      courseTitleHE: z.string(),
      completedLessons: z.number(),
      totalLessons: z.number(),
      percentage: z.number(),
    })
  ),
});

export type ProgressOverview = z.infer<typeof progressOverviewSchema>;

export const learningHistoryItemSchema = z.object({
  courseTitleHE: z.string(),
  courseSlug: z.string(),
  lessonTitleHE: z.string(),
  lessonSlug: z.string(),
  score: z.number(),
  completedAt: z.date(),
});

export type LearningHistoryItem = z.infer<typeof learningHistoryItemSchema>;

// ============================================
// Auth Response Types
// ============================================
export const authResponseSchema = z.object({
  user: z.object({
    id: z.string(),
    email: z.string(),
    displayName: z.string(),
  }),
  token: z.string(),
});

export type AuthResponse = z.infer<typeof authResponseSchema>;

// ============================================
// Discussion/Comment Schema
// ============================================
export const commentSchema = z.object({
  _id: z.string(),
  lessonSlug: z.string(),
  userId: z.string(),
  userDisplayName: z.string(),
  content: z.string(),
  isMentorResponse: z.boolean(),
  parentCommentId: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const insertCommentSchema = z.object({
  lessonSlug: z.string(),
  content: z.string().min(3).max(1000),
  parentCommentId: z.string().optional(),
});

export type Comment = z.infer<typeof commentSchema>;
export type InsertComment = z.infer<typeof insertCommentSchema>;

// ============================================
// Certificate Schema
// ============================================
export const certificateSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  courseSlug: z.string(),
  courseTitleHE: z.string(),
  userDisplayName: z.string(),
  completedAt: z.coerce.date(),
  certificateNumber: z.string(),
});

export type Certificate = z.infer<typeof certificateSchema>;
