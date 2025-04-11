import React from "react";
import { manageJobsData } from "../assets/assets";
import moment from "moment";

const ManageJob = () => {
  return (
    <section>
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                #
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Job Title
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"
              >
                Location
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Applicants
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Visible
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {manageJobsData.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                  No jobs available.
                </td>
              </tr>
            ) : (
              manageJobsData.map((job, index) => (
                <tr
                  key={job.id || index}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 max-w-xs truncate">
                    {job.title}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                    {job.location}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                    {moment(job.date).isValid()
                      ? moment(job.date).format("MMM DD, YYYY")
                      : "Invalid date"}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        job.applicants > 0
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {job.applicants || 0}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out rounded focus:ring-indigo-500"
                        defaultChecked={job.visible}
                      />
                    </label>
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

export default ManageJob;
