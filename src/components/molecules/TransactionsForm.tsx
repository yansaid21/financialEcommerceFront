'use client'

import { Transaction } from '@/types/transaction'
import { useState, useEffect } from 'react'
import api from '@/services/api'
import Button from '@/components/atoms/Button'

type Props = {
  editing?: Transaction | null
  onSuccess: () => void
  onCancel: () => void
}

export default function TransactionForm({ editing, onSuccess, onCancel }: Props) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [isIncome, setIsIncome] = useState(true)

  useEffect(() => {
    if (editing) {
      setDescription(editing.description)
      setAmount(editing.amount.toString())
      setDate(editing.date.slice(0, 10))
      setIsIncome(editing.isIncome)
    }
  }, [editing])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      description,
      amount: Number(amount),
      date,
      isIncome,
      userId: 'b52c725f-92e6-452c-810a-deec5aba4aed',
    }

    const method = editing ? 'patch' : 'post'
    const url = editing ? `/transactions/${editing.id}` : '/transactions'

    await api[method](url, payload)
    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded shadow mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Monto"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <select
          value={isIncome ? 'income' : 'expense'}
          onChange={(e) => setIsIncome(e.target.value === 'income')}
          className="p-2 border rounded"
        >
          <option value="income">Ingreso</option>
          <option value="expense">Gasto</option>
        </select>
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="bg-green-600 text-white hover:bg-green-700">
          {editing ? 'Actualizar' : 'Guardar'}
        </Button>
        <Button onClick={onCancel} className="bg-gray-300 text-gray-800">
          Cancelar
        </Button>
      </div>
    </form>
  )
}
