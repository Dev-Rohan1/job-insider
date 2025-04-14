import { LoaderCircle, LogOutIcon } from "lucide-react";
import { useContext, useEffect } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import Footer from "../components/Footer";

const Dashboard = () => {
  const { companyData, loading, error } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

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

  const logoutHandler = () => {
    localStorage.removeItem("companyToken");
    toast.success("Logout successful");
    navigate("/recuiter-login");
  };

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      navigate("manage-job");
    }
    document.title = "Insider Job | Dashboard";
  }, [location.pathname, navigate]);

  return (
    <>
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between border-b border-gray-300 py-3 bg-white sticky top-0 z-10">
        <Link to="/dashboard">
          <img className="h-9" src={assets.logo} alt="Insider Job Logo" />
        </Link>
        {error ? (
          <LoaderCircle className="animate-spin text-gray-700" />
        ) : loading ? (
          <div className="flex justify-start items-start text-gray-700">
            <LoaderCircle className="animate-spin text-gray-700" />
          </div>
        ) : (
          <div className="flex items-center gap-3 text-gray-700">
            <div className="flex items-center gap-2">
              <p className="text-sm hidden md:block">
                Welcome! {companyData?.name}
              </p>
              <img
                className="w-[30px] h-[30px] rounded-full object-cover"
                src={companyData?.image || assets.default_avatar}
                alt={`${companyData?.name || "Company"} Logo`}
              />
            </div>
            <div
              onClick={logoutHandler}
              title="Logout"
              className="w-[40px] h-[40px] flex items-center justify-center rounded hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <LogOutIcon size={22} />
            </div>
          </div>
        )}
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
                    ? "border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-500 rounded-l-md"
                    : "hover:bg-gray-100/90 border-white text-gray-700 rounded-l-md"
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
        <div className="flex-1  pl-4 pt-4 overflow-auto">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
