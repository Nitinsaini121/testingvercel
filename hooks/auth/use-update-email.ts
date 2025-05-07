import api from '@/lib/api'
import { ApiResponse } from '@/types/api-type'
import { UpdateEmailInput } from '@/types/auth-type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

export function useUpdateEmail() {
  const { update, data: session } = useSession()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateEmailInput) => {
      return await api.post<ApiResponse<void>>('/auth/updateEmail', data)
    },
    onSuccess: async ({ data }, updatedUser) => {
      toast.success(data.message)
      await Promise.all([
        update({ user: { ...session?.user, tempEmail: updatedUser?.newEmail } }),
        queryClient.invalidateQueries({ queryKey: ['user'] })
      ])
    }
  })
}
