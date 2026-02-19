import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const sql = neon(process.env.DATABASE_URL!);

const main = async () => {
  try {
    console.log("Creating app_settings table...");

    await sql`
      CREATE TABLE IF NOT EXISTS app_settings (
        id SERIAL PRIMARY KEY,
        key TEXT NOT NULL UNIQUE,
        value TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `;

    console.log("✓ app_settings table created successfully");

    // Insert default settings
    console.log("Inserting default settings...");

    const defaults = [
      { key: "subscription_price", value: "20" },
      { key: "subscription_currency", value: "USD" },
      { key: "subscription_interval", value: "month" },
    ];

    for (const setting of defaults) {
      await sql`
        INSERT INTO app_settings (key, value, updated_at)
        VALUES (${setting.key}, ${setting.value}, NOW())
        ON CONFLICT (key) DO NOTHING;
      `;
    }

    console.log("✓ Default settings inserted");
    console.log("✓ Database setup complete!");
  } catch (error) {
    console.error("Error setting up database:", error);
    throw error;
  }
};

main();

