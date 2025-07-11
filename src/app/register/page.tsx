'use client'

import { useSearchParams } from 'next/navigation'

export default function RegisterPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const name = searchParams.get('name')

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Completa tu Registro</h1>
      <p>Email: {email}</p>
      <p>Nombre: {name}</p>
      {/* Aquí va el formulario para completar datos y crear cuenta */}
    </div>
  )
}
