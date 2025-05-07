'use client'
import { Leads, UserAddress } from '@/types/leda-type'
import { User } from '@/types/user-type'
import { Dispatch, SetStateAction } from 'react'
import { UseFormReturn } from 'react-hook-form'
import AddressLocation from '../address-location/address-location'
import FormDatePicker from '../share/form/datePicker'
import FormMultiSelectField from '../share/form/FormMultiSelect'
import { CardDescription } from '../ui/card'
import { Separator } from '../ui/separator'
import CustomerFields from './CustomerFields'
export type LeadsFormFieldsProps = {
  form: UseFormReturn<Leads> // Use the Leads type instead of 'any'
  setLatitude: React.Dispatch<React.SetStateAction<string | null>>
  setLongitude: React.Dispatch<React.SetStateAction<string | null>>
  setUserAddress: Dispatch<SetStateAction<UserAddress | undefined>>
  setCustomerLatitude: React.Dispatch<React.SetStateAction<string | null>>
  setCustomerLongitude: React.Dispatch<React.SetStateAction<string | null>>
  setCustomerAddress: Dispatch<SetStateAction<UserAddress | undefined>>
  userList: User[]
  disable: boolean
  getLeadAddress: boolean
  disabled?: (date: Date) => boolean
}

const LeadsFormFields = ({
  form,
  setCustomerLatitude,
  setCustomerLongitude,
  setCustomerAddress,
  userList,
  disable,
  getLeadAddress,
  setLongitude,
  setLatitude
}: LeadsFormFieldsProps) => {
  return (
    <>
      <div>
        <CardDescription className='text-dark-color mb-2 mt-5 text-lg font-semibold'>
          Lead Details{' '}
        </CardDescription>
        <Separator className='bg-light-grey' />

        <div className='mt-5 grid grid-cols-2 gap-4'>
          <FormDatePicker
            name='date'
            form={form}
            label='Date'
            disabled={date => date < new Date(new Date().setHours(0, 0, 0, 0))}
          />
          <FormMultiSelectField
            form={form}
            name='scope'
            label='Scope'
            placeholder='Choose a scope'
            options={[
              { label: 'Roof', value: 'roof' },
              { label: 'Gutters', value: 'gutters' }
            ]}
          />
        </div>
        <AddressLocation
          form={form}
          name='location'
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
          placeholderZip='Enter  Zip'
          setLatitudde={setLatitude}
          setLongitudde={setLongitude}
        />

        {/* <div className='mt-5 grid grid-cols-2 gap-4'></div> */}
      </div>
      <CustomerFields
        form={form}
        userList={userList}
        disable={disable}
        setCustomerLatitude={setCustomerLatitude}
        setCustomerLongitude={setCustomerLongitude}
        setCustomerAddress={setCustomerAddress}
        getLeadAddress={getLeadAddress}
      />
    </>
  )
}

export default LeadsFormFields
