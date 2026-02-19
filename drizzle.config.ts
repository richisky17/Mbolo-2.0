//import { defineConfig } from "drizzle-kit";

//export default defineConfig({
  //dialect: "postgresql",
  //schema: "./src/server/db/schema.ts",
  //dbCredentials: {
    //url: process.env.DATABASE_URL as string,
  //},
//;

import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: '.env.local' });

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/server/db/schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
});
