import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom'

import HomePage from './pages/HomePage'
import DoctorsPage from './pages/DoctorsPage'
import ManageDoctorsPage from './pages/ManageDoctorsPage'
import ProfilePage from './pages/ProfilePage'

import './App.css'

function App() {
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
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route
          path="/manage-doctors"
          element={<ManageDoctorsPage />}
        />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App