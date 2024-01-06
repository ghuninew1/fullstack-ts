import { Navigate } from "react-router-dom";
import { Auth } from "#contexts/AuthProvider";
import React from "react";

type AuthRouteProps = {
    children: React.ReactNode
}

export default function AuthRoute({ children }: AuthRouteProps) {
    const { isUser } = Auth();

    const isUserLoggedIn: string| boolean | undefined | null = isUser?.username;

    if (isUserLoggedIn) {
        return children
    }
    return (
        <Navigate to={{ pathname: "/login" }} />
    );
}