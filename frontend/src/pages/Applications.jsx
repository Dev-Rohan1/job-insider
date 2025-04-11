import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { assets, jobsApplied } from "../assets/assets";
import moment from "moment";

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  const handleSaveResume = () => {
    setIsEdit(false);
  };

  return (
    <>
      <Navbar />
      <section className="px-4 py-8">
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-3">Your Resume</h3>
          {isEdit ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-3">
              <label className="flex items-center gap-1.5">
                <input
                  type="file"
                  hidden
                  accept="application/pdf"
                  onChange={(e) => setResume(e.target.files[0])}
                />
                <span className="bg-blue-100 px-5 cursor-pointer py-1.5 rounded-md text-blue-500 hover:bg-blue-200 transition-colors">
                  Select Resume
                </span>
                <img src={assets.profile_upload_icon} alt="Upload" />
              </label>
              <button
                onClick={handleSaveResume}
                className="border border-gray-300 px-4 py-1.5 rounded-md cursor-pointer text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Save resume
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-3">
              <button className="bg-blue-100 px-6 cursor-pointer py-1.5 rounded-md text-blue-500 hover:bg-blue-200 transition-colors">
                View Resume
              </button>
              <button
                onClick={() => setIsEdit(true)}
                className="border border-gray-300 px-6 py-1.5 rounded-md cursor-pointer text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Edit
              </button>
            </div>
          )}
        </div>
        <div>
          <h3 className="text-lg font-medium mb-4">Jobs Applied</h3>
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
                {jobsApplied.map((job, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={assets.company_icon}
                          alt={job.company}
                          className="w-8 h-8 mr-2 hidden md:block rounded-full object-cover"
                        />
                        <span className="text-sm font-medium text-gray-900">
                          {job.company}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {job.title}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 hidden sm:table-cell">
                      {job.location}
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
                                : ""
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
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Applications;
