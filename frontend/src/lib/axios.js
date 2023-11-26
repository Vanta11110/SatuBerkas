import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.BACKEND_URL,
  withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpsRequest",
  },
});

export default axios;
