'use client'

import { Send } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { FormProvider, useForm } from 'react-hook-form'
import { errorMessage, successMessage } from '../ToasterMessage'
import LeadsServices from '../../services/leads-api'
import FormTextArea from '../share/form/TextArea'
import { Button } from '../ui/button'

const Notes = ({ moduleId, getNotesApi }) => {
  const form = useForm({
    defaultValues: {
      description: ''
    }
  })
  const { data: session } = useSession()
  const userId = session?.user?.id
  const onSubmitNotes = async data => {
    const formData = new FormData()
    formData.append('notes', data.description || '')
    formData.append('lead_id', moduleId || '')
    try {
      const response = await LeadsServices.Notes(formData)
      if (response?.status === 200) {
        successMessage({
          description: response?.data?.message
        })
        form.reset()
        getNotesApi()
      }
    } catch (error) {
      console.log('errorerrorerror', error)
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }
  const errorMessages = form?.formState?.errors?.description
  return (
    <>
      <FormProvider {...form}>
        <form
          className='w-full pt-3'
          onSubmit={form.handleSubmit(onSubmitNotes)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
            }
          }}
        >
          {errorMessages ? (
            <div className='note-error relative grid grid-cols-1 items-center justify-center'>
              <FormTextArea
                className='rounded-6 !h-12 !max-h-28 !min-h-12 w-full bg-white !pr-7 pt-3 !shadow-[0_0_15px_-13px_black] shadow-slate-100'
                form={form}
                name='description'
                label='Notes'
                placeholder='Enter Notes'
                type='text'
              />
              <Button className='text-light-color absolute right-2 top-10 h-8 w-8 rounded-full'>
                <Send />
              </Button>
            </div>
          ) : (
            <div className='relative grid grid-cols-1 items-center justify-center'>
              <FormTextArea
                className='rounded-6 !h-12 !max-h-28 !min-h-12 w-full bg-white !pr-7 pt-3 !shadow-[0_0_15px_-13px_black] shadow-slate-100'
                form={form}
                name='description'
                label='Notes'
                placeholder='Enter Notes'
                type='text'
              />
              <Button className='text-white absolute right-2 top-10 h-8 w-8 rounded-full'>
                <Send />
              </Button>
            </div>
          )}
        </form>
      </FormProvider>
    </>
  )
}

export default Notes
