'use client'
import { ManufacturerValidation } from '@/components/form-validations/manufactureValidation'
import LayoutHeader from '@/components/layoutHeader'
import AddManufacturerForm from '@/components/manufacturer/addManufacturer-Form'
import ManufacturerService from '@/components/services/manufacturer'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Spinner } from '@/components/ui/spinner'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const AddManufacturer = () => {
  const router = useRouter()
  useDocumentTitle('Add Manufacturer')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState([])

  const form = useForm({
    defaultValues: {
      image: '',
      slug: '',
      status: '',
      title: ''
    },
    resolver: yupResolver(ManufacturerValidation)
  })
  const title = form.watch('title')

  useEffect(() => {
    if (title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
      form.setValue('slug', generatedSlug)
    }
  }, [title, form])

  // submit manufacturer form
  const onSubmitManufacturer = async data => {
    // setLoading(true)
    try {
      const formData = new FormData()

      // Append the file if present
      const file = data.image?.[0] // Assuming data.logo is a FileList or array
      if (file) {
        formData.append('image', file)
      }

      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'image') {
          if (Array.isArray(value)) {
            formData.append(key, value.join(',')) // Convert array to comma-separated string
          } else {
            formData.append(key, String(value)) // Ensure it's a string
          }
        }
      })
      const res = await ManufacturerService.addManufacturer(formData)
      if (res?.status === 200) {
        router.push('/dashboard/manufacturer/list')
        successMessage({
          description: res?.data?.message
        })
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    }
    setLoading(false)
    form.reset()
  }

  return (
    <>
      <div className=''>
      <div className='mb-3 flex items-center justify-between'>
      <LayoutHeader pageTitle={'Add Manufacturer'} />
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
              if (e.key === 'Enter') {
                e.preventDefault()
              }
            }}
          >
            <AddManufacturerForm form={form} />

            <div className='mt-5 flex justify-end'>
              {loading ? (
                <Button className='h-10 w-40'>
                  <Spinner
                    size='sm'
                    className='m-auto bg-black dark:bg-white'
                  />
                </Button>
              ) : (
                <Button type='submit' className='site-button'>
                  Submit
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}

export default AddManufacturer
