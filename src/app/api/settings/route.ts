import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";

import db from "@/server/db/drizzle";
import { appSettings } from "@/server/db/schema";

export async function GET(req: Request) {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("_page") || "1");
  const perPage = parseInt(searchParams.get("_perPage") || "10");
  const offset = (page - 1) * perPage;

  try {
    const data = await db.query.appSettings.findMany({
      limit: perPage,
      offset: offset,
      orderBy: (appSettings, { asc }) => [asc(appSettings.key)],
    });

    const total = await db.query.appSettings.findMany();

    return NextResponse.json(data, {
      headers: {
        "Content-Range": `settings ${offset}-${offset + data.length}/${total.length}`,
        "Access-Control-Expose-Headers": "Content-Range",
      },
    });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  try {
    const body = await req.json();
    const { key, value } = body;

    if (!key || value === undefined) {
      return new NextResponse("Key and value are required", { status: 400 });
    }

    // Check if setting exists
    const existing = await db.query.appSettings.findFirst({
      where: eq(appSettings.key, key),
    });

    let result;
    if (existing) {
      // Update existing setting
      result = await db
        .update(appSettings)
        .set({ value, updatedAt: new Date() })
        .where(eq(appSettings.key, key))
        .returning();
    } else {
      // Create new setting
      result = await db
        .insert(appSettings)
        .values({ key, value })
        .returning();
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error saving setting:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

