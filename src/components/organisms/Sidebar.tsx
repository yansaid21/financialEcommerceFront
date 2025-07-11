'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Sidebar() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.replace('/')
  }

  return (
    <aside className="w-64 bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 text-white p-6 shadow-lg flex flex-col justify-between min-h-screen">
      <div>
        <h2 className="text-2xl font-bold mb-8">💰 Mi Finanzas</h2>
        <nav className="flex flex-col gap-4 text-lg">
          <Link href="/dashboard">📊 Resumen</Link>
          <Link href="/dashboard/transactions">🧾 Transacciones</Link>
          <Link href="/dashboard/statistics">📈 Estadísticas</Link>
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="mt-10 text-sm text-red-200 hover:text-white transition"
      >
        🚪 Cerrar sesión
      </button>
    </aside>
  )
}
