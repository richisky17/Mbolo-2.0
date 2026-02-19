import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import db from "@/server/db/drizzle";
import { pronunciationProgress, pronunciationPractice } from "@/server/db/schema";
import { eq, and, desc, isNull } from "drizzle-orm";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    // Get progress - ensure it's user-specific
    const progress = await db.query.pronunciationProgress.findFirst({
      where: and(
        eq(pronunciationProgress.userId, userId),
        courseId
          ? eq(pronunciationProgress.courseId, parseInt(courseId))
          : isNull(pronunciationProgress.courseId)
      ),
    });

    // Get recent practices for graph - ensure it's user-specific
    const recentPractices = await db.query.pronunciationPractice.findMany({
      where: and(
        eq(pronunciationPractice.userId, userId),
        courseId
          ? eq(pronunciationPractice.courseId, parseInt(courseId))
          : isNull(pronunciationPractice.courseId)
      ),
      orderBy: [desc(pronunciationPractice.createdAt)],
      limit: 30,
    });

    // Calculate improvement rate dynamically if not stored
    let improvementRate = 0;
    if (recentPractices.length > 1) {
      const currentScore = recentPractices[0]?.score || 0;
      const previousScores = recentPractices
        .slice(1, 6) // Get last 5 practices (excluding current)
        .map((p) => p.score);
      
      if (previousScores.length > 0) {
        const previousAverage = previousScores.reduce((a, b) => a + b, 0) / previousScores.length;
        if (previousAverage > 0) {
          improvementRate = Math.round(((currentScore - previousAverage) / previousAverage) * 100);
        }
      }
    }

    const scores = recentPractices.map((p) => ({
      date: p.createdAt.toISOString(),
      score: p.score,
      accuracy: p.accuracy,
      fluency: p.fluency,
    }));

    return NextResponse.json({
      progress: progress ? {
        ...progress,
        improvementRate: progress.improvementRate || improvementRate,
      } : {
        totalPractices: recentPractices.length,
        averageScore: recentPractices.length > 0
          ? Math.round(recentPractices.reduce((sum, p) => sum + p.score, 0) / recentPractices.length)
          : 0,
        improvementRate: improvementRate,
        weakPhonemes: [],
        strongPhonemes: [],
      },
      recentScores: scores,
    });
  } catch (error) {
    console.error("Error fetching pronunciation progress:", error);
    return NextResponse.json(
      { error: "Failed to fetch progress" },
      { status: 500 }
    );
  }
}

