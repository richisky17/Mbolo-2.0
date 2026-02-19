"use client";

import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { Card } from "./card";
import { courses, userProgress, units, lessons } from "@/server/db/schema";
import { upsertUserProgress } from "@/server/actions/user-progress";

type ListProps = {
  courses: (typeof courses.$inferSelect & {
    units: (typeof units.$inferSelect & {
      lessons: (typeof lessons.$inferSelect)[];
    })[];
  })[];
  activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
};

export const List = ({ courses, activeCourseId }: ListProps) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const handleClick = (id: number) => {
    if (pending) return;

    if (id === activeCourseId) {
      return router.push("/learn");
    }

    startTransition(() => {
      upsertUserProgress(id)
        .then(() => {
          toast.success("Course changed!");
          router.push("/learn");
        })
        .catch((error) => {
          if (error.message === "COURSE_EMPTY") {
            toast.error("This course doesn't have any lessons yet. Coming soon!");
          } else {
            toast.error("Something went wrong. Please try again.");
          }
        });
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]">
      {courses.map((course) => {
        const isEmpty = !course.units.length || !course.units[0]?.lessons?.length;
        
        return (
          <Card
            key={course.id}
            id={course.id}
            title={course.title}
            imageSrc={course.imageSrc}
            onClick={handleClick}
            disabled={pending}
            active={course.id === activeCourseId}
            isEmpty={isEmpty}
          />
        );
      })}
    </div>
  );
};
