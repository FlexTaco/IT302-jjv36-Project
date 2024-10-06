//joffre villacis
//oct 6, 2024
//it302, section 451
//phase 2
//jjv36@njit.edu

import express from "express";
import JobsController from "./jobs.controller.js";

const router = express.Router();

router.route("/").get(JobsController.apiGetJobs);

export default router;
