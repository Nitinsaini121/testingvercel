import api from '@/lib/api'
import { ApiResponse } from '@/types/api-type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'

export function useUpdateProfileImage() {
  const queryClient = useQueryClient()
  const { update, data: session } = useSession()

  return useMutation({
    mutationFn: async (data: FormData) => {
      return await api.post<ApiResponse<{ image: string }>>(
        '/auth/update',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
    },
    onSuccess: async ({ data }) => {
      toast.success(data.message)
      await Promise.all([
        update({
          user: { ...session?.user, image: data?.data?.image }
        }),
        queryClient.invalidateQueries({ queryKey: ['user'] })
      ])
    }
  })
}
