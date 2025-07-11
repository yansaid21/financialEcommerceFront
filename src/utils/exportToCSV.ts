import { Transaction } from '@/types/transaction'
import Papa from 'papaparse'
import { saveAs } from 'file-saver'

export function exportTransactionsToCSV(transactions: Transaction[]) {
  const data = transactions.map((t) => ({
    Descripción: t.description,
    Fecha: new Date(t.date).toLocaleDateString(),
    Tipo: t.isIncome ? 'Ingreso' : 'Gasto',
    Monto: t.amount,
  }))

  const csv = Papa.unparse(data)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  saveAs(blob, 'transacciones.csv')
}
