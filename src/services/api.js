import axios from "axios";

const API = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`
})

export const loginStudent = async (username, password) => {
    const response = await API.post('/login', {username, password}, {withCredentials: true})
    return response.data
}

export const logoutStudent = async () => {
    await API.get('/logout', {withCredentials: true})
}

export const getAuthenticatedStudents = async () => {
    try {
        const response = await API.get('/auth', {withCredentials: true})
        return response.data
    } catch (error) {
        return null;
    }
}