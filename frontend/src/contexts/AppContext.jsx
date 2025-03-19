import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });
  const [isSerched, setIsSearched] = useState(false);

  const value = { searchFilter, setSearchFilter, isSerched, setIsSearched };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
