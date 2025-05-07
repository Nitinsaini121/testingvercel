'use client'
import { AllWorkOrderCatogriesValidation } from '@/components/form-validations/AllWorkOrderCatogriesValidation'
import LayoutHeader from '@/components/layoutHeader'
import FormInputField from '@/components/share/form/FormInputField'
import { successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Spinner } from '@/components/ui/spinner'
import { toast } from '@/hooks/use-toast'
import api from '@/lib/api'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
const ManageRegion = () => {
  const [loading, setLoading] = useState(false)
  const form = useForm({
    resolver: yupResolver(AllWorkOrderCatogriesValidation)
  })
  const router = useRouter()

  const onSubmitCatogries = async data => {
    const newData = {
      category: data.category
    }
    try {
      const response = await api.post(`workOrder/addWorkCategory`, newData)
      if (response?.status === 200) {
        successMessage({ description: response?.data?.message })
        router.replace('/dashboard/setting/work-order-categories')
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: err.message
        })
      }
    }
    setLoading(true)
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <LayoutHeader pageTitle='Add Work Order Categories' />
        <Button
          className='site-button'
          onClick={() => router.push(`/dashboard/setting/work-order-categories`)}
        >
          All Work Order Categories
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitCatogries)} className=''>
          <FormInputField
            form={form}
            name='category'
            label='Category Name'
            placeholder='Enter Catogrie Name'
            type=''
          />

          <div className='mt-5 flex justify-end'>
            {loading ? (
              <Button>
                <Spinner size='lg' className='m-auto bg-black dark:bg-white' />
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

export default ManageRegion
