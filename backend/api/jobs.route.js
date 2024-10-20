//joffre villacis
//oct 18, 2024
//it302, section 451
//phase 3
//jjv36@njit.edu

import express from "express";
import JobsController from "./jobs.controller.js";

const router = express.Router();

router
  .route("/")
  .get(JobsController.apiGetJobs)
  .post(JobsController.apiPostJobs)
  .delete(JobsController.apiDeleteJob)
  .put(JobsController.apiUpdateJob);

export default router;
