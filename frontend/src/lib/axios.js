import Axios from "axios";

const axios = Axios.create({
    baseURL: process.env.BACKEND_URL,
    headers:{
        'X-Requested-With' : 'XMLHttpRequest',
    },
    withCredentials:false
})

export default axios