export type Invoice = {
  id: number
  game: string
  venue: string
  section: string
  row: string
  seatNumbers: string
  qtySold: number
  price: string
  fees: string
  finalPayment: string
  status: string
  eventDate: string
  eventTime: string
  createdAt: Date
  updatedAt: Date
}
