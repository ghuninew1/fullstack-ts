import { makePostApi } from "#api/makeApi";
import { useCallback, useState, useEffect } from "react";

type LoginProps = {
    username: string;
    email: string;
    password: string;
};

type InputProps = {
    url: string | undefined | null;
    data: LoginProps;
}

const useLogin = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [controller, setController] = useState<any>(null);

    const getFetch = useCallback(async ({ url, data }: InputProps) => {
        try {
            const ctrl = new AbortController();
            setController(ctrl);

            const apiUrl = url || '';
            const response = await makePostApi(apiUrl, data, {
                signal: ctrl.signal,
            } );

            return Promise.resolve(response);
        } catch (error) {
            return Promise.reject(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        return () => controller && controller.abort();
    }, [controller]);

    return [getFetch, loading];
};

export default useLogin;