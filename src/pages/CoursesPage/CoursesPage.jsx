import React from 'react'
import { useAuth } from '../../context/AuthContext'

function CoursesPage() {
    const {student} = useAuth()

    return (
        <div>
            <h1>Benvenuto {student.nome} {student.cognome}</h1>
            <h2>Corsi assegnati</h2>
            {student.assignedCourses.length > 0 ? (
                <ul>
                    {student.assignedCourses.map((course) => (
                        <li key={course._id}>
                            {course.nome_corso} - {course.categoria_corso}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Non hai ancora corsi assegnati.</p>
            )}
        </div>
    )
}

export default CoursesPage
