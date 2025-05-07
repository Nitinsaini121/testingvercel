import api from '@/lib/api'
import { ApiResponse } from '@/types/api-type'
import { SendPasswordResetEmailInput } from '@/types/auth-type'
import { useMutation } from '@tanstack/react-query'

export function useSendResetPasswordEmail() {
  return useMutation({
    mutationFn: async ({ email }: SendPasswordResetEmailInput) => {
      return await api.post<ApiResponse<void>>('/auth/sendResetPasswordEmail', {
        email
      })
    }
  })
}
