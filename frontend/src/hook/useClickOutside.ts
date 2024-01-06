import { useRef, useCallback } from "react";
import useEventListener from "./useEventListener";

export default function useClickOutside(callback: Function, mouseEvent: string = "click") {
    const ref = useRef<any>(null);

    const handleClick = useCallback((e: any) => {
        const el =ref.current;
        if (el && !el.contains(e.target)) {
            callback(e);
        } 
    }, [callback]);

    useEventListener(mouseEvent, handleClick, document as any, { capture: true });
    return ref;
}
