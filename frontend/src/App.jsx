import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ApplyJob from "./pages/ApplyJob";
import Applications from "./pages/Applications";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/apply-job/:id" element={<ApplyJob />} />
      <Route path="/applications" element={<Applications />} />
    </Routes>
  );
};

export default App;
