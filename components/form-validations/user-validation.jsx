import * as yup from 'yup';

export const UserValidationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  // lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  // userName: yup.string().required('User name is required'),
  // phoneNumber: yup.string().required('Phone number is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[@$!%*?&]/, 'Password must contain at least one special character'),
  role: yup.string().required('Role is required'),
});
