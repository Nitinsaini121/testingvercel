'use client'

import { useSocket } from '@/hooks/use-socket'
import { createContext, ReactNode, useContext } from 'react'
import { Socket } from 'socket.io-client'

type SocketContextType = {
  socket: Socket | null
}

const SocketContext = createContext<SocketContextType>({ socket: null })

type SocketProviderProps = {
  children: ReactNode
  userId: number
}

export function SocketProvider({ children, userId }: SocketProviderProps) {
  const socket = useSocket(userId)
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}

export function useSocketContext() {
  return useContext(SocketContext)
}
