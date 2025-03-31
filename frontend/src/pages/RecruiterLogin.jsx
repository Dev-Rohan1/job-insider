import { useClerk } from "@clerk/clerk-react";
import axios from "axios";
import { Lock, Mail } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AppContext } from "../contexts/AppContext";
import { toast } from "react-toastify";

const RecruiterLogin = () => {
  const { user } = useClerk();
  const navigate = useNavigate();

  const { backendUrl, setCompanyToken, setCompanyData } =
    useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const recruiterLoginHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${backendUrl}/company/login`, {
        email,
        password,
      });

      if (data.success) {
        toast.success(data.message);
        setCompanyToken(data.token);
        setCompanyData(data.company);
        localStorage.setItem("companyToken", data.token);
        navigate("/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "An error occurred. Please try again.",
      );
    }
  };

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
          <form onSubmit={recruiterLoginHandler} className="text-center">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex w-full items-center gap-2 rounded border border-gray-300 bg-gray-50 p-2 transition-all focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-200">
                <Lock size={18} className="text-gray-400" />
                <input
                  className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
