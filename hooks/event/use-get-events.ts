import api from '@/lib/api'
import { ApiResponse } from '@/types/api-type'
import { Event } from '@/types/event-type'
import { useQuery } from '@tanstack/react-query'

export function useGetEvents(teamId: number) {
  return useQuery({
    queryKey: ['events', teamId],
    queryFn: async () => {
      return await api.get<
        ApiResponse<{ accountEmail: string; accountTickets: Event[] }>
      >(`/event/tickets?id=${teamId}`)
    }
  })
}
