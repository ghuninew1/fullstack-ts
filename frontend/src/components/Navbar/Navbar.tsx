import {
    UserCircle,
    ThemeIcon,
    UserDropdown,
} from "./Navbarcon";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { login } from "#assets/navLinks";
import { cx } from "#utils/utils";

const Navbar = ({ userMenu = false }) => {
    const [open, setOpen] = useState(false);

    const renderUserMenu = () => {
        return (
                <div className="flex w-full flex-wrap items-center justify-end gap-4 px-3">
                    <ThemeIcon />
                    <UserCircle onClick={() => setOpen(!open)} />
                    <UserDropdown
                        openDropdown={open}
                        onClick={() => setOpen(false)}
                    />
                </div>
        );
    };
    const renderDefaultMenu = () => {
        return (
            <div className="h-header flex w-full flex-wrap items-center justify-end px-3">
                <ThemeIcon />
                {login
                    .filter((link) => link.hide !== true)
                    .map((link, index) => (
                        <NavLink
                            key={index}
                            to={link.to}
                            end={link.to === "/"}
                            className={({ isActive }) =>
                                cx(
                                    "block border-0 py-1 px-6 mx-1 rounded-md text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 hover:bg-orange-400 hover:text-white",
                                    isActive
                                        ? "bg-gray-200 bg-opacity-20"
                                        : "bg-transparent"
                                )
                            }
                        >
                            <span className="inline-block scale-75">
                                {link.icon}
                            </span>
                            {link.text}
                        </NavLink>
                    ))}
            </div>
        );
    };

    return (
        <nav className="flex-no-wrap relative flex w-full items-center justify-end shadow-md shadow-black/5 dark:shadow-black/10">
            {userMenu ? renderUserMenu() : renderDefaultMenu()}
        </nav>
    );
};


export default Navbar;
