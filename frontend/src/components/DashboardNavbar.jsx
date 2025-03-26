import { LogOut } from "lucide-react";
import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const DashboardNavbar = () => {
  return (
    <header className="mb-6">
      <nav className="flex items-center justify-between border-b border-gray-300 py-4">
        <Link to={"/dashboard/manage-jobs"}>
          {" "}
          <img
            className="w-[130px] md:w-auto"
            src={assets.logo}
            alt="Company Logo"
          />
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium md:text-base">Hi, Rohan</span>
          <img
            src={assets.profile_pic}
            alt="Company Icon"
            className="h-7 w-7"
          />
          <button
            aria-label="Log out"
            className="cursor-pointer rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-100"
          >
            <LogOut size={22} />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default DashboardNavbar;
