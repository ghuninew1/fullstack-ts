import { useCallback } from "react";
import useLocalStorage  from "./useLocalStorage";

export default function useToggle(key="", boon=true) {
    const [value, setValue] = useLocalStorage(key, boon);

    const toggle = useCallback((e: any) => {
        setValue((value: any) => !value);
        e.stopPropagation();
    }, [setValue]);

    return [value, toggle];
}
