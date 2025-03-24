import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import DashboardNavbar from "../components/DashboardNavbar";

const Dashboard = () => {
  const navigate = useNavigate();

  const navLinks = [
    {
      to: "/dashboard/manage-jobs",
      icon: assets.home_icon,
      alt: "Manage jobs",
      label: "Manage Jobs",
    },
    {
      to: "/dashboard/add-jobs",
      icon: assets.add_icon,
      alt: "Add job",
      label: "Add Job",
    },
    {
      to: "/dashboard/view-applications",
      icon: assets.person_tick_icon,
      alt: "View applications",
      label: "View Applications",
    },
  ];

  useEffect(() => {
    if (window.location.pathname === "/dashboard") {
      navigate("/dashboard/manage-jobs");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen">
      <DashboardNavbar />
      <section className="flex">
        <div className="h-screen w-[75px] border-r border-gray-300 md:w-64">
          <ul className="space-y-2 pr-7 md:pr-4">
            {navLinks.map(({ to, icon, alt, label }, index) => (
              <li key={`nav-${index}`}>
                <NavLink
                  to={to}
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg p-3 transition-colors ${
                      isActive
                        ? "bg-blue-50 font-medium text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                  aria-current={({ isActive }) =>
                    isActive ? "page" : undefined
                  }
                >
                  <img
                    src={icon}
                    alt={alt}
                    className="h-5 w-5"
                    loading="lazy"
                  />
                  <span className="hidden md:block">{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-h-screen flex-1 px-4 md:px-6">
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
