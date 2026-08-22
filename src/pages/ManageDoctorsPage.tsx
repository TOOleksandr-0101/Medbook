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

  const handleAddDoctor = () => {
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
    <div>
      <h1>Manage Doctors</h1>
      <p>Add, edit and remove doctors</p>

      <input
        type="text"
        placeholder="Doctor name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <input
        type="text"
        placeholder="Specialty"
        value={specialty}
        onChange={(event) => setSpecialty(event.target.value)}
      />

      <label>
        <input
          type="checkbox"
          checked={available}
          onChange={(event) => setAvailable(event.target.checked)}
        />
        Available
      </label>

      <button
        type="button"
        onClick={editingDoctorId === null ? handleAddDoctor : saveDoctor}
      >
        {editingDoctorId === null ? 'Add doctor' : 'Save changes'}
      </button>

      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.id}>
            {doctor.name} - {doctor.specialty} -{' '}
            {doctor.available ? 'Available' : 'Not Available'}
            <button type="button" onClick={() => deleteDoctor(doctor.id)}>
              Delete
            </button>
            <button type="button" onClick={() => startEditDoctor(doctor)}>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ManageDoctorsPage