'use client'

import { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js'
import { Doughnut, Bar } from 'react-chartjs-2'
import api from '@/services/api'
import { Transaction } from '@/types/transaction'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

export default function EstadisticasPage() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userId = 'b52c725f-92e6-452c-810a-deec5aba4aed'

    api.get(`/transactions?userId=${userId}`)
      .then((res) => setTransactions(res.data.transactions))
      .catch((err) => console.error('Error al obtener transacciones:', err))
      .finally(() => setLoading(false))
  }, [])

  const ingresos = transactions.filter(t => t.isIncome)
  const gastos = transactions.filter(t => !t.isIncome)

  const dataDoughnut = {
    labels: ['Ingresos', 'Gastos'],
    datasets: [
      {
        data: [ingresos.reduce((a, b) => a + b.amount, 0), gastos.reduce((a, b) => a + b.amount, 0)],
        backgroundColor: ['#22c55e', '#ef4444'],
        borderWidth: 1,
      },
    ],
  }

  const resumenPorFecha = transactions.reduce<Record<string, { ingresos: number, gastos: number }>>((acc, tx) => {
    const fecha = new Date(tx.date).toLocaleDateString('es-CO')
    if (!acc[fecha]) acc[fecha] = { ingresos: 0, gastos: 0 }
    if (tx.isIncome) acc[fecha].ingresos += tx.amount
    else acc[fecha].gastos += tx.amount
    return acc
  }, {})

  const fechas = Object.keys(resumenPorFecha).sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
  const dataBar = {
    labels: fechas,
    datasets: [
      {
        label: 'Ingresos',
        data: fechas.map((f) => resumenPorFecha[f].ingresos),
        backgroundColor: '#22c55e',
      },
      {
        label: 'Gastos',
        data: fechas.map((f) => resumenPorFecha[f].gastos),
        backgroundColor: '#ef4444',
      },
    ],
  }

  return (
    <div>
      <h1 className="text-2xl font-black text-gray-900 mb-6">Estadísticas</h1>

      {loading ? (
        <p>Cargando gráficas...</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Ingresos vs Gastos</h2>
            <Doughnut data={dataDoughnut} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Totales por Fecha</h2>
            <Bar data={dataBar} />
          </div>
        </div>
      )}
    </div>
  )
}
