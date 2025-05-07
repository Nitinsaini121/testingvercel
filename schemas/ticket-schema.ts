import { z } from 'zod'

import { requiredString } from './helpers-schema'

export const editPriceFormSchema = z.object({
  price: requiredString('Price')
})

export type EditPriceForm = z.infer<typeof editPriceFormSchema>
