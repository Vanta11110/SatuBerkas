import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.BACKEND_URL,
  headers: {
    "X-Requested-With": "XMLHttpsRequest",
  },
  withCredentials: true,
  withXSRFToken: true,
});

export default axios;
