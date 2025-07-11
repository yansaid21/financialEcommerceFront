'use client'
import { handleOAuthRedirect } from '@/utils/auth'
import { useEffect, useState } from 'react'
import api from '@/services/api'
import { Transaction } from '@/types/transaction'
import Link from 'next/link'
import { getUserIdFromToken } from '@/utils/getUserIdFromToken'


export default function DashboardHome() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

useEffect(() => {
  handleOAuthRedirect()

  const userId = getUserIdFromToken()
  if (!userId) return

  api.get(`/transactions?userId=${userId}`)
    .then((res) => setTransactions(res.data.transactions))
    .catch((err) => console.error('Error al obtener transacciones:', err))
    .finally(() => setLoading(false))
}, [])


  const totalIngresos = transactions
    .filter((t) => t.isIncome)
    .reduce((acc, curr) => acc + curr.amount, 0)

  const totalGastos = transactions
    .filter((t) => !t.isIncome)
    .reduce((acc, curr) => acc + curr.amount, 0)

  const balance = totalIngresos - totalGastos

  return (
    <div>
      <h1 className="text-2xl font-black text-gray-900 mb-6">Resumen general</h1>

      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <>
          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <Card title="Total Ingresos" value={totalIngresos} color="green" />
            <Card title="Total Gastos" value={totalGastos} color="red" />
            <Card title="Balance" value={balance} color="indigo" />
          </div>

          {/* Transacciones recientes */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Últimas transacciones</h2>
              <Link href="/dashboard/transactions" className="text-indigo-600 hover:underline text-sm font-medium">
                Ver todas
              </Link>
            </div>

            {transactions.length === 0 ? (
              <p>No hay transacciones recientes.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {transactions
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .slice(0, 3)
                  .map((tx) => (
                    <li key={tx.id} className="py-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-800">{tx.description}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(tx.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div
                        className={`text-right font-semibold ${
                          tx.isIncome ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {tx.isIncome ? '+' : '-'}
                        {tx.amount.toLocaleString('es-CO', {
                          style: 'currency',
                          currency: 'COP',
                        })}
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  )
}

function Card({
  title,
  value,
  color,
}: {
  title: string
  value: number
  color: 'green' | 'red' | 'indigo'
}) {
  const colorMap = {
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-700',
    indigo: 'bg-indigo-100 text-indigo-700',
  }

  return (
    <div className={`rounded-lg p-5 shadow-md ${colorMap[color]}`}>
      <h2 className="text-sm font-semibold uppercase mb-2">{title}</h2>
      <p className="text-2xl font-bold">
        {value.toLocaleString('es-CO', {
          style: 'currency',
          currency: 'COP',
        })}
      </p>
    </div>
  )
}
