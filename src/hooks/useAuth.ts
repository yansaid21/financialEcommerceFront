'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export function useAuth(protectedRoute = true) {
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (!storedToken && protectedRoute) {
      //router.replace('/')
    } else {
      setToken(storedToken)
    }
  }, [protectedRoute, router])

  return { token }
}
