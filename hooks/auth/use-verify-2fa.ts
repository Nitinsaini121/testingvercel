import api from '@/lib/api'
import { ApiResponse } from '@/types/api-type'
import { Verify2faInput } from '@/types/auth-type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

export function useVerify2fa() {
  const { data: session, update } = useSession()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Verify2faInput) => {
      return await api.post<ApiResponse<void>>('/auth/verify2FA', data)
    },
    onSuccess: async ({ data }) => {
      toast.success(data.message)
      await Promise.all([
        update({
          user: { ...session?.user, isVerified2FA: true, isEnable2FA: true }
        }),
        queryClient.invalidateQueries({ queryKey: ['user'] })
      ])
    }
  })
}
