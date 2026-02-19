"use client";

import Link from "next/link";
import { Check, Crown, Star } from "lucide-react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";

import "react-circular-progressbar/dist/styles.css";

type LessonButtonProps = {
  id: number;
  index: number;
  totalCount: number;
  current?: boolean;
  locked?: boolean;
  percentage: number;
};

const LessonButton = ({
  id,
  index,
  totalCount,
  current,
  locked,
  percentage,
}: LessonButtonProps) => {
  // determining indentation level based on the index of the lesson
  const cycleLength = 8;
  const cycleIndex = index % cycleLength;

  let indentationLevel;

  if (cycleIndex <= 2) {
    indentationLevel = cycleIndex;
  } else if (cycleIndex <= 4) {
    indentationLevel = 4 - cycleIndex;
  } else if (cycleIndex <= 6) {
    indentationLevel = 4 - cycleIndex;
  } else {
    indentationLevel = cycleIndex - 8;
  }

  const rightPosition = indentationLevel * 40;

  // checking if it's the first or last lesson, or if it's completed
  const isFirst = index === 0;
  const isLast = index === totalCount;
  const isCompleted = !current && !locked;

  const Icon = isCompleted ? Check : isLast ? Crown : Star;

  const href = isCompleted ? `/lesson/${id}` : "/lesson";

  return (
    <Link
      href={href}
      aria-disabled={locked}
      style={{ pointerEvents: locked ? "none" : "auto" }}
    >
      <div
        className="relative"
        style={{
          right: `${rightPosition}px`,
          marginTop: isFirst && !isCompleted ? 60 : 24,
        }}
      >
        {current ? (
          <div className="relative h-[102px] w-[102px]">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full blur-xl opacity-60 animate-pulse" />
            
            <div className="absolute -top-6 left-2.5 border-2 border-emerald-400 font-bold uppercase text-emerald-600 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl animate-bounce tracking-wide z-10 px-3 py-2.5 shadow-lg backdrop-blur-sm">
              Start
              <div className="absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-emerald-400 transform -translate-x-1/2" />
            </div>

            <CircularProgressbarWithChildren
              value={Number.isNaN(percentage) ? 0 : percentage}
              styles={{
                path: {
                  stroke: "#10b981",
                  strokeWidth: 8,
                  filter: "drop-shadow(0 0 3px rgba(16, 185, 129, 0.5))",
                },
                trail: {
                  stroke: "#d1fae5",
                },
              }}
            >
              <Button
                size="rounded"
                variant={locked ? "locked" : "secondary"}
                className={cn(
                  "h-[70px] w-[70px] border-b-8 shadow-lg hover:shadow-xl transition-all duration-300 relative",
                  !locked && "bg-gradient-to-br from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 border-emerald-700 ring-4 ring-emerald-200/50 animate-pulse"
                )}
              >
                <Icon
                  className={cn(
                    "h-10 w-10 relative z-10",
                    locked
                      ? "fill-neutral-400 text-neutral-400 stroke-neutral-400"
                      : "fill-white text-white drop-shadow-lg",
                    { "fill-none stroke-[4]": isCompleted }
                  )}
                />
              </Button>
            </CircularProgressbarWithChildren>
          </div>
        ) : (
          <Button
            size="rounded"
            variant={locked ? "locked" : "secondary"}
            className={cn(
              "h-[70px] w-[70px] border-b-8 transition-all duration-300 relative group",
              !locked && !isCompleted && "bg-gradient-to-br from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 border-emerald-700 shadow-lg hover:shadow-xl hover:scale-110",
              isCompleted && "bg-gradient-to-br from-emerald-400 to-teal-400 border-emerald-600 shadow-md ring-2 ring-emerald-200/50",
              locked && "shadow-sm"
            )}
          >
            {/* Hover glow effect */}
            {!locked && !isCompleted && (
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
            )}
            
            <Icon
              className={cn(
                "h-10 w-10 relative z-10",
                locked
                  ? "fill-neutral-400 text-neutral-400 stroke-neutral-400"
                  : isCompleted 
                    ? "fill-white text-white stroke-white"
                    : "fill-white text-white",
                { "fill-none stroke-[4] stroke-white": isCompleted }
              )}
            />
          </Button>
        )}
      </div>
    </Link>
  );
};

export default LessonButton;
