import * as Yup from 'yup'

export const LeadsValidationSchema = Yup.object().shape({
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  zip: Yup.string().required('Zip is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  phone: Yup.string().required('Phone number is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  // Optional fields can be marked like this:
  location: Yup.string().optional(),
  leadFrom: Yup.string().optional(),
  externalId: Yup.string().optional(),
  lattitude: Yup.string().optional(),
  longitude: Yup.string().optional(),
  date: Yup.string().optional(),
  scope: Yup.string().optional(),
  customerAddress: Yup.string().optional(),
  customerState: Yup.string().optional(),
  customerCity: Yup.string().optional(),
  customerZip: Yup.string().optional(),
  checkboxAddress: Yup.boolean().optional(),
})
