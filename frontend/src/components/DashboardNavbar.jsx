import { LogOut } from "lucide-react";
import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { toast } from "react-toastify";

const DashboardNavbar = () => {
  const { companyData } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      localStorage.removeItem("companyToken");
      toast.success("Company logged out successfully");
      navigate("/recruiter-login");
    } catch (error) {
      toast.error("An error occurred while logging out");
    }
  };

  if (!companyData) {
    return (
      <header className="mb-6">
        <nav className="flex items-center justify-between border-b border-gray-300 py-4">
          <Link to={"/dashboard/manage-jobs"}>
            <img
              className="w-[130px] md:w-auto"
              src={assets.logo}
              alt="Company Logo"
            />
          </Link>
          <div className="text-gray-600">Loading...</div>
        </nav>
      </header>
    );
  }

  return (
    <header className="mb-6">
      <nav className="flex items-center justify-between border-b border-gray-300 py-4">
        <Link to={"/dashboard/manage-jobs"}>
          <img
            className="w-[130px] md:w-auto"
            src={assets.logo}
            alt="Company Logo"
          />
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium md:text-base">
            Hi, {companyData.name}
          </span>
          {companyData.image ? (
            <img
              src={companyData.image}
              alt="Company Icon"
              className="h-7 w-7"
            />
          ) : (
            <div className="h-7 w-7 rounded-full bg-gray-300" />
          )}
          <button
            onClick={logout}
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
