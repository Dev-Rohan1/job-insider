import kConverter from "k-converter";
import { Clock, MapPin, User } from "lucide-react";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Footer from "../components/Footer";
import JobList from "../components/JobList";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { AppContext } from "../context/AppContext";

const ApplyJob = () => {
  const { id } = useParams();
  const { jobs } = useContext(AppContext);
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = jobs.find((job) => job._id === id);
    setJobData(data || null);
    setLoading(false);
  }, [jobs, id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loader />
      </div>
    );
  }

  if (!jobData) {
    return (
      <div className="flex items-center justify-center w-full min-h-[60vh]">
        <p className="text-gray-500">Job not found</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <section>
        <div className="border border-blue-200 bg-blue-50 rounded-lg p-8 lg:p-16 flex flex-col lg:flex-row justify-between gap-6">
          <div className="flex flex-col md:items-center sm:flex-row gap-4">
            <div className="border border-gray-200 bg-white flex-shrink-0 flex items-center justify-center rounded-lg w-24 h-24">
              <img
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                src={assets.company_icon}
                alt={`${jobData.companyId?.name || "Company"} logo`}
              />
            </div>

            <div className="flex-1 space-y-2">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700">
                {jobData.title}
              </h1>

              <div className="flex flex-wrap gap-x-4 gap-y-2">
                <div className="flex items-center gap-1 text-gray-600">
                  <img src={assets.suitcase_icon} alt="suitcase_icon" />
                  <span className="text-[15px] md:text-base">
                    {jobData.companyId?.name || "Unknown Company"}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                  <span className="text-[15px] md:text-base">
                    {jobData.location}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                  <span className="text-[15px] md:text-base">
                    {jobData.level}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <img src={assets.money_icon} alt="money_icon" />
                  <span className="text-[15px] md:text-base">
                    CTC: {kConverter.convertTo(jobData.salary)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-col items-start  gap-3 w-full lg:w-auto">
            <button className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm text-sm sm:text-base">
              Apply Now
            </button>
            <div className="flex items-center gap-1.5 text-gray-500 text-xs sm:text-sm">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Posted {moment(jobData.date).fromNow()}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mt-8">
          <div className="flex-1">
            <div className="bg-white rounded-lg ">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Job Description
              </h2>
              <div
                className="text-gray-600 space-y-4 job-description"
                dangerouslySetInnerHTML={{ __html: jobData.description }}
              />
              <div className="mt-8 flex justify-center md:justify-start">
                <button className="w-full md:w-auto px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm text-sm sm:text-base">
                  Apply Now
                </button>
              </div>
            </div>
          </div>

          {jobs.filter(
            (job) =>
              job._id !== id && job.companyId?.name === jobData.companyId?.name
          ).length > 0 && (
            <div className="lg:w-96 flex-shrink-0">
              <div className="bg-white rounded-lg ">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                  Similar Jobs from{" "}
                  <strong className="text-blue-600">
                    {jobData.companyId?.name}
                  </strong>
                </h2>
                <div className="space-y-3">
                  {jobs
                    .filter(
                      (job) =>
                        job._id !== id &&
                        job.companyId.name === jobData.companyId.name
                    )
                    .slice()
                    .reverse()
                    .slice(0, 3)
                    .map((job) => (
                      <JobList key={job._id} job={job} />
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ApplyJob;
