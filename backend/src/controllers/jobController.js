import Job from "../models/Job.js";

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ visible: true }).populate({
      path: "companyId",
      select: "-password",
    });

    if (jobs.length === 0) {
      return res.json({
        success: false,
        message: "No jobs available",
      });
    }

    return res.json({
      success: true,
      message: "Fetched all job data successfully",
      jobData: jobs,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return res.json({
      success: false,
      message: "Failed to fetch job data",
      error: error.message || "Unknown error",
    });
  }
};

export const getJobById = async (req, res) => {
  const { id } = req.params;

  try {
    const job = await Job.findById(id).populate({
      path: "companyId",
      select: "-password",
    });

    if (!job) {
      return res.json({ success: false, message: "Job not found" });
    }

    return res.json({
      success: true,
      message: "Job data fetched successfully",
      jobData: job,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Failed to fetch job data by ID",
      error: error.message || "Unknown error",
    });
  }
};
