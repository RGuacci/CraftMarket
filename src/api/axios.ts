import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        Accept: "application/json",
    },
});