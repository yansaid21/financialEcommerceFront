'use client'

import { useEffect, useState } from 'react'
import api from '@/services/api'
import { Transaction } from '@/types/transaction'
import TransactionForm from '@/components/molecules/TransactionsForm' 
import TransactionTable from '@/components/organisms/TransactionsTable' 
import Button from '@/components/atoms/Button'
import { exportTransactionsToCSV } from '@/utils/exportToCSV'

export default function TransaccionesPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Transaction | null>(null)

  const fetchTransactions = () => {
    const userId = 'b52c725f-92e6-452c-810a-deec5aba4aed'
    api.get(`/transactions?userId=${userId}`)
      .then((res) => setTransactions(res.data.transactions))
      .catch((err) => console.error('Error al obtener transacciones', err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  const handleDelete = (id: string) => {
    if (!confirm('¿Eliminar esta transacción?')) return
    api.delete(`/transactions/${id}`).then(fetchTransactions)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Transacciones del Usuario</h1>
        <Button
          onClick={() => {
            setEditing(null)
            setShowForm(true)
          }}
          className="bg-indigo-600 text-white hover:bg-indigo-700"
        >
          + Agregar transacción
        </Button>
      </div>

      {showForm && (
        <TransactionForm
          editing={editing}
          onCancel={() => {
            setEditing(null)
            setShowForm(false)
          }}
          onSuccess={() => {
            setShowForm(false)
            setEditing(null)
            fetchTransactions()
          }}
        />
      )}

      {loading ? (
        <p>Cargando transacciones...</p>
      ) : (
        <TransactionTable
          transactions={transactions}
          onEdit={(tx) => {
            setEditing(tx)
            setShowForm(true)
          }}
          onDelete={handleDelete}
        />
      )}
      



<Button
  onClick={() => exportTransactionsToCSV(transactions)}
  className="bg-yellow-400 text-black hover:bg-yellow-500"
>
  Exportar CSV
</Button>

    </div>
    
  )
}
