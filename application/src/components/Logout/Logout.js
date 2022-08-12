import {Navigate, useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {AuthContext} from "../../context/AuthContext";
import {logout} from "../../services/api";


const Logout = () => {
    const {user, userLogout} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        logout(user?.accessToken)
            .then(() => {
                userLogout();
                navigate('/');
            })
            .catch(() => {
                navigate('/');
            });
    });

    return null
}

export default Logout;