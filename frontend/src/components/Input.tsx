import { cx } from "#utils";
import { forwardRef, useRef, useImperativeHandle, memo } from "react";

const MyInput = memo(forwardRef(({
            type,
            name,
            className,
            required,
            label,
            placeholder,
            icon,
            error,
            helperText,
            ...props
        }, ref) => {
        const localRef = useRef(null);
        useImperativeHandle(ref, () => ({
            reset: () => {
                if (!localRef.current) return;

                localRef.current.value = "";
                localRef.current?.focus();
            },
        }));

        return (
            <div className={`relative ${className}`}>
                <label
                    htmlFor={name}
                    className={cx(
                        "absolute left-2 top-0 transition-transform duration-300 ease-in-out origin-bottom text-sm font-medium ",
                        localRef.current?.value
                            ? "scale-y-100 opacity-100 translate-y-[-22px]"
                            : "scale-y-0 opacity-0",
                        localRef.current?.value.length < 3
                            ? "text-red-500 dark:text-red-500"
                            : "text-green-500 dark:text-green-500"
                    )}
                >
                    {label}
                </label>
                <span className="absolute right-2 translate-y-1/2">{icon}</span>
                <span className="absolute -bottom-5 left-2 text-sm text-red-500">
                    {error}
                </span>
                <span className="absolute right-2 z-10 translate-y-1/2 cursor-pointer text-gray-400">
                    {helperText}
                </span>
                <input
                    {...props}
                    ref={localRef}
                    type={type || "text"}
                    name={name}
                    id={name}
                    className={cx(
                        "pl-5 rounded-md w-full p-2 outline-0 border-none text-sm focus:placeholder:opacity-40 focus:bg-opacity-30 focus:outline-1 focus:outline-green-500/50 border-0 bg-zinc-200 dark:bg-gray-800"
                    )}
                    placeholder={placeholder}
                    required={required ? true : false}
                />
            </div>
        );
    }
));


MyInput.displayName = "MyInput";

export default function Input({
    type,
    name,
    className,
    required,
    label,
    placeholder,
    icon,
    error,
    helperText,
    ...props
}) {
    return (
        <MyInput
            type={type}
            name={name}
            className={className}
            required={required}
            label={label}
            icon={icon}
            error={error}
            helperText={helperText}
            placeholder={placeholder}
            {...props}
        />
    );
}