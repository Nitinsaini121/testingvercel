export type Event = {
  cost: string | null
  event: {
    id: number
    name: string
    occurs_at: string
    venue_name: string
  }
  id: number
  row: string
  seat: number
  section: string
  ticket_id: string
}

export type CreatePOInput = {
  teamId: number
  ticketIds: string[]
}
