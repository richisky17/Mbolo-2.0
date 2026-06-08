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
    <div className="mx-auto h-full max-w-[1200px] px-6 py-8 pb-[50px]">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center md:text-left">
        Elige tu curso
      </h1>

      {courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 mt-10 p-8 border border-gray-700 rounded-xl bg-gray-900/50">
          <p className="text-xl text-gray-300 font-semibold">
            No hay cursos disponibles aún.
          </p>
          <p className="text-sm text-gray-400">
            Por favor, vuelve más tarde o contacta con soporte.
          </p>
        </div>
      ) : (
        <List courses={courses} activeCourseId={userProgress?.activeCourseId} />
      )}
    </div>
  );
};

export default CoursesPage;