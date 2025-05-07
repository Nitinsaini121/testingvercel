import * as Yup from 'yup'
export const AllWorkOrderCatogriesValidation = Yup.object().shape({
  category: Yup.string().required('Category is required')
})
