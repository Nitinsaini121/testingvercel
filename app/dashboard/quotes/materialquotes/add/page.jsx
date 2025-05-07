'use client'
import { MaterialQuotesValidation } from '@/components/form-validations/material-quotesValidation'
import LayoutHeader from '@/components/layoutHeader'
import MaterialQuotesFields from '@/components/MaterialQuotes/MaterialQuotesFields'
import { successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import MaterialQuotesService from '@/services/material-api'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'

const AddMaterialQuotes = () => {
  const form = useForm({ resolver: yupResolver(MaterialQuotesValidation) })
  const router = useRouter()
  const onSubmitMaterial = async data => {
    try {
      const response = await MaterialQuotesService.AddMaterial(data)
      if (response) {
        successMessage({ description: response?.data?.message })
        router.push('/dashboard/quotes/materialquotes/list')
      }
    } catch (error) {
      console.log('errorerror', error)
    }
  }
  const handleBack = () => {
    router.push('/dashboard/quotes/materialquotes/list')
  }
  return (
    <>
      <div>
        <div className='mb-3 flex items-center justify-between'>
          <LayoutHeader pageTitle='Add Material Quotes' />
          <Button
            className='site-button'
            onClick={() => router.push(`/dashboard/quotes/materialquotes/list`)}
          >
            All Material Quote
          </Button>
        </div>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmitMaterial)}>
            <MaterialQuotesFields form={form} />
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
      </div>
    </>
  )
}

export default AddMaterialQuotes
