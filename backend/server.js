import cors from "cors";
import "dotenv/config";
import express from "express";

import connectDB from "./src/db/connectDB.js";
import webhookController from "./src/controllers/webhookController.js";
import companyRoutes from "./src/routes/companyRoutes.js";
import JobRoutes from "./src/routes/JobRoutes.js";
import Cloudinary from "./src/utils/cloudinary.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();
Cloudinary();

app.get("/", (req, res) => res.send("Api is working"));
app.post("/webhook", webhookController);
app.use("/company", companyRoutes);
app.use("/job", JobRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌐 Server is running on port http://localhost:${PORT}`);
});
