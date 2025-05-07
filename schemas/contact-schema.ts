import { z } from 'zod'
import { phoneRegExp, requiredString } from './helpers-schema'

export const contactUsFormSchema = z.object({
  firstName: requiredString('First name'),
  lastName: requiredString('Last name'),
  email: requiredString('Email').email({
    message: 'Please provide a valid email address'
  }),
  phone: z
    .string()
    .trim()
    .regex(phoneRegExp, { message: 'Please provide a valid phone number' }),
  subject: requiredString('Subject'),
  message: requiredString('Message')
})

export type ContactUsForm = z.infer<typeof contactUsFormSchema>
