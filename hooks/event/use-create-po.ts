import api from '@/lib/api'
import { ApiResponse } from '@/types/api-type'
import { CreatePOInput } from '@/types/event-type'
import { useMutation } from '@tanstack/react-query'

export function useCreatePO() {
  return useMutation({
    mutationFn: async (event: CreatePOInput) => {
      return await api.post<ApiResponse<void>>('/tickets/createpo', event)
    }
  })
}
