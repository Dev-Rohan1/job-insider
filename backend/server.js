import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./src/db/connectDB.js";
import webhooksController from "./src/controllers/webhooksController.js";
import companyController from "./src/controllers/companyController.js";

const app = express();

// Load environment variables from .env file
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to the database
connectDB();

// Routes
app.get("/", (req, res) => res.send("API is working"));
app.use("/webhooks", webhooksController);
app.post("/company", companyController);

// Set up server
const PORT = process.env.SERVER_RUNNING_PORT || 8080;
app.listen(PORT, () => {
  console.log(`🌐 Server is running on port ${PORT}`);
});
