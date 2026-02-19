import { NextRequest, NextResponse } from "next/server";
import db from "@/server/db/drizzle";
import { pronunciationTexts } from "@/server/db/schema";
import { eq, isNull, or } from "drizzle-orm";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");
    const difficulty = searchParams.get("difficulty");

    const data = await db.query.pronunciationTexts.findMany({
      where: (pronunciationTexts, { eq, and }) => {
        const conditions = [];
        
        if (courseId) {
          conditions.push(eq(pronunciationTexts.courseId, parseInt(courseId)));
        } else {
          conditions.push(isNull(pronunciationTexts.courseId));
        }
        
        if (difficulty) {
          conditions.push(eq(pronunciationTexts.difficulty, difficulty));
        }

        return conditions.length > 0 ? and(...conditions) : undefined;
      },
      orderBy: (pronunciationTexts, { asc }) => [asc(pronunciationTexts.order)],
      limit: 10,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching pronunciation texts:", error);
    return NextResponse.json(
      { error: "Failed to fetch pronunciation texts" },
      { status: 500 }
    );
  }
}

