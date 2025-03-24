import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ApplyJobs from "./pages/ApplyJobs";
import Applications from "./pages/Applications";
import AppLayout from "./layout/AppLayout";
import RecruiterLogin from "./pages/RecruiterLogin";
import RecruiterSignup from "./pages/RecruiterSignup";
import AddJobs from "./pages/AddJobs";
import ManageJobs from "./pages/ManageJobs";
import ViewApplications from "./pages/ViewApplications";
import Dashboard from "./pages/Dashboard";
import "quill/dist/quill.snow.css";
const App = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-jobs/:id" element={<ApplyJobs />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/recruiter-login" element={<RecruiterLogin />} />
        <Route path="/recruiter-signup" element={<RecruiterSignup />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="add-jobs" element={<AddJobs />} />
          <Route path="manage-jobs" element={<ManageJobs />} />
          <Route path="view-applications" element={<ViewApplications />} />
        </Route>
      </Routes>
    </AppLayout>
  );
};

export default App;
