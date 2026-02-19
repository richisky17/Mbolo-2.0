import { lessons, units } from "@/server/db/schema";
import { cn } from "@/lib/utils";

import UnitBanner from "./unit-banner";
import LessonButton from "./lesson-button";

type UnitProps = {
  id: number;
  title: string;
  description: string;
  lessons: (typeof lessons.$inferSelect & {
    completed: boolean;
  })[];
  activeLesson:
    | (typeof lessons.$inferSelect & {
        unit: typeof units.$inferSelect;
      })
    | undefined;
  activeLessonPercentage: number;
};

const Unit = ({
  id,
  title,
  description,
  lessons,
  activeLesson,
  activeLessonPercentage,
}: UnitProps) => {
  let unitAccess = false;
  const allCompletedLessons = lessons.every((lesson) => lesson.completed);

  if (activeLesson?.unitId === id || allCompletedLessons) unitAccess = true;

  return (
    <>
      <UnitBanner title={title} description={description} access={unitAccess} />

      <div className="relative flex flex-col items-center my-8">
        {lessons.map((lesson, index) => {
          const isCurrent = lesson.id === activeLesson?.id;
          const isLocked = !lesson.completed && !isCurrent;
          const isCompleted = lesson.completed && !isCurrent;
          const activeLessonIndex = activeLesson ? lessons.findIndex(l => l.id === activeLesson.id) : -1;
          const isNext = activeLessonIndex >= 0 && index === activeLessonIndex + 1;
          
          return (
            <div key={lesson.id} className="relative flex flex-col items-center">
              {/* Connecting line */}
              {index < lessons.length - 1 && (
                <div 
                  className={cn(
                    "absolute top-[70px] w-0.5 transition-all duration-500 z-0",
                    {
                      "h-8 bg-gradient-to-b from-emerald-400 to-teal-400": isCompleted || isCurrent,
                      "h-8 bg-gradient-to-b from-emerald-300/50 to-teal-300/50": isNext && !isLocked,
                      "h-8 bg-neutral-200": !isCompleted && !isCurrent && !isNext,
                    }
                  )}
                  style={{
                    transform: `translateX(${(index % 2 === 0 ? -1 : 1) * 20}px)`,
                  }}
                />
              )}
              
              <LessonButton
                id={lesson.id}
                index={index}
                totalCount={lessons.length - 1}
                current={isCurrent}
                locked={isLocked}
                percentage={activeLessonPercentage}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Unit;
