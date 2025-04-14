import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { jobsData } from "../assets/assets";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isSearched, setIsSearched] = useState(false);
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });
  const [jobs, setJobs] = useState(jobsData);
  const [companyData, setCompanyData] = useState(null);
  const [companyToken, setCompanyToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchCompanyData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/company/get-company`, {
        headers: {
          token: companyToken,
        },
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
    try {
      const { data } = await axios.get(`${backendUrl}/job/job-list`);

      if (data.success) {
        setJobs(data.jobList);
      }

      // console.log(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Error fetching job listings");
    }
  };

  useEffect(() => {
    fetchJobsData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("companyToken");
    if (token) {
      setCompanyToken(token);
    } else {
      setError(true);
    }
  }, []);

  useEffect(() => {
    if (companyToken) {
      fetchCompanyData();
    }
  }, [companyToken]);

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
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
