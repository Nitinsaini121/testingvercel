import api from '@/lib/api'
import { ApiResponse } from '@/types/api-type'
import { UpdateTicketInput } from '@/types/ticket-type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export function useUpdateTicket(id: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (ticket: UpdateTicketInput) => {
      return await api.post<ApiResponse<void>>(
        `/tickets/update?id=${id}`,
        ticket
      )
    },
    onSuccess: ({ data }) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ['tickets'] })
    }
  })
}
