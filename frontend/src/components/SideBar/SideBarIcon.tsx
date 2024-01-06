import { NavLink } from "react-router-dom";
import { cx } from "#utils";

export const SideBarIcon = ({ icon, text = "tooltip 💡", to, ...props }) => {
    return (
        <>
            <NavLink
                {...props}
                to={to || "/"}
                end={to === "/" ? true : false}
                className={({ isActive }) =>
                    cx(
                        "py-2 px-3 font-semibold transition-all duration-300 ease-in-out hover:bg-opacity-50 hover:text-white dark:hover:text-white dark:hover:bg-opacity-50 ",
                        isActive ? "text-red-500 dark:text-red-500 group" : " text-gray-500 dark:text-gray-400 group"
                    )
                }
            >
                <span className="inline-flex w-full items-center justify-evenly p-2">
                    {icon}
                    {text}
                </span>
            </NavLink>
        </>
    );
};