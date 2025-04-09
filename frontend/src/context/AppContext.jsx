import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isSearched, setIsSearched] = useState(false);
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });
  const [jobs, setJobs] = useState(null);

  const fetchJobs = () => {
    setJobs(jobsData);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const value = {
    isSearched,
    setIsSearched,
    searchFilter,
    setSearchFilter,
    jobs,
    setJobs,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
