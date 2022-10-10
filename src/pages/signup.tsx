import { NextPage } from "next";
import Link from "next/link";

const Login: NextPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="absolute w-60 h-60 rounded-xl bg-blue-700 -top-5 -left-16 z-0 transform rotate-45 hidden md:block"></div>
      <div className="absolute w-48 h-48 rounded-xl bg-blue-700 -bottom-6 -right-10 transform rotate-12 hidden md:block"></div>
      <div className="py-12 px-12 bg-white text-slate-700 rounded-2xl shadow-xl z-20">
        <div>
          <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
            Create An Account
          </h1>
          <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">
            Create an account and start tracking all your responsibilities for
            free.
          </p>
        </div>
        <form
          className="space-y-4 w-64"
          action="/api/auth/newUser"
          method="POST"
        >
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
            Create Account
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="mt-4 text-sm">
            Already Have An Account?{" "}
            <Link href="/login">
              <span className="underline cursor-pointer">Sign In</span>
            </Link>
          </p>
        </div>
      </div>
      <div className="w-40 h-40 absolute bg-blue-500 rounded-full top-0 right-12 hidden md:block"></div>
      <div className="w-20 h-40 absolute bg-blue-500 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block"></div>
    </div>
  );
};

export default Login;
