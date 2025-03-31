import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { AppContext } from "../contexts/AppContext";

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true); // for fetching job applications
  const [error, setError] = useState(null);

  const {
    backendUrl,
    fetchUserData,
    setUserApplicationsError,
    userApplications,
    userData,
    userApplicationsError,
  } = useContext(AppContext);
  const { getToken } = useAuth();

  const resumeUploadHandler = async () => {
    if (!resume) {
      toast.error("Please select a file first");
      return;
    }

    if (resume.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      return;
    }

    // Check file size (e.g., 5MB)
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (resume.size > MAX_SIZE) {
      toast.error("File size exceeds the 5MB limit.");
      return;
    }

    setIsLoading(true);

    try {
      const token = await getToken();
      const formData = new FormData();
      formData.append("resume", resume);

      const { data } = await axios.post(
        `${backendUrl}/user/update-resume`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (data.success) {
        await fetchUserData();
        toast.success(data.message || "Resume updated successfully!");
        setIsEdit(false);
        setResume(null);
      } else {
        toast.error(data.message || "Failed to upload resume");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to upload resume";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle errors in fetching data
  useEffect(() => {
    if (userApplicationsError) {
      setError(userApplicationsError);
    }
  }, [userApplicationsError]);

  if (error) {
    return (
      <>
        <Navbar />
        <div className="flex h-64 items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
        <Footer />
      </>
    );
  }

  if (isFetching || !userData) {
    return (
      <>
        <Navbar />
        <div className="flex h-64 items-center justify-center">
          <Loader size="medium" />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="mb-16">
        <h2 className="mb-2 text-xl font-medium">Your Resume</h2>

        {isEdit ? (
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2">
              <span className="cursor-pointer rounded border border-blue-300 bg-blue-50 px-4 py-[8px] text-sm">
                {resume ? resume.name : "No resume selected"}
              </span>
              <input
                onChange={(e) => setResume(e.target.files[0])}
                type="file"
                accept="application/pdf"
                hidden
              />
              <img src={assets.profile_upload_icon} alt="Upload Icon" />
            </label>
            <button
              onClick={resumeUploadHandler}
              disabled={isLoading || !resume}
              className={`cursor-pointer rounded bg-blue-500 px-6 py-[8px] text-sm text-white transition-colors hover:bg-blue-600 ${
                isLoading || !resume ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Uploading...
                </span>
              ) : (
                "Save"
              )}
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {userData?.resume ? (
              <a
                href={userData.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer rounded bg-blue-500 px-6 py-[9px] text-sm text-white transition-colors hover:bg-blue-600"
              >
                View Resume
              </a>
            ) : (
              <p className="text-gray-500">No resume uploaded yet</p>
            )}
            <button
              onClick={() => setIsEdit(true)}
              className="cursor-pointer rounded border border-gray-300 px-6 py-2 text-sm transition-colors hover:bg-gray-50"
            >
              Edit
            </button>
          </div>
        )}

        <h2 className="mt-8 mb-4 text-xl font-medium">Jobs Applied</h2>

        {userApplications.length === 0 ? (
          <div className="rounded-lg border border-gray-200 p-8 text-center">
            <p className="text-gray-500">You haven't applied to any jobs yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Job Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {userApplications.map((job) => (
                  <tr key={job._id} className="hover:bg-gray-50">
                    <td className="flex items-center gap-3 px-6 py-4 whitespace-nowrap">
                      <img
                        src={job.jobId?.companyId?.image || assets.company_icon}
                        alt={`${job.jobId?.companyId?.name || "Company"} logo`}
                        className="h-6 w-6 flex-shrink-0"
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {job.jobId?.companyId?.name || "Company Not Specified"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      {job.jobId?.title || "Title Not Specified"}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      {job.jobId?.location || "Location Not Specified"}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      {job.date && moment(job.date).isValid()
                        ? moment(job.date).format("ll")
                        : "Invalid Date"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center rounded px-2.5 py-1 text-xs font-medium ${
                          job.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : job.status === "pending"
                              ? "bg-blue-50 text-blue-500"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {job.status || "pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default Applications;
