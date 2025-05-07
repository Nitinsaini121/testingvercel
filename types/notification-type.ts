export type Notification = {
  id: number
  userId: number
  title: string
  description: string
  body: string
  isRead: boolean
  createdAt: Date
  updatedAt: Date
}

export type Active = 'All' | 'Unread'
