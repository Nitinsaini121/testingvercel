import api from '@/lib/api'
import { ApiResponse, PaginatedResponse } from '@/types/api-type'
import { Invoice } from '@/types/invoice-type'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export function useGetInvoices(pageSize: number, page: number) {
  return useQuery({
    queryKey: ['invoices', pageSize, page],
    queryFn: async () => {
      return await api.get<ApiResponse<PaginatedResponse<Invoice>>>(
        `/invoices?pageSize=${pageSize}&page=${page}`
      )
    },
    placeholderData: keepPreviousData
  })
}
