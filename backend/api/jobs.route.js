import express from "express";
import JobsController from "./jobs.controller.js";

const router = express.Router();

router.route("/").get(JobsController.apiGetJobs);

export default router;
