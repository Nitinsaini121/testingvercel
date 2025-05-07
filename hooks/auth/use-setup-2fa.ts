import api from '@/lib/api'
import { ApiResponse } from '@/types/api-type'
import { useMutation } from '@tanstack/react-query'

export function useSetup2fa() {
  return useMutation({
    mutationFn: async () => {
      return await api.post<ApiResponse<{ qrURL: string }>>('/auth/setup2FA')
    },
    onSuccess: () => {}
  })
}
