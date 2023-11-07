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
            headers: requestConfig.headers ? requestConfig.headers :{
                'Accept': 'application/json'
            }
            
        })
            .then(response => response.data)
            .then(data => {
                setIsLoading(false);
                applyData(data)
            })
            .catch(error => {
                const { request, response } = error;
                if (response) {
                    handleError(error)
                  } else if (request) {
                    //request sent but no response received
                    console.log("Timeouted")
                  } else {
                    // Something happened in setting up the request that triggered an Error
                    throw error;
                  }
            })

    }, [applyData, handleError]);

    return {
        isLoading, sendRequest
    }
}
export default useHttp;