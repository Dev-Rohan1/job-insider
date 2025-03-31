import { v2 as cloudinary } from "cloudinary";
import Job from "../models/Job.js";
import JobApplication from "../models/jobApplication.js";
import User from "../models/User.js";

export const getUserData = async (req, res) => {
  const userId = req.auth.userId;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User ID is missing from the request",
    });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      message: "User data fetched successfully",
      userData: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching user data",
    });
  }
};

export const applyJob = async (req, res) => {
  const { jobId } = req.body;
  const userId = req.auth.userId;

  try {
    const isAlreadyApplied = await JobApplication.findOne({ jobId, userId });

    if (isAlreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "You've already applied to this job",
      });
    }

    const jobData = await Job.findById(jobId);

    if (!jobData) {
      return res.status(400).json({
        success: false,
        message: "Job not found",
      });
    }

    const jobApplication = new JobApplication({
      companyId: jobData.companyId,
      jobId: jobData._id,
      userId,
      date: Date.now(),
    });

    await jobApplication.save();

    return res.json({
      success: true,
      message: "Job applied successfully",
      jobData: jobApplication,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while applying for the job",
    });
  }
};

export const getUserApplications = async (req, res) => {
  const userId = req.auth.userId;
  try {
    const jobApplications = await JobApplication.find({ userId })
      .populate({
        path: "jobId",
        select: "title description location category level salary",
        populate: {
          path: "companyId",
          select: "name email image",
        },
      })
      .exec();

    if (!jobApplications || jobApplications.length === 0) {
      return res.json({
        success: false,
        message: "No job applications found",
      });
    }

    return res.json({
      success: true,
      message: "Job applications fetched successfully",
      jobApplications,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching job applications",
    });
  }
};

export const updateResume = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const resumeFile = req.file;

    if (!resumeFile) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required",
      });
    }

    const userData = await User.findById(userId);

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const resumeUpload = await cloudinary.uploader.upload(resumeFile.path);

    userData.resume = resumeUpload.secure_url;

    await userData.save();

    return res.json({
      success: true,
      message: "Resume updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the resume",
    });
  }
};
