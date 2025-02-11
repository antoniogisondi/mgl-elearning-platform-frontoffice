import React, { createContext, useContext, useState, useEffect } from 'react'
import { loginStudent, logoutStudent, getAuthenticatedStudents } from '../services/api'
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext()


export const AuthProvider = ({children}) => {
    const [student, setStudent] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const authenticatedStudent  = await getAuthenticatedStudents()
            console.log(authenticatedStudent)
            if (authenticatedStudent) {
                setStudent(authenticatedStudent)
            } else {
                logout()
            }

            setLoading(false)
        };
    
        checkAuth();
    }, []);

    const login = async (username, password) => {
        try {
            const student = await loginStudent(username, password);
            console.log(student)
            if (student) {
                setStudent(student)
                window.location.href = '/dashboard'
            }
        } catch (err) {
            console.error("Errore durante il login:", err.response?.data || err.message);
        }
    };

    const logout = async () => {
        logoutStudent()
        setStudent(null)
    }

    return (
        <AuthContext.Provider value={{student, login, logout, loading}}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
