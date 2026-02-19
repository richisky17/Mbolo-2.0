import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const sql = neon(process.env.DATABASE_URL!);

const main = async () => {
  try {
    console.log("Creating changelog table...");

    await sql`
      CREATE TABLE IF NOT EXISTS changelog (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL,
        action TEXT NOT NULL,
        resource_type TEXT NOT NULL,
        resource_id TEXT NOT NULL,
        resource_name TEXT,
        changes TEXT,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `;

    console.log("✓ changelog table created successfully");
    console.log("✓ Database setup complete!");
  } catch (error) {
    console.error("Error setting up database:", error);
    throw error;
  }
};

main();

