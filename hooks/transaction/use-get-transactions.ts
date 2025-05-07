import api from '@/lib/api'
import { ApiResponse, PaginatedResponse } from '@/types/api-type'
import { Transaction } from '@/types/transaction-type'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export function useGetTransactions(pageSize: number, page: number) {
  return useQuery({
    queryKey: ['transactions', pageSize, page],
    queryFn: async () => {
      return await api.get<ApiResponse<PaginatedResponse<Transaction>>>(
        `/transaction?pageSize=${pageSize}&page=${page}`
      )
    },
    placeholderData: keepPreviousData
  })
}
