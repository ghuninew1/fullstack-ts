import { navLinks } from "#assets/navLinks";
import { cx } from "#utils/utils";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import useClickOutside from "#hook/useClickOutside";

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        if (!isOpen) return;
        setIsOpen(false);
    };

    const modalRef = useClickOutside(handleClose);

    const handleLinkClick = (link) => {
        if (link.text === "LOGOUT") {
            // SetLogout();
        } else {
            return;
        }
    };

    const filteredLinks = navLinks.filter((link) => link.hide !== true);
    return (
        <div className="fixed inset-0 z-20 max-w-60">
        <div
            ref={modalRef}
            className={cx(
                "relative flex flex-col min-h-screen justify-evenly items-center bg-white dark:bg-gray-800",
                "transition-all duration-300 ease-in-out",
                isOpen ? "" : "-translate-x-full"

            )}
        >
            <h5 className="text-xl font-semibold uppercase text-gray-500 dark:text-gray-400">
                Menu
            </h5>
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                type="button"
                className={cx(
                "absolute top-1 right-0 cursor-pointer hover:text-green-500 transition-all duration-300 ease-in-out",
                isOpen ? "text-red-500" : "translate-x-8"
                )}
            >
                {!isOpen ? (
                    <Icon
                        icon="line-md:close-to-menu-alt-transition"
                        width={30}
                    />
                ) : (
                    <Icon
                        icon="line-md:menu-to-close-alt-transition"
                        width={30}
                    />
                )}
            </button>
            <div className="block h-full w-full text-center">
            {filteredLinks.map((link, index) => (
                <NavLink
                    key={index}
                    to={link.to || "/"}
                    end={link.to === "/" ? true : false}
                    onClick={() => setIsOpen(true)}
                    className={({ isActive }) =>
                        cx(
                            "flex justify-center w-full items-center p-4 border-b border-gray-200/20 rounded-md hover:bg-opacity-50 hover:bg-orange-700",
                            isActive
                                ? "text-red-500 "
                                : " text-gray-300"
                        )
                    }
                >
                        <span className="text-2xl ">
                            {link.icon}
                        </span>
                        <span className="ml-10 w-full text-start font-semibold uppercase hover:text-white">
                            {link.text}
                        </span>
                </NavLink>
            ))}
            </div>
        </div>
        </div>

    );
};

export default SideBar;
