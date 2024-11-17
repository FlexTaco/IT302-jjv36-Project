import axios from "axios";
class JobsDataService {
  getAll(page = 0) {
    return axios.get(
      // `${process.env.REACT_APP_BACKEND_URL}/api/v1/jjv36/jobs?page=${page}`
      `http://localhost:5050/api/v1/jjv36/jobs?page=${page}`
    );
  }
  get(id) {
    return axios.get(
      // `${process.env.REACT_APP_BACKEND_URL}/api/v1/jjv36/jobs/id/${id}`
      `http://localhost:5050/api/v1/jjv36/jobs/id/${id}`
    );
  }
  find(query, by = "companyName", page = 0) {
    return axios.get(
      // `${process.env.REACT_APP_BACKEND_URL}/api/v1/jjv36/jobs?${by}=${query}&page=${page}`
      `http://localhost:5050/api/v1/jjv36/jobs?${by}=${query}&page=${page}`
    );
  }
  createJob(data) {
    return axios.post(
      // `${process.env.REACT_APP_BACKEND_URL}/api/v1/jjv36/jobs/job`,
      // data
      `http://localhost:5050/api/v1/jjv36/jobs/job`,
      data
    );
  }
  updateJob(data) {
    return axios.put(`http://localhost:5050/api/v1/jjv36/jobs/job}`, data);
  }
  deleteJob(id, userId) {
    return axios.delete(
      // `${process.env.REACT_APP_BACKEND_URL}/api/v1/jjv36/jobs/review`,
      // { data: { review_id: id, user_id: userId } }
      `http://localhost:5050/api/v1/jjv36/jobs/job`,
      { data: { review_id: id, user_id: userId } }
    );
  }
  getLocation() {
    return axios.get(
      // `${process.env.REACT_APP_BACKEND_URL}/api/v1/jjv36/jobs/locations`
      `http://localhost:5050/api/v1/jjv36/jobs/locations`
    );
  }
}

const jds = new JobsDataService();
export default jds;
