import { NotificationData } from '@/types/socket-type'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { io, Socket } from 'socket.io-client'

let socket: Socket | null = null

export function useSocket(userId: number) {
  useEffect(() => {
    socket = io('wss://api.seatsplit.com')

    socket.on('connect', () => {
      socket?.emit('user-login', userId)
    })

    socket.on('notification', (data: NotificationData) => {
      if (data?.message) toast(data.message)
    })

    return () => {
      socket?.disconnect()
    }
  }, [userId])

  return socket
}
