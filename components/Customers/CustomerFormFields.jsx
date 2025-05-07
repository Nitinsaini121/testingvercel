import React from 'react'
import FormInputField from '../share/form/FormInputField'

const CustomerFormFields = () => {
  return (
 <>
 <FormInputField form={form} name='firstName' label='First Name' placeholder='Enter Customer First Name'/>
 <FormInputField form={form} name='lastName' label='Last Name' placeholder='Enter Customer Last Name'/>
 <FormInputField form={form} name='email' label='Email' placeholder='Enter Customer Email'/>
 <FormInputField form={form} name='phone' label='Phone Number' placeholder='Enter Customer First Name'/>
 <FormInputField form={form} name='firstName' label='First Name' placeholder='Enter Customer First Name'/>

 </>
  )
}

export default CustomerFormFields
