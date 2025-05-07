import api from '@/lib/api'
import { ApiResponse } from '@/types/api-type'
import { useQuery } from '@tanstack/react-query'

export function useGetLeagueList() {
  return useQuery({
    queryKey: ['leagueList'],
    queryFn: async () => {
      return await api.get<ApiResponse<string[]>>('/leagueList')
    }
  })
}
