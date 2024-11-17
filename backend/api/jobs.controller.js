//joffre villacis
//oct 20, 2024
//it302, section 451
//phase 3
//jjv36@njit.edu
import JobsDAO from "../dao/jobsDAO.js";

export default class JobsController {
  static async apiGetJobs(req, res, next) {
    const jobsPerPage = req.query.jobsPerPage
      ? parseInt(req.query.jobsPerPage)
      : 20;

    const page = req.query.page ? parseInt(req.query.page) : 0;

    let filters = {};

    if (req.query.jobGeo) {
      filters.jobGeo = req.query.jobGeo;
    } else if (req.query.companyName) {
      filters.companyName = req.query.companyName;
    }

    const { jobsList, totalNumJobs } = await JobsDAO.getJobs({
      filters,
      page,
      jobsPerPage,
    });

    let response = {
      jobs: jobsList,
      page: page,
      filters: filters,
      entries_per_page: jobsPerPage,
      total_results: totalNumJobs,
    };

    res.json(response);
  }

  static async apiGetJobsById(req, res, next) {
    try {
      let id = req.params.id || {};
      let job = await JobsDAO.getJobById(id);
      if (!job) {
        res.status(404).json({ error: "not found" });
        return;
      }
      res.json(job);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiPostJobs(req, res, next) {
    try {
      const job = req.body;
      const addResponse = await JobsDAO.addJobs(job);
      res.json(addResponse);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async apiUpdateJob(req, res, next) {
    try {
      const job = req.body;
      const updateResponse = await JobsDAO.updateJob(job);
      var { error } = updateResponse;
      if (error) {
        res.status(500).json({ error });
      }
      if (updateResponse.modifiedCount === 0) {
        throw new Error("unable to update job.");
      }
      res.json(updateResponse);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async apiDeleteJob(req, res, next) {
    try {
      const job = req.body;
      const deleteResponse = await JobsDAO.deleteJob(job);
      res.json(deleteResponse);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async apiGetLocations(req, res, next) {
    try {
      let propertyTypes = await JobsDAO.getLocations();
      res.json(propertyTypes);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
