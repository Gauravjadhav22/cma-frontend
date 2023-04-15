import axios from "../config/Api";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const useLogout = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate()

    const logout = async () => {
        setAuth({});
        localStorage.removeItem("token")
        try {
            // await axios('/logout', {
            //     withCredentials: true
            // });

          navigate('/')
            

        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout