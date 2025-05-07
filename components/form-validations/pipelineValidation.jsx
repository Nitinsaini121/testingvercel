import * as yup from 'yup'

export const pipelineSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  materialType: yup.string().required('Material Type is required')
})
