'use client'
import LayoutHeader from '@/components/layoutHeader'
import AddManufacturerForm from '@/components/manufacturer/addManufacturer-Form'
import ManufacturerService from '@/components/services/manufacturer'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Spinner } from '@/components/ui/spinner'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const EditManufacturer = () => {
  useDocumentTitle('Edit Manufacturer')
  const form = useForm()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [editData, setEditData] = useState()

  const searchParams = useSearchParams()
  const editId = searchParams.get('editId')

  // Fetch data when editId is available
  useEffect(() => {
    const fetchData = async () => {
      if (editId) {
        try {
          const res = await ManufacturerService.getManufacturerById(editId)
          if (res?.status === 200) {
            setEditData(res.data?.data)
            form.reset({
              ...res.data?.data,
              slug: res.data?.data?.slug || '',
              status: res.data?.data?.status || '',
              title: res.data?.data?.title || '',
              image: res.data?.data?.image || ''
            })
            // router.push('/dashboard/manufacturer/list')
          }
        } catch (error) {
          errorMessage({
            description: error?.response?.data?.message
          })
        }
      }
    }

    fetchData()
  }, [editId, form])

  // ✅ Update slug based on title changes
  const title = form.watch('title')

  useEffect(() => {
    if (title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphen
        .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
      form.setValue('slug', generatedSlug)
    }
  }, [title, form])

  const onSubmitManufacturer = async data => {
    try {
      setLoading(true)

      //  Handle image upload
      let imageUrl = editData?.image
      if (data.image && data.image.length > 0) {
        const file = data.image[0]
        imageUrl = URL.createObjectURL(file)
      }

      const updatedData = {
        ...data,
        image: imageUrl
      }

      //  Pass editId and updatedData
      const response = await ManufacturerService.updateContractor(
        editId,
        updatedData
      )
      if (response?.status === 200) {
        router.push('/dashboard/manufacturer/list')
        successMessage({ description: response?.data.message })
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
    <div className='main-form'>
      <div className='mb-3 flex items-center justify-between'>
        <LayoutHeader pageTitle={'All Manufacturer'} />
        <Button
          className='site-button'
          onClick={() => router.push(`/dashboard/manufacturer/list`)}
        >
          All Manufacturer
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitManufacturer)}
          onKeyDown={e => {
            if (e.key === 'Enter') e.preventDefault()
          }}
        >
          <AddManufacturerForm form={form} />

          <div className='mt-5 flex justify-end'>
            {loading ? (
              <Button className='h-10 w-40'>
                <Spinner size='sm' className='m-auto bg-black dark:bg-white' />
              </Button>
            ) : (
              <Button type='submit' className='site-button'>
                Update
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  )
}

export default EditManufacturer
