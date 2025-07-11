import {jwtDecode} from 'jwt-decode'

type JwtPayload = {
  sub: string
  email: string
  iat: number
  exp: number
}

export function getUserIdFromToken(): string | null {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  if (!token) return null

  try {
    const decoded = jwtDecode<JwtPayload>(token)
    return decoded.sub
  } catch (error) {
    console.error('Error decoding token:', error)
    return null
  }
}
