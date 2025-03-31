import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

import connectDB from "./src/db/connectDB.js";
import webhooksController from "./src/controllers/webhooksController.js";
import companyRoutes from "./src/routes/companyRoutes.js";
import jobRoutes from "./src/routes/jobRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import connectCloudinary from "./src/utils/cloudinary.js";

const app = express();

// Load environment variables from .env file
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// Connect to the database and Cloudinary
connectDB();
connectCloudinary();

// Routes
app.get("/", (req, res) => res.send("API is working"));
app.use("/webhooks", webhooksController);
app.use("/api/company", companyRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/user", userRoutes);

// Set up server
const PORT = process.env.SERVER_RUNNING_PORT || 5050;

app.listen(PORT, () => {
  console.log(`🌐 Server is running on port ${PORT}`);
});
