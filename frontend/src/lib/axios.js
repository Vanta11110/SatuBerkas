import Axios from "axios";


const axios = Axios.create({
  baseURL: process.env.BACKEND_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "X-CSRF-TOKEN": ('meta[name="csrf-token"]').attr("content"),
  },
  withCredentials: true,
  withXSRFToken: true,
});

export default axios