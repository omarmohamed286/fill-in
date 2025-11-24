import { Link } from "react-router";
import HomeIcon from "src/components/home/HomeIcon";

const NotFound = () => {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <header className="mb-8">
          <h1 className="text-9xl font-elms font-bold bg-linear-to-r from-secondary via-light-cyan to-white bg-clip-text text-transparent">
            404
          </h1>
        </header>
        <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-300 mb-8 max-w-md mx-auto">
          The page you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-secondary text-primary font-bold py-3 px-8 rounded-lg hover:bg-light-cyan transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-secondary/30"
        >
          <HomeIcon></HomeIcon>
          Back to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
