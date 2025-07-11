'use client'

import { useState } from 'react'

type Props = {
  onFilter: (filters: {
    type: 'all' | 'income' | 'expense'
    fromDate: string
    toDate: string
  }) => void
}

export default function TransactionFilters({ onFilter }: Props) {
  const [type, setType] = useState<'all' | 'income' | 'expense'>('all')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onFilter({ type, fromDate, toDate })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-end mb-6 bg-white p-4 rounded shadow">
      <div className="flex flex-col">
        <label className="text-sm font-semibold mb-1">Tipo</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as any)}
          className="border p-2 rounded"
        >
          <option value="all">Todos</option>
          <option value="income">Ingresos</option>
          <option value="expense">Gastos</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-semibold mb-1">Desde</label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-semibold mb-1">Hasta</label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Aplicar filtros
      </button>
    </form>
  )
}
