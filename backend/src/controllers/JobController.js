import Job from "../models/Job.js";

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ visible: true }).populate(
      "companyId",
      "-password"
    );

    return res.status(200).json({
      success: true,
      message: "Job data fetched successfully",
      jobList: jobs,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Job data fetch failed",
    });
  }
};

export default getAllJobs;
