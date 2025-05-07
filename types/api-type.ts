export type ApiResponse<T> = {
  data: T
  message: string
}

export type PaginatedResponse<T> = {
  pageSize: number
  totalItems: number
  totalPages: number
  currentPage: number
  data: T[]
}
