import { z } from 'zod'
import { phoneRegExp, requiredString } from './helpers-schema'

export const ContractorSchema = z.object({
  contractorName: requiredString('Contractor Name'),
  contractorEmail: requiredString('Contractor Email'),
  contractorState: requiredString('Contractor State'),
  contractorCity: requiredString('Contractor City'),
  contractorZip: requiredString('Contractor Zip'),
  status: requiredString('Status'),
  regionalZipCode: requiredString('Regional Zip Code'),
  contractorRegion: requiredString('Contractor Region'),
  qualifiedContractorFormStarted: z.union([z.string(), z.date()]),
  qualifiedContractorFormSubmitted: z.union([z.string(), z.date()]),
  qualifiedContractorFormApproove: z.union([z.string(), z.date()]),

  contractorPhone: z
    .string()
    .trim()
    .regex(phoneRegExp, { message: 'Please provide a valid phone number' })
})

export type LeadsForm = z.infer<typeof ContractorSchema>
