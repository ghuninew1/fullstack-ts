import { useEffect,useState } from "react";

export default function useTimer(on=false,delay=1000) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!on) {
            return;
        }
        const id = setInterval(() => {
            setCount((prev) => prev + 1);
        }, delay);
        return () => {
            clearInterval(id);
        };
    }, [on, delay]);
    return count
}
