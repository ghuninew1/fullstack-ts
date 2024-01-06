import api from "./index";

type TMethod = "GET" | "POST" | "PUT" | "DELETE";
type TApi = {
    url: string;
    method?: TMethod;
    data?: any;
    error?: ErrorApi | any;
};
type ErrorApi = {
    message: string;
    response: {
        data: {
            message: string | undefined | null | any;
        } | any;
    } | any;
};


export async function makeApi<T extends TApi>({
    url,
    method = "GET",
    data,
    ...args
}: T) {
    if (!url) {
        return await Promise.reject("URL is required");
    }
    try {
        const res = await api({
            url,
            method,
            data,
            ...args,
        })

        return res.status === 200 || res.status === 201
            ? await Promise.resolve(res.data)
            : await Promise.reject(res.data);
    } catch (error) {
        return await Promise.reject(
            (error as ErrorApi).response?.data?.message ||
                (error as ErrorApi).message
        );
    }
}


export async function makePostApi(url: string, data: any, ...args: any) {
    try {
        const res = await api.post(url, data, ...args);

        return res.status === 200 || res.status === 201
            ? await Promise.resolve(res.data)
            : await Promise.reject(res.data);
    } catch (error) {
        return await Promise.reject(
           (error as ErrorApi ).response?.data?.message ||
                (error as ErrorApi ).message
        );
    }
}

export async function makeGetApi(url: string, ...args: any) {
    try {
        const res = await api.get(url, ...args);

        return res.status === 200 || res.status === 201
            ? await Promise.resolve(res.data)
            : await Promise.reject(res.data);
    } catch (error) {
        return await Promise.reject(
            (error as ErrorApi ).response?.data?.message ||
            (error as ErrorApi ).message
        );
    }
}

export async function makePutApi(url: string, data: any, ...args: any) {
    try {
        const res = await api.put(url, data, ...args);

        return res.status === 200 || res.status === 201
            ? await Promise.resolve(res.data)
            : await Promise.reject(res.data);
    } catch (error) {
        return await Promise.reject(
            (error as ErrorApi ).response?.data?.message ||
            (error as ErrorApi ).message
        );
    }
}

export async function makeDeleteApi(url: string, ...args: any) {
    try {
        const res = await api.delete(url, ...args);

        return res.status === 200 || res.status === 201
            ? await Promise.resolve(res.data)
            : await Promise.reject(res.data);
    } catch (error) {
        return await Promise.reject(
            (error as ErrorApi ).response?.data?.message ||
            (error as ErrorApi ).message
        );
    }
}

export async function makeLogout() {
    try {
        const res = await api.get("/auth/logout");

        return res.status === 200 || res.status === 201
            ? await Promise.resolve(res.data)
            : await Promise.reject(res.data);
    } catch (error) {
        return await Promise.reject(
            (error as ErrorApi ).response?.data?.message ||
            (error as ErrorApi ).message
        );
    }
}
