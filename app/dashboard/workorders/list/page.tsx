'use client'
import DialogBox from '@/components/DialogBox'
import LayoutHeader from '@/components/layoutHeader'

import { errorMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { useToast } from '@/hooks/use-toast'
import api from '@/lib/api'
import { Work } from '@/types/work-order-type'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { columns } from '../work-order-columns'
import { DataTable } from '../datatable'

export default function WorkorderList() {
  useDocumentTitle('All Work Orders')
  const { toast } = useToast() // Use ShadCN toast
  const [page, setPage] = useState<number>(1)
  const [totalRecord, setTotalRecord] = useState<number>()
  const [loading, setLoading] = useState(true)
  const length = 10

  const fetchUser = async () => {
    setLoading(true)
    try {
      const getUserList = await api.get(
        `/workOrder/getAllWorkOrder?page=${page}&length=${length}`
      )
      if (getUserList.status === 200) {
        setUserList(getUserList?.data?.data?.workOrders)
        setTotalRecord(getUserList?.data?.data?.totalRecords)
      }
    } catch (error) {
      if (error) {
        errorMessage({ description: error.response.data.message })
      }
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchUser()
  }, [page])

  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [userList, setUserList] = useState<Work[]>([])
  const [deleteIndex, setDeleteIndex] = useState<string | null>(null)

  const router = useRouter()

  const onDelete = async () => {
    try {
      if (deleteIndex) {
        const response = await api.delete(
          `workOrder/deleteWorkOrder?workOrderId=${deleteIndex}`
        )

        if (response.status === 200) {
          toast({
            title: 'User Deleted',
            description: 'Work Order has been deleted successfully.'
          })
          fetchUser()

          setDeleteOpenModal(false)
        }
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      // toast.error('Delete Failed: An error occurred while deleting the user.')
      toast({
        variant: 'destructive',
        title: 'Delete order Error',
        description: 'Failed to delete work order'
      })
    }
  }

  const handleDeleteUser = (row: { original: { id: string } }) => {
    setDeleteIndex(row.original.id)
    setDeleteOpenModal(true)
  }

  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false)
  }

  const handleEditUser = (row: { original: Work }) => {
    router.push(`/dashboard/workorders/edit/${row.original.id}`)
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <LayoutHeader pageTitle='All Work Orders' />
        <Button
          className='site-button'
          onClick={() => router.push(`/dashboard/workorders/add`)}
        >
          <Plus />
          Add Work Order
        </Button>
      </div>
      <div className='mx-auto w-full py-5'>
        <DataTable
          loading={loading}
          columns={columns}
          data={userList}
          handleDeleteUser={handleDeleteUser}
          handleEditUser={handleEditUser}
          totalRecord={totalRecord}
          page={page}
          setPage={setPage}
          length={length}
        />
        <DialogBox
          onDelete={onDelete}
          description='Are you certain you want to proceed with this deletion?'
          deleteOpenModal={deleteOpenModal}
          deleteHandleModalClose={deleteHandleModalClose}
        />
      </div>
    </>
  )
}
