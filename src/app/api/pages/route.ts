import { NextResponse } from "next/server";
import db from "@/server/db/drizzle";
import { isAdmin } from "@/lib/admin";
import { pages } from "@/server/db/schema";

export const GET = async () => {
  if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

  const data = await db.query.pages.findMany({
    orderBy: (pages, { desc }) => [desc(pages.createdAt)],
  });

  return NextResponse.json(data);
};

export const POST = async (req: Request) => {
  if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

  const body = await req.json();

  const data = await db
    .insert(pages)
    .values({
      ...body,
      updatedAt: new Date(),
    })
    .returning();

  return NextResponse.json(data[0]);
};

