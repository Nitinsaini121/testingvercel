'use client'
import DialogBox from '@/components/DialogBox'
import LayoutHeader from '@/components/layoutHeader'
import { DataTable } from '@/components/Table'
import { errorMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import api from '@/lib/api'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { columns } from './catogries-columns'

const AllContractRegion = () => {
  const formMethods = useForm({
    defaultValues: { search: '' }
  })

  const { watch } = formMethods
  const searchTerm = watch('search')
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const [leadsList, setLeadList] = useState([])
  const [loading, setLoading] = useState(true) // Loading state

  const fetLeadsData = async () => {
    setLoading(true)
    try {
      const getLeadsData = await api?.get('workOrder/getAllWorkCategory')
      if (getLeadsData?.status === 200) {
        setLeadList(getLeadsData?.data?.data)
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetLeadsData()
  }, [])
  const router = useRouter()
  const onDelete = async () => {
    if (deleteIndex !== null) {
      try {
        const response = await api.delete(
          `workOrder/deleteWorkCategory?categoryId=${deleteIndex}`
        )
        setDeleteOpenModal(false)
        if (response?.status === 200) {
          fetLeadsData()
          toast({
            title: 'Work Order Category',
            description: 'Work Order Category has been deleted successfully.'
          })
        }
      } catch (error) {
        errorMessage({ description: error?.response?.data?.message })
      }
    }
  }

  const filteredData = leadsList?.filter(contract =>
    Object.values(contract).some(
      value =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const handleDeleteCatogrie = row => {
    setDeleteIndex(row.original.id)
    setDeleteOpenModal(true)
  }

  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false)
  }

  const handleEditCatogrie = row => {
    router.push(
      `/dashboard/setting/work-order-categories/edit?editId=${row?.original.id}`
    )
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <LayoutHeader pageTitle='All Work Order Categories' />
        <Button
          className='site-button'
          onClick={() =>
            router.push(`/dashboard/setting/work-order-categories/add`)
          }
        >
          <Plus />
          Add Work Order Categories 
        </Button>
      </div>
      <div className='mx-auto mt-5 w-full'>
        <DataTable
          loading={loading}
          data={filteredData}
          columns={columns(handleDeleteCatogrie, handleEditCatogrie)}
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

export default AllContractRegion
