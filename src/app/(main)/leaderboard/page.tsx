import Image from "next/image";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

import {
  getTopTenUsers,
  getUserProgress,
  getUserSubscription,
} from "@/server/db/queries";

import { Separator } from "@/components/ui";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";

import {
  FeedWrapper,
  UserProgress,
  StickyWrapper,
  Promo,
  Quests,
} from "@/components";

const LeaderboardPage = async () => {
  const user = await currentUser();

  const leaderboardData = getTopTenUsers();
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();

  const [leaderboard, userProgress, userSubscription] = await Promise.all([
    leaderboardData,
    userProgressData,
    userSubscriptionData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;

  return (
    <div className="flex flex-col md:flex-row md:gap-4 lg:gap-[48px] px-6 bg-black min-h-screen">
      {/* Mobile user progress - oscuro */}
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
            src="/leaderboard.svg"
            alt="Leaderboard"
            height={90}
            width={90}
          />

          <h1 className="text-center font-bold text-white text-2xl my-6">
            Tabla de clasificación
          </h1>

          <p className="text-gray-300 text-center text-balance text-lg mb-6">
            Comprueba cuál es tu nivel respecto al resto de alumnos de la comunidad.
          </p>

          <Separator className="mb-4 h-0.5 rounded-full bg-gray-800" />

          {leaderboard.map((userProgress, index) => (
            <div
              key={userProgress.userId}
              className="flex items-center justify-between w-full rounded-xl gap-4 hover:bg-gray-800/50 transition-colors p-2 px-4"
            >
              <p className="font-bold text-emerald-400 w-8 text-center">
                {index + 1}
              </p>

              <div className="flex items-center w-[87%] md:w-[84%] lg:w-[90%] gap-2">
                <Avatar className="border border-gray-700 bg-gray-800 h-8 w-8 lg:h-10 lg:w-10">
                  <AvatarImage
                    className="object-cover"
                    src={userProgress.userImageSrc}
                  />
                  <AvatarFallback className="text-white bg-gray-700">
                    {userProgress.userName?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>

                <p className="flex-1 font-bold text-white">
                  {user?.id === userProgress.userId && user.firstName !== userProgress.userName
                    ? user.firstName || "Anon"
                    : userProgress.userName}
                </p>

                <p className="text-emerald-400 text-sm lg:text-base font-semibold">
                  {userProgress.points} XP
                </p>
              </div>
            </div>
          ))}
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
        <Quests points={userProgress.points} />
      </StickyWrapper>
    </div>
  );
};

export default LeaderboardPage;