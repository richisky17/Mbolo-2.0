import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import db from "@/server/db/drizzle";
import { pronunciationPractice, pronunciationProgress } from "@/server/db/schema";
import { eq, and, isNull, desc } from "drizzle-orm";

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      courseId,
      text,
      targetText,
      audioUrl,
      score,
      accuracy,
      fluency,
      completeness,
      phonemeDetails,
      stressPattern,
      intonationScore,
      errors,
    } = body;

    // Save practice session
    const [practice] = await db
      .insert(pronunciationPractice)
      .values({
        userId,
        courseId: courseId || null,
        text,
        targetText,
        audioUrl: audioUrl || null,
        score,
        accuracy,
        fluency,
        completeness,
        phonemeDetails: JSON.stringify(phonemeDetails),
        stressPattern: JSON.stringify(stressPattern),
        intonationScore: intonationScore || score,
        errors: JSON.stringify(errors),
      })
      .returning();

    // Update progress
    const existingProgress = await db.query.pronunciationProgress.findFirst({
      where: and(
        eq(pronunciationProgress.userId, userId),
        courseId
          ? eq(pronunciationProgress.courseId, courseId)
          : isNull(pronunciationProgress.courseId)
      ),
    });

    if (existingProgress) {
      const totalPractices = existingProgress.totalPractices + 1;
      const averageScore = Math.round(
        (existingProgress.averageScore * existingProgress.totalPractices + score) /
          totalPractices
      );

      // Calculate improvement rate
      // Get previous scores to calculate improvement
      const previousPractices = await db.query.pronunciationPractice.findMany({
        where: and(
          eq(pronunciationPractice.userId, userId),
          courseId
            ? eq(pronunciationPractice.courseId, courseId)
            : isNull(pronunciationPractice.courseId)
        ),
        orderBy: [desc(pronunciationPractice.createdAt)],
        limit: 10,
      });

      const previousScores = previousPractices
        .slice(1) // Exclude current practice
        .map((p) => p.score);

      let improvementRate = 0;
      if (previousScores.length > 0) {
        const previousAverage = previousScores.reduce((a, b) => a + b, 0) / previousScores.length;
        improvementRate = Math.round(((score - previousAverage) / previousAverage) * 100);
      }

      await db
        .update(pronunciationProgress)
        .set({
          totalPractices: totalPractices,
          averageScore: averageScore,
          improvementRate: improvementRate,
          lastPracticeDate: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(pronunciationProgress.id, existingProgress.id));
    } else {
      await db.insert(pronunciationProgress).values({
        userId,
        courseId: courseId || null,
        totalPractices: 1,
        averageScore: score,
        improvementRate: 0,
        lastPracticeDate: new Date(),
      });
    }

    return NextResponse.json({ success: true, practiceId: practice.id });
  } catch (error) {
    console.error("Error saving pronunciation:", error);
    return NextResponse.json(
      { error: "Failed to save pronunciation" },
      { status: 500 }
    );
  }
}

