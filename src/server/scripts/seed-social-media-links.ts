import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding social media links...");

    const defaultLinks = [
      {
        platform: "facebook",
        url: "https://facebook.com/Mboloapp",
        order: 0,
      },
      {
        platform: "twitter",
        url: "https://twitter.com/Mboloapp",
        order: 1,
      },
      {
        platform: "instagram",
        url: "https://instagram.com/Mboloapp",
        order: 2,
      },
      {
        platform: "youtube",
        url: "https://youtube.com/@Mboloapp",
        order: 3,
      },
    ];

    for (const link of defaultLinks) {
      await sql`
        INSERT INTO social_media_links (platform, url, "order", created_at, updated_at)
        VALUES (${link.platform}, ${link.url}, ${link.order}, NOW(), NOW())
        ON CONFLICT DO NOTHING
      `;
    }

    console.log("✅ Social media links seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding social media links:", error);
    throw error;
  }
};

main();

