import React from "react";
import { assets, manageJobsData } from "../assets/assets";
import moment from "moment";

const ManageJobs = () => {
  return (
    <section className="overflow-x-auto rounded-md border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 overflow-hidden rounded-lg">
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
              <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                {index + 1}
              </td>
              <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-medium text-gray-900">{job.title}</p>
                    <p className="text-xs text-gray-500">{job.company}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                {job.location}
              </td>
              <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                {job.date && moment(job.date).isValid()
                  ? moment(job.date).format("ll")
                  : "N/A"}
              </td>
              <td className="px-6 py-4 text-center text-sm whitespace-nowrap text-gray-500">
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                  {job.applicants || 0}
                </span>
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap">
                <input type="checkbox" className="cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ManageJobs;
