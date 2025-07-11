// src/components/organisms/Sidebar.tsx
'use client'

import Link from 'next/link'

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 text-white p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-8">💰 Mi Finanzas</h2>
      <nav className="flex flex-col gap-4 text-lg">
        <Link href="/dashboard" className="hover:text-yellow-300 transition-colors">📊 Resumen</Link>
        <Link href="/dashboard/transactions" className="hover:text-yellow-300 transition-colors">🧾 Transacciones</Link>
        <Link href="/dashboard/statistics" className="hover:text-yellow-300 transition-colors">📈 Estadísticas</Link>
      </nav>
    </aside>
  )
}
