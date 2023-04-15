import { privateRequest } from "../config/Api";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useLocation } from "react-router-dom";
import useLogout from "./useLogout";
const useAxiosPrivate = () => {
    const location = useLocation()

    const { auth } = useAuth();
const  logout = useLogout()
    useEffect(() => {

        const requestIntercept = privateRequest.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = privateRequest.interceptors.response.use(
            response => response,
            async (error) => {


                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    logout()
                    // prevRequest.sent = true;
                    // prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    // return privateRequest(prevRequest);
                }


                return Promise.reject(error);
            }
        );

        return () => {
            privateRequest.interceptors.request.eject(requestIntercept);
            privateRequest.interceptors.response.eject(responseIntercept);
        }
    }, [auth])

    return privateRequest;
}

export default useAxiosPrivate;