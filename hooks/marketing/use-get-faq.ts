import api from '@/lib/api'
import { ApiResponse } from '@/types/api-type'
import { FAQ } from '@/types/marketing-type'
import { useQuery } from '@tanstack/react-query'

export function useGetFAQ() {
  return useQuery({
    queryKey: ['faq'],
    queryFn: async () => {
      return await api.get<ApiResponse<FAQ[]>>('/faq')
    }
  })
}
