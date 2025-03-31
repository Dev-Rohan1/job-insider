import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import Loader from "../components/Loader"; // Ensure the component is imported with the correct name
import { AppContext } from "../contexts/AppContext";

const ViewApplications = () => {
  const { backendUrl, companyToken } = useContext(AppContext);
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Function to update job application status (accept/reject)
  const updateStatus = async (applicationId, status) => {
    try {
      setIsUpdating(true);
      const { data } = await axios.post(
        `${backendUrl}/company/change-status`,
        {
          applicationId,
          status,
        },
        {
          headers: {
            token: companyToken,
          },
        },
      );

      if (data.success) {
        toast.success(data.message);
        // Optimistic update instead of full refetch
        setApplications((prev) =>
          prev.map((app) =>
            app._id === applicationId ? { ...app, status } : app,
          ),
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update job application status",
      );
    } finally {
      setIsUpdating(false);
    }
  };

  // Function to fetch job applications
  const fetchApplications = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${backendUrl}/company/job-applicants`, {
        headers: {
          token: companyToken,
        },
      });

      if (data.success) {
        setApplications(data.jobApplicants?.reverse() || []);
      }
    } catch (error) {
      setApplications([]); // Clear applications on error
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch applications when the component mounts
  useEffect(() => {
    if (companyToken) {
      fetchApplications();
    }
  }, []);
  return (
    <section
      className={`overflow-x-auto rounded-lg ${
        isLoading ? "" : "border border-gray-200"
      }`} // Conditionally hide border when loading
    >
      {isLoading ? (
        <div className="flex h-[70vh] items-center justify-center">
          <Loader /> {/* Show Loader if data is being fetched */}
        </div>
      ) : applications.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                User Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Job Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Location
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
                Resume
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
                Status/Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {applications.map((application, index) => {
              const isPending = application.status === "pending";
              const isAccepted = application.status === "accepted";
              const isRejected = application.status === "rejected";

              return (
                <tr key={application._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-600">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img
                        src={application.userId?.image || assets.profile_pic}
                        alt={`${application.userId?.name || "User"}'s avatar`}
                        className="h-8 w-8 rounded-full object-cover"
                        onError={(e) => {
                          e.target.src = assets.profile_pic;
                          e.target.onerror = null; // Prevent infinite loop
                        }}
                      />
                      <span className="text-sm font-medium text-gray-500">
                        {application.userId?.name || "Unknown User"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                    {application.jobId?.title || "Untitled Job"}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                    {application.jobId?.location || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    {application.userId?.resume ? (
                      <a
                        href={application.userId.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mx-auto flex cursor-pointer items-center justify-center gap-1 rounded bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                        download
                      >
                        Resume
                        <img
                          src={assets.resume_download_icon}
                          alt="Download icon"
                          className="h-3 w-3"
                        />
                      </a>
                    ) : (
                      <span className="text-gray-400">No resume available</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    {isPending ? (
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() =>
                            updateStatus(application._id, "accepted")
                          }
                          disabled={isUpdating}
                          className="cursor-pointer rounded bg-green-100 px-3 py-1 text-xs text-green-800 capitalize hover:bg-green-200 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            updateStatus(application._id, "rejected")
                          }
                          disabled={isUpdating}
                          className="cursor-pointer rounded bg-red-100 px-3 py-1 text-xs text-red-800 capitalize hover:bg-red-200 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span
                        className={`rounded px-2 py-1 text-xs font-medium capitalize ${
                          isAccepted
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {application.status}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="py-4 text-center text-gray-500">
          No applications available.
        </div>
      )}
    </section>
  );
};

export default ViewApplications;
