import { NextResponse } from "next/server";
import db from "@/server/db/drizzle";
import { isAdmin } from "@/lib/admin";
import { socialMediaLinks } from "@/server/db/schema";
import { asc } from "drizzle-orm";

export const GET = async () => {
  // Public endpoint - no auth required for reading
  const data = await db.query.socialMediaLinks.findMany({
    orderBy: [asc(socialMediaLinks.order)],
  });

  return NextResponse.json(data);
};

export const POST = async (req: Request) => {
  if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

  const body = await req.json();

  const data = await db
    .insert(socialMediaLinks)
    .values({
      ...body,
      updatedAt: new Date(),
    })
    .returning();

  return NextResponse.json(data[0]);
};

