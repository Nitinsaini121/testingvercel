import * as yup from 'yup'

export const BudgetBookValidation = yup.object().shape({
  engineer_id: yup.string().required('Engineer is required')
})
