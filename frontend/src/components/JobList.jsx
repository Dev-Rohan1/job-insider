import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const JobList = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className="rounded border border-gray-300 p-4">
      <img className="mb-4" src={assets.company_icon} alt="" />
      <h2 className="mb-3 text-xl font-semibold">{job.title}</h2>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded border border-blue-300 bg-blue-50 px-3 py-1 text-sm">
          {job.level}
        </span>
        <span className="rounded border border-red-300 bg-red-50 px-3 py-1 text-sm">
          {job.location}
        </span>
      </div>
      <div
        className="mb-4 text-[15px] text-gray-700"
        dangerouslySetInnerHTML={{ __html: job.description.slice(0, 156) }}
      ></div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            navigate(`/apply-jobs/${job._id}`);
            scrollTo(0, 0);
          }}
          className="cursor-pointer rounded bg-blue-500 px-3 py-1.5 text-[15px] text-white"
        >
          Apply now
        </button>
        <button
          onClick={() => {
            navigate(`/apply-jobs/${job._id}`);
            scrollTo(0, 0);
          }}
          className="cursor-pointer rounded border border-gray-300 px-3 py-1.5 text-[15px] text-gray-800"
        >
          Learn more
        </button>
      </div>
    </div>
  );
};

export default JobList;
