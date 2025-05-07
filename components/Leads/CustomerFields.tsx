import { User } from '@/types/user-type'
import { Separator } from '@radix-ui/react-separator'
import React, { Dispatch, SetStateAction } from 'react'
import { UseFormReturn } from 'react-hook-form'
import LocationSearchCustomer from '../CustomerLocation'
import FormCheckBox from '../share/form/CheckBox'
import FilterFileds from '../share/form/FilterFiled'
import FormInputField from '../share/form/FormInputField'
import { CardDescription } from '../ui/card'
import { Leads, UserAddress } from '@/types/leda-type'
export type CustomerFieldsProps = {
  form: UseFormReturn<Leads> // Use the Leads type instead of 'any'
  setCustomerLatitude: React.Dispatch<React.SetStateAction<string | null>>
  setCustomerLongitude: React.Dispatch<React.SetStateAction<string | null>>
  setCustomerAddress: Dispatch<SetStateAction<UserAddress | undefined>>
  userList: User[]
  disable: boolean
  getLeadAddress: boolean
}
const CustomerFields = ({
  form,
  userList,
  disable,
  setCustomerLatitude,
  setCustomerLongitude,
  setCustomerAddress,
  getLeadAddress
}: CustomerFieldsProps) => {
  return (
    <>
      <div>
        <CardDescription className='mt-7 text-xl text-lg font-semibold text-dark-color pb-2'>
          Customer Contact Details{' '}
        </CardDescription>
        <Separator className='bg-light-grey h-px'/>
        <div className='mt-5 grid grid-cols-2 gap-4'>
          <FilterFileds
            name='phone'
            form={form}
            placeholder='Select a Phone'
            label='Phone No'
            type='text'
            userList={userList}
          />

          <FormInputField
            form={form}
            name='firstName'
            label='First Name'
            placeholder='Enter First Name'
            type='text'
            disable={disable}
          />

          <FormInputField
            form={form}
            name='lastName'
            label='Last Name'
            placeholder='Enter Last Name'
            type='text'
            disable={disable}
          />
          <FormInputField
            form={form}
            name='email'
            label='Email'
            placeholder='Enter email'
            type='text'
            disable={disable}
           
          />
        </div>
        {!getLeadAddress && (
          <LocationSearchCustomer
            setCustomerLongitude={setCustomerLongitude}
            setCustomerLatitude={setCustomerLatitude}
            setCustomerAddress={setCustomerAddress}
          />
          
        )}
       <div className='mt-4 mb-4'>
       <FormCheckBox
          name='checkboxAddress'
          form={form}
          description='Customer Address is Same as Lead Address'
        />
       </div>
        {!getLeadAddress && (
          <>
            <FormInputField
              name='customerAddress'
              form={form}
              placeholder='Enter Address'
              label=' Address'
              type='text'
            />
            <div className='mt-5 grid grid-cols-3 gap-4'>
              <FormInputField
                form={form}
                name='customerCity'
                label='City'
                placeholder='Enter City'
                type='text'
              />

              <FormInputField
                form={form}
                name='customerState'
                label=' State'
                placeholder='Enter State'
                type='text'
              />

              <FormInputField
                form={form}
                name='customerZip'
                label=' Zip'
                placeholder='Enter  Zip'
                type='text'
              />
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default CustomerFields
