import { lazy } from "react";

export const Home = lazy(() => import("./Home.tsx"));
export const Contact = lazy(() => import("./Contact.tsx"));
export const About = lazy(() => import("./About.tsx"));
export const Login = lazy(() => import("./login/Login.jsx"));
export const Logout = lazy(() => import("./login/Logout.jsx"));
export const User = lazy(() => import("./User/User.tsx"));
export const Signup = lazy(() => import("./login/Signup.jsx"));
export const LoginLine = lazy(() => import("./login/LoginLine.jsx"));
export const LoginFacebook = lazy(() => import("./login/LoginFacebook.jsx"));
export const LoginGoogle = lazy(() => import("./login/LoginGoogle.jsx"));
export const Setting = lazy(() => import("./Setting.tsx"));
export const CryptoList = lazy(() => import("./crypto/CryptoList.tsx"));
export const Ping = lazy(() => import("./ping/Ping.tsx"));
export const ComPC = lazy(() => import("./compc/ComPC.tsx"));
