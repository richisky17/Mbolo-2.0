import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { quests } from "@/constants";
import { Button, Progress } from "@/components/ui";

type QuestsProps = {
  points: number;
};

const Quests = ({ points }: QuestsProps) => (
  <div className="border border-gray-800 rounded-2xl space-y-4 p-5 bg-gradient-to-br from-gray-900 to-gray-950 shadow-md hover:shadow-lg transition-all duration-300 hover:border-gray-700 backdrop-blur-sm">
    <div className="flex items-center justify-between w-full">
      <h3 className="font-bold text-lg bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
        Misiones
      </h3>

      <Link href="/quests">
        <Button size="sm" variant="primaryOutline" className="border-gray-700 text-emerald-400 hover:bg-gray-800 hover:scale-105 transition-transform">
          Ver todo
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
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full animate-pulse ring-2 ring-gray-800" />
              )}
            </div>

            <div className="flex flex-col gap-y-2 w-full">
              <p className="text-gray-300 text-sm font-bold">
                {quest.title}
              </p>

              <Progress value={progress} className="h-2 bg-gray-800" />
            </div>
          </div>
        );
      })}
    </ul>
  </div>
);

export default Quests;