'use client'

import Button from '@/components/atoms/Button'

export default function TransactionActions({
  onEdit,
  onDelete,
}: {
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <div className="flex gap-2">
      <Button onClick={onEdit} className="text-blue-600 hover:underline text-sm">Editar</Button>
      <Button onClick={onDelete} className="text-red-600 hover:underline text-sm">Eliminar</Button>
    </div>
  )
}
