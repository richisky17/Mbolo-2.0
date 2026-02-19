import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import db from "@/server/db/drizzle";
import { isAdmin } from "@/lib/admin";
import { courses } from "@/server/db/schema";

export const GET = async (
  req: Request,
  { params }: { params: { courseId: string } }
) => {
  const courseId = parseInt(params.courseId, 10);

  if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

  const data = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
  });

  if (!data) {
    return new NextResponse("Not Found", { status: 404 });
  }

  // Ensure data is serializable by converting to plain object
  return NextResponse.json({
    id: data.id,
    title: data.title,
    imageSrc: data.imageSrc,
  });
};

export const PUT = async (
  req: Request,
  { params }: { params: { courseId: string } }
) => {
  const courseId = parseInt(params.courseId, 10);

  if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

  const body = await req.json();

  const data = await db
    .update(courses)
    .set({
      ...body,
    })
    .where(eq(courses.id, courseId))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: Request,
  { params }: { params: { courseId: string } }
) => {
  const courseId = parseInt(params.courseId, 10);

  if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

  const data = await db
    .delete(courses)
    .where(eq(courses.id, courseId))
    .returning();

  return NextResponse.json(data[0]);
};
