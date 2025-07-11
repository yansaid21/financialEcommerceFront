export interface Transaction {
  id: string
  userId: string
  description: string
  amount: number
  isIncome: boolean
  date: string
  createdAt: string
  updatedAt: string
}
