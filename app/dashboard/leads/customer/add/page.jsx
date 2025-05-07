'use client'
import { Form, useForm } from 'react-hook-form'

const AddCustomer = () => {
  const form = useForm()
  const onSubmitCustomer = data => {
    console.log(data)
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitCustomer)}></form>
      </Form>
    </>
  )
}

export default AddCustomer
