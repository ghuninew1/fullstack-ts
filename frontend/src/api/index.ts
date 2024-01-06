import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_HOST_API,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true,
});

// api.interceptors.request.use(
//     (config) => {
//         const token = JSON.parse(localStorage.getItem("auth"));
//         if (token?.token) {
//             config.headers["Authorization"] = `Bearer ${token?.token}`;
//         }
//         return config;
//     },
//     (error) => {
//         Promise.reject(error);
//     }
// );

// api.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async function (error) {
//         const originalRequest = error.config;
//         if (
//             error?.response?.status === 403 &&
//             originalRequest?.url !== "/auth/login"
//         ) {
//             localStorage.removeItem("auth");
//             window.location.reload();
//             return Promise.reject(error);
//         }

//         return Promise.reject(error);
//     }
// );

export default api;
