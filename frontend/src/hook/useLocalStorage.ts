import { useCallback, useEffect, useSyncExternalStore } from "react";

const dispatchStorageEvent = (key: string, newValue: string | null) => {
    const event = new StorageEvent("storage", { key, newValue });
    window.dispatchEvent(event);
};
const setLocalStorageItem = (key: string, value: any) => {
    const stringifiedValue = JSON.stringify(value);
    window.localStorage.setItem(key, stringifiedValue);
    dispatchStorageEvent(key, stringifiedValue);
};

const removeLocalStorageItem = (key: string) => {
    window.localStorage.removeItem(key);
    dispatchStorageEvent(key, null);
};

const getLocalStorageItem = (key: string) => window.localStorage.getItem(key);

const useLocalStorageSubscribe = (callback: any) => {
    window.addEventListener("storage", callback);
    return () => window.removeEventListener("storage", callback);
};

export default function useLocalStorage(key: string, initialValue?: any) {
    const getSnapshot = () => getLocalStorageItem(key);

    const store = useSyncExternalStore<any>( useLocalStorageSubscribe, getSnapshot );

    const setState = useCallback((v: any) => {
            const nextState = typeof v === "function" ? v(JSON.parse(store)) : v;

            if (nextState == null) {
                removeLocalStorageItem(key);
            } else {
                setLocalStorageItem(key, nextState);
            }
        }, [key, store]);

    useEffect(() => {
        if ( getLocalStorageItem(key) == null && typeof initialValue !== "undefined" ) {
            setLocalStorageItem(key, initialValue);
        }
    }, [key, initialValue]);

    return [store ? JSON.parse(store) : initialValue, setState];
}
