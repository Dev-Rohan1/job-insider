import React from "react";
import { Link } from "react-router-dom";
import { useClerk, UserButton } from "@clerk/clerk-react";

import { assets } from "../assets/assets";

const Navbar = () => {
  const { openSignIn, user } = useClerk();

  return (
    <header>
      <nav className="flex items-center justify-between border-b border-gray-300 py-4">
        <Link to={"/"}>
          <img className="w-36 md:w-full" src={assets.logo} alt="" />
        </Link>
        {user ? (
          <div className="flex items-center gap-2">
            <Link to={"/applications"}>Job Applied</Link> |{" "}
            <span className="hidden text-sm md:block md:text-base">
              Hi, {user.fullName}
            </span>
            <UserButton />
          </div>
        ) : (
          <div className="flex gap-2 md:gap-4">
            <button className="text-sm md:text-base">RecruiterLogin</button>
            <button
              onClick={() => openSignIn()}
              className="rounded-md bg-blue-500 px-6 py-1.5 text-sm text-white md:text-base"
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
