export type UpdateTicketInput = {
  manualPrice: boolean
}

export type Ticket = {
  id: number
  eventId: number
  teamId: number
  userId: number
  automatiqTicketIds: string[] | null
  purchaseId: number
  inventoryId: number
  game: string
  venue: string
  eventDate: string
  eventTime: string
  row: number
  section: number
  seat: number
  lowSeat: string | null
  highSeat: string | null
  skyboxTicketIds: number[] | null
  manualPrice: boolean
  floorPrice: number
  barcode: string
  status: string
  price: string
  broadcast: boolean
  broadcastUpdatedDate: string
  broadcastUpdateBy: string
  priceUpdateDate: string
  priceUpdateBy: string
}
