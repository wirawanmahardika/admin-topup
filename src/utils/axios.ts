import axios from "axios";

export const AxiosAuth = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL, 
    // withCredentials: true
})