import { z } from 'zod'
import { requiredString } from './helpers-schema'

export const createTeamFormSchema = z.object({
  league: requiredString('League'),
  team: requiredString('Team'),
  apiEmail: requiredString('Email').email({
    message: 'Please provide a valid email address'
  }),
  apiPassword: requiredString('Password'),
  terms: z.boolean().default(false)
})

export type CreateTeamForm = z.infer<typeof createTeamFormSchema>

export const updateTeamFormSchema = z.object({
  password: requiredString('Password')
})

export type UpdateTeamForm = z.infer<typeof updateTeamFormSchema>
