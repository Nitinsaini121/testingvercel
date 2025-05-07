import { User } from '@/types/auth-type'

export type SessionUser = User & { isVerified2FA: boolean }

declare module 'next-auth' {
  type Session = {
    user: SessionUser
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    idIoken?: string
    provider?: string
    accessToken?: string
  }
}

interface JSONData {
  user: User
  expires: string
}
