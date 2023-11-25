import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.BACKEND_URL,
  withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "X-CSRF-TOKEN": Document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
  },
});

export default axios;
