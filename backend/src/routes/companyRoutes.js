import express from "express";
import {
  loginCompany,
  registerCompany,
  postJob,
  getCompanyData,
  getCompanyPostedJobs,
  changeJobVisibility,
} from "../controllers/companyController.js";
import upload from "../utils/multer.js";
import protectedCompany from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", upload.single("image"), registerCompany);
router.post("/login", loginCompany);
router.get("/get-company", protectedCompany, getCompanyData);
router.post("/post-job", protectedCompany, postJob);
router.get("/company-posted-jobs", protectedCompany, getCompanyPostedJobs);
router.post("/change-visibility", protectedCompany, changeJobVisibility);

export default router;
