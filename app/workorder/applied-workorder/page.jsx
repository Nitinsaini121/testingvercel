'use client'
import AddAppliedForm from '@/components/applied-workOrder/add-form'
import { AppliedWorkValidationSchema } from '@/components/form-validations/applied-workOrder-validation'
import LayoutHeader from '@/components/layoutHeader'
import AppliedWorkOrderServices from '@/components/services/applied-workapi'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'

const AddAppliedWorkOrder = () => {
  const searchParams = useSearchParams()
  const WorkOrderId = searchParams.get('workorderId')
  const { data } = useSession()
  const form = useForm({
    defaultValues: {
      workOrderId: WorkOrderId,
      contractorId: data?.user?.id,
      description: '',
      image: '',
      projectName: '',
      projectLocation: '',
      bidDate: '',
      labourCost: '',
      totalEstimatedCost: '',
      startDate: '',
      completionDate: ''
    },
    resolver: yupResolver(AppliedWorkValidationSchema)
  })

  useDocumentTitle('Add Applied Work Order')
  const router = useRouter()

  // add inventory
  const handleAddSubmit = async data => {

    const formData = new FormData()

    // Append workOrderId and contractorId
    formData.append('workOrderId', data.workOrderId)
    formData.append('contractorId', data.contractorId)
    // formData.append('description', data.description)
    // formData.append('image', data.image)
    // formData.append('projectName', data.projectName)
    // formData.append('bidDate', data.bidDate)
    // formData.append('labourCost', data.labourCost)
    // formData.append('totalEstimatedCost', data.totalEstimatedCost)
    // formData.append('startDate', data.startDate)
    // formData.append('completionDate', data.completionDate)

    // Handle image upload
    // const file = data.image?.[0]
    // if (file && file instanceof File) {
    //   formData.append('image', file)
    // }

    try {
      const response =
        await AppliedWorkOrderServices.addApplyWorkOrder(data)
      if (response?.status === 200) {
        router.push('/workorder/applied-workorder/list')
        successMessage({ description: response?.data?.message })
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
      <div className='container mx-auto mt-10'>
        <div className='flex items-center justify-between'>
          <LayoutHeader className='text-center' pageTitle='Apply for Bid ' />
          <Button
            type='button'
            className='site-button my-3'
            onClick={() => router.push('/workorder/applied-workorder/list')}
          >
            All Applied
          </Button>
        </div>
        <div className='rounded-xl border p-4'>
          <FormProvider {...form}>
            <form className='' onSubmit={form.handleSubmit(handleAddSubmit)}>
              <AddAppliedForm form={form} WorkOrderId={WorkOrderId} />
              <div className='add-button flex justify-end'>
                <Button type='submit' className='site-button mt-5'>
                  Submit
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  )
}

export default AddAppliedWorkOrder
