import { useRef, useEffect } from "react"

function useEventListener(
    eventName: string | string[],
    callback: Function | any,
    element: any = window || document,
    options?: boolean | string | any
) {

    const listenerRef: any = useRef<any>(null);

    useEffect(() => {
        listenerRef.current = callback;
    }, [callback]);

    useEffect(() => {
        const targetElement = element?.current ? element.current : element || window;
        if (!(targetElement && targetElement.addEventListener)) {
            return;
        }
        const cb = (event: any) => listenerRef.current(event);
        targetElement.addEventListener(eventName, cb, options);

        return () => {
            targetElement.removeEventListener(eventName, cb, options);
        };
    }, [eventName, element, options]);

}

export default useEventListener