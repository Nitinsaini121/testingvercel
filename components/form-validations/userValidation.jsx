import * as yup from 'yup'

export const UserValidation = yup.object().shape({
  name: yup.string().required('Name  is required'),
  email: yup.string().required('Email is required'),
  phone: yup.string().required('Phone is required'),
  password: yup.string().required('Password is required'),

  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password must match'),
  address: yup.string().required('Address is required'),
  role_id: yup.string().required('Role is required'),
  status: yup.string().required('Status is required')
})
