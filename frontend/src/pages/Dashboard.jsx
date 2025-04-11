import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();

  const sidebarLinks = [
    {
      name: "Manage Job",
      path: "manage-job",
      icon: assets.home_icon,
    },
    {
      name: "Add Job",
      path: "add-job",
      icon: assets.add_icon,
    },
    {
      name: "View Applications",
      path: "view-applications",
      icon: assets.person_tick_icon,
    },
  ];

  useEffect(() => {
    if (window.location.pathname === "/dashboard") {
      navigate("manage-job");
    }
    document.title = "Insider Job | Dashboard";
  }, [navigate]);

  return (
    <>
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between border-b border-gray-300 py-3 bg-white sticky top-0 z-10">
        <Link to="/dashboard">
          <img className="h-9" src={assets.logo} alt="Logo" />
        </Link>
        <div className="flex items-center gap-5 text-gray-500">
          <p>Hi! Admin</p>
          <button className="border border-gray-300 rounded-full text-sm px-4 py-1 hover:bg-gray-100 transition-colors">
            Logout
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <div className="md:w-64 w-16 border-r border-gray-300 pt-4 flex flex-col bg-white sticky top-16 h-[calc(100vh-64px)]">
          {sidebarLinks.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) =>
                `flex items-center py-3 px-4 gap-3 mb-3 ${
                  isActive
                    ? "border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-500  rounded-l-md"
                    : "hover:bg-gray-100/90 border-white text-gray-700 rounded-l-md "
                }`
              }
            >
              <img
                src={item.icon}
                alt={item.name}
                className="h-5 w-5 min-w-[20px] mx-auto md:mx-0"
              />
              <p className="md:block hidden whitespace-nowrap">{item.name}</p>
            </NavLink>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
