import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { quests } from "@/constants";
import { Button, Progress } from "@/components/ui";

type QuestsProps = {
  points: number;
};

const Quests = ({ points }: QuestsProps) => (
  <div className="border-2 border-emerald-200 rounded-2xl space-y-4 p-5 bg-gradient-to-br from-white to-emerald-50/30 shadow-md hover:shadow-lg transition-all duration-300 hover:border-emerald-300 backdrop-blur-sm">
    <div className="flex items-center justify-between w-full">
      <h3 className="font-bold text-lg bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Quests</h3>

      <Link href="/quests">
        <Button size="sm" variant="primaryOutline" className="border-emerald-300 text-emerald-600 hover:bg-emerald-50 hover:scale-105 transition-transform">
          View all
        </Button>
      </Link>
    </div>

    <ul className="w-full space-y-4">
      {quests.map((quest, i) => {
        const progress = (points / quest.value) * 100;

        return (
          <div
            key={quest.title}
            className={cn("flex items-center w-full gap-x-3 pb-4 transition-all duration-200 hover:translate-x-1", {
              hidden: i > 2,
            })}
          >
            <div className="relative">
              <Image src="/points.svg" alt="Points" width={40} height={40} className="drop-shadow-sm" />
              {progress >= 100 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full animate-pulse ring-2 ring-white" />
              )}
            </div>

            <div className="flex flex-col gap-y-2 w-full">
              <p className="text-neutral-700 text-sm font-bold">
                {quest.title}
              </p>

              <Progress value={progress} className="h-2 bg-emerald-100" />
            </div>
          </div>
        );
      })}
    </ul>
  </div>
);

export default Quests;
