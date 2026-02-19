import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import db from "@/server/db/drizzle";
import { pages } from "@/server/db/schema";

export const GET = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  const slug = params.slug;

  const data = await db.query.pages.findFirst({
    where: eq(pages.slug, slug),
  });

  if (!data || data.status !== "published") {
    return new NextResponse("Page not found", { status: 404 });
  }

  return NextResponse.json(data);
};

