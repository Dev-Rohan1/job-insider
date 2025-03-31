import express from "express";
import {
  changeJobApplicationStatus,
  changeVisibility,
  getCompanyData,
  getCompanyJobApplicants,
  getCompanyPostedJob,
  loginCompany,
  postJob,
  registerCompany,
} from "../controllers/companyController.js";
import protectedCompany from "../middlewares/auth.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.post("/register", upload.single("image"), registerCompany);
router.post("/login", loginCompany);
router.get("/company-data", protectedCompany, getCompanyData);
router.post("/post-job", protectedCompany, postJob);
router.get("/job-applicants", protectedCompany, getCompanyJobApplicants);
router.get("/list-jobs", protectedCompany, getCompanyPostedJob);
router.post("/change-status", protectedCompany, changeJobApplicationStatus);
router.post("/change-visiblity", protectedCompany, changeVisibility);

export default router;
