import { cx } from "#utils/utils";
import React,{ memo, useRef,forwardRef } from "react";

type Size = "sm" | "md" | "lg" | "xl" | "xxl";

type ButtonProps = {
    className?: string;
    type?: "button" | "submit" | "reset";
    children?: React.ReactNode;
    loading?: boolean;
    disabled?: boolean;
    size?: Size;
    width?: string;
    onClick?: () => void;
    color?: string;
    [key: string]: any;
};

const Comp = memo<ButtonProps>(function Button({
    className = "",
    type = "button",
    children,
    loading = false,
    disabled = false,
    size = "md",
    width = "",
    onClick = () => {},
    color = "",
    ...props
}) {
    const ref = useRef<HTMLButtonElement>(null);
    if (ref.current) {
        ref.current?.addEventListener("mousedown", (e: any): void => {
            e.currentTarget.animate([{ transform: "scale(0.95)" }], {
                duration: 150,
                fill: "forwards",                
                easing: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            });
        });
        ref.current?.addEventListener("mouseup", (e: any): void => {
            e.currentTarget.animate([{ transform: "scale(1)" }], {
                duration: 150,
                fill: "forwards",
                easing: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            });
        });
    }

    return (
        <button
            {...props}
            disabled={disabled}
            ref={ref}
            onClick={onClick}
            type={type || "button"}
            className={cx(
                "inline-flex items-center justify-center rounded-md",
                "relative overflow-hidden font-medium whitespace-nowrap text-sm border-0 outline-0",
                "disabled:opacity-40 disabled:cursor-not-allowed",
                "focus:ring-2 focus:ring-blue-500",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 hover:bg-opacity-50",
                width ? width : "w-auto",
                size === "sm" && "py-2 px-3",
                size === "md" && "py-3 px-5",
                size === "lg" && "py-4 px-6",
                size === "xl" && "py-5 px-7",
                size === "xxl" && "py-6 px-8",
                color ? color : "bg-blue-600 text-gray-100 dark:bg-blue-700 dark:hover:bg-blue-600 dark:text-white",
                className
            )}

        >
            {loading && (
                <div
                    className="absolute left-1 h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"
                />
            )}
            {children}
        </button>
    );
});

Comp.displayName = "Comp";

const Button = forwardRef(function Button<T extends ButtonProps>(props: T, ref: any) {
    return <Comp ref={ref} {...props} />;
});
Button.displayName = "Button";

export default Button;
