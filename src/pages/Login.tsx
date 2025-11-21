import { useState } from "react";
import { Link } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import GoogleLogo from "../components/auth/GoogleLogo";
import ContinueWithDivider from "../components/auth/ContinueWithDivider";
import ShowPasswordIcon from "../components/auth/ShowPasswordIcon";

type LoginInput = {
  email: string;
  password: string;
};

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();

  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    console.log(data);
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <div className="relative w-full max-w-md">
        <form
          className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 shadow-2xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="auth-heading-btn">Login</h1>
          <div className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-light-cyan mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-3 mb-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                placeholder="you@example.com"
                {...register("email", {
                  required: "Email is required",
                  setValueAs: (value) => value.trim(),
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="text-rose-400">{errors.email.message}</span>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-light-cyan mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 mb-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    setValueAs: (value) => value.trim(),
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-secondary transition-colors"
                >
                  <ShowPasswordIcon
                    showPassword={showPassword}
                  ></ShowPasswordIcon>
                </button>
              </div>
              {errors.password && (
                <span className="text-rose-400">{errors.password.message}</span>
              )}
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-secondary text-primary font-bold rounded-lg hover:bg-light-cyan transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-secondary/20 mt-2"
            >
              Login
            </button>
          </div>
          <ContinueWithDivider></ContinueWithDivider>
          <div className="flex justify-center">
            <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2">
              <GoogleLogo></GoogleLogo>
              <span className="text-sm font-medium text-white">Google</span>
            </button>
          </div>
          <p className="text-center text-sm text-white/60 mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-secondary hover:text-light-cyan font-semibold transition-colors"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
