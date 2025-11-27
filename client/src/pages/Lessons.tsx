import { useParams, Link, useLocation } from "react-router";
import useGetLessons from "@shared/hooks/lessons/useGetLessons";
import Loading from "../components/shared/Loading";
import ExploreIcon from "../components/home/icons/ExploreIcon";
import type { Category } from "@shared/customTypes";
import useGetCompletedLessons from "src/hooks/home/useGetCompletedLessons";
import clsx from "clsx";
import CompletedIcon from "src/components/home/icons/CompletedIcon";

const Lessons = () => {
  const { categoryId } = useParams();
  const { data, isPending, error } = useGetLessons(categoryId);
  const location = useLocation();
  const locationState = location.state as { category: Category };
  const { category } = locationState;
  const { data: completedLessons, isPending: isCompletedLessonsPending } =
    useGetCompletedLessons();

  const isLessonCompleted = (lessonId: string) => {
    return completedLessons?.includes(lessonId) || false;
  };

  return (
    <main className="min-h-screen pt-20 pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-light-cyan hover:text-secondary transition-colors duration-300 mb-8"
        >
          <div className="rotate-180">
            <ExploreIcon></ExploreIcon>
          </div>
          Back to Categories
        </Link>
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl bg-linear-to-r from-white via-light-cyan to-secondary bg-clip-text text-transparent font-elms font-bold leading-tight mb-4">
            {category.name} Lessons
          </h1>
          <p className="text-lg text-gray-300">
            Choose a lesson to begin learning
          </p>
        </header>
        {(isPending || isCompletedLessonsPending) && (
          <Loading variant="2"></Loading>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="text-red-400 text-lg">Error loading Lessons</p>
          </div>
        )}

        {data && data.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No lessons available yet</p>
          </div>
        )}

        {data && data.length > 0 && (
          <section className="space-y-4">
            {data.map((lesson) => {
              const completed = isLessonCompleted(lesson.id);

              return (
                <Link
                  key={lesson.id}
                  to={`/category/${categoryId}/lesson/${lesson.id}`}
                  className={clsx(
                    "group block bg-linear-to-br from-[#1a2332] to-primary border rounded-lg p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl",
                    completed &&
                      "border-green-500/30 hover:border-green-500/50 hover:shadow-green-500/10",
                    !completed &&
                      "border-secondary/20 hover:border-secondary/50 hover:shadow-secondary/10"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div
                        className={clsx(
                          "shrink-0 w-12 h-12 rounded-full border flex items-center justify-center transition-colors duration-300",
                          completed &&
                            "bg-green-500/10 border-green-500/30 group-hover:bg-green-500/20",
                          !completed &&
                            "bg-secondary/10 border-secondary/30 group-hover:bg-secondary/20"
                        )}
                      >
                        {completed ? (
                          <CompletedIcon></CompletedIcon>
                        ) : (
                          <span className="text-secondary font-bold text-lg">
                            {lesson.name.split(" ")[1]}
                          </span>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-3">
                          <h3
                            className={clsx(
                              "text-xl font-bold transition-colors duration-300",
                              completed &&
                                "text-white group-hover:text-green-400",
                              !completed &&
                                "text-white group-hover:text-secondary"
                            )}
                          >
                            {lesson.name}
                          </h3>
                          {completed && (
                            <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                              Completed
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div
                      className={clsx(
                        "transition-colors",
                        completed && "text-green-400",
                        !completed && "text-light-cyan"
                      )}
                    >
                      <ExploreIcon></ExploreIcon>
                    </div>
                  </div>
                </Link>
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
};

export default Lessons;
