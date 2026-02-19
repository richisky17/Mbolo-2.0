import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import db from "@/server/db/drizzle";
import { isAdmin } from "@/lib/admin";
import { challengeOptions } from "@/server/db/schema";

export const GET = async (
  req: Request,
  { params }: { params: { challengeOptionId: string } }
) => {
  const challengeOptionId = parseInt(params.challengeOptionId, 10);

  if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

  const data = await db.query.challengeOptions.findFirst({
    where: eq(challengeOptions.id, challengeOptionId),
  });

  return NextResponse.json(data);
};

export const PUT = async (
  req: Request,
  { params }: { params: { challengeOptionId: string } }
) => {
  const challengeOptionId = parseInt(params.challengeOptionId, 10);

  if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

  const body = await req.json();

  const data = await db
    .update(challengeOptions)
    .set({
      ...body,
    })
    .where(eq(challengeOptions.id, challengeOptionId))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: Request,
  { params }: { params: { challengeOptionId: string } }
) => {
  const challengeOptionId = parseInt(params.challengeOptionId, 10);

  if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

  const data = await db
    .delete(challengeOptions)
    .where(eq(challengeOptions.id, challengeOptionId))
    .returning();

  return NextResponse.json(data[0]);
};
