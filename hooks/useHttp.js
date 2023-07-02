import { useCallback, useState } from "react";
import { cookies } from "next/headers";
import { getCookieParser } from "next/dist/server/api-utils";
import { getCookie } from 'cookies-next';
import axiosInstance from "utils/axiosInstance";
const useHttp = (applyData, handleError) => {
    const [isLoading, setIsLoading] = useState(false);

    const sendRequest = useCallback(async (requestConfig) => {
        const token = getCookie('token');
        if (token) {
            axiosInstance.defaults.headers.Authorization = 'Bearer ' + token;
        }
        setIsLoading(true);

        axiosInstance({
            method: requestConfig.method ? requestConfig.method : 'GET',
            url: requestConfig.url,
            data: requestConfig.data && requestConfig.method !== 'GET' ? requestConfig.data : null,
            params: requestConfig.method === 'GET' || !requestConfig.method ? requestConfig.data : null,
            
        })
            .then(response => response.data)
            .then(data => {
                setIsLoading(false);
                applyData(data)
            })
            .catch(err => {
                handleError(err)
            })

    }, [applyData, handleError]);

    return {
        isLoading, sendRequest
    }
}
export default useHttp;