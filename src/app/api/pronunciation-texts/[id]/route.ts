import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import db from "@/server/db/drizzle";
import { pronunciationTexts } from "@/server/db/schema";
import { isAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const textId = parseInt(id, 10);

    const data = await db.query.pronunciationTexts.findFirst({
      where: eq(pronunciationTexts.id, textId),
    });

    if (!data) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching pronunciation text:", error);
    return NextResponse.json(
      { error: "Failed to fetch pronunciation text" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const textId = parseInt(id, 10);
    const body = await req.json();
    const { courseId, text, difficulty, category, order, aiGenerated, generatedPrompt } = body;

    const [updated] = await db
      .update(pronunciationTexts)
      .set({
        courseId: courseId !== undefined ? courseId : undefined,
        text: text || undefined,
        difficulty: difficulty || undefined,
        category: category !== undefined ? category : undefined,
        order: order !== undefined ? order : undefined,
        aiGenerated: aiGenerated !== undefined ? aiGenerated : undefined,
        generatedPrompt: generatedPrompt !== undefined ? generatedPrompt : undefined,
        updatedAt: new Date(),
      })
      .where(eq(pronunciationTexts.id, textId))
      .returning();

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating pronunciation text:", error);
    return NextResponse.json(
      { error: "Failed to update pronunciation text" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const textId = parseInt(id, 10);

    await db.delete(pronunciationTexts).where(eq(pronunciationTexts.id, textId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting pronunciation text:", error);
    return NextResponse.json(
      { error: "Failed to delete pronunciation text" },
      { status: 500 }
    );
  }
}

