import api from '@/lib/api'
import { ApiResponse } from '@/types/api-type'
import { VerifyEmailInput } from '@/types/auth-type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

export function useVerifyEmail() {
  const { data: session, update } = useSession()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ token }: VerifyEmailInput) => {
      return await api.get<ApiResponse<void>>(`/auth/verifyEmail?t=${token}`)
    },
    onSuccess: async ({ data }) => {
      toast.success(data.message)
      await Promise.all([
        update({ user: { ...session?.user } }),
        queryClient.invalidateQueries({ queryKey: ['user'] })
      ])
    }
  })
}
