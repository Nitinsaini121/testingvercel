'use client'

import api from '@/lib/api'
import { Download } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import FormInputField from './share/form/FormInputField'
import RadioButton from './share/form/RadioButton'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from './ui/dialog'
import { Form } from './ui/form'

// Define the form data structure
interface FormData {
  status: string
  notes?: string
}

// Define the prop types
interface DocumentViewPopOverProps {
  description?: string
  onDocumentViewPopOver: () => void
  onClose: () => void
  isOpen: boolean
  documentTypeData: string
  popOverData: any
  editId: any
  setModalOpen: any
  fetchDocumentView: any
}

const DocumentViewPopOver: React.FC<DocumentViewPopOverProps> = ({
  fetchDocumentView,
  documentTypeData,
  popOverData,
  editId,
  onClose,
  setModalOpen,
  isOpen
}) => {
  const [rejection, setRejection] = useState<string>('rejected')
  const form = useForm<FormData>({
    defaultValues: {
      status: 'rejected',
      notes: ''
    }
  })
  const getRejection = form.watch('status')
  useEffect(() => {
    setRejection(getRejection)
  }, [getRejection])

  const onSubmit: SubmitHandler<FormData> = async data => {
    const { status, notes } = data
    try {
      const verifyDocument = await api.put(
        `contract/updateContractorVerification?verificationId=${popOverData.id}&contactorId=${editId}&notes=${notes}&columnName=${popOverData.columnName}&status=${status}`
      )
      if (verifyDocument?.status) {
        fetchDocumentView()
        form.reset()
      }
      setModalOpen(false)
    } catch (error) {}
  }
  return (
    <>
     
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className='custom-modal !w-100 !max-w-2xl'>
            <DialogHeader className='!text-center'>
              <div className='relative flex justify-between'>
                <DialogTitle className='text-left !text-2xl'>
                  {documentTypeData}
                </DialogTitle>
                <div className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-red-500'>
                  <Download className='h-4 w-4 text-white' />
                </div>
              </div>
            </DialogHeader>
            <div className='flex justify-center rounded-lg border-2 border-dashed p-2'>
              <img src={popOverData?.file} alt='Form Preview' width='auto' />
            </div>

            {popOverData?.status === "approved" ? (
              <></>
            ) : (
              <>
                <div className='custom-radio grid grid-cols-1 gap-3'>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      <RadioButton
                        name='status'
                        form={form}
                        label=''
                        options={[
                          { label: 'Reject', value: 'rejected' },
                          { label: 'Approve', value: 'approved' }
                        ]}
                        onChange={(value: string) => setRejection(value)}
                      />

                      {rejection === 'rejected' && (
                        <FormInputField
                          name='notes'
                          form={form}
                          placeholder='Enter The Region of Rejection'
                          label='Region'
                          type='text'
                        />
                      )}

                      <DialogFooter className='!justify-end'>
                        <Button
                          onClick={onClose}
                          className='site-button-small bg-red'
                          type='button'
                        >
                          Cancel
                        </Button>
                        <Button
                          className='site-button-small'
                          type='submit'
                        >
                          Submit
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      
    </>
  )
}

export default DocumentViewPopOver

