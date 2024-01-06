import { useEffect } from "react";
import useToggle  from "./useToggle";

export const useDarkMode = () => {
    const [theme, toggleTheme] = useToggle("dark");
    
    useEffect(() => {
        const bodyClass = document.documentElement.classList;
        bodyClass.toggle("dark", theme);
    
        return () => bodyClass.remove("dark");
    }, [theme]);

    return [theme, toggleTheme];
};

export default useDarkMode