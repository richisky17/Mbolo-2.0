import { config } from "dotenv";
import { resolve } from "path";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { sql } from "drizzle-orm";

// Load environment variables FIRST
config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

// Create database connection AFTER env vars are loaded
const connector = neon(process.env.DATABASE_URL as string);
const db = drizzle(connector);

async function createPronunciationTables() {
  try {
    console.log("Creating pronunciation tables...");

    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is not set!");
    }

    // Create pronunciation_texts table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS pronunciation_texts (
        id SERIAL PRIMARY KEY,
        course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
        text TEXT NOT NULL,
        difficulty TEXT NOT NULL DEFAULT 'beginner',
        category TEXT,
        ai_generated BOOLEAN NOT NULL DEFAULT false,
        generated_prompt TEXT,
        "order" INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);

    // Create pronunciation_practice table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS pronunciation_practice (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL,
        course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
        text TEXT NOT NULL,
        target_text TEXT NOT NULL,
        audio_url TEXT,
        score INTEGER NOT NULL,
        accuracy INTEGER NOT NULL,
        fluency INTEGER NOT NULL,
        completeness INTEGER NOT NULL,
        phoneme_details TEXT,
        stress_pattern TEXT,
        intonation_score INTEGER,
        errors TEXT,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);

    // Create pronunciation_progress table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS pronunciation_progress (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL,
        course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
        total_practices INTEGER NOT NULL DEFAULT 0,
        average_score INTEGER NOT NULL DEFAULT 0,
        improvement_rate INTEGER NOT NULL DEFAULT 0,
        weak_phonemes TEXT,
        strong_phonemes TEXT,
        last_practice_date TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);

    console.log("✓ Pronunciation tables created successfully!");
    console.log("✓ pronunciation_texts table created");
    console.log("✓ pronunciation_practice table created");
    console.log("✓ pronunciation_progress table created");
  } catch (error) {
    console.error("Error creating pronunciation tables:", error);
    throw error;
  }
}

createPronunciationTables()
  .then(() => {
    console.log("\n✅ Migration completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Migration failed:", error);
    process.exit(1);
  });
