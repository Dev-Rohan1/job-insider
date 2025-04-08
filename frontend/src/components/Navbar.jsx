import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const { openSignUp } = useClerk();
  const { user } = useUser();

  return (
    <header className="border-b border-gray-200 mb-10">
      <nav className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        <Link to="/" aria-label="Home">
          <img
            className="w-[130px] md:w-full"
            src={assets.logo}
            alt="App Logo"
          />
        </Link>

        {user ? (
          <div className="flex items-center gap-2">
            <Link
              to="/applications"
              className="text-sm md:text-base hover:text-blue-600 transition-colors"
              aria-label="View job applications"
            >
              Job Applied
            </Link>
            <span className="hidden sm:inline text-gray-400" aria-hidden="true">
              |
            </span>
            <span className="hidden sm:inline-block text-sm md:text-base text-gray-700">
              Hi, {user.fullName || "User"}
            </span>
            <UserButton />
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button
              className="text-sm md:text-base hover:text-blue-600 transition-colors"
              aria-label="Recruiter login"
            >
              Recruiter Login
            </button>
            <button
              onClick={() => openSignUp()}
              className="cursor-pointer px-4 py-[4px] bg-blue-500 hover:bg-blue-600 text-white text-sm md:text-base rounded transition-all"
              aria-label="User login"
            >
              Log In
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
