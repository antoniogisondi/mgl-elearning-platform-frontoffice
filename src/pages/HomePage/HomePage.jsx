import React from 'react'
import { Link } from 'react-router-dom'
import '../../index.css'

function HomePage() {
  return (
    <div>
      <h1>Benvenuto nella Homepage</h1>
      <Link to='/login'>Effettua l'accesso</Link>
    </div>
  )
}

export default HomePage
