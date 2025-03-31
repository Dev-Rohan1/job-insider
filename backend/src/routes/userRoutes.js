import express from "express";
import {
  applyJob,
  getUserApplications,
  getUserData,
  updateResume,
} from "../controllers/userController.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.get("/user", getUserData);
router.post("/apply-job", applyJob);
router.get("/applications", getUserApplications);
router.post("/update-resume", upload.single("resume"), updateResume);

export default router;
