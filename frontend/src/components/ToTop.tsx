import { useRef } from "react";

const ToTop = () => {
    const ref = useRef<HTMLButtonElement>(null);

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            ref={ref}
            onClick={handleClick}
            className="fixed bottom-0 right-0 m-5 rounded-md bg-green-900 p-3 hover:bg-green-700 hover:drop-shadow-xl"
        >
            to top
        </button>
    );
};

export default ToTop;
