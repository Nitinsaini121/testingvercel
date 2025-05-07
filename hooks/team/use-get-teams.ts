import api from '@/lib/api'
import { ApiResponse } from '@/types/api-type'
import { Team } from '@/types/team-type'
import { useQuery } from '@tanstack/react-query'

export function useGetTeams() {
  return useQuery({
    queryKey: ['teams'],
    queryFn: async () => {
      return await api.get<ApiResponse<Team[]>>('/team')
    }
  })
}
