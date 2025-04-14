import "quill/dist/quill.snow.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import AddJob from "./pages/AddJob";
import Applications from "./pages/Applications";
import ApplyJob from "./pages/ApplyJob";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ManageJob from "./pages/ManageJob";
import RecuiterLogin from "./pages/RecuiterLogin";
import RecruiterSignup from "./pages/RecuiterSignup";
import ViewApplications from "./pages/ViewApplications";

const App = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/recuiter-login" element={<RecuiterLogin />} />
        <Route path="/recuiter-signup" element={<RecruiterSignup />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="add-job" element={<AddJob />} />
          <Route path="manage-job" element={<ManageJob />} />
          <Route path="view-applications" element={<ViewApplications />} />
        </Route>
      </Routes>
    </AppLayout>
  );
};

export default App;
