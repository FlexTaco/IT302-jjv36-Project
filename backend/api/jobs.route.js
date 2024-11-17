//joffre villacis
//oct 20, 2024
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

router.route("/locations").get(JobsController.apiGetLocations);
router.route("/id/:id").get(JobsController.apiGetJobsById);

export default router;
