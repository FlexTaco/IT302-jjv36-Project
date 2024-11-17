//joffre villacis
//oct 20, 2024
//it302, section 451
//phase 3
//jjv36@njit.edu
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
let jobs;

export default class JobsDAO {
  static async injectDB(conn) {
    if (jobs) {
      return;
    }
    try {
      jobs = await conn.db(process.env.JOBS_NS).collection("RemoteJobs_jjv36");
    } catch (err) {
      console.error(`unable to connect in JobsDAO: ${err}`);
    }
  }

  static async getJobs({ filters = null, page = 0, jobsPerPage = 20 } = {}) {
    let query;
    if (filters) {
      if ("companyName" in filters) {
        query = { $text: { $search: filters["companyName"] } };
      } else if ("jobGeo" in filters) {
        query = { jobGeo: { $eq: filters["jobGeo"] } };
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
    } catch (err) {
      console.error(`Unable to issue find command, ${err}`);
      console.error(err);
      return { jobsList: [], totalNumJobs: 0 };
    }
  }

  static async addJobs(job) {
    try {
      const jobInfo = {
        id: job.id,
        jobTitle: job.jobTitle,
        companyName: job.companyName,
        jobDescription: job.jobDescription,
        _id: ObjectId.createFromHexString(job._id),
        lastModified: new Date(),
      };
      return await jobs.insertOne(jobInfo);
    } catch (err) {
      console.error(`unable to post job: ${err}`);
      return { error: err };
    }
  }

  static async updateJob(job) {
    try {
      const updateJob = await jobs.updateOne(
        { id: job.id, _id: ObjectId.createFromHexString(job._id) },
        {
          $set: {
            jobTitle: job.jobTitle,
            companyName: job.companyName,
            jobDescription: job.jobDescription,
            lastModified: new Date(),
          },
        }
      );
      return updateJob;
    } catch (err) {
      console.error(`unable to update job: ${err}`);
      return { error: err.message };
    }
  }

  static async deleteJob(job) {
    try {
      const deleteResponse = await jobs.deleteOne({
        _id: ObjectId.createFromHexString(job._id),
        id: job.id,
      });
      return deleteResponse;
    } catch (err) {
      console.error(`unable to delete job: ${err}`);
      return { error: err.message };
    }
  }

  static async getLocations() {
    let location = [];
    try {
      location = await jobs.distinct("jobGeo");
      return location;
    } catch (e) {
      console.error(`unable to get location, ${e}`);
      return location;
    }
  }

  static async getJobById(id) {
    try {
      return await jobs.find({ _id: new ObjectId(id) }).toArray();
    } catch (e) {
      console.error(`something went wrong in getJobById: ${e}`);
      throw e;
    }
  }
}
// post
// {
//   "id": 110644,
//   "jobTitle": "Data Engineer",
//   "companyName": "Cambell",
//   "jobDescription": "\u003Cp\u003EWe are looking for a Data Engineer to join our growing team of analytics experts. The hire will be responsible for expanding and optimizing our data and data pipeline architecture, as well as optimizing data flow and collection for cross functional teams. The Data Engineer will support our data analysts on data initiatives and will ensure optimal data delivery architecture is consistent throughout ongoing projects.\u003C/",
//     "_id": "66e3bd39e1e7d47047dda5aa"
// }

// update
// {
//   "id": 110644,
//   "_id": "66e3bd39e1e7d47047dda5aa",
//   "jobTitle": "Copywriter",
//   "companyName": "Cambell",
//   "jobDescription": "<p>As a Copywriter, you&#8217;ll be responsible for developing captivating copy across various marketing channels. From social media posts to print materials, you&#8217;ll play a pivotal role in communicating our client&#8217;s brand message effectively. Additionally, you&#8217;ll collaborate closely with the team to generate innovative ideas for campaigns and projects. The ideal candidate has a passion for words, a knack for creativity, and a drive to exceed expectations.</p>"
// }

// delete
// {
//   "id": 110644,
//     "_id": "66e3bd39e1e7d47047dda5aa"
// }
