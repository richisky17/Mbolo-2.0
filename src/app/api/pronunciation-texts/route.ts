import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import db from "@/server/db/drizzle";
import { pronunciationTexts } from "@/server/db/schema";
import { isAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  if (!isAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    const data = await db.query.pronunciationTexts.findMany({
      where: courseId ? eq(pronunciationTexts.courseId, parseInt(courseId)) : undefined,
      orderBy: (pronunciationTexts, { asc }) => [asc(pronunciationTexts.order)],
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

export async function POST(req: NextRequest) {
  if (!isAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { courseId, text, difficulty, category, order, aiGenerated, generatedPrompt } = body;

    const [newText] = await db
      .insert(pronunciationTexts)
      .values({
        courseId: courseId || null,
        text,
        difficulty: difficulty || "beginner",
        category: category || null,
        order: order || 0,
        aiGenerated: aiGenerated || false,
        generatedPrompt: generatedPrompt || null,
      })
      .returning();

    return NextResponse.json(newText);
  } catch (error) {
    console.error("Error creating pronunciation text:", error);
    return NextResponse.json(
      { error: "Failed to create pronunciation text" },
      { status: 500 }
    );
  }
}

