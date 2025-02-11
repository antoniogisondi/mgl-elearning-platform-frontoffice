import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import HomePage from './pages/HomePage/HomePage'
import Dashboard from './pages/Dashboard/Dashboard'
import LoginPage from './pages/LoginPage/LoginPage'
import CoursesPage from './pages/CoursesPage/CoursesPage'

function App() {

  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
            <Route path='/dashboard/corsi' element={<PrivateRoute><CoursesPage/></PrivateRoute>}/>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
