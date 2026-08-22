import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom'

import { useState } from 'react'
import type { Doctor } from './types/Doctor'

import HomePage from './pages/HomePage'
import DoctorsPage from './pages/DoctorsPage'
import ManageDoctorsPage from './pages/ManageDoctorsPage'
import ProfilePage from './pages/ProfilePage'

import './App.css'

const initialDoctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Anna',
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
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors)
  return (
    <BrowserRouter>
      <nav>
        <strong>MedBook</strong>

        <Link to="/">Home</Link>
        <Link to="/doctors">Doctors</Link>
        <Link to="/manage-doctors">Manage</Link>
        <Link to="/profile">Profile</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
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