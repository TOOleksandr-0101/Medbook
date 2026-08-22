import { useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import type { Doctor } from '../types/Doctor'

interface ManageDoctorsPageProps {
  doctors: Doctor[]
  setDoctors: Dispatch<SetStateAction<Doctor[]>>
}

function ManageDoctorsPage({
  doctors,
  setDoctors,
}: ManageDoctorsPageProps) {
  const [name, setName] = useState('')
  const [specialty, setSpecialty] = useState('')
  const [available, setAvailable] = useState(true)
  const [editingDoctorId, setEditingDoctorId] = useState<number | null>(null)

  const resetForm = () => {
    setEditingDoctorId(null)
    setName('')
    setSpecialty('')
    setAvailable(true)
  }

  const startEditDoctor = (doctor: Doctor) => {
    setEditingDoctorId(doctor.id)
    setName(doctor.name)
    setSpecialty(doctor.specialty)
    setAvailable(doctor.available)
  }

  const addDoctor = () => {
    const trimmedName = name.trim()
    const trimmedSpecialty = specialty.trim()

    if (!trimmedName || !trimmedSpecialty) {
      return
    }

    const newDoctor: Doctor = {
      id: Date.now(),
      name: trimmedName,
      specialty: trimmedSpecialty,
      available,
    }

    setDoctors((currentDoctors) => [...currentDoctors, newDoctor])
    resetForm()
  }

  const saveDoctor = () => {
    if (editingDoctorId === null) {
      return
    }

    setDoctors((currentDoctors) =>
      currentDoctors.map((doctor) =>
        doctor.id === editingDoctorId
          ? {
              ...doctor,
              name,
              specialty,
              available,
            }
          : doctor,
      ),
    )

    resetForm()
  }

  const deleteDoctor = (id: number) => {
    setDoctors((currentDoctors) =>
      currentDoctors.filter((doctor) => doctor.id !== id),
    )
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Manage doctors</h1>
          <p>Add, edit and remove doctors</p>
        </div>
      </div>

      <div className="manage-form">
        <div>
          <label>Doctor name</label>
          <input
            type="text"
            placeholder="Dr. Smith"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div>
          <label>Specialty</label>
          <input
            type="text"
            placeholder="Cardiologist"
            value={specialty}
            onChange={(event) => setSpecialty(event.target.value)}
          />
        </div>

        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={available}
            onChange={(event) => setAvailable(event.target.checked)}
          />
          Available
        </label>

        <button
          type="button"
          className="primary-button"
          onClick={editingDoctorId === null ? addDoctor : saveDoctor}
        >
          {editingDoctorId === null ? 'Add doctor' : 'Save changes'}
        </button>
      </div>

      <div className="doctors-table">
        <div className="manage-table-row table-head">
          <span>Name</span>
          <span>Specialty</span>
          <span>Available</span>
          <span>Actions</span>
        </div>

        {doctors.map((doctor) => (
          <div className="manage-table-row" key={doctor.id}>
            <span className="doctor-name">{doctor.name}</span>

            <span>{doctor.specialty}</span>

            <span>{doctor.available ? 'Yes' : 'No'}</span>

            <span className="table-actions">
              <button
                type="button"
                className="edit-button"
                onClick={() => startEditDoctor(doctor)}
              >
                Edit
              </button>

              <button
                type="button"
                className="delete-button"
                onClick={() => deleteDoctor(doctor.id)}
              >
                Delete
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ManageDoctorsPage