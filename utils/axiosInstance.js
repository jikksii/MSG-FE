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
// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    if (error.response?.status === 401) {
        deleteCookie('token');
        router.push('/authentication/sign-in');
    }
    return Promise.reject(error);
});
export default axiosInstance;