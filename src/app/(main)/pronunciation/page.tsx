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
    const data = await db.query.pronunciationTexts.findMany({
      where: courseId
        ? or(
            eq(pronunciationTexts.courseId, courseId),
            isNull(pronunciationTexts.courseId)
          )
        : isNull(pronunciationTexts.courseId),
      orderBy: [asc(pronunciationTexts.order)],
      limit: 100,
    });
    if (data && data.length > 0) {
      return data.map((item) => item.text);
    }
  } catch (error) {
    console.error("Error al obtener los textos de pronunciación:", error);
  }
  return [];
}

export default async function PronunciationPage() {
  const userProgress = await getUserProgress();

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  const practiceTexts = await getPronunciationTexts(userProgress.activeCourseId);

  if (practiceTexts.length === 0) {
    return (
      <div className="flex flex-col md:flex-row md:gap-4 lg:gap-[48px] px-6 bg-black min-h-screen">
        <FeedWrapper>
          <div className="my-8 space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
                Entrenador de pronunciación
              </h1>
              <p className="text-gray-300 text-lg">
                Practica tu pronunciación con comentarios basados en inteligencia artificial.
              </p>
            </div>

            <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800 text-center">
              <div className="max-w-md mx-auto space-y-4">
                <div className="text-6xl mb-4">📝</div>
                <h2 className="text-2xl font-bold text-white">No hay textos de práctica disponibles.</h2>
                <p className="text-gray-300">
                  Los textos para practicar la pronunciación aún no se han creado. Pida al administrador que añada textos de práctica en el panel de administración.
                </p>
                <p className="text-sm text-gray-400 mt-4">
                  Los administradores pueden generar textos utilizando IA o crearlos manualmente.
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
    <div className="flex flex-col md:flex-row md:gap-4 lg:gap-[48px] px-6 bg-black min-h-screen">
      <FeedWrapper>
        <div className="my-8 space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
              Entrenador de pronunciación
            </h1>
            <p className="text-gray-300 text-lg">
              Practica tu pronunciación con comentarios basados en inteligencia artificial.
            </p>
          </div>

          <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
            <h2 className="text-xl font-bold text-white mb-4">
              Frases para practicar
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