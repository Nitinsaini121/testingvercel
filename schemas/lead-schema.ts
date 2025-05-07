import { z } from 'zod'
import {
  // latitudeRegex,
  // longitudeRegex,
  phoneRegExp,
  requiredString
} from './helpers-schema'

export const LeadsSchema = z.object({
  externalId: requiredString('External Id'),
  date: z.union([z.string(), z.date()]),
  leadAge: requiredString('Lead Age'),
  address: requiredString('Address'),
  city: requiredString('City'),
  zip: requiredString('Zip'),
  scope: requiredString('Scope'),
  state: requiredString('State'),
  firstName: requiredString('firstName'),
  customerAddress: requiredString('customerAddress'),
  lastName: requiredString('lastName'),
  email: requiredString('email'),
  phone: z
    .string()
    .trim()
    .regex(phoneRegExp, { message: 'Please provide a valid phone number' })
})

export type LeadsForm = z.infer<typeof LeadsSchema>
