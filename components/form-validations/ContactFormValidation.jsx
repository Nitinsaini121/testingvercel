import * as yup from 'yup'

export const ContactSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone is required'),
  company_id: yup.string().required('Company is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  zip: yup.string().required('Zip Code is required'),
  address: yup.string().required('Address is required')
})
