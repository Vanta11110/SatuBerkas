import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.BACKEND_URL,
  withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
        'X-CSRF-TOKEN': ('meta[name="csrf-token"]').attr('content')
  },
});

export default axios;
