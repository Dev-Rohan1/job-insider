import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });
  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [companyData, setCompanyData] = useState(null);
  const [companyToken, setCompanyToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userApplications, setUserApplications] = useState([]);
  const [userApplicationsError, setUserApplicationsError] = useState(null); // New error state for job applications

  const { user } = useUser();
  const { getToken } = useAuth();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch jobs
  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/job/all-jobs`);

      if (data?.success) {
        if (JSON.stringify(data.jobData) !== JSON.stringify(jobs)) {
          setJobs(data.jobData || []);
        }
      } else {
        toast.error(data?.message || "Failed to fetch jobs");
      }
    } catch (error) {
      toast.error(error?.message || "An error occurred while fetching jobs");
    }
  };

  // Fetch company data
  const fetchCompanyData = async () => {
    if (!companyToken) return;

    try {
      const { data } = await axios.get(`${backendUrl}/company/company-data`, {
        headers: { token: companyToken },
      });

      if (data.success) {
        setCompanyData(data.companyData);
      } else {
        toast.error(data?.message || "Failed to fetch company data");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error fetching company data",
      );
    }
  };

  // Fetch user data
  const fetchUserData = async () => {
    const token = await getToken();
    if (!token) {
      toast.error("User token is missing");
      return;
    }

    try {
      const { data } = await axios.get(`${backendUrl}/user/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data?.message || "Failed to fetch user data");
      }
    } catch (error) {
      toast.error(
        error?.message || "An error occurred while fetching user data",
      );
    }
  };

  // Fetch job applications
  const fetchJobApplications = async () => {
    const token = await getToken();
    if (!token) {
      toast.error("User token is missing");
      return;
    }

    try {
      const { data } = await axios.get(`${backendUrl}/user/applications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        const applications = data.jobApplications || [];
        setUserApplications(applications);

        if (applications.length === 0) {
          setUserApplicationsError("No job applications found");
        } else {
          setUserApplicationsError(null); // Reset the error if applications are found
        }
      } else {
        setUserApplicationsError(
          data?.message || "Failed to fetch job applications",
        );
      }
    } catch (error) {
      setUserApplicationsError(
        error?.message || "An error occurred while fetching job applications",
      );
      toast.error(
        error?.message || "An error occurred while fetching job applications",
      );
    }
  };

  useEffect(() => {
    fetchJobs();

    if (user) {
      fetchUserData();
      fetchJobApplications();
    }

    const token = localStorage.getItem("companyToken");
    if (token) {
      setCompanyToken(token);
    }
  }, [user]); // Re-run when `user` changes

  useEffect(() => {
    if (companyToken) {
      fetchCompanyData();
    }
  }, [companyToken]); // Runs when `companyToken` changes

  // Listening for changes to companyToken in localStorage
  useEffect(() => {
    const token = localStorage.getItem("companyToken");
    if (token && token !== companyToken) {
      setCompanyToken(token);
    }
  }, [companyToken]);

  const value = {
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    companyData,
    setCompanyData,
    companyToken,
    setCompanyToken,
    backendUrl,
    userData,
    setUserData,
    userApplications,
    setUserApplications,
    userApplicationsError,
    setUserApplicationsError,
    fetchUserData,
    fetchJobApplications,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
