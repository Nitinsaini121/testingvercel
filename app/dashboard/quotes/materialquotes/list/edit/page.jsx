'use client'
import { MaterialQuotesValidation } from '@/components/form-validations/material-quotesValidation'
import LayoutHeader from '@/components/layoutHeader'
import MaterialQuotesFields from '@/components/MaterialQuotes/MaterialQuotesFields'
import { successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import MaterialQuotesService from '@/services/material-api'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const EditMaterialQuotes = () => {
  const form = useForm({ resolver: yupResolver(MaterialQuotesValidation) })
  const searchParams = useSearchParams()
  const editId = searchParams.get('id')
  const router = useRouter()
  const fetchMaterialById = async () => {
    const response = await MaterialQuotesService.GetMaterialStatusBYId(editId)
    if (response?.status === 200) {
      const materilData = response?.data?.data
      const formattedData = {
        ...materilData,
        customer_id: String(materilData?.customer?.id)
      }
      form.reset(formattedData)
    }
  }
  useEffect(() => {
    fetchMaterialById()
  }, [])

  const onEditMaterial = async data => {
    const formData = { ...data, _method: 'PUT', id: editId }
    try {
      const response = await MaterialQuotesService.UpdateMaterialQuotesById(
        editId,
        formData
      )
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
          <LayoutHeader pageTitle='Edit Material Quotes' />
          <Button
            className='site-button'
            onClick={() => router.push(`/dashboard/quotes/materialquotes/list`)}
          >
            All Material Quote
          </Button>
        </div>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onEditMaterial)}>
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
                Update
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  )
}

export default EditMaterialQuotes
