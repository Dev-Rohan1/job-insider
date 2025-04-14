import { v2 as cloudinary } from "cloudinary";

import JobApplication from "../models/jobApplication.js";
import User from "../models/User.js";

export const getUserData = async (req, res) => {
  try {
    const userId = req.auth.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "User data", userData: user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "User data not found" });
  }
};

export const applyForJob = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { jobId } = req.body;

    const isAlreadyApplied = await JobApplication.find({ userId, jobId });

    if (isAlreadyApplied.length > 0) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    const jobData = await Job.findById(jobId);

    if (!jobData) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    const jobApplication = new JobApplication({
      userId,
      jobId,
      companyId: jobData.companyId,
      date: Date.now(),
    });

    await jobApplication.save();

    return res
      .status(200)
      .json({ success: true, message: "Job applied successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Job application failed" });
  }
};

export const getUserApplication = async (req, res) => {
  try {
    const userId = req.auth.userId;

    const applications = await JobApplication.find({ userId })
      .populate("companyId", "name, email image")
      .populate("jobId", "title description location category level salary")
      .exec();

    if (!applications) {
      return res.status(404).json({
        success: false,
        message: "User applications not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User applications",
      jobApplications: applications,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "User applications not found" });
  }
};

export const updateUserResume = async () => {
  try {
    const userId = req.auth.userId;

    const resumeFile = req.file;

    if (!resumeFile) {
      return res
        .status(400)
        .json({ success: false, message: "Resume file is required" });
    }

    const userData = await User.findById(userId);
    if (resumeFile) {
      userData.resume = (
        await cloudinary.uploader.upload(resumeFile.path)
      ).secure_url;
    }

    await userData.save();

    return res
      .status(200)
      .json({ success: true, message: "Resume updated successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Resume update failed" });
  }
};
