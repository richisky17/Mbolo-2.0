import { redirect } from "next/navigation";
import { getUserProgress } from "@/server/db/queries";
import db from "@/server/db/drizzle";
import { pronunciationTexts } from "@/server/db/schema";
import { eq, isNull, asc, or } from "drizzle-orm";
import PronunciationPractice from "@/components/pronunciation/PronunciationPractice";
import PronunciationProgress from "@/components/pronunciation/PronunciationProgress";
import { FeedWrapper, StickyWrapper, UserProgress } from "@/components";

async function getPronunciationTexts(courseId: number | null) {
  try {
    // Fetch texts that are either:
    // 1. Matching the user's courseId
    // 2. Global texts (courseId = null) - available for all courses
    const data = await db.query.pronunciationTexts.findMany({
      where: courseId
        ? or(
            eq(pronunciationTexts.courseId, courseId),
            isNull(pronunciationTexts.courseId)
          )
        : isNull(pronunciationTexts.courseId),
      orderBy: [asc(pronunciationTexts.order)],
      limit: 100, // Increased limit to show all texts
    });

    if (data && data.length > 0) {
      return data.map((item) => item.text);
    }
  } catch (error) {
    console.error("Error fetching pronunciation texts:", error);
  }
  return []; // Return empty array instead of fallback texts
}

export default async function PronunciationPage() {
  const userProgress = await getUserProgress();

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  const practiceTexts = await getPronunciationTexts(userProgress.activeCourseId);

  // If no texts exist, show message to admin
  if (practiceTexts.length === 0) {
    return (
      <div className="flex flex-col md:flex-row md:gap-4 lg:gap-[48px] px-6 bg-gradient-to-br from-emerald-50/30 via-white to-teal-50/30 min-h-screen">
        <FeedWrapper>
          <div className="my-8 space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                Pronunciation Coach
              </h1>
              <p className="text-gray-600 text-lg">
                Practice your pronunciation with AI-powered feedback
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-emerald-200 shadow-lg text-center">
              <div className="max-w-md mx-auto space-y-4">
                <div className="text-6xl mb-4">📝</div>
                <h2 className="text-2xl font-bold text-gray-800">No Practice Texts Available</h2>
                <p className="text-gray-600">
                  Pronunciation practice texts haven&apos;t been created yet. Please ask your administrator to add practice texts in the admin panel.
                </p>
                <p className="text-sm text-gray-500 mt-4">
                  Admins can generate texts using AI or create them manually.
                </p>
              </div>
            </div>
          </div>
        </FeedWrapper>

        <StickyWrapper className="mt-6">
          <UserProgress
            activeCourse={userProgress.activeCourse}
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={false}
          />
          <PronunciationProgress courseId={userProgress.activeCourseId || undefined} />
        </StickyWrapper>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row md:gap-4 lg:gap-[48px] px-6 bg-gradient-to-br from-emerald-50/30 via-white to-teal-50/30 min-h-screen">
      <FeedWrapper>
        <div className="my-8 space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
              Pronunciation Coach
            </h1>
            <p className="text-gray-600 text-lg">
              Practice your pronunciation with AI-powered feedback
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border-2 border-emerald-200 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Practice Phrases
            </h2>
            <div className="space-y-4">
              {practiceTexts.map((text, index) => (
                <PronunciationPractice
                  key={index}
                  targetText={text}
                  courseId={userProgress.activeCourseId || undefined}
                />
              ))}
            </div>
          </div>
        </div>
      </FeedWrapper>

      <StickyWrapper className="mt-6">
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
        <PronunciationProgress courseId={userProgress.activeCourseId || undefined} />
      </StickyWrapper>
    </div>
  );
}

