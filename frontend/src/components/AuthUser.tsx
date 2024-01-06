import { Navigate, useLocation} from "react-router-dom";
import { Auth } from "#contexts/AuthProvider";
import React from "react";

type AuthUserProps = {
    children: React.ReactNode
}

export default function AuthUser({ children }: AuthUserProps) {
    const { pathname } = useLocation();
    const { isUser } = Auth();

    const isUserLoggedIn: string| boolean | undefined | null = isUser?.username;
    const isAuthpath: boolean = pathname === "/login" || pathname === "/signup";

    if (isUserLoggedIn && isAuthpath) {
        return (
            <Navigate to={"/"} state={{ from: pathname }} replace />
        );
    }

    return children;
}
