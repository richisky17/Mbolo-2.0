CREATE TYPE "public"."type" AS ENUM('SELECT', 'ASSIST');--> statement-breakpoint
CREATE TYPE "public"."page_status" AS ENUM('draft', 'published');--> statement-breakpoint
CREATE TABLE "app_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"value" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "app_settings_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "challenge_options" (
	"id" serial PRIMARY KEY NOT NULL,
	"challenge_id" integer NOT NULL,
	"text" text NOT NULL,
	"correct" boolean NOT NULL,
	"image_src" text,
	"audio_src" text
);
--> statement-breakpoint
CREATE TABLE "challenge_progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"challenge_id" integer NOT NULL,
	"completed" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "challenges" (
	"id" serial PRIMARY KEY NOT NULL,
	"lesson_id" integer NOT NULL,
	"type" "type" NOT NULL,
	"question" text NOT NULL,
	"order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "changelog" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"action" text NOT NULL,
	"resource_type" text NOT NULL,
	"resource_id" text NOT NULL,
	"resource_name" text,
	"changes" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "courses" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"image_src" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lessons" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"unit_id" integer NOT NULL,
	"order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pages" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"language" text DEFAULT 'en' NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"meta_description" text,
	"page_status" "page_status" DEFAULT 'draft' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pronunciation_practice" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"course_id" integer,
	"text" text NOT NULL,
	"target_text" text NOT NULL,
	"audio_url" text,
	"score" integer NOT NULL,
	"accuracy" integer NOT NULL,
	"fluency" integer NOT NULL,
	"completeness" integer NOT NULL,
	"phoneme_details" text,
	"stress_pattern" text,
	"intonation_score" integer,
	"errors" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pronunciation_progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"course_id" integer,
	"total_practices" integer DEFAULT 0 NOT NULL,
	"average_score" integer DEFAULT 0 NOT NULL,
	"improvement_rate" integer DEFAULT 0 NOT NULL,
	"weak_phonemes" text,
	"strong_phonemes" text,
	"last_practice_date" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pronunciation_texts" (
	"id" serial PRIMARY KEY NOT NULL,
	"course_id" integer,
	"text" text NOT NULL,
	"difficulty" text DEFAULT 'beginner' NOT NULL,
	"category" text,
	"ai_generated" boolean DEFAULT false NOT NULL,
	"generated_prompt" text,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "social_media_links" (
	"id" serial PRIMARY KEY NOT NULL,
	"platform" text NOT NULL,
	"url" text NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "units" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"course_id" integer NOT NULL,
	"order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_progress" (
	"user_id" text PRIMARY KEY NOT NULL,
	"user_name" text DEFAULT 'Anon' NOT NULL,
	"user_image_src" text DEFAULT '/mascot.svg' NOT NULL,
	"active_course_id" integer,
	"hearts" integer DEFAULT 5 NOT NULL,
	"points" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_subscription" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"stripe_subscription_id" text NOT NULL,
	"stripe_customer_id" text NOT NULL,
	"stripe_price_id" text NOT NULL,
	"stripe_current_period_end" timestamp NOT NULL,
	CONSTRAINT "user_subscription_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "user_subscription_stripe_subscription_id_unique" UNIQUE("stripe_subscription_id"),
	CONSTRAINT "user_subscription_stripe_customer_id_unique" UNIQUE("stripe_customer_id")
);
--> statement-breakpoint
ALTER TABLE "challenge_options" ADD CONSTRAINT "challenge_options_challenge_id_challenges_id_fk" FOREIGN KEY ("challenge_id") REFERENCES "public"."challenges"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "challenge_progress" ADD CONSTRAINT "challenge_progress_challenge_id_challenges_id_fk" FOREIGN KEY ("challenge_id") REFERENCES "public"."challenges"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "challenges" ADD CONSTRAINT "challenges_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_unit_id_units_id_fk" FOREIGN KEY ("unit_id") REFERENCES "public"."units"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pronunciation_practice" ADD CONSTRAINT "pronunciation_practice_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pronunciation_progress" ADD CONSTRAINT "pronunciation_progress_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pronunciation_texts" ADD CONSTRAINT "pronunciation_texts_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "units" ADD CONSTRAINT "units_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_progress" ADD CONSTRAINT "user_progress_active_course_id_courses_id_fk" FOREIGN KEY ("active_course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;