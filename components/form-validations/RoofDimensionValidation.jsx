import * as Yup from 'yup'
export const RoofDimensionValidation = Yup.object().shape({
  roofArea: Yup.number()
    .typeError('Roof Area must be a number')
    .required('Roof Area is required'),
  predominantPitch: Yup.number()
    .typeError('Predominant Pitch must be a number')
    .required('Predominant Pitch is required'),
  ridges: Yup.number()
    .typeError('Ridges must be a number')
    .required('Ridges is required'),
  hips: Yup.number()
    .typeError('Hips must be a number')
    .required('Hips is required'),
  valleys: Yup.number()
    .typeError('Valleys must be a number')
    .required('Valleys is required'),
  rakes: Yup.number()
    .typeError('Rakes must be a number')
    .required('Rakes is required'),
  eaves: Yup.number()
    .typeError('Eaves must be a number')
    .required('Eaves is required'),
  bends: Yup.number()
    .typeError('Bends must be a number')
    .required('Bends is required'),
  wallFlash: Yup.number()
    .typeError('Wall Flash must be a number')
    .required('Wall Flash is required'),
  step: Yup.number()
    .typeError('Step must be a number')
    .required('Step is required'),
  dripEdge: Yup.number()
    .typeError('Drip Edge must be a number')
    .required('Drip Edge is required'),
  starter: Yup.number()
    .typeError('Starter must be a number')
    .required('Starter is required')
})
