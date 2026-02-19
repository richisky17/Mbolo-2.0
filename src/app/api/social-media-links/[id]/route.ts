import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import db from "@/server/db/drizzle";
import { isAdmin } from "@/lib/admin";
import { socialMediaLinks } from "@/server/db/schema";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const linkId = parseInt(id, 10);

  if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

  const data = await db.query.socialMediaLinks.findFirst({
    where: eq(socialMediaLinks.id, linkId),
  });

  return NextResponse.json(data);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const linkId = parseInt(id, 10);

  if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

  const body = await req.json();

  const data = await db
    .update(socialMediaLinks)
    .set({
      ...body,
      updatedAt: new Date(),
    })
    .where(eq(socialMediaLinks.id, linkId))
    .returning();

  return NextResponse.json(data[0]);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const linkId = parseInt(id, 10);

  if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

  const data = await db.delete(socialMediaLinks).where(eq(socialMediaLinks.id, linkId)).returning();

  return NextResponse.json(data[0]);
}


