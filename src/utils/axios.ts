import axios, { AxiosError } from "axios";

export const AxiosAuth = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    // withCredentials: true
})

AxiosAuth.interceptors.request.use((config) => {
    config.headers.Authorization = "Bearer " + localStorage.getItem("token")
    return config
})

AxiosAuth.interceptors.response.use(
    (config) => config,
    (err: AxiosError) => {
        if (err.status === 401) {
            localStorage.clear()
            window.location.href = "/login"
        }
        return Promise.reject(err)
    }
)