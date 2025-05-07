import api from '@/lib/api'
import { ApiResponse, PaginatedResponse } from '@/types/api-type'
import { Ticket } from '@/types/ticket-type'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export function useGetTickets(pageSize: number, page: number) {
  return useQuery({
    queryKey: ['tickets', pageSize, page],
    queryFn: async () => {
      return await api.get<ApiResponse<PaginatedResponse<Ticket>>>(
        `/tickets?pageSize=${pageSize}&page=${page}`
      )
    },
    placeholderData: keepPreviousData
  })
}
