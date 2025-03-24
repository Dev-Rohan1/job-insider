import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { assets, jobsApplied } from "../assets/assets";
import moment from "moment";

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  return (
    <>
      <Navbar />
      <section className="mb-16">
        <h2 className="mb-2 text-xl font-medium">Your Resume</h2>
        {isEdit ? (
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2">
              <span className="cursor-pointer rounded border border-blue-300 bg-blue-50 px-4 py-[8px] text-sm">
                Select Resume
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
              onClick={() => setIsEdit(false)}
              className="cursor-pointer rounded bg-blue-500 px-6 py-[8px] text-sm text-white transition-colors hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button className="cursor-pointer rounded bg-blue-500 px-6 py-2 text-sm text-white transition-colors hover:bg-blue-600">
              View Resume
            </button>
            <button
              onClick={() => setIsEdit(true)}
              className="cursor-pointer rounded border border-gray-300 px-6 py-2 text-sm transition-colors hover:bg-gray-50"
            >
              Edit
            </button>
          </div>
        )}
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-medium">Jobs Applied</h2>
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
                {jobsApplied.map((job) => (
                  <tr
                    key={job.id || job.company + job.title}
                    className="hover:bg-gray-50"
                  >
                    <td className="flex items-center gap-3 px-6 py-4 whitespace-nowrap">
                      <img
                        src={job.companyLogo || assets.company_icon}
                        alt={`${job.company} logo`}
                        className="h-6 w-6 flex-shrink-0"
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {job.company}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      {job.title}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      {job.location}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      {job.date && moment(job.date).isValid()
                        ? moment(job.date).format("ll")
                        : "Invalid Date"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center rounded px-2.5 py-1 text-xs font-medium ${
                          job.status === "Rejected"
                            ? "bg-red-100 text-red-800"
                            : job.status === "Pending"
                              ? "bg-blue-50 text-blue-500"
                              : "bg-green-100 text-green-800"
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
