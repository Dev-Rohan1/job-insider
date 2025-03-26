import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import webHooksRouter from "./src/routes/webHooks.js";
import connectDB from "./src/db/connectDB.js";

const app = express();

dotenv.config();

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.get("/", (req, res) => res.send("Api is working"));

app.use("/api", webHooksRouter);

const PORT = process.env.SERVER_RUNNING_PORT || 8080;
app.listen(PORT, () => console.log(`🌐 Server is running on port ${PORT}`));
