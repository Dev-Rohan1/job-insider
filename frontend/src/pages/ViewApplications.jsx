import React from "react";
import { assets, viewApplicationsPageData } from "../assets/assets";
import moment from "moment";

const ViewApplications = () => {
  return (
    <section className="overflow-x-auto rounded-lg border border-gray-200">
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
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {viewApplicationsPageData.map((application, index) => (
            <tr key={`${application.id}-${index}`} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-600">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <img
                    src={application.userAvatar || assets.profile_pic}
                    alt={`${application.userName}'s avatar`}
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-500">
                    {application.name}
                  </span>
                  <div>
                    <p className="font-medium text-gray-900">
                      {application.userName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {application.userEmail}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                <div>
                  <p className="font-medium">{application.jobTitle}</p>
                  <p className="text-xs text-gray-500">{application.company}</p>
                </div>
              </td>
              <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                {application.location}
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap">
                <button
                  className="mx-auto flex cursor-pointer items-center justify-center gap-1 rounded bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                  onClick={() => window.open(application.resumeUrl, "_blank")}
                >
                  Resume
                  <img
                    src={assets.resume_download_icon}
                    alt="Download icon"
                    className="h-3 w-3"
                  />
                </button>
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap">
                <div className="flex justify-center gap-2">
                  <button className="cursor-pointer rounded bg-green-100 px-3 py-1 text-xs text-green-800 hover:bg-green-200">
                    Accept
                  </button>
                  <button className="cursor-pointer rounded bg-red-100 px-3 py-1 text-xs text-red-800 hover:bg-red-200">
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ViewApplications;
