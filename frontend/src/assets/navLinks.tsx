import { Icon } from '@iconify/react';
import {
    Home,
    Contact,
    About,
    User,
    LoginLine,
    LoginFacebook,
    Logout,
    LoginGoogle,
    Setting,
    Login,
    Signup,
    CryptoList,
    ComPC,
    Ping
} from "../pages";

const navLinks = [
    {
        icon: <Icon icon="ic:outline-home" />,
        text: "Home",
        to: "/",
        element: <Home />,
    },
    {
        icon: <Icon icon="game-icons:pc" />,
        text: "ComPC",
        to: "/compc",
        element: <ComPC />,
    },
    {
        icon: <Icon icon="material-symbols:network-ping" />,
        text: "Ping",
        to: "/ping",
        element: <Ping />,
    },
    {
        icon: <Icon icon="mdi:about-variant" />,
        text: "About",
        to: "/about",
        element: <About />,
    },
    {
        icon: <Icon icon="mdi:contact" />,
        text: "Contact",
        to: "/contact",
        element: <Contact />,
    },
    {
        icon: <Icon icon="simple-icons:binance" />,
        text: "Binance",
        to: "/binance",
        element: <CryptoList />,
    },
];

const navLogin = [
    {
        text: "USER",
        to: "user",
        hide: true,
        login: true,
        element: <User />,
    },
    {
        text: "SETTINGS",
        to: "settings",
        hide: true,
        login: true,
        element: <Setting />,
    },
    {
        text: "LOGOUT",
        to: "logout",
        hide: true,
        login: true,
        element: <Logout />,
    },
];

const login = [
    {
        to: "auth/line",
        hide: true,
        element: <LoginLine />,
    },
    {
        to: "auth/facebook",
        hide: true,
        element: <LoginFacebook />,
    },
    {
        to: "auth/google",
        hide: true,
        element: <LoginGoogle />,
    },
    {
        to: "login",
        text: "LOGIN",
        hide: false,
        element: <Login />,
    },
    {
        to: "signup",
        text: "SIGNUP",
        hide: false,
        element: <Signup />,
    },
];

export { navLinks, navLogin, login };
