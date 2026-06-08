import Image from "next/image";
import { redirect } from "next/navigation";

import Items from "./items";
import { getUserProgress, getUserSubscription } from "@/server/db/queries";
import { FeedWrapper, UserProgress, StickyWrapper, Quests } from "@/components";

const ShopPage = async () => {
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
            src="/shop.svg"
            alt="Shop"
            height={90}
            width={90}
          />

          <h1 className="text-center font-bold text-white text-2xl my-6">
            Tienda
          </h1>

          <p className="text-gray-300 text-center text-balance text-lg mb-6">
            Gasta tus puntos en cosas geniales.
          </p>

          <Items
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={isPro}
          />
        </div>
      </FeedWrapper>

      <StickyWrapper className="mt-6">
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />

        <Quests points={userProgress.points} />
      </StickyWrapper>
    </div>
  );
};

export default ShopPage;