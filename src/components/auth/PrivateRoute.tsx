import { Navigate, Outlet } from "react-router-dom";
import { notify } from "../notifications/NotificationProvider";

export default function PrivateRoute() {
    const token = localStorage.getItem('accessToken');

    if (!token) {
        notify.error("로그인 후 이용 가능합니다.");
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
