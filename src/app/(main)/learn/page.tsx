import { redirect } from "next/navigation";

import {
  FeedWrapper,
  StickyWrapper,
  UserProgress,
  Promo,
  Quests,
} from "@/components";

import {
  getCourseProgress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
  getUserSubscription,
} from "@/server/db/queries";

import Unit from "./unit";
import Header from "./header";

const LearnPage = async () => {
  const unitsData = getUnits();
  const userProgressData = getUserProgress();
  const courseProgressData = getCourseProgress();
  const lessonPercentageData = getLessonPercentage();
  const userSubscriptionData = getUserSubscription();

  const [
    units,
    userProgress,
    courseProgress,
    lessonPercentage,
    userSubscription,
  ] = await Promise.all([
    unitsData,
    userProgressData,
    courseProgressData,
    lessonPercentageData,
    userSubscriptionData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  if (!courseProgress) {
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;

  return (
    <div className="flex flex-col md:flex-row md:gap-4 lg:gap-[48px] px-6 bg-gradient-to-br from-emerald-50/30 via-white to-teal-50/30 min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-emerald-100/10 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>
      
      <div className="md:hidden border-b-2 border-emerald-100 bg-white/80 backdrop-blur-sm py-3">
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
      </div>

      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />

        {units.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 mt-10 p-8 border-2 border-dashed border-emerald-200 rounded-2xl bg-gradient-to-br from-emerald-50/50 to-teal-50/50 backdrop-blur-sm">
            <p className="text-xl text-neutral-600 font-semibold">
              This course doesn&apos;t have any lessons yet.
            </p>
            <p className="text-sm text-neutral-500">
              Check back later or select a different course!
            </p>
          </div>
        ) : (
          units.map((unit, i) => (
            <div key={i} className="mb-12 pt-8">
              <Unit
                id={unit.id}
                title={unit.title}
                description={unit.description}
                lessons={unit.lessons}
                activeLesson={courseProgress.activeLesson}
                activeLessonPercentage={lessonPercentage}
              />
            </div>
          ))
        )}
      </FeedWrapper>

      <StickyWrapper className="mt-6">
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />

        {!isPro && <Promo />}
        <Quests points={userProgress.points} />
      </StickyWrapper>
    </div>
  );
};

export default LearnPage;
