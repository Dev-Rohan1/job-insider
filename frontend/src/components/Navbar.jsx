import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = () => {
  const { openSignUp } = useClerk();
  const { user, isLoaded } = useUser();

  return (
    <header className="border-b border-gray-200 mb-6 sm:mb-10">
      <nav className="flex items-center justify-between py-3 sm:py-4 max-w-7xl mx-auto">
        <Link to="/" aria-label="Home" className="flex-shrink-0">
          <img
            className="w-[130px] md:w-full"
            src={assets.logo}
            alt="App Logo"
            loading="lazy"
          />
        </Link>

        {!isLoaded ? (
          <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
        ) : user ? (
          <div className="flex items-center gap-2">
            <Link
              to="/applications"
              className="text-[15px] md:text-base hover:text-blue-600 transition-colors whitespace-nowrap"
              aria-label="View job applications"
            >
              Job Applied
            </Link>
            <span className="hidden sm:inline text-gray-400" aria-hidden="true">
              |
            </span>
            <span className="hidden sm:inline-block text-xs sm:text-sm md:text-base text-gray-700 whitespace-nowrap">
              Hi, {user.fullName || "User"}
            </span>
            <div className="ml-1 sm:ml-2">
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              to={"/recuiter-login"}
              className="text-xs sm:text-sm md:text-base hover:text-blue-600 transition-colors whitespace-nowrap"
              aria-label="Recruiter login"
            >
              Recruiter Login
            </Link>
            <button
              onClick={() => openSignUp()}
              className="cursor-pointer px-3 py-1 sm:px-4 sm:py-[4px] bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm md:text-base rounded transition-all whitespace-nowrap"
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
