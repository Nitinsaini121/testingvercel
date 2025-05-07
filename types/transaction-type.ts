export type Transaction = {
  id: number
  userId: string
  user: {
    firstName: string
    lastName: string
    email: string
  }
  transactionId: string
  invoiceId: string
  receiver: string
  amount: string
  createdAt: Date
  updatedAt: Date
}
