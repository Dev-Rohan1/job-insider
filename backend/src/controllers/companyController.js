import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import Company from "../models/Company.js";
import Job from "../models/Job.js";
import JobApplicant from "../models/jobApplication.js";

import generateToken from "../utils/generateToken.js";
import JobApplication from "../models/jobApplication.js";

export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;
  const imageFile = req.file;

  if (!name) {
    return res.json({ success: false, message: "Name is required" });
  }

  if (!email) {
    return res.json({ success: false, message: "Email is required" });
  }

  if (!password) {
    return res.json({ success: false, message: "Password is required" });
  }

  if (!imageFile) {
    return res.json({ success: false, message: "Company logo is required" });
  }

  try {
    const existingCompany = await Company.findOne({ email });

    if (existingCompany) {
      return res.json({ success: false, message: "Company already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let imageUpload = await cloudinary.uploader.upload(imageFile.path);

    const company = new Company({
      name,
      email,
      password: hashedPassword,
      image: imageUpload.secure_url,
    });

    await company.save();

    return res.json({
      success: true,
      message: "Company registered successfully",
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.json({
      success: false,
      message: "Failed to register company",
      error: error.message,
    });
  }
};

export const loginCompany = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.json({ success: false, message: "Email is required" });
  }

  if (!password) {
    return res.json({ success: false, message: "Password is required" });
  }

  try {
    const company = await Company.findOne({ email });

    if (!company) {
      return res.json({ success: false, message: "Company not found" });
    }

    const isValidPassword = await bcrypt.compare(password, company.password);

    if (!isValidPassword) {
      return res.json({ success: false, message: "Invalid password" });
    }

    return res.json({
      success: true,
      message: "Company logged in successfully",
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Failed to login company",
      error: error.message,
    });
  }
};

export const postJob = async (req, res) => {
  const { title, description, location, category, level, salary } = req.body;

  if (!title) {
    return res.json({ success: false, message: "Job title is required" });
  }

  if (!description) {
    return res.json({ success: false, message: "Job description is required" });
  }

  if (!location) {
    return res.json({ success: false, message: "Job location is required" });
  }

  if (!category) {
    return res.json({ success: false, message: "Job category is required" });
  }

  if (!level) {
    return res.json({ success: false, message: "Job level is required" });
  }

  if (!salary) {
    return res.json({ success: false, message: "Job salary is required" });
  }

  try {
    const companyId = req.company._id;

    const job = new Job({
      title,
      description,
      location,
      category,
      level,
      salary,
      date: Date.now(),
      companyId,
    });

    await job.save();

    return res.json({
      success: true,
      message: "Job posted successfully",
      jobData: job,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Failed to post job",
      error: error.message || "Unknown error",
    });
  }
};

export const getCompanyData = async (req, res) => {
  try {
    const company = req.company;

    if (!company) {
      return res.json({
        success: false,
        message: "Company not found",
      });
    }

    return res.json({
      success: true,
      message: "Company data fetched successfully",
      companyData: company,
    });
  } catch (error) {
    console.error("Error fetching company data:", error);
    return res.json({
      success: false,
      message: "Failed to fetch company data",
      error: error.message || "Unknown error",
    });
  }
};

export const getCompanyPostedJob = async (req, res) => {
  console.log(req.company);
  const companyId = req.company._id;

  try {
    const jobs = await Job.find({ companyId });

    if (!jobs) {
      return res.json({
        success: false,
        message: "No jobs posted by the company",
      });
    }

    const jobData = await Promise.all(
      jobs.map(async (job) => {
        const applicants = await JobApplicant.find({ jobId: job._id });

        return { ...job.toObject(), applicants: applicants.length };
      })
    );

    return res.json({
      success: true,
      message: "Company posted job data fetched successfully",
      jobData: jobData,
    });
  } catch (error) {
    console.error("Error fetching company posted jobs:", error);
    return res.json({
      success: false,
      message: "Failed to fetch company posted job data",
      error: error.message || "Unknown error",
    });
  }
};

export const changeVisibility = async (req, res) => {
  const { id } = req.body;
  const companyId = req.company._id;

  try {
    const job = await Job.findById(id);

    if (!job) {
      return res.json({
        success: false,
        message: "Job not found",
      });
    }

    if (companyId.toString() === job.companyId.toString()) {
      job.visible = !job.visible;
    }

    await job.save();

    return res.json({
      success: true,
      message: "Job visibility changed successfully",
      jobData: job,
    });
  } catch (error) {
    console.error("Error changing job visibility:", error);
    return res.json({
      success: false,
      message: "Failed to change job visibility",
      error: error.message || "Unknown error",
    });
  }
};

export const getCompanyJobApplicants = async (req, res) => {
  try {
    const companyId = req.company._id;

    const jobs = await JobApplication.find({ companyId })
      .populate("userId", "name image resume")
      .populate(
        "jobId",
        "title description location category level salary date"
      )
      .exec();

    return res.json({
      success: true,
      message: "Company job applicants fetched successfully",
      jobApplicants: jobs,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Failed to fetch company job applicants",
    });
  }
};

export const changeJobApplicationStatus = async (req, res) => {
  const { jobId, status } = req.body;

  try {
    await JobApplication.updateOne({ jobId }, { status });
    return res.json({
      success: true,
      message: "Job application status changed successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Failed to change job application status",
    });
  }
};
