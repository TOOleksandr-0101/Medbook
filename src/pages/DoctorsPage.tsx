import { useState } from 'react'

const doctors = [
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

function DoctorsPage() {
  const [search, setSearch] = useState('')
  const [availableOnly, setAvailableOnly] = useState(false)
  const [bookedDoctorId, setBookedDoctorId] = useState<number | null>(null)

  return (
    <div>
      <h1>Doctors</h1>
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
        Available only
      </label>

      <div>
        {doctors
          .filter((doctor) =>
            doctor.name.toLowerCase().includes(search.toLowerCase())
          )
          .filter((doctor) =>
            !availableOnly || doctor.available
          )
          .map((doctor) => (
            <div key={doctor.id} className="doctor-card">
              <h2>{doctor.name}</h2>

              <p>{doctor.specialty}</p>

              <p>
                {bookedDoctorId === doctor.id
                  ? 'Booked'
                  : doctor.available
                    ? 'Available'
                    : 'Not Available'}
              </p>

              <button
                disabled={
                  !doctor.available ||
                  bookedDoctorId === doctor.id
                }
                onClick={() => setBookedDoctorId(doctor.id)}
              >
                {bookedDoctorId === doctor.id
                  ? 'Booked'
                  : 'Book'}
              </button>
            </div>
          ))}
      </div>
    </div>
  )
}

export default DoctorsPage