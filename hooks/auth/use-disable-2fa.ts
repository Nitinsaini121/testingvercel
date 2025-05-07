import api from '@/lib/api'
import { ApiResponse } from '@/types/api-type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

export function useDisable2fa() {
  const queryClient = useQueryClient()
  const { data: session, update } = useSession()

  return useMutation({
    mutationFn: async () => {
      return await api.post<ApiResponse<void>>('/auth/disable2FA')
    },
    onSuccess: async ({ data }) => {
      toast.success(data.message)
      await Promise.all([
        update({ user: { ...session?.user, isVerified2FA: false } }),
        queryClient.invalidateQueries({ queryKey: ['user'] })
      ])
    }
  })
}
