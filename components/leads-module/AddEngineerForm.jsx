'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import EngineerServices from '../../services/engineer'
import FormInputField from '../share/form/FormInputField'
import { errorMessage, successMessage } from '../ToasterMessage'
import { yupResolver } from '@hookform/resolvers/yup'
import { EngineerFormSchema } from '../form-validations/EngineerForm'

const AddEngineerForm = ({ handleCloseDialog,getEngineer,id }) => {
  const form = useForm({
    defaultValues: {},
    resolver:yupResolver(EngineerFormSchema)
  })
  const router = useRouter()

  const handleEngineerSubmit = async data => {
    console.log('data--submit', data)
    try {
      const formData = new FormData()
      // Direct fields
      formData.append('name', data.name || '')
      formData.append('email', data.email || '')
      formData.append('phone', data.phone || '')
      formData.append('address', data.address || '')

      // Submit to API
      const response = await EngineerServices.AddEngineers(formData)
      if (response.status === 200) {
        successMessage({ description: response?.data?.message })
        if (id) {
          router.push(`/dashboard/leads/edit?id=${id}`)
        } else {
          router.push('/dashboard/leads/add')
        }
        form.reset()
        handleCloseDialog(false)
        getEngineer()
      }
    } catch (error) {
      console.error('submission error:', error)
      errorMessage({
        description:
          error?.response?.data?.message ||
          'Submission failed. Please try again.'
      })
    }
  }

  return (
    <>
      {/* <div className='flex justify-between'> */}
      <div className='text-center !text-xl font-semibold'>Add Engineer</div>
      <div className='text-center'>
        Add Engineer post as per your requirements.
      </div>
      {/* </div> */}
      <FormProvider {...form}>
        <form  onSubmit={e => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit(handleEngineerSubmit)()
          }}>
          <div className='mt-5 grid grid-cols-2 gap-4'>
            <FormInputField
              form={form}
              name='name'
              label='Name'
              placeholder='Enter Title'
            />
            <FormInputField
              form={form}
              name='email'
              label='Email'
              placeholder='Enter Email'
            />
          </div>
          <FormInputField
            form={form}
            name='phone'
            label='Phone'
            placeholder='Enter Phone'
            type='tel'
          />
          <FormInputField
            form={form}
            name='address'
            label='Address'
            placeholder='Enter address'
          />
          <div className='mt-4 flex justify-end'>
            <Button type='submit' className='site-button'>Submit</Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default AddEngineerForm
