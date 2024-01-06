import { Button } from "#components";
import { cx } from "#utils";
import { Link } from "react-router-dom";
import useHover from "#hook/useHover";
import { Icon } from '@iconify/react';
import React from "react";

type ButtonProps = {
    to?: string | undefined
    type?: "button" | "submit" | "reset";
    text?: string | undefined
    icon?: React.ReactNode | string | undefined
    className?:string | string[] | undefined
    children?: React.ReactNode | undefined
    loading?: boolean | undefined
    width?: string | undefined
    onClick?: () => void | undefined
    disabled?: boolean | undefined
};

export default function ButtonLogin<T extends ButtonProps>(props: T) {
    const { to, type, text, icon, className, onClick, children,loading } = props;
    const [hoverRef,isHovered] = useHover();
    const buttonClassName = `
        my-1
        w-full
        ${className}
    `;
    const iconClassName = cx(
        "absolute left-5 transition-all duration-300 ease-in-out",
        isHovered ? "translate-x-5" : "translate-x-0"
    );
    const arrowClassName = cx(
        "absolute right-5 transition-all duration-300 ease-in-out",
        isHovered ? "scale-x-100 animate-arrowIdle " : "scale-x-0 opacity-0 "
    );

    return (
        <Link to={to || "/"} className="w-full" ref={hoverRef}>
            <Button type={type} color={buttonClassName} onClick={onClick} loading={loading}>
                {icon && <span className={iconClassName}>{icon}</span>}
                {text && text}
                {children && children}
                <Icon icon="ep:right" width={30} className={arrowClassName} />
            </Button>
        </Link>
    );
}