import api from '@/lib/api'
import { ApiResponse } from '@/types/api-type'
import { useQuery } from '@tanstack/react-query'

export function useStripeCallback(code: string) {
  return useQuery({
    queryKey: ['stripeCallback', code],
    queryFn: async () => {
      return await api.get<ApiResponse<void>>(
        `/stripe/callback?accountCode=${code}`
      )
    }
  })
}
