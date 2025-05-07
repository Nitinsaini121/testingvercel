import api from '@/lib/api'
import { ApiResponse } from '@/types/api-type'
import { CreateTeamInput } from '@/types/team-type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export function useCreateTeam() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (team: CreateTeamInput) => {
      return await api.post<ApiResponse<void>>('/team/createTeam', team)
    },
    onSuccess: ({ data }) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ['teams'] })
    }
  })
}
