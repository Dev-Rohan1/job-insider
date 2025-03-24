import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import DashboardNavbar from "../components/DashboardNavbar";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
    if (location.pathname === "/dashboard") {
      navigate("/dashboard/manage-jobs", { replace: true });
    }
  }, [navigate, location]);

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardNavbar />
      <section className="flex flex-1 overflow-hidden">
        <div className="sticky top-16 h-[calc(100vh-var(--header-height)] w-16 border-r border-gray-300 bg-white md:w-64">
          <ul className="h-full space-y-3 overflow-y-auto pr-4 pb-4">
            {navLinks.map(({ to, icon, alt, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end
                  className={({ isActive }) =>
                    `flex items-center justify-center gap-2 rounded-lg p-3 transition-colors md:justify-start md:gap-3 ${
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
                    className="h-5 w-5 shrink-0"
                    loading="lazy"
                  />
                  <span className="hidden truncate md:block">{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="mx-auto mb-10 h-[calc(100vh-var(--header-height)] max-w-7xl px-4 md:px-6">
            <Outlet />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
