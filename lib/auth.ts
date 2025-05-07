import { ApiResponse } from '@/types/api-type'
import { User } from '@/types/auth-type'
import { NextAuthOptions, Session } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import api from './api'
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          const { data } = await api.post<ApiResponse<User>>(
            'auth/login',
            credentials
          )
          return {
            ...data.data,
            id: data.data.id.toString(),
            isVerified2FA: false
          }
        } catch {
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user as Session['user']
      return session
    },
    async jwt({ token, user, session, trigger }) {
      if (trigger === 'update' && session?.user) {
        token.user = session.user
      }
      if (user) token.user = user
      return token
    }
  }
}