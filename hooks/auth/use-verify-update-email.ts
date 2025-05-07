import api from '@/lib/api'
import { ApiResponse } from '@/types/api-type'
import { VerifyUpdateEmailInput } from '@/types/auth-type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export function useVerifyUpdateEmail() {
  const { update, data: session } = useSession()
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: async ({ token }: VerifyUpdateEmailInput) => {
      return await api.get<ApiResponse<{ Email: string }>>(
        `/auth/verifyUpdateEmail?t=${token}`
      )
    },
    onSuccess: async ({ data }) => {
      toast.success(data.message)
      await Promise.all([
        update({
          user: {
            ...session?.user,
            email: data?.data.Email,
            tempEmail: ''
          }
        }),
        queryClient.invalidateQueries({ queryKey: ['user'] })
      ])
      router.push('/dashboard/settings/account')
    }
  })
}
