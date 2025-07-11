'use client'

import { useEffect, useState } from 'react'
import api from '@/services/api'
import { Transaction } from '@/types/transaction'
import TransactionForm from '@/components/molecules/TransactionsForm' 
import TransactionTable from '@/components/organisms/TransactionsTable' 
import Button from '@/components/atoms/Button'
import { exportTransactionsToCSV } from '@/utils/exportToCSV'
import { getUserIdFromToken } from '@/utils/getUserIdFromToken'



export default function TransaccionesPage() {
const [currentPage, setCurrentPage] = useState(1)
const itemsPerPage = 5

  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Transaction | null>(null)
const totalPages = Math.ceil(transactions.length / itemsPerPage)

const paginatedTransactions = transactions.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
)

const fetchTransactions = () => {
  const userId = getUserIdFromToken()
  if (!userId) {
    console.warn('No se pudo obtener el ID del usuario.')
    return
  }

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
          transactions={paginatedTransactions}
          onEdit={(tx) => {
            setEditing(tx)
            setShowForm(true)
          }}
          onDelete={handleDelete}
        />
        
      )}
      {totalPages > 1 && (
  <div className="flex justify-center items-center gap-4 mt-6">
    <Button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      className="bg-gray-300 text-gray-800"
      disabled={currentPage === 1}
    >
      ⬅ Anterior
    </Button>

    <span className="text-sm text-gray-700">
      Página {currentPage} de {totalPages}
    </span>

    <Button
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      className="bg-gray-300 text-gray-800"
      disabled={currentPage === totalPages}
    >
      Siguiente ➡
    </Button>
  </div>
)}

      



{transactions.length > 0 && (
  <Button
    onClick={() => exportTransactionsToCSV(transactions)}
    className="bg-yellow-400 text-black hover:bg-yellow-500"
  >
    Exportar CSV
  </Button>
)}


</div>
    
  )
}
