import axios from "axios";

const API = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`
})

export const loginStudent = (userData) => API.post('/login', userData)