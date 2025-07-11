'use client'

import { Transaction } from '@/types/transaction'
import TransactionActions from './TransactionActions'

export default function TransactionTable({
  transactions,
  onEdit,
  onDelete,
}: {
  transactions: Transaction[]
  onEdit: (tx: Transaction) => void
  onDelete: (id: string) => void
}) {
  return (
    <table className="w-full text-left border">
      <thead className="bg-indigo-600 text-white">
        <tr>
          <th className="p-2">Descripción</th>
          <th className="p-2">Fecha</th>
          <th className="p-2">Tipo</th>
          <th className="p-2 text-right">Monto</th>
          <th className="p-2">Acciones</th>
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
            <td className="p-2">
              <TransactionActions
                onEdit={() => onEdit(tx)}
                onDelete={() => onDelete(tx.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
