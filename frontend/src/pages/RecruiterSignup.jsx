import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, Lock, User } from "lucide-react";
import { useClerk } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const RecruiterSignup = () => {
  const { user, createUser } = useClerk();
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
  };

  return (
    <>
      <Navbar />
      <section className="mt-15 mb-15 flex h-[70vh] items-center justify-center">
        <div className="w-full max-w-[370px] rounded-lg border border-gray-300 p-6">
          <form className="text-center" onSubmit={handleSubmit}>
            <h1 className="mb-2 text-2xl font-bold text-gray-800">
              Recruiter Sign Up
            </h1>
            <p className="mb-6 text-gray-700">
              Welcome back! Please signup in to continue.
            </p>

            <div className="space-y-4">
              <div>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleLogoUpload}
                  />
                  <img
                    className="w-[70px] cursor-pointer"
                    src={logo || assets.upload_area}
                    alt="Upload company logo"
                  />
                  <span className="text-gray-700">Upload company logo</span>
                </label>
              </div>

              <div className="flex w-full items-center gap-2 rounded border border-gray-300 bg-gray-50 p-2 transition-all focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-200">
                <User size={19} className="text-gray-400" />
                <input
                  className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                  type="text"
                  placeholder="Company name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>

              <div className="flex w-full items-center gap-2 rounded border border-gray-300 bg-gray-50 p-2 transition-all focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-200">
                <Mail size={18} className="text-gray-400" />
                <input
                  className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="flex w-full items-center gap-2 rounded border border-gray-300 bg-gray-50 p-2 transition-all focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-200">
                <Lock size={18} className="text-gray-400" />
                <input
                  className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              className="mt-4 w-full cursor-pointer rounded bg-blue-600 py-[7px] font-medium text-white transition-all hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
              type="submit"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-5 text-center text-gray-600">
            Already have an account?{" "}
            <Link to={"/recruiter-login"} className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default RecruiterSignup;
