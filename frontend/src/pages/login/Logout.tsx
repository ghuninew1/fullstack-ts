import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { makeLogout } from "#api/makeApi";
import { Loading } from "#components";
import { Auth } from "#contexts/AuthProvider";

function Logout() {
    const { isUser, logout } = Auth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            if (isUser?.username) {
                await makeLogout();
                logout();
            }
            navigate("/login");
        };

        handleLogout();
    }, [isUser?.token, isUser?.username, logout, navigate]);

    return <Loading />;
}

export default Logout;
