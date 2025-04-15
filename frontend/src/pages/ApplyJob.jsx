import KConvert from "k-convert";
import { Clock, MapPin, User } from "lucide-react";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Footer from "../components/Footer";
import JobList from "../components/JobList";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

const ApplyJob = () => {
  const { id } = useParams();
  const { jobs, userData, userApplication, fetchJobsData } =
    useContext(AppContext);
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const { backendUrl } = useContext(AppContext);

  const navigate = useNavigate();
  const { getToken } = useAuth();

  useEffect(() => {
    fetchJobsData();
  }, []);

  useEffect(() => {
    if (jobs) {
      const data = jobs.find((job) => job?._id === id);
      setJobData(data || null);
      setLoading(false);
    }
  }, [jobs, id]);

  const salary = Number(jobData?.salary) || 0;

  const applyJobHandler = async () => {
    try {
      if (!userData) {
        toast.error("Please login to apply for a job");
        return;
      }

      if (!userData?.resume) {
        toast.error("Please upload your resume first");
        navigate("/applications");
        return;
      }

      if (alreadyApplied) {
        toast.info("You've already applied for this position");
        return;
      }

      const token = await getToken();

      const { data } = await axios.post(
        `${backendUrl}/user/apply-job`,
        {
          jobId: jobData?._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setAlreadyApplied(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Application error:", error);
      toast.error(
        error.response?.data?.message || "Failed to apply. Please try again."
      );
    }
  };

  const checkAlreadyApplied = () => {
    const hasApplied = userApplication?.some(
      (item) => item?.jobId?._id === jobData?._id
    );
    setAlreadyApplied(hasApplied);
  };

  useEffect(() => {
    if (userApplication?.length > 0 && jobData) {
      checkAlreadyApplied();
    }
  }, [userApplication, jobData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loader />
      </div>
    );
  }

  if (!jobData) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Job Not Found
        </h2>
        <p className="text-gray-500 mb-6">
          The job you're looking for doesn't exist or may have been removed.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Browse Jobs
        </button>
      </div>
    );
  }

  const appliedJobIds = new Set(
    userApplication?.map((app) => app?.jobId?._id).filter(Boolean) || []
  );

  // Get similar jobs from the same company that user hasn't applied to
  const similarJobs = jobs?.filter(
    (job) =>
      job?._id !== id &&
      job?.companyId?.name === jobData?.companyId?.name &&
      !appliedJobIds.has(job._id)
  );

  return (
    <>
      <Navbar />
      <section className="container mx-auto px-4 py-8">
        <div className="border border-blue-200 bg-blue-50 rounded-lg p-8 lg:p-16 flex flex-col lg:flex-row justify-between gap-6">
          <div className="flex flex-col md:items-center sm:flex-row gap-4">
            <div className="border border-gray-200 bg-white flex-shrink-0 flex items-center justify-center rounded-lg w-24 h-24">
              <img
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                src={jobData?.companyId?.image || assets.defaultCompanyLogo}
                alt={`${jobData?.companyId?.name || "Company"} logo`}
                onError={(e) => {
                  e.target.src = assets.defaultCompanyLogo;
                }}
              />
            </div>

            <div className="flex-1 space-y-2">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700">
                {jobData?.title || "Job Title"}
              </h1>

              <div className="flex flex-wrap gap-x-4 gap-y-2">
                <div className="flex items-center gap-1 text-gray-600">
                  <img src={assets.suitcase_icon} alt="suitcase_icon" />
                  <span className="text-[15px] md:text-base">
                    {jobData?.companyId?.name || "Unknown Company"}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                  <span className="text-[15px] md:text-base">
                    {jobData?.location || "Remote"}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                  <span className="text-[15px] md:text-base">
                    {jobData?.level || "Not specified"}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <img src={assets.money_icon} alt="money_icon" />
                  <span className="text-[15px] md:text-base">
                    CTC:{" "}
                    {salary > 0 ? KConvert.convertTo(salary) : "Not specified"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-col items-start gap-3 w-full lg:w-auto">
            <button
              onClick={applyJobHandler}
              disabled={alreadyApplied}
              className={`px-4 py-2 sm:px-6 sm:py-3 ${
                alreadyApplied
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white font-medium rounded-lg transition-colors shadow-sm text-sm sm:text-base`}
            >
              {alreadyApplied ? "Already Applied" : "Apply Now"}
            </button>
            <div className="flex items-center gap-1.5 text-gray-500 text-xs sm:text-sm">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>
                Posted{" "}
                {jobData?.date ? moment(jobData.date).fromNow() : "recently"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mt-8">
          <div className="flex-1">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Job Description
              </h2>
              <div
                className="text-gray-600 space-y-4 job-description"
                dangerouslySetInnerHTML={{
                  __html:
                    jobData?.description || "<p>No description provided</p>",
                }}
              />
            </div>
            <button
              onClick={applyJobHandler}
              disabled={alreadyApplied}
              className={`px-4 py-2 sm:px-6 sm:py-3 ${
                alreadyApplied
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white font-medium rounded-lg transition-colors shadow-sm text-sm sm:text-base`}
            >
              {alreadyApplied ? "Already Applied" : "Apply Now"}
            </button>
          </div>

          <div className="lg:w-96 flex-shrink-0">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Similar Jobs from{" "}
                <strong className="text-blue-600">
                  {jobData?.companyId?.name || "this company"}
                </strong>
              </h2>
              {similarJobs?.length > 0 ? (
                <div className="space-y-3">
                  {similarJobs.slice(0, 3).map((job) => (
                    <JobList key={job?._id} job={job} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No similar jobs available from this company
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ApplyJob;
