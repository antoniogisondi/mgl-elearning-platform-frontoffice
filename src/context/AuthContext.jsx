import React, { createContext, useContext, useState, useEffect } from 'react'
import { loginStudent, logoutStudent, getAuthenticatedStudents } from '../services/api'
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext()


export const AuthProvider = ({children}) => {
    const [student, setStudent] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                if (window.location.pathname === '/' || window.location.pathname === '/login') {
                    return;
                }
                const authenticatedStudent = await getAuthenticatedStudents(); // API `/auth`
                setStudent(authenticatedStudent);
                console.log(student)
            } catch (err) {
                if (err.response?.status === 401) {
                    console.log("Utente non autenticato, procedi al login");
                } else {
                    console.error("Errore durante la verifica:", err);
                }
                setStudent(null); // Logout automatico in caso di errore
            } finally {
                setLoading(false); // Imposta lo stato di caricamento
            }
        };
    
        checkAuth();
    }, []);

    const login = async (username, password) => {
        try {
            const response = await loginStudent(username, password);
            setStudent(response.data) 
        } catch (err) {
            console.error("Errore durante il login:", err.response?.data || err.message);
        }
    };

    const logout = async () => {
        await logoutStudent()
        setStudent(null)
    }

    return (
        <AuthContext.Provider value={{student, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
