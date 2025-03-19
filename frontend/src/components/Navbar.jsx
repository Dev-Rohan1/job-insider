import React from "react";
import { Link } from "react-router-dom";
import { useClerk, UserButton } from "@clerk/clerk-react";
import { assets } from "../assets/assets";

const Navbar = () => {
  const { openSignIn, user } = useClerk();

  return (
    <header className="mb-10">
      <nav className="flex items-center justify-between border-b border-gray-300 py-4">
        <Link to={"/"}>
          <img className="w-[130px] md:w-auto" src={assets.logo} alt="Logo" />
        </Link>
        {user ? (
          <div className="flex items-center gap-2">
            <Link to={"/applications"} className="text-sm md:text-base">
              Job Applied
            </Link>
            |{" "}
            <span className="hidden text-sm md:block md:text-base">
              Hi, {user.fullName || "User"}
            </span>
            <UserButton />
          </div>
        ) : (
          <div className="flex items-center gap-2 md:gap-3">
            <Link to="/recruiter-login" className="text-sm md:text-base">
              Recruiter Login
            </Link>
            <button
              onClick={() => openSignIn()}
              className="cursor-pointer rounded bg-blue-500 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-600 md:px-6 md:py-1.5 md:text-base"
            >
              Login
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
