import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Loader from "../components/Loader";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const ManageJobs = () => {
  const navigate = useNavigate();
  const { backendUrl, companyToken } = useContext(AppContext);

  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchManageJobs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/company/list-jobs`, {
        headers: {
          token: companyToken,
        },
      });

      if (data.success) {
        setJobData(data.jobData || []);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setError("Failed to fetch jobs");
      setLoading(false);
    }
  };

  const changeJobVisibility = async (id) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/company/change-visiblity`,
        { id },
        { headers: { token: companyToken } },
      );

      if (data.success) {
        fetchManageJobs();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message); // Fixed error handling
      console.error("Error changing job visibility:", error);
    }
  };

  useEffect(() => {
    fetchManageJobs();
  }, [backendUrl, companyToken]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="space-y-4">
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Job Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Date Posted
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
                Applicants
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {jobData.map((job, index) => (
              <tr key={`${job.id}-${index}`} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-700">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <p className="font-medium text-gray-600">{job.title}</p>
                      <p className="text-xs text-gray-500">{job.company}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                  {job.location}
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                  {job.date && moment(job.date).isValid()
                    ? moment(job.date).format("MMM D, YYYY")
                    : "N/A"}
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    {job.applicants || 0}
                  </span>
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  <label className="inline-flexitems-center relative">
                    <input
                      className="cursor-pointer"
                      type="checkbox"
                      onChange={() => changeJobVisibility(job._id)}
                      checked={job.visible || false}
                    />
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full md:flex md:justify-end">
        <button
          onClick={() => navigate("/dashboard/add-jobs")}
          className="w-full cursor-pointer rounded-md bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-500 md:w-auto"
        >
          Add new job
        </button>
      </div>
    </section>
  );
};

export default ManageJobs;
