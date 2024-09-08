import axios from "axios";
import { getToken } from "@/shared/libs/utils/auth";

export const api = axios.create();

api.defaults.baseURL = "https://api.botamba.ru/api";
api.defaults.headers.common["Authorization"] = getToken();
api.interceptors.request.use((config) => {
    if (!config.headers['Authorization']) {
        config.headers['Authorization'] = `Bearer ${getToken()}`;
    }
    return config;
}, (error) => Promise.reject(error)
);

export const apiRoutes = {
	messages: {
        baseRoute: '/tg-construct/message',
	},
    auth: {
        login: "/auth/login",
        logout: "/auth/logout",
    },
}