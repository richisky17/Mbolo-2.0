import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Creating social_media_links table...");

    // Create social_media_links table
    await sql(`
      CREATE TABLE IF NOT EXISTS social_media_links (
        id SERIAL PRIMARY KEY,
        platform TEXT NOT NULL,
        url TEXT NOT NULL,
        "order" INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    console.log("✅ Social media links table created successfully!");
  } catch (error) {
    console.error("❌ Error creating social media links table:", error);
    throw error;
  }
};

main();

