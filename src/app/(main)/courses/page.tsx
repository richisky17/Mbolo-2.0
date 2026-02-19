import { List } from "./list";
import { getCourses, getUserProgress } from "@/server/db/queries";

const CoursesPage = async () => {
  const coursesData = getCourses();
  const userProgressData = getUserProgress();

  const [courses, userProgress] = await Promise.all([
    coursesData,
    userProgressData,
  ]);

  return (
    <div className="mx-auto h-full max-w-[912px] px-6 py-8 pb-[50px]">
      <h1 className="text-2xl font-bold text-neutral-700">Language Courses</h1>
      {courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 mt-10 p-8 border-2 border-dashed rounded-xl">
          <p className="text-xl text-neutral-500 font-semibold">
            No courses available yet.
          </p>
          <p className="text-sm text-neutral-400">
            Please check back later or contact support.
          </p>
        </div>
      ) : (
        <List courses={courses} activeCourseId={userProgress?.activeCourseId} />
      )}
    </div>
  );
};

export default CoursesPage;
