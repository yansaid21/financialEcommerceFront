'use client'

import { useEffect, useState } from 'react'
import api from '@/services/api'

interface Transaction {
  id: string
  description: string
  amount: number
  isIncome: boolean
  date: string
}

export default function TransaccionesPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userId = 'b52c725f-92e6-452c-810a-deec5aba4aed' // ← en futuro puedes sacarlo del token

    api.get(`/transactions?userId=${userId}`)
      .then((res) => {
        setTransactions(res.data.transactions)
      })
      .catch((err) => {
        console.error('Error al obtener transacciones', err)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Transacciones del Usuario</h1>

      {loading ? (
        <p>Cargando transacciones...</p>
      ) : transactions.length === 0 ? (
        <p>No hay transacciones registradas.</p>
      ) : (
        <table className="w-full text-left border">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-2">Descripción</th>
              <th className="p-2">Fecha</th>
              <th className="p-2">Tipo</th>
              <th className="p-2 text-right">Monto</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{tx.description}</td>
                <td className="p-2">{new Date(tx.date).toLocaleDateString()}</td>
                <td className="p-2">
                  {tx.isIncome ? (
                    <span className="text-green-600 font-semibold">Ingreso</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Gasto</span>
                  )}
                </td>
                <td className="p-2 text-right">
                  {tx.amount.toLocaleString('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
