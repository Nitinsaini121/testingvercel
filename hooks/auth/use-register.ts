import api from '@/lib/api'
import { ApiResponse } from '@/types/api-type'
import { RegisterInput } from '@/types/auth-type'
import { useMutation } from '@tanstack/react-query'

export function useRegister() {
  return useMutation({
    mutationFn: async (user: RegisterInput) => {
      return await api.post<ApiResponse<void>>('/auth/register', user)
    }
  })
}
