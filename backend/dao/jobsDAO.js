//joffre villacis
//oct 6, 2024
//it302, section 451
//phase 2
//jjv36@njit.edu
let jobs;

export default class JobsDAO {
  static async injectDB(conn) {
    if (jobs) {
      return;
    }
    try {
      jobs = await conn.db(process.env.JOBS_NS).collection("RemoteJobs_jjv36");
      await jobs.createIndex({ companyName: "text" });
    } catch (e) {
      console.error(`unable to connect in JobsDAO: ${e}`);
    }
  }

  static async getJobs({ filters = null, page = 0, jobsPerPage = 20 } = {}) {
    let query;
    if (filters) {
      if ("companyName" in filters) {
        query = { $text: { $search: filters["companyName"] } };
      } else if ("id" in filters) {
        query = { id: { $eq: filters["id"] } };
      }
    }

    let cursor;
    try {
      cursor = await jobs
        .find(query)
        .limit(jobsPerPage)
        .skip(jobsPerPage * page);
      const jobsList = await cursor.toArray();
      const totalNumJobs = await jobs.countDocuments(query);
      return { jobsList, totalNumJobs };
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      console.error(e);
      return { jobsList: [], totalNumJobs: 0 };
    }
  }
}
