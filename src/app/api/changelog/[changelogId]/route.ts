import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";

import db from "@/server/db/drizzle";
import { changelog } from "@/server/db/schema";

export async function GET(
  req: Request,
  { params }: { params: { changelogId: string } }
) {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const data = await db.query.changelog.findFirst({
    where: eq(changelog.id, parseInt(params.changelogId)),
  });

  if (!data) {
    return new NextResponse("Not Found", { status: 404 });
  }

  return NextResponse.json(data);
}

