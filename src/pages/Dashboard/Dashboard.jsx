import React from 'react'
import Header from '../../components/Header/Header'
import { useAuth } from '../../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

function Dashboard() {
    const {student, logout} = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate('/')
    }

    if (!student) return navigate('/')
    return (
        <div>
            <Header/>
            {student.assignedCourses.length > 0 ? (
                student.assignedCourses.map(course => 
                    <div className="card bg-blue w-50">
                        <div className="card-header">
                            <h2 key={course._id}>{course.nome_corso}</h2>
                        </div>
                        <div className="card-body">
                            <Link>Segui il corso</Link>
                        </div>
                    </div>
                )
            ) : (
                <p>Non hai ancora corsi assegnati.</p>
            )}
            
            <Link to='/dashboard/corsi'>Vai ai tuoi corsi</Link>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Dashboard
