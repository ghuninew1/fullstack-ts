/** @type {import('tailwindcss').Config} */
import { animations, keyframes } from "./src/utils/keyframe.ts";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
    content: ["./index.html", "./src/**/*.{ts,js,tsx,jsx}"],
    darkMode: "class",
    theme: {
        extend: {
            fontSize: {
                10: "10px",
                12: "12px",
                14: "14px",
                18: "18px",
            },
            height: {
                main: "2.5em",
                header: "40px",
                footer: "40px",
            },
            width: {
                w6: "60%",
                w7: "70%",
                w8: "80%",
                w9: "90%",
                w95: "95%",
            },
            maxWidth: {
                w6: "60%",
                w7: "70%",
                w8: "80%",
                w9: "90%",
                w95: "95%",
            },
            inset: {
                header: "40px",
                footer: "40px",
            },
            padding: {
                p1: "10px",
                p2: "20px",
                p3: "30px",
                p4: "40px",
            },
            margin: {
                m1: "10px",
                m2: "20px",
                m3: "30px",
                m4: "40px",
            },
            minHeight: {
                mainMin: "calc(calc(100vh - 40px) - 40px)",
                main: "calc(calc(100vh - 40px) - 40px)",
                header: "40px",
                footer: "40px",
            },
            borderRadius: {
                main: "4px",
            },
            colors: {
                background: "hsl(var(--background) / <alpha-value>)",
                foreground: "hsl(var(--foreground) / <alpha-value>)",
                submit: "#1877F2",
                fb: "#3b5998",
                line: "#06C755",
                google: "#4285F4",
                github: "#24292F",
            },
            fontFamily: {
                main: ["Inter", ...fontFamily.sans],
            },

            keyframes: keyframes,
            animation: animations,
        },
    },
};
