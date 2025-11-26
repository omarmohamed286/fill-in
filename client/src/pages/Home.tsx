import { Link } from "react-router";
import useGetCategories from "@shared/hooks/categories/useGetCategories";
import Loading from "../components/shared/Loading";
import ExploreIcon from "../components/home/icons/ExploreIcon";
const Home = () => {
  const { data, isPending, error } = useGetCategories();
  return (
    <main className="min-h-screen pt-20 pb-16 px-6">
      <header className="text-center mb-16">
        <h1 className="text-6xl md:text-7xl bg-linear-to-r from-white via-light-cyan to-secondary bg-clip-text text-transparent font-elms font-bold leading-tight mb-4">
          Start Learning
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mt-6">
          Choose a category and begin your journey!
        </p>
      </header>

      {isPending && <Loading variant="2"></Loading>}

      {error && (
        <div className="text-center py-20">
          <p className="text-red-400 text-lg">Error loading categories</p>
        </div>
      )}

      {data && data.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No categories available yet</p>
        </div>
      )}

      {data && data.length > 0 && (
        <section className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.map((category) => (
              <Link
                key={category.id}
                to={`category/${category.id}`}
                state={{ category }}
                className="group relative overflow-hidden rounded-xl bg-linear-to-br from-[#1a2332] to-primary border border-secondary/20 hover:border-secondary/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-secondary/20"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white group-hover:text-secondary transition-colors duration-300">
                    {category.name}
                  </h3>
                  <div className="mt-2 flex items-center text-light-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium">Explore</span>
                    <ExploreIcon></ExploreIcon>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default Home;
