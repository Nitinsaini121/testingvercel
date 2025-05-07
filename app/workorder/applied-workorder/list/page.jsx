'use client'
import DialogBox from '@/components/DialogBox'
import LayoutHeader from '@/components/layoutHeader'
import AppliedWorkOrderServices from '@/components/services/applied-workapi'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner' // Import ShadCN Spinner
import { MapPin, Pencil, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const dummyData = [
  {
    workOrderId: '73',
    contractorId: '246',
    description:
      'Dolor rem quia ullam Dolor rem quia ullam Dolor rem quia ullam Dolor rem quia ullam',
    projectName: 'Lorem Lorem',
    projectLocation: 'Minima vero sint eu',
    bidDate: '2025-04-08T18:30:00.000Z',
    labourCost: '100',
    totalEstimatedCost: '1078',
    startDate: '2025-04-16T18:30:00.000Z',
    completionDate: '2025-04-16T18:30:00.000Z'
  },
  {
    workOrderId: '73',
    contractorId: '246',
    description: 'Veniam ipsa verita Veniam ipsa verita Veniam ipsa verita',
    projectName: 'Sasha Mullins',
    projectLocation: 'Minima vero sint eu',
    bidDate: '2025-04-08T18:30:00.000Z',
    labourCost: '800',
    totalEstimatedCost: '1500',
    startDate: '2025-04-16T18:30:00.000Z',
    completionDate: '2025-04-16T18:30:00.000Z'
  }
]
const AppliedBid = () => {
  const [appliedWorkOrder, setAppliedWorkOrder] = useState([])
  const [loading, setLoading] = useState(true) // Added loading state
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const router = useRouter()

  // Fetch all applied work orders
  const allApplyWorkOrder = async () => {
    try {
      setLoading(true) // Start loading
      const response = await AppliedWorkOrderServices.getAllApplyWorkOrder()
      if (response?.status) {
        setAppliedWorkOrder(response?.data?.data?.applyWorkOrders || [])
        // setAppliedWorkOrder(dummyData || [])
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    } finally {
      setLoading(false) // Stop loading
    }
  }

  useEffect(() => {
    allApplyWorkOrder()
  }, [])

  // Delete handler
  const onDelete = async () => {
    if (deleteIndex !== null) {
      try {
        const res =
          await AppliedWorkOrderServices.deleteApplyWorkOrderById(deleteIndex)
        setDeleteOpenModal(false)
        if (res?.status === 200) {
          successMessage({ description: res?.data?.message })
          allApplyWorkOrder()
        }
      } catch (error) {
        errorMessage({ description: error?.response?.data?.message })
      }
    }
  }

  const handleDelete = id => {
    setDeleteOpenModal(true)
    setDeleteIndex(id)
  }

  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false)
  }

  const handleEdit = id => {
    router.push(`/workorder/applied-workorder/edit?editId=${id}`)
  }

  return (
    <div className='container mx-auto mt-10'>
      <div className='flex items-center justify-between'>
        <LayoutHeader pageTitle='My Bids' />
      </div>

      <div className='container mx-auto'>
        {loading ? (
          // Show Spinner while loading
          <div className='flex rounded-sm p-4 items-center justify-center border '>
            <Spinner size='md' className='bg-black dark:bg-white' />
          </div>
        ) : (
          <>
            {appliedWorkOrder.length > 0 ? (
              appliedWorkOrder.map(item => (
                <Card className='m-4 border' key={item.id}>
                  <CardHeader>
                    <div className='flex items-center justify-between'>
                      <div className=''>
                        <CardDescription className='text-xl font-semibold text-black'>
                          {item?.projectName}
                        </CardDescription>
                        <div className='mt-5 flex items-center gap-10'>
                          <div className='flex'>
                            <MapPin />
                            <p>{item.projectLocation}</p>
                          </div>
                          <div className='flex items-center gap-2'>
                            <CardTitle>Bid Date:</CardTitle>
                            {new Date(item.bidDate).toLocaleDateString()}{' '}
                          </div>
                        </div>
                        <CardDescription className='mt-5'>
                          {item?.description?.replace(/<[^>]*>/g, '') ||
                            'No description provided'}
                        </CardDescription>
                      </div>

                      <div>
                        <Button
                          onClick={() => handleEdit(item.id)}
                          className='mr-2 h-10 w-10 rounded-full'
                        >
                          <Pencil />
                        </Button>

                        <Button
                          onClick={() => handleDelete(item.id)}
                          className='mr-2 h-10 w-10 rounded-full'
                        >
                          <Trash />
                        </Button>
                      </div>
                    </div>
                    <div className='!mt-5 flex items-center gap-4'>
                      <CardTitle>Pricing</CardTitle>
                      <div className='rounded-md border bg-yellow-100 p-2'>
                        Labour Cost: ${item.labourCost}
                      </div>
                      <div className='rounded-md border bg-yellow-100 p-2'>
                        Total Estimated Cost: ${item.totalEstimatedCost}
                      </div>
                      <div className='flex items-center gap-6 rounded border p-2'>
                        <div className='flex items-center gap-2'>
                        <CardTitle>Schedule Start date: </CardTitle>{' '}
                        {new Date(item.startDate).toLocaleDateString()}{' '}
                        </div>
                        <div className='flex items-center gap-2'>
                        <CardTitle> Completion Date: </CardTitle>
                        {new Date(item.completionDate).toLocaleDateString()}
                      </div>
                        </div>
                    </div>
                  </CardHeader>
                  <Separator />
                </Card>
              ))
            ) : (
              <div className='text-center border rounded-sm p-4'>No Data found</div>
            )}
          </>
        )}
      </div>
      <DialogBox
        onDelete={onDelete}
        description='Are you certain you want to proceed with this deletion?'
        deleteOpenModal={deleteOpenModal}
        deleteHandleModalClose={deleteHandleModalClose}
      />
    </div>
  )
}

export default AppliedBid
