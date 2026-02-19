import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";

import db from "@/server/db/drizzle";
import { appSettings } from "@/server/db/schema";

export async function GET(
  req: Request,
  { params }: { params: { settingId: string } }
) {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const data = await db.query.appSettings.findFirst({
    where: eq(appSettings.id, parseInt(params.settingId)),
  });

  if (!data) {
    return new NextResponse("Not Found", { status: 404 });
  }

  return NextResponse.json(data);
}

export async function PUT(
  req: Request,
  { params }: { params: { settingId: string } }
) {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  try {
    const body = await req.json();
    const { key, value } = body;

    if (!key || value === undefined) {
      return new NextResponse("Key and value are required", { status: 400 });
    }

    const result = await db
      .update(appSettings)
      .set({ key, value, updatedAt: new Date() })
      .where(eq(appSettings.id, parseInt(params.settingId)))
      .returning();

    if (!result.length) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error updating setting:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { settingId: string } }
) {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  try {
    await db
      .delete(appSettings)
      .where(eq(appSettings.id, parseInt(params.settingId)));

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting setting:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

