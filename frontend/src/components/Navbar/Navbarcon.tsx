import {  NavLink } from "react-router-dom";
import useDarkMode from "#hook/useDarkMode";
import { navLogin } from "#assets/navLinks";
// import { cx } from "#utils";
import { Icon } from "@iconify/react";

const UserCircle = ({ onClick = () => {} }) => (
    <div className="relative mr-5 cursor-pointer text-gray-50 hover:text-pink-400" onClick={onClick} >
        <Icon icon="radix-icons:avatar" width={40} />
        <span
            className="rounded-full border-2 border-white bg-green-400 dark:border-gray-800"
            style={{
                position: "absolute",
                bottom: 0,
                left: "1.75rem",
                width: "0.875rem",
                height: "0.875rem",
            }}
        >
            
            </span>{" "}
    </div>
);


const ThemeIcon = () => {
    const [theme, toggleTheme] = useDarkMode();

    return (
        <span onClick={toggleTheme} className="mr-5 cursor-pointer hover:text-pink-400">
            {theme ? (
                <Icon icon="material-symbols:dark-mode-outline" width={25} />
            ) : (
                <Icon icon="material-symbols:dark-mode" width={25} />
            )}

        </span>
    );
};

function UserDropdown({ openDropdown = false, onClick = () => {} }) {
    const dropdownClasses = `absolute right-2 top-header rounded-md shadow-lg z-10 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-in-out origin-top text-sm text-gray-500 dark:text-gray-100 ${
        openDropdown ? "scale-y-100 " : "scale-y-0"
    }`;
    const filteredLinks = navLogin.filter((link) => link.login === true);
    const renderedLinks = filteredLinks.map((link, index) => (
        <NavLink
            key={index}
            to={link.to}
            end={link.to === "/"}
            onClick={() => onClick()}
            className="block rounded-md px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
            {link.text}
        </NavLink>
    ));
    return <div className={dropdownClasses}>{renderedLinks}</div>;
}

export { UserCircle, ThemeIcon, UserDropdown };
