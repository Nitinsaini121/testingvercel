import * as Yup from 'yup'
export const ContractorValidationSchema = Yup.object().shape({
  contractorName: Yup.string().required('Name is required'),
  contractorPhone: Yup.string().required('Phone is required'),
  logo: Yup.string().required('Logo is required'),
  contractorEmail: Yup.string().required('Email is required')

  

})
