import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const PrivateRoute = ({children}) => {
    const {student, loading} = useAuth()
    if (loading) return <p>Caricamento...</p>
    if(!student) return <Navigate to="/login"/>
    return children ;
}

export default PrivateRoute
