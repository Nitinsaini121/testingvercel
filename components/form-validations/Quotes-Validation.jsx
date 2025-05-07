import * as Yup from 'yup'

export const QuotesValidation = Yup.object().shape({
  quotes: Yup.array().of(
    Yup.object().shape({
      productId: Yup.string().required('Product is required'),
      cost: Yup.number()
        .typeError('Cost must be a number')
        .required('Cost is required'),
      margin: Yup.number()
        .typeError('Margin must be a number')
        .required('Margin is required'),
      quantity: Yup.number()
        .typeError('Quantity must be a number')
        .required('Quantity is required')
    })
  )
})
