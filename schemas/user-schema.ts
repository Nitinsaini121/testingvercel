import { z } from 'zod'
import { phoneRegExp, requiredString } from './helpers-schema'


export const UserSchema = z.object({
  firstName: requiredString('firstName'),
  role:requiredString('role'),
  lastName: requiredString('lastName'),
  userName: requiredString('userName'),
  email: requiredString('Email').email({
    message: 'Please provide a valid email address'
  }),
  phoneNumber: z
    .string()
    .trim()
    .regex(phoneRegExp, { message: 'Please provide a valid phone number' }),
  password: requiredString('Password')
})

export type ContactUsForm = z.infer<typeof UserSchema>