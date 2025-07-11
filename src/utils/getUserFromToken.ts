import { jwtDecode } from 'jwt-decode'

type JwtPayload = {
  sub: string
  email: string
  name?: string
  iat: number
  exp: number
}

export function getUserFromToken() {
  if (typeof window === 'undefined') return null

  const token = localStorage.getItem('token')
  if (!token) return null

  try {
    const decoded = jwtDecode<JwtPayload>(token)
    return {
      id: decoded.sub,
      email: decoded.email,
      name: decoded.name || decoded.email.split('@')[0],
    }
  } catch (err) {
    console.error('Error decoding token', err)
    return null
  }
}
