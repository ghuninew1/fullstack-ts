import { useState, useEffect, useCallback } from "react";
import { makeApi } from "#api/makeApi";

type DataProps = {
    url: string;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    config?: any;
};

export default function useData<T extends DataProps>({ url, method = "GET", config }: T) {
    const [data, setData] = useState([]);
    const [reload, setReload] = useState(0);
    const [loading, setLoading] = useState(true);

    const refetch = useCallback(() => setReload((prev) => prev + 1), []);
    
    useEffect(() => {
        const ctrl = new AbortController();
        const fetchData = async () => {
            try {
                const res: any = await makeApi({
                    url,
                    method,
                    config: {
                        ...config,
                        signal: ctrl.signal,
                    },
                });
                setData(res);
            } catch (err) {
                return Promise.reject(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();

        return () => {
            ctrl.abort();
        };
    }, [config, method, url, reload]);

    return [data, loading, refetch];
}


export function useDataFn() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [controller, setController] = useState<any>(null);

    const axiosFetch = useCallback(async ({ url, method = "GET", config }: any) => {
        try {
            const ctrl: any = new AbortController();
            setController(ctrl);
            const res: any = await makeApi({
                url,
                method,
                config: {
                    ...config,
                    signal: ctrl.signal,
                },
            });
            setData(res);
        } catch (err) {
            return Promise.reject(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        return () => controller && controller.abort();
    }, [controller]);

    return [data, loading, axiosFetch];
}
