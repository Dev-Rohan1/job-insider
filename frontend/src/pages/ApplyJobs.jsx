import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SpinnerCircularFixed } from "spinners-react";
import Navbar from "../components/Navbar";
import { AppContext } from "../contexts/AppContext";
import { assets } from "../assets/assets";
import { MapPin, User } from "lucide-react";
import moment from "moment";
import kConverter from "k-convert";

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
        <div className="flex h-[80vh] items-center justify-center">
          <SpinnerCircularFixed
            secondaryColor="#3AC8B4"
            size={100}
            color="blue"
          />
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
    );
  }

  return (
    <>
      <Navbar />
      <section>
        <div className="flex flex-col rounded-xl border border-blue-300 bg-blue-50 p-16 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col items-center gap-5 md:flex-row">
            <div className="flex h-26 w-26 items-center justify-center rounded-lg border border-gray-200 bg-white">
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
                <div className="flex items-center gap-1">
                  <img src={assets.suitcase_icon} alt="Suitcase Icon" />
                  <span className="text-gray-700">
                    {jobData.companyId?.name || "Company Not Specified"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={19} className="text-gray-600" />
                  <span className="text-gray-700">
                    {jobData.location || "Location Not Specified"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <User size={19} className="text-gray-600" />
                  <span className="text-gray-700">
                    {jobData.level || "Level Not Specified"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <img src={assets.money_icon} alt="Money Icon" />
                  <span className="text-gray-700">
                    CTC: {kConverter.convertTo(jobData.salary)}
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
      </section>
    </>
  );
};

export default ApplyJobs;
