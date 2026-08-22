import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom'

import { useState } from 'react'
import { useEffect } from 'react'
import type { Doctor } from './types/Doctor'

import { Home, Stethoscope, Settings, User } from 'lucide-react'

import HomePage from './pages/HomePage'
import DoctorsPage from './pages/DoctorsPage'
import ManageDoctorsPage from './pages/ManageDoctorsPage'
import ProfilePage from './pages/ProfilePage'

import './App.css'

const initialDoctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Aоnna',
    specialty: 'Cardiologist',
    available: true,
  },
  {
    id: 2,
    name: 'Dr. Max',
    specialty: 'Neurologist',
    available: false,
  },
  {
    id: 3,
    name: 'Dr. John',
    specialty: 'Surgeon',
    available: true,
  },
]

function App() {
  const [doctors, setDoctors] = useState<Doctor[]>(() => {
  const savedDoctors = localStorage.getItem('doctors')

  if (savedDoctors) {
    return JSON.parse(savedDoctors)
  }

  return initialDoctors
})
  useEffect(() => {
    localStorage.setItem('doctors', JSON.stringify(doctors))
  }, [doctors])

  return (
    <BrowserRouter>
      <nav className="navbar">
        <strong className="navbar-brand">MedBook</strong>

        <div className="nav-links">
          <Link to="/" className="nav-link">
            <Home size={16} />
            Home
          </Link>

          <Link to="/doctors" className="nav-link">
            <Stethoscope size={16} />
            Doctors
          </Link>

          <Link to="/manage-doctors" className="nav-link">
            <Settings size={16} />
            Manage
          </Link>

          <Link to="/profile" className="nav-link">
            <User size={16} />
            Profile
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage doctors={doctors} />} />
        <Route
          path="/doctors"
          element={<DoctorsPage doctors={doctors} />}
        />
        <Route
          path="/manage-doctors"
          element={
            <ManageDoctorsPage
              doctors={doctors}
              setDoctors={setDoctors}
            />
          }
        />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App