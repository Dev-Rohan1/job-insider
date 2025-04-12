import express from "express";
import getAllJobs from "../controllers/JobController.js";

const router = express.Router();

router.get("/job-list", getAllJobs);

export default router;
