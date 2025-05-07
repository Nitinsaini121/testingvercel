import api from '@/lib/api'
import { ApiResponse } from '@/types/api-type'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useUpdateNotification(notificationId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      return await api.get<ApiResponse<void>>(
        `/notification/update?id=${notificationId}`
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    }
  })
}
