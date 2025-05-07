'use client'
import { useEffect, useState } from 'react'
import LocationSearch from '../leadLocation'
import FormInputField from '../share/form/FormInputField'
import { Form } from '../ui/form'

const AddressLocation = ({
  name,
  placeholder,
  type,
  label,
  nameState,
  nameCity,
  nameZip,
  nameAddress,
  placeholderAddress,
  placeholderState,
  placeholderCity,
  placeholderZip,
  form,
  setLatitudde,
  setLongitudde
}) => {
  const [longitude, setLongitude] = useState('')
  const [latitude, setLatitude] = useState('')
  const [userAddress, setUserAddress] = useState('')

  const shortAddress = userAddress?.fullAddress
    ?.split(',')
    .slice(0, -2)
    .join(',')
    .trim()

  useEffect(() => {
    if (userAddress) {
      form.setValue(nameCity, userAddress.city)
      form.setValue(nameState, userAddress.state)
      form.setValue(nameZip, userAddress.zip)
      form.setValue(nameAddress, shortAddress)
      setLatitudde(latitude)
      setLongitudde(longitude)
    }
  }, [userAddress, form])

  return (
    <>
      <fieldset className='custom-raduis border-color-grey mt-2 rounded border border-solid border-gray-300 py-4 pe-4 ps-4'>
        <legend className='font-semibold'>Location</legend>
        <Form {...form}>
          <LocationSearch
            form={form}
            setUserAddress={setUserAddress}
            setLongitude={setLongitude}
            setLatitude={setLatitude}
            name={name}
            placeholder={placeholder}
            label={label}
            type={type}
          />
          <FormInputField
            form={form}
            name={nameAddress}
            label='Address'
            placeholder={placeholderAddress}
            type='text'
          />
          <div className='grid grid-cols-3 gap-4'>
            <FormInputField
              form={form}
              name={nameState}
              label='State'
              placeholder={placeholderState}
              type='text'
            />
            <FormInputField
              form={form}
              name={nameCity}
              label='City'
              placeholder={placeholderCity}
              type='text'
            />
            <FormInputField
              form={form}
              name={nameZip}
              label='Zip'
              placeholder={placeholderZip}
              type='text'
            />
          </div>
        </Form>
      </fieldset>
    </>
  )
}

export default AddressLocation
