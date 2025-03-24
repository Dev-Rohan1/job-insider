import React from "react";
import { assets, manageJobsData } from "../assets/assets";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const ManageJobs = () => {
  const navigate = useNavigate();

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
            {manageJobsData.map((job, index) => (
              <tr key={`${job.id}-${index}`} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-700">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <img
                      src={job.companyLogo || assets.company_icon}
                      alt={`${job.company} logo`}
                      className="h-8 w-8 rounded-full object-cover"
                    />
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
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" />
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
