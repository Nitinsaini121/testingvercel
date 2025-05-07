import FileUpload from '../share/form/FileUpload'
import FormInputField from '../share/form/FormInputField'
import FormSelectField from '../share/form/FormSelect'

const AddManufacturerForm = ({ form }) => {
  const status = [
    {
      label: 'Active',
      value: 'Active'
    },
    {
      label: 'In Active',
      value: 'In Active'
    }
  ]
  return (
    <>
      <div className=' mb-2 mt-5 grid grid-cols-2 gap-4'>
        <FormInputField
          form={form}
          name='title'
          label='Title'
          placeholder='Enter Title'
          type='text'
        />
        <FileUpload
          form={form}
          name='image'
          label='Image'
          className='py-3 rounded h-12 border border-color-grey'
        />
        <FormSelectField
          form={form}
          name='status'
          label='Status'
          placeholder='Select Status'
          options={status}
        />
        <FormInputField
          form={form}
          name='slug'
          label='Slug'
          disable
          type='text'
          className='rounded border border-color-grey'
        />
      </div>
    </>
  )
}

export default AddManufacturerForm
