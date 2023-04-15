import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    const tokn = localStorage.getItem("token")

    return (
       (tokn && tokn !==undefined) ? <Outlet />

            : <Navigate to="/login" />
    );
}

export default RequireAuth;