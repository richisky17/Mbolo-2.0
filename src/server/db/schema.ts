import { relations } from "drizzle-orm";
import { DEFAULT_HEARTS_MAX, DEFAULT_POINTS_START } from "@/constants";

import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  imageSrc: text("image_src").notNull(),
});

export const coursesRelations = relations(courses, ({ many }) => ({
  userProgress: many(userProgress),
  units: many(units),
}));

export const units = pgTable("units", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  courseId: integer("course_id")
    .references(() => courses.id, { onDelete: "cascade" })
    .notNull(),
  order: integer("order").notNull(),
});

export const unitsRelations = relations(units, ({ many, one }) => ({
  course: one(courses, {
    fields: [units.courseId],
    references: [courses.id],
  }),
  lessons: many(lessons),
}));

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  unitId: integer("unit_id")
    .references(() => units.id, { onDelete: "cascade" })
    .notNull(),
  order: integer("order").notNull(),
});

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  unit: one(units, {
    fields: [lessons.unitId],
    references: [units.id],
  }),
  challenges: many(challenges),
}));

export const challengesEnum = pgEnum("type", ["SELECT", "ASSIST"]);

export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id")
    .references(() => lessons.id, { onDelete: "cascade" })
    .notNull(),
  type: challengesEnum("type").notNull(),
  question: text("question").notNull(),
  order: integer("order").notNull(),
});

export const challengesRelations = relations(challenges, ({ one, many }) => ({
  lesson: one(lessons, {
    fields: [challenges.lessonId],
    references: [lessons.id],
  }),
  challengeOptions: many(challengeOptions),
  challengeProgress: many(challengeProgress),
}));

export const challengeOptions = pgTable("challenge_options", {
  id: serial("id").primaryKey(),
  challengeId: integer("challenge_id")
    .references(() => challenges.id, { onDelete: "cascade" })
    .notNull(),
  text: text("text").notNull(),
  correct: boolean("correct").notNull(),
  imageSrc: text("image_src"),
  audioSrc: text("audio_src"),
});

export const challengeOptionsRelations = relations(
  challengeOptions,
  ({ one }) => ({
    challenge: one(challenges, {
      fields: [challengeOptions.challengeId],
      references: [challenges.id],
    }),
  })
);

export const challengeProgress = pgTable("challenge_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  challengeId: integer("challenge_id")
    .references(() => challenges.id, { onDelete: "cascade" })
    .notNull(),
  completed: boolean("completed").notNull().default(false),
});

export const challengeProgressRelations = relations(
  challengeProgress,
  ({ one }) => ({
    challenge: one(challenges, {
      fields: [challengeProgress.challengeId],
      references: [challenges.id],
    }),
  })
);

export const userProgress = pgTable("user_progress", {
  userId: text("user_id").primaryKey(),
  userName: text("user_name").notNull().default("Anon"),
  userImageSrc: text("user_image_src").notNull().default("/mascot.svg"),
  activeCourseId: integer("active_course_id").references(() => courses.id, {
    onDelete: "cascade",
  }),
  hearts: integer("hearts").notNull().default(DEFAULT_HEARTS_MAX),
  points: integer("points").notNull().default(DEFAULT_POINTS_START),
});

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  activeCourse: one(courses, {
    fields: [userProgress.activeCourseId],
    references: [courses.id],
  }),
}));

export const userSubscription = pgTable("user_subscription", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  stripeSubscriptionId: text("stripe_subscription_id").notNull().unique(),
  stripeCustomerId: text("stripe_customer_id").notNull().unique(),
  stripePriceId: text("stripe_price_id").notNull(),
  stripeCurrentPeriodEnd: timestamp("stripe_current_period_end").notNull(),
});

export const appSettings = pgTable("app_settings", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const changelog = pgTable("changelog", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  action: text("action").notNull(), // created, updated, deleted
  resourceType: text("resource_type").notNull(), // courses, units, lessons, etc.
  resourceId: text("resource_id").notNull(),
  resourceName: text("resource_name"),
  changes: text("changes"), // JSON string of changes
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const pageStatusEnum = pgEnum("page_status", ["draft", "published"]);

export const pages = pgTable("pages", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull(),
  language: text("language").notNull().default("en"),
  title: text("title").notNull(),
  content: text("content").notNull(),
  metaDescription: text("meta_description"),
  status: pageStatusEnum("page_status").notNull().default("draft"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const socialMediaLinks = pgTable("social_media_links", {
  id: serial("id").primaryKey(),
  platform: text("platform").notNull(), // facebook, twitter, instagram, youtube, linkedin, etc.
  url: text("url").notNull(),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Pronunciation tracking schema
export const pronunciationPractice = pgTable("pronunciation_practice", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  courseId: integer("course_id").references(() => courses.id, {
    onDelete: "cascade",
  }),
  text: text("text").notNull(), // The text they practiced
  targetText: text("target_text").notNull(), // What they should say
  audioUrl: text("audio_url"), // URL to stored audio file
  score: integer("score").notNull(), // Overall score 0-100
  accuracy: integer("accuracy").notNull(), // Phoneme accuracy 0-100
  fluency: integer("fluency").notNull(), // Fluency score 0-100
  completeness: integer("completeness").notNull(), // Completeness 0-100
  phonemeDetails: text("phoneme_details"), // JSON string of phoneme breakdown
  stressPattern: text("stress_pattern"), // JSON string of stress analysis
  intonationScore: integer("intonation_score"), // 0-100
  errors: text("errors"), // JSON string of specific errors
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const pronunciationProgress = pgTable("pronunciation_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  courseId: integer("course_id").references(() => courses.id, {
    onDelete: "cascade",
  }),
  totalPractices: integer("total_practices").notNull().default(0),
  averageScore: integer("average_score").notNull().default(0),
  improvementRate: integer("improvement_rate").notNull().default(0), // Percentage improvement
  weakPhonemes: text("weak_phonemes"), // JSON array of phonemes to practice
  strongPhonemes: text("strong_phonemes"), // JSON array of mastered phonemes
  lastPracticeDate: timestamp("last_practice_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const pronunciationPracticeRelations = relations(
  pronunciationPractice,
  ({ one }) => ({
    course: one(courses, {
      fields: [pronunciationPractice.courseId],
      references: [courses.id],
    }),
  })
);

export const pronunciationProgressRelations = relations(
  pronunciationProgress,
  ({ one }) => ({
    course: one(courses, {
      fields: [pronunciationProgress.courseId],
      references: [courses.id],
    }),
  })
);

// Pronunciation practice texts/content (managed by admin)
export const pronunciationTexts = pgTable("pronunciation_texts", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").references(() => courses.id, {
    onDelete: "cascade",
  }),
  text: text("text").notNull(), // The practice text
  difficulty: text("difficulty").notNull().default("beginner"), // beginner, intermediate, advanced
  category: text("category"), // greetings, numbers, food, etc.
  aiGenerated: boolean("ai_generated").notNull().default(false),
  generatedPrompt: text("generated_prompt"), // The prompt used for AI generation
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const pronunciationTextsRelations = relations(
  pronunciationTexts,
  ({ one }) => ({
    course: one(courses, {
      fields: [pronunciationTexts.courseId],
      references: [courses.id],
    }),
  })
);
