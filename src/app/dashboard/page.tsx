'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const token = searchParams.get('token')
    console.log('Token from search params:', token);
    

    if (token) {
      console.log("Token received dashboard:", token);
      
      localStorage.setItem('token', token)
      router.replace('/dashboard')
    } else {
      const savedToken = localStorage.getItem('token')
      if (!savedToken) {
        console.warn('No token found, redirecting to home page.')
        //router.replace('/') // Redirige si no hay token
      }
    }
  }, [router, searchParams])

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Bienvenido al Dashboard</h1>
      <p className="text-gray-500 mt-2">Estás autenticado 🎉</p>
    </div>
  )
}
