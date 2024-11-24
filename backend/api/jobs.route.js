//joffre villacis
//oct 20, 2024
//it302, section 451
//phase 3
//jjv36@njit.edu

import express from "express";
import JobsController from "./jobs.controller.js";
import CommentsController from "./comment.controller.js";

const router = express.Router();

router.route("/").get(JobsController.apiGetJobs);
router.route("/id/:id").get(JobsController.apiGetJobsById);
router.route("/locations").get(JobsController.apiGetLocations);

router
  .route("/comment")
  .post(CommentsController.apiPostComments)
  .put(CommentsController.apiUpdateComments)
  .delete(CommentsController.apiDeleteComments);

export default router;
