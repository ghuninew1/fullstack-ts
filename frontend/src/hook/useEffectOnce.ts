import { useEffect,useRef } from "react"

export default function useEffectOnce(cb: Function) {

    const callback = useRef<Function>(cb)

    useEffect(() => {
        if (!callback.current) return;
        return () => {
            const cleanup = callback.current();
            if (cleanup) cleanup();
        };
    }, []);

    callback.current = cb
}
