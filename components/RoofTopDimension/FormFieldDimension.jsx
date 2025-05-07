'use client'
import FormInputField from '../share/form/FormInputField'

const FormFieldDimension = ({ form }) => {
  return (
    <>
      <div className='grid grid-cols-3 gap-4 mt-4'>
        <FormInputField
          form={form}
          name='roofArea'
          label='Roof Area'
          type='number'
          placeholder='Enter Roof Area'
        />
        <FormInputField
          form={form}
          name='predominantPitch'
          label='Predominant Pitch'
          type='number'
          placeholder='Enter Predominant Pitch'
        />
        <FormInputField
          form={form}
          name='ridges'
          label='Ridges'
          type='number'
          placeholder='Enter Ridges'
        />
        <FormInputField
          form={form}
          name='hips'
          label='Hips'
          type='number'
          placeholder='Enter Hips'
        />
        <FormInputField
          form={form}
          name='valleys'
          label='Valleys'
          type='number'
          placeholder='Enter Valleys'
        />

        <FormInputField
          form={form}
          name='bends'
          label='Bends'
          type='number'
          placeholder='Enter Bends'
        />
        <FormInputField
          form={form}
          name='wallFlash'
          label='Wall Flash'
          type='number'
          placeholder='Enter Wall Flash'
        />
        <FormInputField
          form={form}
          name='step'
          label='Step'
          type='number'
          placeholder='Enter Step'
        />
        <FormInputField
          form={form}
          name='rakes'
          label='Rakes'
          type='number'
          placeholder='Enter Rakes'
        />
        <FormInputField
          form={form}
          name='eaves'
          label='Eaves'
          type='number'
          placeholder='Enter Eaves'
        />
        <FormInputField
          form={form}
          name='dripEdge'
          label='Drip Edge'
          type='number'
          placeholder='Enter Drip Edge'
          disable
        />
        <FormInputField
          form={form}
          name='starter'
          label='Starter'
          type='number'
          placeholder='Enter Starter'
          disable
        />
      </div>
    </>
  )
}

export default FormFieldDimension
