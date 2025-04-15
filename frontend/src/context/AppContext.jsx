import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isSearched, setIsSearched] = useState(false);
  const [searchFilter, setSearchFilter] = useState({ title: "", location: "" });
  const [jobs, setJobs] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [companyToken, setCompanyToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userApplication, setUserApplication] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { user } = useUser();
  const { getToken } = useAuth();

  const fetchCompanyData = async () => {
    if (!companyToken) return;
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/company/get-company`, {
        headers: { token: companyToken },
      });

      if (data.success) {
        setCompanyData(data.companyData);
        setError(false);
      } else {
        toast.error(data.message || "Failed to fetch company data");
        setError(true);
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      toast.error(message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchJobsData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/job/job-list`);
      if (data.success) {
        setJobs(data.jobList);
      } else {
        toast.error(data.message || "Failed to fetch job listings");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Error fetching job listings");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async () => {
    try {
      const token = await getToken();
      if (!token) throw new Error("User token not found");

      const { data } = await axios.get(`${backendUrl}/user/user-data`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message || "Failed to fetch user data");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch user data"
      );
      console.error("Failed to fetch user data:", error);
    }
  };

  const fetchUserApplication = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      if (!token) throw new Error("Token not found");

      const { data } = await axios.get(`${backendUrl}/user/user-application`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUserApplication(data.jobApplications);
      } else {
        toast.error(data.message || "Failed to fetch job applications");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch applications"
      );
    } finally {
      setLoading(false);
    }
  };

  // Load company token from localStorage
  useEffect(() => {
    const token = localStorage.getItem("companyToken");
    if (token) {
      setCompanyToken(token);
    }
  }, []);

  // Fetch company data when token is ready
  useEffect(() => {
    if (companyToken) {
      fetchCompanyData();
    }
  }, [companyToken]);

  // Fetch user data and applications
  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchUserApplication();
    }
  }, [user]);

  // Initial fetch of jobs
  useEffect(() => {
    fetchJobsData();
  }, []);

  const value = {
    isSearched,
    setIsSearched,
    searchFilter,
    setSearchFilter,
    jobs,
    setJobs,
    companyData,
    setCompanyData,
    companyToken,
    setCompanyToken,
    backendUrl,
    loading,
    setLoading,
    fetchCompanyData,
    error,
    setError,
    userData,
    setUserData,
    userApplication,
    setUserApplication,
    fetchUserApplication,
    fetchUserData,
    fetchJobsData
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
