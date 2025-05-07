import api from '@/lib/api'
import { ApiResponse } from '@/types/api-type'
import { Notification } from '@/types/notification-type'
import { useQuery } from '@tanstack/react-query'

export function useGetNotifications() {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      return await api.get<ApiResponse<Notification[]>>('/notifications')
    }
  })
}
