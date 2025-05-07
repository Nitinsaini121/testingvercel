import api from '@/lib/api'
import { ApiResponse } from '@/types/api-type'
import { UpdateUserInput } from '@/types/auth-type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

export function useUpdateUser() {
  const queryClient = useQueryClient()
  const { update, data: session } = useSession()

  return useMutation({
    mutationFn: async (data: UpdateUserInput) => {
      const formData = new FormData()

      Object.entries(data).forEach(([key, value]) => {
        if (value !== null) {
          formData.append(key, value)
        }
      })

      return await api.post<ApiResponse<void>>('/auth/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    },
    onSuccess: async ({ data }, updatedUser) => {
      toast.success(data.message)
      await Promise.all([
        update({ user: { ...session?.user, ...updatedUser } }),
        queryClient.invalidateQueries({ queryKey: ['user'] })
      ])
    }
  })
}
