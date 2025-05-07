import api from '@/lib/api'
import { ApiResponse } from '@/types/api-type'
import { ResetPasswordInput } from '@/types/auth-type'
import { useMutation } from '@tanstack/react-query'

export function useResetPassword() {
  return useMutation({
    mutationFn: async ({ token, newPassword }: ResetPasswordInput) => {
      return await api.post<ApiResponse<void>>(
        `/auth/resetPassword?t=${token}`,
        {
          newPassword
        }
      )
    }
  })
}
