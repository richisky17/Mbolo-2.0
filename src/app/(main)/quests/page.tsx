import Image from "next/image";
import { redirect } from "next/navigation";

import { quests } from "@/constants";
import { getUserProgress, getUserSubscription } from "@/server/db/queries";
import { FeedWrapper, UserProgress, StickyWrapper, Promo } from "@/components";

const QuestsPage = async () => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();

  const [userProgress, userSubscription] = await Promise.all([
    userProgressData,
    userSubscriptionData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;

  // Componente de barra de progreso personalizada
  const ProgressBar = ({ value, isCompleted }: { value: number; isCompleted: boolean }) => (
    <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
      <div
        className={`h-full transition-all duration-500 ${
          isCompleted
            ? "bg-emerald-500"
            : "bg-gradient-to-r from-emerald-500 to-teal-500"
        }`}
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row md:gap-4 lg:gap-[48px] px-6 bg-black min-h-screen">
      {/* Mobile user progress */}
      <div className="sticky top-[60px] bg-black/80 backdrop-blur-sm md:hidden border-b border-gray-800 z-50 py-3">
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
      </div>

      <FeedWrapper>
        <div className="flex flex-col items-center w-full mt-7">
          <Image
            src="/quests.svg"
            alt="Quests"
            height={90}
            width={90}
           
          />

          <h1 className="text-center font-bold text-white text-2xl my-6">
            Misiones
          </h1>

          <p className="text-gray-300 text-center text-balance text-lg mb-6">
            Completa misiones ganando puntos.
          </p>

          <ul className="w-full space-y-4">
            {quests.map((quest) => {
              const progress = (userProgress.points / quest.value) * 100;
              const isCompleted = progress >= 100;

              return (
                <li
                  key={quest.title}
                  className={`flex items-center w-full gap-x-4 p-4 rounded-xl border transition-all duration-300 ${
                    isCompleted
                      ? "border-emerald-500/50 bg-emerald-900/20"
                      : "border-gray-800 bg-gray-900/30 hover:border-gray-700"
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <Image
                      src="/points.svg"
                      alt="Points"
                      width={60}
                      height={60}
                     
                    />
                    {isCompleted && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                        ✓
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-y-2 w-full">
                    <div className="flex justify-between items-center">
                      <p className={`font-bold text-lg ${
                        isCompleted ? "text-emerald-400" : "text-white"
                      }`}>
                        {quest.title}
                      </p>
                      <span className="text-sm text-gray-400">
                        {userProgress.points} / {quest.value} XP
                      </span>
                    </div>

                    <ProgressBar value={progress} isCompleted={isCompleted} />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </FeedWrapper>

      <StickyWrapper className="mt-6">
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />

        {!isPro && <Promo />}
      </StickyWrapper>
    </div>
  );
};

export default QuestsPage;