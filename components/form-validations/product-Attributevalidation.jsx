import * as Yup from 'yup'

export const ProductAttributeValidationSchema = Yup.object().shape({
  attributes: Yup.array().of(
    Yup.object().shape({
      value: Yup.array()
        .of(Yup.string())
        .min(1, 'At least one option is required') // Minimum of one option
        .required('Please select at least one option')
    })
  )
})
