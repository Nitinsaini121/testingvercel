import api from '@/lib/api'
import { ApiResponse } from '@/types/api-type'
import { useQuery } from '@tanstack/react-query'

export function useGetTeamList(league: string) {
  return useQuery({
    queryKey: ['teamList', league],
    queryFn: async () => {
      return await api.get<ApiResponse<string[]>>(`/teamName?league=${league}`)
    }
  })
}
