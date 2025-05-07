import FormDatePicker from '../share/form/datePicker'
import FormInputField from '../share/form/FormInputField'
import FormTextArea from '../share/form/TextArea'

const AddAppliedForm = ({ form, WorkOrderId }) => {
  return (
    <>
      <FormInputField
        form={form}
        name='projectName'
        label='Project Name'
        placeholder='Project Name'
      />
      <div className='grid grid-cols-2 gap-4'>
        <FormInputField
          form={form}
          name='projectLocation'
          label='Project Location'
          placeholder='Project Location'
        />
        <FormDatePicker form={form} name='bidDate' label='Bid Date' />
      </div>
      <FormTextArea
        form={form}
        name='description'
        label='Description'
        type='text'
        className='rounded-6 !min-h-32 bg-white !pr-7 pt-3 !shadow-[0_0_15px_-13px_black] shadow-slate-100'
        errors={form?.formState?.errors}
      />
      <fieldset className='custom-raduis border-color-grey mt-5 rounded border border-solid border-gray-300 py-4 pe-4 ps-4'>
        <legend className='font-semibold'>Pricing</legend>
        <div className='grid grid-cols-2 gap-4'>
          <FormInputField
            form={form}
            name='labourCost'
            label='Labour Cost'
            placeholder='$ 0.00'
            type='number'
          />
          <FormInputField
            form={form}
            name='totalEstimatedCost'
            placeholder='$ 0.00'
            label='Total Estimated Cost'
            type='number'
          />
        </div>
      </fieldset>
      <fieldset className='custom-raduis border-color-grey mt-5 rounded border border-solid border-gray-300 py-4 pe-4 ps-4'>
        <legend className='font-semibold'>Schedule</legend>
        <div className='grid grid-cols-2 gap-4'>
          <FormDatePicker
            form={form}
            name='startDate'
            label='Start Date'
            disabled={date => date < new Date(new Date().setHours(0, 0, 0, 0))}
          />
          <FormDatePicker
            form={form}
            name='completionDate'
            label='Completion Date'
            disabled={date => date < new Date(new Date().setHours(0, 0, 0, 0))}
          />
        </div>
      </fieldset>
    </>
  )
}

export default AddAppliedForm
