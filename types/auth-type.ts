export type RegisterInput = {
  firstName: string
  lastName?: string
  email: string
  password: string
  phone: string
  address?: string
  city?: string
  state?: string
  zip?: string
  timezone?: string
}

export type User = {
  id: number
  stripeUserId: number | null
  firstName: string
  lastName: string | null
  email: string
  tempEmail: string
  role: 'user' | 'admin'
  address: string | null
  city: string | null
  state: string | null
  zip: string | null
  timezone: string | null
  image: string
  accessToken: string
  refreshToken: string
  isEnable2FA: boolean
}

export type UpdateUserInput = {
  firstName?: string
  lastName?: string | null
  address?: string | null
  city?: string | null
  state?: string | null
  zip?: string | null
  timezone?: string | null
  email?: string
  password?: string
}

export type AuthView =
  | 'signin'
  | 'signup'
  | 'forgot_password'
  | 'reset_password'
  | 'verify_email'
  | 'verify_update_email'
  | null

export type AuthState = {
  view: AuthView
  token?: string
}

export type SendPasswordResetEmailInput = {
  email: string
}

export type UpdateEmailInput = {
  newEmail: string
}

export type VerifyUpdateEmailInput = {
  token: string
}

export type VerifyEmailInput = {
  token: string
}

export type ResetPasswordInput = {
  token: string
  newPassword: string
}

export type Verify2faInput = {
  code: string
  userId: number
}
