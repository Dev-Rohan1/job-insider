import express from "express";
import {
  changeJobApplicationStatus,
  changeVisiblity,
  getCompanyData,
  getCompanyJobApplicants,
  getCompanyPostedJob,
  loginCompany,
  postJob,
  registerCompany,
} from "../controllers/companyController.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.post("/register", upload.single("image"), registerCompany);
router.post("/login", loginCompany);
router.get("/company-data", getCompanyData);
router.post("/post-job", postJob);
router.get("/job-applicants", getCompanyJobApplicants);
router.get("/list-job", getCompanyPostedJob);
router.post("/change-status", changeJobApplicationStatus);
router.post("/change-visiblity", changeVisiblity);

export default router;
