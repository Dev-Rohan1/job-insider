import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";

import Company from "../models/Company.js";
import Job from "../models/Job.js";
import generateToken from "../utils/generateToken.js";
import jobApplication from "../models/jobApplication.js";

export const registerCompany = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const image = req.file;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Password is required" });
    }

    if (!image) {
      return res
        .status(400)
        .json({ success: false, message: "Company logo is required" });
    }

    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res
        .status(409)
        .json({ success: false, message: "Company already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let imageUploadUrl = await cloudinary.uploader.upload(image.path);

    const newCompany = new Company({
      name,
      email,
      password: hashedPassword,
      image: imageUploadUrl.secure_url,
    });

    await newCompany.save();

    return res.status(201).json({
      success: true,
      message: "Company registered successfully",
      companyData: {
        name: newCompany.name,
        email: newCompany.email,
        image: newCompany.image,
      },
      token: generateToken(newCompany._id),
    });
  } catch (error) {
    console.error("Company registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Company registration failed",
      error: error.message,
    });
  }
};

export const loginCompany = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    const company = await Company.findOne({ email });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    const isValidPassword = await bcrypt.compare(password, company.password);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Wrong password",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Company logged in successfully",
      companyData: {
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Company login failed",
    });
  }
};

export const getCompanyData = async (req, res) => {
  try {
    const company = req.company;

    return res
      .status(200)
      .json({ success: true, message: "Company data", companyData: company });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Company data not found",
    });
  }
};

export const postJob = async (req, res) => {
  try {
    const { title, description, category, location, level, salary } = req.body;

    const companyId = req.company._id;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Job Title is required",
      });
    }

    if (!description) {
      return res.status(400).json({
        success: false,
        message: "Job description is required",
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Job category is required",
      });
    }

    if (!location) {
      return res.status(400).json({
        success: false,
        message: "Job location is required",
      });
    }

    if (!level) {
      return res.status(400).json({
        success: false,
        message: "Job level is required",
      });
    }

    if (!salary) {
      return res.status(400).json({
        success: false,
        message: "Job salary is required",
      });
    }

    const newJob = new Job({
      title,
      description,
      category,
      location,
      level,
      salary,
      date: Date.now(),
      companyId,
    });

    await newJob.save();

    return res.status(201).json({
      success: true,
      message: "Job posted successfully",
      jobData: newJob,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Job posting failed",
    });
  }
};

export const getCompanyJobApplicants = async () => {};

export const getCompanyPostedJobs = async (req, res) => {
  try {
    const companyId = req.company._id;

    const jobs = await Job.find({ companyId });

    const jobsData = await Promise.all(
      jobs.map(async (job) => {
        const applicants = await jobApplication.find({ jobId: job._id });

        return { ...job.toObject(), applicants: applicants.length };
      })
    );

    return res.status(200).json({
      success: true,
      message: "Company job data fetched successfully",
      jobData: jobsData,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch job data",
    });
  }
};
export const changeJobApplicationStatus = async () => {};

export const changeJobVisibility = async (req, res) => {
  try {
    const { id } = req.body;
    const companyId = req.company._id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Job ID is required",
      });
    }

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (job.companyId.toString() === companyId.toString()) {
      job.visible = !job.visible;
    }

    await job.save();

    return res.status(200).json({
      success: true,
      message: "Job visibility changed successfully",
    });
  } catch (error) {
    console.error("Error changing job visibility:", error);
    return res.status(500).json({
      success: false,
      message: "Job visibility change failed",
    });
  }
};
