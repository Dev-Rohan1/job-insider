import express from "express";
import {
  changeJobVisibility,
  getCompanyData,
  getCompanyPostedJobs,
  loginCompany,
  postJob,
  registerCompany,
  getCompanyJobApplicants,
  changeJobApplicationStatus,
} from "../controllers/companyController.js";
import protectedCompany from "../middlewares/auth.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.post("/register", upload.single("image"), registerCompany);
router.post("/login", loginCompany);
router.get("/get-company", protectedCompany, getCompanyData);
router.post("/post-job", protectedCompany, postJob);
router.get("/company-posted-jobs", protectedCompany, getCompanyPostedJobs);
router.post("/change-visibility", protectedCompany, changeJobVisibility);
router.get("/applicants", protectedCompany, getCompanyJobApplicants);
router.post("/change-status", protectedCompany, changeJobApplicationStatus);

export default router;
