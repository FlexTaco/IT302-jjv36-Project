//joffre villacis
//nov 23, 2024
//it302, section 451
//phase 5
//jjv36@njit.edu
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
  createComment(data) {
    return axios.post(
      // `${process.env.REACT_APP_BACKEND_URL}/api/v1/jjv36/jobs/job`,
      // data
      `http://localhost:5050/api/v1/jjv36/jobs/comment`,
      data
    );
  }
  updateComment(data) {
    return axios.put(
      `http://localhost:5050/api/v1/jjv36/jobs/comment`, // Removed extra }
      data
    );
  }
  deleteComment(id, userId) {
    return axios.delete(`http://localhost:5050/api/v1/jjv36/jobs/comment`, {
      data: { comment_id: id, user_id: userId },
    });
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
