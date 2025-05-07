'use client'
import LayoutHeader from '@/components/layoutHeader'
import AddSalesPipelineForm from '@/components/Sales-Pipeline/AddSalesPipelineForm'
import SalesPipelineServices from '@/services/salea-pipeline-api'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'

export default function AddSalesPipeline() {
  const router = useRouter()
  const form = useForm({
    defaultValues: {
      type: '',
      projectId: '',
      assign: '',
      estimatedValue: '',
      tags: [],
      priority: '',
      company: '',
      nextAction: '',
      status: ''
    }
    // resolver: yupResolver(LeadFormSchema)
  })
  const handlePipelineSubmit = async data => {
    console.log('data-pipeeline', data)
    try {
      const response = await SalesPipelineServices.addSalesPipeline(data)
      successMessage({ description: response?.data?.message })
      router.push('/dashboard/sales-pipeline')
    } catch (error) {
      errorMessage({
        description:
          error?.response?.data?.message ||
          'Submission failed. Please try again.'
      })
    }
  }
  const handleBack = () => {
    router.push('/dashboard/sales-pipeline')
  }
  return (
    <>
      <div className='flex justify-between'>
        <LayoutHeader pageTitle={'Add sales pipeline'} />
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handlePipelineSubmit)}>
          <AddSalesPipelineForm form={form} />
          <div className='mt-4 flex justify-end gap-4'>
            <Button
              onClick={handleBack}
              type='button'
              className='site-button bg-white'
            >
              Back
            </Button>
            <Button type='submit' className='site-button'>
              Submit
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}
