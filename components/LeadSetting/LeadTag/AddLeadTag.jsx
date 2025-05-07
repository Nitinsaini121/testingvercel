'use client'
import { LeadsSettingFormSchema } from '@/components/form-validations/LeadsSettingValidation'
import FormInputField from '@/components/share/form/FormInputField'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import LeadsSettingServices from '@/services/LeadSetting'

const AddLeadsTag = ({handleModalClose,getListLeads}) => {
  const form = useForm({
    defaultValues: {},
     resolver:yupResolver(LeadsSettingFormSchema)
  })

  const handleLeadsTagSubmit = async data => {
    try {
      const formData = new FormData()
      formData.append('title', data.title || '')
      formData.append('color', data.color || '')

      // Submit to API
      const response = await LeadsSettingServices.AddTags(formData)
      if (response.status === 200) {
        successMessage({ description: response?.data?.message })
        form.reset()
        getListLeads()
      }
      handleModalClose()
    } catch (error) {
      console.error('Lead submission error:', error)
      errorMessage({
        description:
          error?.response?.data?.message ||
          'Submission failed. Please try again.'
      })
    }
  }

  return (
    <>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(handleLeadsTagSubmit)}
          className='mt-5 grid grid-cols-2 gap-4'
        >
          <FormInputField
            form={form}
            name='title'
            label='Title'
            placeholder='Enter title'
          />
          <FormInputField form={form} name='color' label='Color' type='color' />
          <div className='mt-4 flex justify-end'>
            <Button type='submit' className='site-button'>
              Submit
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default AddLeadsTag
