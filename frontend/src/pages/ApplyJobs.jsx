import kConverter from "k-convert";
import { MapPin, User } from "lucide-react";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Footer from "../components/Footer";
import JobList from "../components/JobList";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { AppContext } from "../contexts/AppContext";

const ApplyJobs = () => {
  const [jobData, setJobData] = useState(null);
  const { id } = useParams();
  const { jobs } = useContext(AppContext);

  useEffect(() => {
    const fetchJobs = () => {
      const data = jobs.find((job) => job._id === id);
      if (data) {
        setJobData(data);
      } else {
        setJobData(undefined);
      }
    };

    fetchJobs();
  }, [id, jobs]);

  if (jobData === null) {
    return (
      <>
        <Navbar />
        <div className="flex h-[70vh] items-center justify-center">
          <Loader />
        </div>
      </>
    );
  }

  if (!jobData) {
    return (
      <>
        <Navbar />
        <div>Job not found.</div>
      </>
    );k
  }

  // Filter jobs from the same company and exclude the current job
  const similarJobs = jobs.filter(
    (job) =>
      job.companyId.name === jobData.companyId.name && job._id !== jobData._id,
  );

  return (
    <>
      <Navbar />
      <section>
        <div className="flex flex-col rounded-xl border border-blue-300 bg-blue-50 p-16 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col items-center gap-5 md:flex-row">
            <div className="flex h-[6.5rem] w-[6.5rem] items-center justify-center rounded-lg border border-gray-200 bg-white">
              <img
                className="w-14"
                src={assets.company_icon}
                alt="Company Icon"
              />
            </div>
            <div>
              <h2 className="mb-4 text-center text-2xl font-medium text-gray-700 md:text-left md:text-3xl md:font-semibold">
                {jobData.title || "Job Title Not Available"}
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
                <div
                  className="flex items-center gap-1"
                  role="img"
                  aria-label="Company"
                >
                  <img
                    src={assets.suitcase_icon}
                    alt="Suitcase Icon"
                    className="h-5 w-5"
                  />
                  <span className="text-gray-700">
                    {jobData.companyId?.name || "Company Not Specified"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={20} className="text-gray-600" />
                  <span className="flex items-center text-gray-700">
                    {jobData.location || "Location Not Specified"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <User size={20} className="text-gray-600" />
                  <span className="text-gray-700">
                    {jobData.level || "Level Not Specified"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <img
                    src={assets.money_icon}
                    alt="Money Icon"
                    className="h-5 w-5"
                  />
                  <span className="text-gray-700">
                    CTC:{" "}
                    {jobData.salary
                      ? kConverter.convertTo(jobData.salary)
                      : "Not Specified"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center md:items-start lg:mt-0">
            <button
              className="cursor-pointer rounded bg-blue-600 px-8 py-2 text-white"
              aria-label="Apply for this job"
            >
              Apply now
            </button>
            <span className="mt-2 block text-sm text-gray-600">
              Posted {moment(jobData.date).fromNow()}
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-5">
          <div className="w-full md:w-[70%]">
            <h2 className="mt-10 mb-4 text-2xl font-bold text-gray-800">
              Job description
            </h2>
            <div
              className="job-description"
              dangerouslySetInnerHTML={{
                __html: jobData.description,
              }}
            ></div>
            <button
              className="mb-10 cursor-pointer rounded bg-blue-600 px-8 py-2 text-white"
              aria-label="Apply for this job"
            >
              Apply now
            </button>
          </div>
          <div className="mt-10 w-full lg:w-[28%]">
            <p className="mb-7 text-xl font-semibold">
              More jobs from{" "}
              <strong className="text-blue-500">
                {jobData.companyId.name}
              </strong>
            </p>
            <div className="mb-10 flex flex-col gap-5">
              {similarJobs.length > 0 ? (
                similarJobs
                  .slice(0, 2)
                  .reverse()
                  .map((job, index) => <JobList key={index} job={job} />)
              ) : (
                <div className="text-red-500">
                  No more jobs available from this company 😔
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ApplyJobs;
