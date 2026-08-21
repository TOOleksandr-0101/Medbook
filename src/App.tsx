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
  const [availableOnly, setAvailableOnly] = useState(false)

  return (
    <div>
      <h1>MedBook</h1>
      <p>Find and book a doctor</p>
    <input
      type="text"
      placeholder="Search doctor"
      value={search}
      onChange={(event) => setSearch(event.target.value)}
    />
    <label>
      <input
        type="checkbox"
        checked={availableOnly}
        onChange={(event) => setAvailableOnly(event.target.checked)}
      />
      Available Only
    </label>
    {doctors
            .filter((doctor) =>
              doctor.name.toLowerCase().includes(search.toLowerCase()) &&
              (!availableOnly || doctor.available)
            )
            .map((doctor) => (
            <div key={doctor.id} className="doctor-card">
              <h2>{doctor.name}</h2>
              <p>{doctor.specialty}</p>
              <p>{doctor.available ? 'Available' : 'Not Available'}</p>

              <button disabled={!doctor.available}>
                Book
              </button>
            </div>
            ))}
    </div>
  );
}

export default App
