//joffre villacis
//oct 6, 2024
//it302, section 451
//phase 2
//jjv36@njit.edu

import express from "express";
import cors from "cors";
import jobs from "./api/jobs.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/jjv36/jobs", jobs);
app.use("*", (req, res) => {
  res.status(404).json({ error: "not found" });
});

export default app;
