import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
  const {student, logout} = useAuth()
  const navigate = useNavigate()
  const handleLogout = async () => {
    await logout()
    navigate('/')
  }
  return (
    <header className='container-fluid'>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 py-2">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold text-uppercase" to="/dashboard">
            MGL E-LEARNING
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            {/* <FaBars color="white" /> */}
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto ms-3">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#attivita">Attività</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#messaggi">Messaggi</a>
              </li>
            </ul>

            {/* Sezione utente */}
            <div className="d-flex align-items-center">
              <span className="text-white me-3">Ciao {student.nome}!</span>
              <button onClick={handleLogout}></button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
