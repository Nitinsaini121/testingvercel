import api from '@/lib/api'
import { ApiResponse, PaginatedResponse } from '@/types/api-type'
import { Log } from '@/types/log-type'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export function useGetLogs(pageSize: number, page: number) {
  return useQuery({
    queryKey: ['logs', pageSize, page],
    queryFn: async () => {
      return await api.get<ApiResponse<PaginatedResponse<Log>>>(
        `/logs?pageSize=${pageSize}&page=${page}`
      )
    },
    placeholderData: keepPreviousData
  })
}
