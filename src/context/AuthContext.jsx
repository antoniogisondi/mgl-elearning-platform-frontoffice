import React, { createContext, useContext, useState, useEffect } from 'react'
import { loginStudent, logoutStudent, getAuthenticatedStudents } from '../services/api'

const AuthContext = createContext()


export const AuthProvider = ({children}) => {
    const [student, setStudent] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const authenticatedStudent = await getAuthenticatedStudents()
            setStudent(authenticatedStudent)
            setLoading(false)
        }
        checkAuth()
    }, [])

    const login = async (username, password) => {
        const studentData = await loginStudent(username, password)
        setStudent(studentData.student)
    }

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
