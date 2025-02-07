import axios from "axios";

const API = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`
})

export const loginStudent = async (username, password) => {
    return await API.post('/login', {username, password}, { withCredentials: true });
};


export const logoutStudent = async () => {
    await API.get('/logout', {withCredentials: true})
}

export const getAuthenticatedStudents = async () => {
    try {
        const response = await API.get('/auth')
        // console.log(response.data)
        return response
    } catch (error) {
        console.error("Errore autenticazione:", error.response?.data || error.message);
        return null;
    }
}
