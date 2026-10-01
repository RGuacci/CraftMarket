import axios from "axios";

export const getCsrfCookie = async () => {
    await axios.get(
        "http://localhost:8000/sanctum/csrf-cookie",
        {
            withCredentials: true,
        }
    );
};