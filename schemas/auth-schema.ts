import { z } from 'zod'
import { minLengthString, phoneRegExp, requiredString } from './helpers-schema'

export const registerFormSchema = z.object({
  firstName: requiredString('First name'),
  lastName: requiredString('Last name'),
  email: requiredString('Email').email({
    message: 'Please provide a valid email address'
  }),
  phone: z
    .string()
    .trim()
    .regex(phoneRegExp, { message: 'Please provide a valid phone number' }),
  password: minLengthString(6, 'Password'),
  address: requiredString('Address')
})

export type RegisterForm = z.infer<typeof registerFormSchema>

export const loginFormSchema = z.object({
  login: requiredString('login').email({
    message: 'Please provide a valid email address'
  }),
  password: requiredString('Password')
})

export type LoginForm = z.infer<typeof loginFormSchema>

export const profileUpdateFormSchema = z.object({
  firstName: requiredString('First name'),
  lastName: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  timezone: z.string().optional()
})

export const passwordUpdateFormSchema = z
  .object({
    newPassword: minLengthString(6, 'New password'),
    confirmNewPassword: requiredString('Confirm password')
  })
  .refine(data => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword']
  })

export const emailUpdateFormSchema = z.object({
  newEmail: requiredString('New email').email({
    message: 'Please provide a valid email address'
  })
})

export type ProfileUpdateForm = z.infer<typeof profileUpdateFormSchema>
export type PasswordUpdateForm = z.infer<typeof passwordUpdateFormSchema>
export type EmailUpdateForm = z.infer<typeof emailUpdateFormSchema>

export const forgotPasswordSchema = z.object({
  email: requiredString('Email').email('Please provide a valid email address')
})

export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>

export const resetPasswordSchema = z
  .object({
    newPassword: minLengthString(6, 'New password'),
    confirmNewPassword: requiredString('Confirm password')
  })
  .refine(data => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword']
  })

export type ResetPasswordForm = z.infer<typeof resetPasswordSchema>

export const verify2FASchema = z.object({
  code: z.string().min(6, 'Code must be 6 digits').max(6)
})

export type Verify2FAForm = z.infer<typeof verify2FASchema>
