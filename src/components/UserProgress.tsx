import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui";
import { InfinityIcon } from "lucide-react";

import { courses } from "@/server/db/schema";

interface UserProgressProps {
  activeCourse: typeof courses.$inferSelect;
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
}

const UserProgress = ({
  activeCourse,
  hearts,
  points,
  hasActiveSubscription,
}: UserProgressProps) => (
  <div className="flex w-full items-center justify-between md:gap-x-0.5 lg:gap-x-2">
    <Link href="/courses">
      <Button variant="defaultOutline" className="border-gray-700 bg-gray-900 hover:bg-gray-800">
        <Image
          alt={activeCourse.title}
          src={activeCourse.imageSrc}
          height={32}
          width={32}
          className="rounded-md border border-gray-700"
        />
      </Button>
    </Link>

    <Link href="/shop">
      <Button variant="defaultOutline" className="border-gray-700 bg-gray-900 hover:bg-gray-800 text-orange-400">
        <Image
          alt="Points"
          src="/points.svg"
          height={28}
          width={28}
          
        />
        {points}
      </Button>
    </Link>

    <Link href="/shop">
      <Button variant="defaultOutline" className="border-gray-700 bg-gray-900 hover:bg-gray-800 text-rose-400">
        <Image
          alt="Hearts"
          src="/heart.svg"
          height={22}
          width={22}
          
        />
        {hasActiveSubscription ? (
          <InfinityIcon className="h-4 w-4 stroke-[3]" />
        ) : (
          hearts
        )}
      </Button>
    </Link>
  </div>
);

export default UserProgress;