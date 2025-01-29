import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
    const {student, logout} = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate('/')
    }
    return (
        <div>
            <h1>Benvenuto nella dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Dashboard
