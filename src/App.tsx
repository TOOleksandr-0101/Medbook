///Made By Oleksandr. 2026

import { useState } from 'react'
import './App.css'

const doctors = [
    {
        id: 1,
        name: "Dr. Anna",
        specialty: "Cardiologist",
        available: true
    },
    {
        id: 2,
        name: "Dr. Max",
        specialty: "Neurologist",
        available: false
    },
    {
        id: 3,
        name: "Dr. John",
        specialty: "Surgeon",
        available: true
    }
];



function App() {
  const [search, setSearch] = useState('');

  return (
    <div>
      <h1>MedBook</h1>
      <p>Find and book a doctor</p>
    {doctors
            .filter((doctor) =>
              doctor.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((doctor) => (
              <p key={doctor.id}>
                {doctor.name} - {doctor.specialty} -{' '}
                {doctor.available ? 'Available' : 'Not Available'}
              </p>
            ))}
    </div>
  );
}

export default App
