import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { auth } from "@clerk/nextjs/server";

import db from "@/server/db/drizzle";
import { changelog } from "@/server/db/schema";

export async function GET(req: Request) {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("_page") || "1");
  const perPage = parseInt(searchParams.get("_perPage") || "10");
  const offset = (page - 1) * perPage;

  try {
    const data = await db.query.changelog.findMany({
      limit: perPage,
      offset: offset,
      orderBy: (changelog, { desc }) => [desc(changelog.createdAt)],
    });

    const total = await db.query.changelog.findMany();

    return NextResponse.json(data, {
      headers: {
        "Content-Range": `changelog ${offset}-${offset + data.length}/${total.length}`,
        "Access-Control-Expose-Headers": "Content-Range",
      },
    });
  } catch (error) {
    console.error("Error fetching changelog:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const { userId } = auth();

  try {
    const body = await req.json();
    const { action, resourceType, resourceId, resourceName, changes } = body;

    const result = await db
      .insert(changelog)
      .values({
        userId: userId || "",
        action,
        resourceType,
        resourceId,
        resourceName,
        changes: changes ? JSON.stringify(changes) : null,
      })
      .returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error creating changelog entry:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

