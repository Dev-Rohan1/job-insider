import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import kConverter from "k-convert";
import { MapPin, User } from "lucide-react";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import Footer from "../components/Footer";
import JobList from "../components/JobList";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { AppContext } from "../contexts/AppContext";

const ApplyJobs = () => {
  const [jobData, setJobData] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);
  const { id } = useParams();
  const { jobs, backendUrl, userData, userApplications, fetchJobApplications } =
    useContext(AppContext);

  const navigate = useNavigate();
  const { getToken } = useAuth();

  const checkedAlreadyApplied = async () => {
    const hasApplied = userApplications.some(
      (application) => application.jobId._id === jobData._id,
    );
    setIsAlreadyApplied(hasApplied);
  };

  const applyJobHandler = async () => {
    try {
      setIsApplying(true);
      const token = await getToken();

      if (!userData) {
        toast.error("Please login to apply for this job");
        return;
      }

      if (!userData.resume) {
        navigate("/applications");
        toast.error("Please upload your resume before applying");
        return;
      }

      const { data } = await axios.post(
        `${backendUrl}/user/apply-job`,
        {
          jobId: jobData._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success("Application submitted successfully!");
        await fetchJobApplications();
        checkedAlreadyApplied();
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                         "We couldn't process your application. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsApplying(false);
    }
  };

  useEffect(() => {
    const fetchJobs = () => {
      if (!id) {
        setJobData(undefined);
        return;
      }

      const data = jobs.find((job) => job._id === id);
      setJobData(data || undefined);
    };

    fetchJobs();
  }, [id, jobs]);

  useEffect(() => {
    if (jobData) {
      checkedAlreadyApplied();
    }
  }, [jobData, userApplications]);

  if (jobData === null || jobData === undefined) {
    return (
      <>
        <Navbar />
        <div className="flex h-[70vh] items-center justify-center">
          <Loader />
        </div>
      </>
    );
  }

  const similarJobs = jobs.filter(
    (job) => job.companyId.name === jobData.companyId.name && job._id !== jobData._id
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
                src={jobData.companyId.image}
                alt="Company Icon"
              />
            </div>
            <div>
              <h2 className="mb-4 text-center text-2xl font-medium text-gray-700 md:text-left md:text-3xl md:font-semibold">
                {jobData.title || "Job Title Not Available"}
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start md:gap-4">
                <div className="flex items-center gap-1">
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
                  <span className="text-gray-700">
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
                    CTC: {jobData.salary ? kConverter.convertTo(jobData.salary) : "Not Specified"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center lg:mt-0">
            <button
              onClick={applyJobHandler}
              disabled={isAlreadyApplied || isApplying}
              className={`cursor-pointer rounded bg-blue-600 px-8 py-2 text-white ${
                isAlreadyApplied || isApplying ? "cursor-not-allowed opacity-50" : ""
              }`}
              aria-label="Apply for this job"
            >
              {isApplying ? "Applying..." : 
               isAlreadyApplied ? "Already Applied" : "Apply now"}
            </button>
            <span className="mt-2 text-sm text-gray-600">
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
            />
          </div>
          <div className="mt-10 w-full lg:w-[28%]">
            <p className="mb-7 text-xl font-semibold">
              More jobs from <strong className="text-blue-500">{jobData.companyId.name}</strong>
            </p>
            <div className="mb-10 flex flex-col gap-5">
              {similarJobs.length > 0 ? (
                similarJobs.map((job) => (
                  <JobList key={job._id} job={job} />
                ))
              ) : (
                <div className="text-gray-500">
                  No other jobs available from this company
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