import * as Yup from 'yup'

export const NotesValidationSchema = Yup.object().shape({
  description: Yup.string()
    .trim()
    .matches(/\b\w+\b.*\b\w+\b/, 'Enter at least 2 words')
    .required('Description is required')
})
