import { useState } from 'react'

import type { Doctor } from '../types/Doctor'

interface DoctorsPageProps {
  doctors: Doctor[]
}

function DoctorsPage({ doctors }: DoctorsPageProps) {
  const [search, setSearch] = useState('')
  const [availableOnly, setAvailableOnly] = useState(false)
  const [bookedDoctorId, setBookedDoctorId] = useState<number | null>(null)

  const filteredDoctors = doctors
    .filter((doctor) =>
      doctor.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((doctor) =>
      !availableOnly || doctor.available
    )

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Doctors</h1>
          <p>Find and book a doctor</p>
        </div>
      </div>

      <div className="toolbar">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={availableOnly}
            onChange={(event) => setAvailableOnly(event.target.checked)}
          />
          Available only
        </label>
      </div>

      <div className="doctors-table">
        <div className="table-row table-head">
          <span>Name</span>
          <span>Specialty</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {filteredDoctors.map((doctor) => {
          const booked = bookedDoctorId === doctor.id

          return (
            <div className="table-row" key={doctor.id}>
              <span className="doctor-name">{doctor.name}</span>
              <span>{doctor.specialty}</span>

              <span>
                {booked
                  ? 'Booked'
                  : doctor.available
                    ? 'Available'
                    : 'Unavailable'}
              </span>

              <span>
                <button
                  className="text-button"
                  disabled={!doctor.available || booked}
                  onClick={() => setBookedDoctorId(doctor.id)}
                >
                  {booked ? 'Booked' : doctor.available ? 'Book' : '—'}
                </button>
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DoctorsPage