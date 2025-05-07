'use client'
import api from '@/lib/api'
import { Send } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { FormProvider, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { NotesValidationSchema } from '../form-validations/notes-validation'
import FormTextArea from '../share/form/TextArea'
import { errorMessage, successMessage } from '../ToasterMessage'
import { Button } from '../ui/button'

const Notes = ({ moduleId, moduleName, getNotesApi, getActivities }) => {
  const form = useForm({
    defaultValues: {
      description: ''
    },
    resolver: yupResolver(NotesValidationSchema)
  })
  const { data: session } = useSession()
  const userId = session?.user?.id
  const onSubmitNotes = async data => {
    const payload = { ...data, moduleId, moduleName, userId }

    try {
      const response = await api.post(`/notes/addNotes`, payload)
      if (response?.status === 200) {
        successMessage({
          description: response?.data?.message
        })
        form.reset()
        getActivities()
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    }
    getNotesApi()
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
              <Button className='text-light-color absolute right-2 top-10 h-8 w-8 rounded-full'>
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
