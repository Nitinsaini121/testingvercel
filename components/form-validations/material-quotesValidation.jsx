import * as yup from 'yup'

export const MaterialQuotesValidation = yup.object().shape({
    customer_id: yup.string().required('Customer is required'),
    ship_to: yup.string().required('Ship To is required'),
})
