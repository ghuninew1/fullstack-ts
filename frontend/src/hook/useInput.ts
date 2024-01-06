import React,{ useState, useCallback } from "react";

export default function useInput<T>(initValue: T) {
    const [value, setValue] = useState(initValue);

    const onChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value as T);
        }, []);

    return { value, onChange };
}
