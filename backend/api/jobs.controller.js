import JobsDAO from "../dao/jobsDAO.js";

export default class JobsController {
  static async apiGetJobs(req, res, next) {
    const jobsPerPage = req.query.jobsPerPage
      ? parseInt(req.query.jobsPerPage)
      : 20;

    const page = req.query.page ? parseInt(req.query.page) : 0;

    let filters = {};

    if (req.query.rated) {
      filters.rated = req.query.rated;
    } else if (req.query.title) {
      filters.title = req.query.title;
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
}
