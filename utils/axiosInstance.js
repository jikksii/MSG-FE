import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_HOST + '/api',
    timeout: 1000,
})
export default axiosInstance;