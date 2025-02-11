import axios from "axios";

const API = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`
})



API.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token"); 
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token"); 
            window.location.href = "/accesso"; 
        }
        return Promise.reject(error);
    }
);

export const loginStudent = async (username, password) => {
    const response = await API.post('/login', {username, password})
    if (response.data.token) {
        sessionStorage.setItem('token', response.data.token)
        return response.data.student
    }
    return null
};


export const logoutStudent =  () => {
    sessionStorage.removeItem('token')
}

export const getAuthenticatedStudents = async () => {
    const token = sessionStorage.getItem('token')
    if (!token) return null
    try {
        const response = await API.get('/auth', {
            headers: {Authorization: `Bearer ${token}`}
        })
        return response.data.student
    } catch (error) {
        console.error("Errore autenticazione:", error.response?.data || error.message);
        return null;
    }
}

export default API




