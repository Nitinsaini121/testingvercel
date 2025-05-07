'use client'
import LayoutHeader from '@/components/layoutHeader'
import FormInputField from '@/components/share/form/FormInputField'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Spinner } from '@/components/ui/spinner'
import api from '@/lib/api'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
const EditContractorRegion = () => {
  const searchParams = useSearchParams()
  const editId = searchParams.get('editId')
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const [editData, setEditData] = useState(null)

  const form = useForm()

  // Fetch contract data only if editId is valid
  useEffect(() => {
    if (!editId) return

    const fetchContractById = async () => {
      setLoading(true) // Set loading to true before API call
      try {
        const getContractRegion = await api.get(
          `workOrder/getWorkCategoryById?categoryId=${editId}`
        )
        if (getContractRegion?.status === 200) {
          if (!getContractRegion.data.data) {
            throw new Error('No contract found with the provided ID.')
          }

          setEditData(getContractRegion.data.data)
          form.reset({
            category: getContractRegion.data.data.category
          })
        }
      } catch (error) {
        errorMessage({
          description: error?.response?.data?.message
        })
      } finally {
        setLoading(false) // Reset loading state after API call
      }
    }

    fetchContractById()
  }, [editId]) // Run effect only when `editId` changes

  const onSubmitCatogries = async (data: any) => {
    setLoading(true) // Set loading to true when submitting
    const newData = {
      category: data.category
    }

    try {
      const response = await api.put(
        `/workOrder/updateWorkCategory?categoryId=${editId}`,
        newData
      )
      if (response?.status === 200) {
        successMessage({ description: response?.data?.message })
        router.replace('/dashboard/setting/work-order-categories')
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    } finally {
      setLoading(false) // Reset loading state after submission
    }
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <LayoutHeader pageTitle='Edit Work Order Catogries' />
        <Button
          className='site-button'
          onClick={() => router.push(`/dashboard/setting/work-order-catogries`)}
        >
          All Work Order Catogries
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitCatogries)} className=''>
          <FormInputField
            form={form}
            name='category'
            label='Catogrie Name'
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
                Update
              </Button>
            )}
          </div>
        </form>
      </Form>
    </>
  )
}
export default EditContractorRegion
