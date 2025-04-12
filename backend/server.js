import cors from "cors";
import "dotenv/config";
import express from "express";

import connectDB from "./src/db/connectDB.js";
import webhookController from "./src/controllers/webhookController.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => res.send("Api is working"));
app.post("/webhook", webhookController);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌐 Server is running on port http://localhost:${PORT}`);
});
