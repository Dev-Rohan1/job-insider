import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, Lock } from "lucide-react";
import { useClerk } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";

const RecruiterLogin = () => {
  const { user } = useClerk();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <Navbar />
      <section className="mt-10 mb-10 flex h-[70vh] items-center justify-center">
        <div className="w-full max-w-[350px] rounded-lg border border-gray-300 bg-white p-6">
          <form className="text-center">
            <h1 className="mb-2 text-2xl font-bold text-gray-800">
              Recruiter Login
            </h1>
            <p className="mb-6 text-gray-700">
              Welcome back! Please log in to continue.
            </p>
            <div className="space-y-4">
              <div className="flex w-full items-center gap-2 rounded border border-gray-300 bg-gray-50 p-2 transition-all focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-200">
                <Mail size={18} className="text-gray-400" />
                <input
                  className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="flex w-full items-center gap-2 rounded border border-gray-300 bg-gray-50 p-2 transition-all focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-200">
                <Lock size={18} className="text-gray-400" />
                <input
                  className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>
            <button
              className="mt-4 w-full cursor-pointer rounded bg-blue-600 py-[7px] font-medium text-white transition-all hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
              type="submit"
            >
              Login
            </button>
          </form>

          <p className="mt-5 text-center text-gray-600">
            Don’t have an account?{" "}
            <Link to={"/recruiter-signup"} className="text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default RecruiterLogin;
