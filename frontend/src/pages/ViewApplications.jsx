import React from "react";
import { assets, viewApplicationsPageData } from "../assets/assets";

const ViewApplications = () => {
  return (
    <section className="p-2 sm:p-4">
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-2 sm:px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8 sm:w-10"
              >
                #
              </th>
              <th
                scope="col"
                className="px-2 sm:px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px] sm:min-w-[120px]"
              >
                User Name
              </th>
              <th
                scope="col"
                className="px-2 sm:px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px] sm:min-w-[150px]"
              >
                Job title
              </th>
              <th
                scope="col"
                className="px-2 sm:px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px] sm:min-w-[120px]"
              >
                Location
              </th>
              <th
                scope="col"
                className="px-2 sm:px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px] sm:min-w-[100px]  xs:table-cell"
              >
                Resume
              </th>
              <th
                scope="col"
                className="px-2 sm:px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-20 sm:w-24"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {viewApplicationsPageData.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                  No applications available.
                </td>
              </tr>
            ) : (
              viewApplicationsPageData.map((job, index) => (
                <tr
                  key={job.id || index}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-2 sm:px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-8 sm:w-10">
                    {index + 1}
                  </td>
                  <td className="px-2 sm:px-3 py-4 text-sm text-gray-900 min-w-[100px] sm:min-w-[120px] max-w-[150px] sm:max-w-[200px] truncate">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <img
                        src={assets.profile_img}
                        alt={job.name}
                        className="h-5 w-5 sm:h-6 sm:w-6 rounded-full object-cover"
                      />
                      <span className="truncate">{job.name}</span>
                    </div>
                  </td>
                  <td className="px-2 sm:px-3 py-4 text-sm text-gray-500 min-w-[120px] sm:min-w-[150px] max-w-[150px] sm:max-w-[200px] truncate">
                    {job.jobTitle}
                  </td>
                  <td className="px-2 sm:px-3 py-4 text-sm text-gray-500 min-w-[100px] sm:min-w-[120px] max-w-[120px] sm:max-w-[150px] truncate">
                    {job.location}
                  </td>
                  <td className="px-2 sm:px-3 py-4 whitespace-nowrap text-sm  xs:table-cell">
                    <a
                      className="inline-flex text-xs items-center bg-blue-100 text-blue-500 px-2 sm:px-3 py-1 rounded hover:bg-blue-200 transition-colors"
                      href="#"
                    >
                      Resume
                      <img
                        src={assets.resume_download_icon}
                        alt="Download"
                        className="ml-1 hidden md:block h-3 w-3"
                      />
                    </a>
                  </td>
                  <td className="px-2 sm:px-3 py-4 whitespace-nowrap text-center w-20 sm:w-24">
                    <div className="flex gap-1 sm:gap-2 justify-center">
                      <button className="cursor-pointer text-xs bg-green-100 text-green-600 px-2 py-1 rounded hover:bg-green-200 transition-colors">
                        Accept
                      </button>
                      <button className="cursor-pointer text-xs bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200 transition-colors">
                        Reject
                      </button>
                    </div>
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
