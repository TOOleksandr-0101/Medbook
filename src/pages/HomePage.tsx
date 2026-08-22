import type { Doctor } from '../types/Doctor'

interface HomePageProps {
  doctors: Doctor[]
}

function HomePage({ doctors }: HomePageProps) {
  const totalDoctors = doctors.length
  const availableDoctors = doctors.filter(
    (doctor) => doctor.available,
  ).length

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to MedBook</p>
      <p>Total doctors: {totalDoctors}</p>
      <p>Available doctors: {availableDoctors}</p>
    </div>
  )
}

export default HomePage