import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const JobList = ({ job }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  const sanitizeHtml = (html) => {
    return html.replace(/<[^>]*>?/gm, "");
  };

  return (
    <div className="border border-gray-300 rounded-lg px-5 py-6 hover:shadow-md transition-shadow">
      <img
        src={assets.company_icon}
        alt={`${job.company || "Company"} logo`}
        className="h-12 w-12 object-contain"
      />
      <h3 className="text-lg font-medium my-3 text-gray-900">{job.title}</h3>

      <div className="flex items-center gap-2 flex-wrap mb-3">
        <span className="border border-blue-300 bg-blue-50 text-blue-800 rounded px-3 py-1 text-xs">
          {job.location}
        </span>
        <span className="border border-red-300 bg-red-50 text-red-800 rounded px-3 py-1 text-xs">
          {job.level}
        </span>
      </div>

      <div className="text-sm text-gray-600 mb-4 line-clamp-3">
        {sanitizeHtml(job.description.slice(0, 156))}
      </div>

      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={() => handleNavigation(`/apply-job/${job._id}`)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500"
          aria-label={`Apply for ${job.title} position`}
        >
          Apply now
        </button>
        <button
          onClick={() => handleNavigation(`/job-details/${job._id}`)}
          className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded text-sm font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-gray-300"
          aria-label={`View details for ${job.title} position`}
        >
          View details
        </button>
      </div>
    </div>
  );
};

export default JobList;
