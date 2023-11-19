import Axios from "axios";

const csrfToken = document.head.querySelector(
  'meta[name="csrf-token"]'
).content;

const axios = Axios.create({
  baseURL: process.env.BACKEND_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "X-CSRF-TOKEN": csrfToken,
  },
  withCredentials: true,
});

export default axios