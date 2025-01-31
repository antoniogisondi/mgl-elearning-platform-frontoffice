import React, { createContext, useContext, useState, useEffect } from 'react'
import { loginStudent, logoutStudent, getAuthenticatedStudents } from '../services/api'

const AuthContext = createContext()


export const AuthProvider = ({children}) => {
    const [student, setStudent] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const authenticatedStudent = await getAuthenticatedStudents();
                if (!authenticatedStudent) {
                    console.log("Sessione scaduta. Effettua nuovamente il login.");
                    setStudent(null);
                } else {
                    setStudent(authenticatedStudent);
                }
            } catch (err) {
                console.error("Errore durante il controllo dell'autenticazione:", err.response?.data || err.message);
                setStudent(null); // Logout automatico
            } finally {
                setLoading(false);
            }
        }
        checkAuth()
    }, [])

    const login = async (username, password) => {
        try {
            console.log("Dati inviati al server:", { username, password });
            const response = await loginStudent(username, password);
            setStudent(response.data.student) // Passa i dati correttamente
            console.log("Login riuscito:", response.data);
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
