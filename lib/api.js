import env from '@/lib/env'
import axios from 'axios'
import { getSession, signOut } from 'next-auth/react'

export const baseURL = `${env.NEXT_PUBLIC_API_URL}`

const api = axios.create({ baseURL })
api.interceptors.request.use(
  async config => {
    try {
      const session = await getSession()

      if (session?.user?.token) {
        config.headers['Authorization'] = 'Bearer ' + session?.user?.token

      }

      return config
    } catch (error) {
      console.error('Error fetching session:', error)
      return Promise.reject(error)
    }
  },
  error => {
    console.error('Request interceptor error:', error)
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  response => {
    if (response.data.errorCode === 601) {
      signOut()
    }

    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default api