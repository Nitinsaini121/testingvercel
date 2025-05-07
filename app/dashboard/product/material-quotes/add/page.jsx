'use client'
import AddFields from '@/components/FieldsMaterial/AddFields'
import { MaterialValidationSchema } from '@/components/form-validations/materialQuotes-validation'
import LayoutHeader from '@/components/layoutHeader'
import MaterialQuotesServices from '@/components/services/material-api'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
const AddMaterial = () => {
  const form = useForm({
    defaultValues: {
      materialQuotes: [
        {
          item: '',
          description: '',
          quantity: '1',
          cost: '',
          price: '',
          total: '',
          margin: '',
          uom: '',
          lineType: '',
          notes: ''
        }
      ]
    },
    shouldUnregister: false, // Prevent unregistering on remove
    resolver: yupResolver(MaterialValidationSchema)
  })

  useDocumentTitle('Add Product')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Submit form data
  const handleMaterialSubmit = async data => {
    try {
      setLoading(true)
      const formData = {
        customerName: Number(data.customerName),
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        shipTo: data.shipTo,
        materialQuotes: data.materialQuotes,
        materialTotal: data.materialTotal,
        addtaxable: data.addtaxable
      }
      console.log("formData",formData)
      const res = await MaterialQuotesServices.materialAdd(formData)
      if (res.data.status === true) {
        successMessage({ description: res.data.message })
        router.push('/dashboard/product/material-quotes')
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <LayoutHeader pageTitle={'Add Material'} />
        <Button
          className='site-button'
          onClick={() => router.push('/dashboard/product/material-quotes')}
        >
          Material List
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleMaterialSubmit)}>
          <div className='space-y-4'>
            <AddFields form={form} />
          </div>

          <div className='mt-5 flex justify-end'>
            {loading ? (
              <Button className='h-10 w-40'>
                <Spinner size='sm' className='m-auto bg-black dark:bg-white' />
              </Button>
            ) : (
              <Button type='submit' className='site-button'>
                Submit
              </Button>
            )}
          </div>
        </form>
      </Form>
    </>
  )
}

export default AddMaterial
