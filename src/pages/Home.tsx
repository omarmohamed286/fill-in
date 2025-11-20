import { Link } from "react-router";
const Home = () => {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden *:absolute *:w-96 *:h-96 *:rounded-full *:blur-3xl *:top-1/4">
        <div className="-left-20 bg-secondary/10"></div>
        <div className="-right-20 bg-light-cyan/10"></div>
      </div>
      <div className="relative max-w-5xl mx-auto text-center space-y-8">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight">
          <span className="block bg-linear-to-r from-white via-light-cyan to-secondary bg-clip-text text-transparent">
            You Don't Know
          </span>
          <span className="block mt-2 bg-linear-to-r from-secondary via-light-cyan to-white bg-clip-text text-transparent">
            What You Don't Know
          </span>
        </h1>
        <p className="text-light-cyan/90 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
          Knowledge gaps mean problems that you won't know how to solve in the
          future.
          <span className="text-white font-extrabold"> Fill In</span> helps you
          avoid future problems by identifying your knowledge gaps through a
          series of questions with explanations and external resources to help
          you learn what you don't know, ahead of time.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Link
            to="/register"
            className="px-8 py-4 bg-secondary text-primary font-bold rounded-lg hover:bg-light-cyan transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-secondary/20"
          >
            Start Learning
          </Link>
          <Link
            to="/login"
            className="px-8 py-4 bg-transparent border-2 border-secondary/30 text-secondary font-bold rounded-lg hover:bg-secondary/10 hover:border-secondary transition-all duration-300"
          >
            Login
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
