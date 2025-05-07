'use client'
import LayoutHeader from '@/components/layoutHeader'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import useDocumentTitle from '@/components/utils/useDocumentTitle'

import AddAppliedForm from '@/components/applied-workOrder/add-form'
import { AppliedWorkValidationSchema } from '@/components/form-validations/applied-workOrder-validation'

import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import AppliedWorkOrderServices from '@/components/services/applied-workapi'

const EditAppliedWorkOrder = () => {
  const searchParams = useSearchParams()
  const editId = searchParams.get('editId')

  const { data } = useSession()
  const form = useForm({
    defaultValues: {
      //   workOrderId: WorkOrderId,
      contractorId: data?.user?.id,
      description: '',
      image: ''
    },
    resolver: yupResolver(AppliedWorkValidationSchema)
  })

  useDocumentTitle('Edit Applied Work Order')
  const router = useRouter()

  // Fetch the applied work order by Id To update the Id
  const getApplyWorkOrderById = async () => {
    try {
      const response =
        await AppliedWorkOrderServices.getApplyWorkOrderById(editId)
      if (response?.status === 200) {
        form.reset(response?.data?.data)
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }

  useEffect(() => {
    if (editId) {
      getApplyWorkOrderById()
    }
  }, [editId])

  const handleEditSubmit = async data => {

    const formData = new FormData()

    // Append workOrderId and contractorId
    // formData.append('workOrderId', data.workOrderId)
    // formData.append('contractorId', data.contractorId)
    // formData.append('description', data.description)

    // Handle image upload
    const file = data.image?.[0]
    if (file && file instanceof File) {
      formData.append('image', file)
    }

    try {
      const response = await AppliedWorkOrderServices.updateApplyWorkOrderById(
        editId,
        data
      )
      if (response?.status === 200) {
        successMessage({ description: response?.data?.message })
        router.push('/workorder/applied-workorder/list')
        form.reset()
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }

  return (
    <>
      <div className='container mx-auto'>
        <div className='flex items-center justify-between'>
          <LayoutHeader pageTitle='Edit Applied ' />
          <Button
            type='button'
            className='site-button my-3 '
            onClick={() => router.push('/workorder/applied-workorder/list')}
          >
            All Applied
          </Button>
        </div>
        <Separator />
        <div className=''>
          <FormProvider {...form}>
            <form className='' onSubmit={form.handleSubmit(handleEditSubmit)}>
              <AddAppliedForm form={form} />
              <div className='add-button flex justify-end'>
                <Button type='submit' className='mt-5 site-button'>
                  Update
                </Button>
              </div>
              {/* </div> */}
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  )
}

export default EditAppliedWorkOrder
