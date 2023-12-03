import axios from "axios";
import { getCookie } from 'cookies-next';


const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_HOST + '/api',
    timeout: 1000,
})


const token = getCookie('token');
if (token) {
    axiosInstance.defaults.headers.Authorization = 'Bearer ' + token;
}
export default axiosInstance;