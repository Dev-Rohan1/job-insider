import express from "express";

import {
  applyForJob,
  getUserApplication,
  getUserData,
  updateUserResume,
} from "../controllers/userController.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.get("/user-data", getUserData);
router.post("/apply-job", applyForJob);
router.get("/user-application", getUserApplication);
router.post("/update-resume", upload.single("resume"), updateUserResume);

export default router;
