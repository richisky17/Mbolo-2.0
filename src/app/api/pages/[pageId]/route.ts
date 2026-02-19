import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import db from "@/server/db/drizzle";
import { isAdmin } from "@/lib/admin";
import { pages } from "@/server/db/schema";

export const GET = async (
  req: Request,
  { params }: { params: { pageId: string } }
) => {
  const pageId = parseInt(params.pageId, 10);

  if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

  const data = await db.query.pages.findFirst({
    where: eq(pages.id, pageId),
  });

  return NextResponse.json(data);
};

export const PUT = async (
  req: Request,
  { params }: { params: { pageId: string } }
) => {
  const pageId = parseInt(params.pageId, 10);

  if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

  const body = await req.json();

  const data = await db
    .update(pages)
    .set({
      ...body,
      updatedAt: new Date(),
    })
    .where(eq(pages.id, pageId))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: Request,
  { params }: { params: { pageId: string } }
) => {
  const pageId = parseInt(params.pageId, 10);

  if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

  const data = await db.delete(pages).where(eq(pages.id, pageId)).returning();

  return NextResponse.json(data[0]);
};

