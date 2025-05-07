import api from '@/lib/api'
import { ApiResponse } from '@/types/api-type'
import { UpdateTeamPasswordInput } from '@/types/team-type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export function useUpdateTeam(teamId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (team: UpdateTeamPasswordInput) => {
      return await api.post<ApiResponse<void>>(
        `/team/updatePassword?id=${teamId}`,
        team
      )
    },
    onSuccess: ({ data }) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ['teams'] })
    }
  })
}
