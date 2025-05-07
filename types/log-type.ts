type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export type Log = {
  id: number
  endPoint: string
  request: {
    url: string
    body: Record<string, unknown>
    query: Record<string, unknown>
    method: HttpMethod
    headers: Record<string, string>
  }
  response: {
    body: string
    statusCode: number
  } | null
  apiCallBy: string
  duration: string | null
  ipAddresss: string | undefined
  createdAt: string
  updatedAt: string
}
