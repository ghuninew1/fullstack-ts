import { useState, useCallback } from "react";

export default function useForm(initialState = {}) {
    const [form, setForm] = useState(initialState);

    const handleInputChange = useCallback((e: any) => {
        const target = e.target;
        if (target.type === 'checkbox') {
            setForm((form) => {return { ...form, [target.name]: target.checked }});
            return;
        }
    }, []);
    
    const reset = useCallback(() => {
        setForm(initialState);
    }, [initialState]);

    return [form, handleInputChange, reset];
}