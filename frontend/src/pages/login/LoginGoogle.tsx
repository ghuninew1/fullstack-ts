import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { Loading } from "#components";
import { Auth } from "#contexts/AuthProvider";

export default function LoginGoogle() {
    const navigate = useNavigate();
    const { isUser, login } = Auth();
    const location = useLocation();
    const search = location.search;
    const profile = useMemo(() => {
        const params = new URLSearchParams(search);
        const username = params.get("username");
        const roles = params.get("roles");
        const img = params.get("img");
        const expires = Number(params.get("expires"));
        const timestamp = Date.now();
        return { username, roles, img, expires, timestamp };
    }, [search]);

    useEffect(() => {
        const { username, isGg } = isUser || {};
        if (profile?.username && !username && !isGg) {
            login({ ...profile, isGg: true, timestamp: Date.now() });
            navigate("/");
        } else if (username) {
            navigate("/");
        }
    }, [profile, isUser, login, navigate]);

    return <Loading />;
}
