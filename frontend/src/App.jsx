import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ApplyJobs from "./pages/ApplyJobs";
import Applications from "./pages/Applications";
import AppLayout from "./layout/AppLayout";
const App = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-jobs/:id" element={<ApplyJobs />} />
        <Route path="/applications" element={<Applications />} />
      </Routes>
    </AppLayout>
  );
};

export default App;
