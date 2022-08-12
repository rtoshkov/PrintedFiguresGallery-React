import { Navigate, Outlet } from 'react-router-dom';
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";


const RouteGuard = ({children}) => {
    const {user} = useContext(AuthContext);

    if (!user.accessToken) {
        return <Navigate to="/login" replace />
    }

    return children ? children : <Outlet />

};


export default RouteGuard;