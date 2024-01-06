import useEventListener from "./useEventListener";
import { useCallback } from "react";

type EventListenerParams = Parameters<typeof useEventListener>;

export default function useKeyPass(
    key: EventListenerParams[0] | string,
    cb: EventListenerParams[1] | Function,
    target: EventListenerParams[2] | Window,
    options: EventListenerParams[3] | boolean | string
) {
    const listenerRef = useCallback((e: KeyboardEvent | any) => {
        if (e.key === key) {
            cb(e);
        }
    }, [cb, key]);

    useEventListener(key, listenerRef, target, options);
}