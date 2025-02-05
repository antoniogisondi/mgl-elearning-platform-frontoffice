import React, { createContext, useContext, useState, useEffect } from 'react'
import { loginStudent, logoutStudent, getAuthenticatedStudents } from '../services/api'

const AuthContext = createContext()


export const AuthProvider = ({children}) => {
    const [student, setStudent] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const authenticatedStudent = await getAuthenticatedStudents(); // API `/auth`
                if (authenticatedStudent) {
                    setStudent(authenticatedStudent); // Imposta lo studente autenticato
                } else {
                    console.log("Sessione scaduta. Effettua nuovamente il login.");
                    setStudent(null); // Reindirizza al login
                }
            } catch (err) {
                console.error("Errore durante il controllo dell'autenticazione:", err.response?.data || err.message);
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
        <AuthContext.Provider value={{student, login, logout, loading, isAuthenticated: !!student}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
