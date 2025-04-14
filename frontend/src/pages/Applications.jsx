import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { assets } from "../assets/assets";
import moment from "moment";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { LoaderCircle } from "lucide-react";
import Loader from "../components/Loader";

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);
  const [resumeUploadloading, setResumeUploadloading] = useState(false);

  const {
    backendUrl,
    userApplication,
    userData,
    fetchUserApplication,
    loading,
    fetchUserData,
  } = useContext(AppContext);
  const { getToken } = useAuth();

  useEffect(() => {
    fetchUserApplication();
  }, []);

  const handleSaveResume = async () => {
    if (!resume) {
      toast.error("Please select a resume file to upload.");
      return;
    }

    // Validate file type
    if (resume.type !== "application/pdf") {
      toast.error("Please upload a PDF file.");
      return;
    }

    setResumeUploadloading(true);
    try {
      const formData = new FormData();
      formData.append("resume", resume);

      const token = await getToken();
      if (!token) {
        toast.error("Authorization token not found");
        return;
      }

      const { data } = await axios.post(
        `${backendUrl}/user/update-resume`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success("Resume uploaded successfully!");
        setIsEdit(false);
        setResume(null);
        fetchUserApplication();
        fetchUserData();
      } else {
        toast.error(data.message || "Failed to upload resume");
      }
    } catch (error) {
      console.error("Resume upload error:", error);
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Error uploading resume"
      );
    } finally {
      setResumeUploadloading(false);
    }
  };

  const handleViewResume = (e) => {
    if (!userData?.resume) {
      e.preventDefault();
      toast.info("No resume found.");
      return false;
    }

    return true;
  };

  return (
    <>
      <Navbar />
      <section className="px-4 py-8">
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-3">Your Resume</h3>
          {isEdit ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-3">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="file"
                  hidden
                  accept="application/pdf"
                  onChange={(e) => setResume(e.target.files?.[0])}
                />
                <span className="bg-blue-100 px-5 py-1.5 rounded-md text-blue-500 hover:bg-blue-200 transition-colors">
                  {resume ? resume.name : "Select Resume"}
                </span>
                <img src={assets.profile_upload_icon} alt="Upload" />
              </label>
              <button
                onClick={handleSaveResume}
                disabled={resumeUploadloading}
                className="border border-gray-300 px-4 py-1.5 rounded-md cursor-pointer text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resumeUploadloading ? (
                  <div className="flex items-center gap-1">
                    <LoaderCircle
                      className="animate-spin text-gray-600"
                      size={20}
                    />
                    <span>Saving...</span>
                  </div>
                ) : (
                  "Save Resume"
                )}
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-3">
              <a
                href={userData?.resume || "#"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleViewResume}
                className={`bg-blue-100 px-6 py-1.5 rounded-md text-blue-500 hover:bg-blue-200 transition-colors ${
                  !userData?.resume ? "cursor-not-allowed opacity-70" : ""
                }`}
              >
                View Resume
              </a>
              <button
                onClick={() => setIsEdit(true)}
                className="border border-gray-300 px-6 py-1.5 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-[60vh]">
            <Loader />
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-medium mb-4">Jobs Applied</h3>
            {userApplication?.length === 0 ? (
              <p className="text-gray-500">
                You haven't applied to any jobs yet.
              </p>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Job Title
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                        Location
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userApplication?.map((job, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={job.companyId.image}
                              alt={job.company}
                              className="w-8 h-8 mr-2 hidden md:block rounded-full object-cover"
                              onError={(e) => {
                                e.target.src = assets.defaultCompanyLogo;
                              }}
                            />
                            <span className="text-sm font-medium text-gray-900">
                              {job.companyId.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {job.jobId.title}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 hidden sm:table-cell">
                          {job.jobId.location}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">
                          {moment(job.date).format("MMM DD, YYYY")}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1.5 rounded-md text-xs ${
                              job.status === "Pending"
                                ? "bg-blue-100 text-blue-500"
                                : job.status === "Rejected"
                                  ? "bg-red-100 text-red-500"
                                  : job.status === "Accepted"
                                    ? "bg-green-100 text-green-500"
                                    : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {job.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default Applications;
