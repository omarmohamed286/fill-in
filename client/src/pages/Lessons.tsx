import { useParams, Link } from "react-router";
import useGetLessons from "@shared/hooks/lessons/useGetLessons";
import Loading from "../components/shared/Loading";
import ExploreIcon from "../components/home/ExploreIcon";
const Lessons = () => {
  const { categoryId } = useParams();
  const { data, isPending, error } = useGetLessons(categoryId);
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
            Lessons
          </h1>
          <p className="text-lg text-gray-300">
            Choose a lesson to begin learning
          </p>
        </header>
        {isPending && <Loading variant="2"></Loading>}

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
            {data.map((lesson) => (
              <Link
                key={lesson.id}
                to={`/category/${categoryId}/lesson/${lesson.id}`}
                className="group block bg-linear-to-br from-[#1a2332] to-primary border border-secondary/20 hover:border-secondary/50 rounded-lg p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-secondary/10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-secondary/10 border border-secondary/30 flex items-center justify-center group-hover:bg-secondary/20 transition-colors duration-300">
                      <span className="text-secondary font-bold text-lg">
                        {lesson.name.split(" ")[1]}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-secondary transition-colors duration-300">
                        {lesson.name}
                      </h3>
                    </div>
                  </div>
                  <div className="text-light-cyan scale-200">
                    <ExploreIcon></ExploreIcon>
                  </div>
                </div>
              </Link>
            ))}
          </section>
        )}
      </div>
    </main>
  );
};

export default Lessons;
