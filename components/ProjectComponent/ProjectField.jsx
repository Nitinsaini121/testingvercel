import AddressLocation from '../address-location/address-location'
import FormInputField from '../share/form/FormInputField'
import FormSelectField from '../share/form/FormSelect'

const ProjectField = ({ form, setLatitudde, setLongitudde }) => {
  return (
    <>
      <div className='grid grid-cols-2 gap-4'>
        <FormInputField
          form={form}
          name='projectName'
          label='Project Name'
          placeholder='Enter Project Name'
        />
        <FormSelectField
          form={form}
          name='scope'
          label='Scope'
          placeholder='Select Scope'
          options={[
            { value: 'roofing', label: 'Roofing' },
            { value: 'gutter', label: 'Gutter' }
          ]}
        />
      </div>
      <AddressLocation
        form={form}
        name='Search Location'
        placeholder='Enter location'
        label='Search Location'
        type='text'
        nameAddress='address'
        nameState='state'
        nameCity='city'
        nameZip='zip'
        placeholderAddress='Enter Address'
        placeholderCity='Enter City'
        placeholderState='Enter State'
        placeholderZip='Enter Zip'
        setLatitudde={setLatitudde}
        setLongitudde={setLongitudde}
      />
      <div className='mt-2 grid grid-cols-2 gap-4'>
        <FormInputField
          form={form}
          name='price'
          label='Price'
          placeholder='Enter Price'
        />
        <FormInputField
          form={form}
          name='description'
          label='Description'
          placeholder='Enter Description'
        />
      </div>
    </>
  )
}

export default ProjectField
