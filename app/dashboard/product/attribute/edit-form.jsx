'use client'
import AttributeServices from '@/components/services/attribute-api'
import FormInputField from '@/components/share/form/FormInputField'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const EditAttributeForm = ({ open, setOpen, data, getAllAttributes }) => {
  const form = useForm({
    defaultValues: {
      id: data?.id || '',
      name: data?.name || '',
      slug: data?.slug || ''
    }
  })

  useEffect(() => {
    form.reset(data)
  }, [data, form])

  const handleSubmit = async values => {
    try {
      const response = await AttributeServices.updateAttributesById(
        data.id,
        values
      )
      if (response?.status === 200) {
        getAllAttributes() // Refresh the table data
        successMessage({ description: response.data.message })
      }
      setOpen(false)
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }

  const name = form.watch('name')

  useEffect(() => {
    if (name) {
      const generatedSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
      form.setValue('slug', generatedSlug)
    }
  }, [name, form])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Attribute</DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-4'
          >
            <FormInputField
              form={form}
              name='name'
              label='Name'
              placeholder='Enter name'
            />
            <FormInputField
              form={form}
              name='slug'
              label='Slug'
              placeholder='Enter slug'
              disabled
            />
            <div className='flex justify-end gap-2'>
              <Button
                type='button'
                variant='outline'
                className='site-button bg-red'
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button className='site-button' type='submit'>
                Save Changes
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}

export default EditAttributeForm
