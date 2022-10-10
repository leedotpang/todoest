import { NextPage } from "next";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import useTodoSession from "../utils/useTodoSession";

const Login: NextPage = () => {
  const { authenticated, sendToApp } = useTodoSession();

  useEffect(() => {
    if (authenticated) sendToApp();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="absolute w-60 h-60 rounded-xl bg-blue-700 -top-5 -left-16 z-0 transform rotate-45 hidden md:block"></div>
      <div className="absolute w-48 h-48 rounded-xl bg-blue-700 -bottom-6 -right-10 transform rotate-12 hidden md:block"></div>
      <div className="py-12 px-12 bg-white text-slate-700 rounded-2xl shadow-xl z-20">
        <div>
          <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
            Login
          </h1>
        </div>
        <form className="space-y-4 w-72">
          <input
            type="text"
            name="email"
            placeholder="Email Address"
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
          />
          <button
            className="py-3 text-xl text-white bg-blue-700 rounded-2xl w-full"
            type="submit"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="mt-4 text-sm flex justify-between">
            <Link href="signup">Create an Account</Link>
            <Link href="/forgot">
              <span className="text-red-600 cursor-pointer">
                Forgot password?
              </span>
            </Link>
          </p>
        </div>
      </div>
      <div className="relative flex my-6 items-center w-80">
        <div className="flex-grow border-t border-white"></div>
        <span className="flex-shrink mx-4 text-white">OR</span>
        <div className="flex-grow border-t border-white"></div>
      </div>
      <div>
        <button
          onClick={() => signIn("google")}
          className="py-3 text-md text-white bg-pink-600 rounded-2xl w-80 font-bold"
        >
          Sign-in with Google
        </button>
      </div>
      <div className="w-40 h-40 absolute bg-blue-500 rounded-full top-0 right-12 hidden md:block"></div>
      <div className="w-20 h-40 absolute bg-blue-500 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block"></div>
    </div>
  );
};

export default Login;
