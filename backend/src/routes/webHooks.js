import express from "express";
import webhooksController from "../controllers/webhooksController.js";

const router = express.Router();

router.post("/webhooks", webhooksController);

export default router;
