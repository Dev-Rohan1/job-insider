import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const ViewApplications = () => {
  const { backendUrl } = useContext(AppContext);
  const [applicationData, setApplicationData] = useState([]);
  const [loading, setLoading] = useState(true);

  const viewApplicationsFetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/company/applicants`, {
        headers: {
          token: localStorage.getItem("companyToken"),
        },
      });

      if (data.success) {
        setApplicationData(data.jobApplicants || []);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error fetching applications"
      );
    } finally {
      setLoading(false);
    }
  };

  const changeApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/company/change-status`,
        { id, status },
        {
          headers: {
            token: localStorage.getItem("companyToken"),
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setApplicationData((prev) =>
          prev.map((app) => (app._id === id ? { ...app, status } : app))
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error changing status");
    }
  };

  useEffect(() => {
    viewApplicationsFetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader />
      </div>
    );
  }

  return (
    <section className="px-2 sm:px-4 py-4">
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10"
              >
                #
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]"
              >
                User Name
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]"
              >
                Job title
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]"
              >
                Location
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]"
              >
                Resume
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-24"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applicationData.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                  {loading ? "Loading..." : "No applications available."}
                </td>
              </tr>
            ) : (
              applicationData.map((job, index) => (
                <tr key={job._id || index} className="hover:bg-gray-50">
                  <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-900 max-w-[200px] truncate">
                    <div className="flex items-center gap-2">
                      <img
                        src={job.userId?.image || assets.defaultUser}
                        alt={job.userId?.name}
                        className="h-6 w-6 rounded-full object-cover"
                        onError={(e) => {
                          e.target.src = assets.defaultUser;
                        }}
                      />
                      <span className="truncate">
                        {job.userId?.name || "N/A"}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500 max-w-[200px] truncate">
                    {job.jobId?.title || "N/A"}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500 max-w-[150px] truncate">
                    {job.jobId?.location || "Remote"}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm">
                    {job.userId?.resume ? (
                      <a
                        href={job.userId.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200 transition-colors"
                      >
                        View
                        <img
                          src={assets.resume_download_icon}
                          alt="Download"
                          className="ml-1 h-3 w-3"
                        />
                      </a>
                    ) : (
                      <span className="text-xs text-gray-400">No resume</span>
                    )}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-center">
                    {job.status === "Pending" ? (
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() =>
                            changeApplicationStatus(job._id, "Accepted")
                          }
                          className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded hover:bg-green-200 transition-colors"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            changeApplicationStatus(job._id, "Rejected")
                          }
                          className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          job.status === "Accepted"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {job.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ViewApplications;
