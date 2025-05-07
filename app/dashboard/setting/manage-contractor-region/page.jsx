'use client'
import DialogBox from '@/components/DialogBox'
import LayoutHeader from '@/components/layoutHeader'
import { errorMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import api from '@/lib/api'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { columns } from './region-columns'
import { DataTable } from '@/components/Table'

const AllContractRegion = () => {
  const formMethods = useForm({
    defaultValues: { search: '' }
  })

  const { watch } = formMethods
  const searchTerm = watch('search')
  const [loading, setLoading] = useState  (true) // Loading state

  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState  ( null)
  const [leadsList, setLeadList] = useState([])

  const getAllContractRegion = async () => {
    setLoading(true)
    try {
      const getLeadsData = await api?.get('contract/getAllContractRegion')
      if (getLeadsData?.status === 200) {
        setLeadList(getLeadsData.data.data)
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    } finally {
      setLoading(true)
    }
  }
  useEffect(() => {
    getAllContractRegion()
  }, [])
  const router = useRouter()
  const onDelete = async () => {
    if (deleteIndex !== null) {
      try {
        const response = await api.delete(
          `contract/deleteContractRegion?regionId=${deleteIndex}`
        )
        setDeleteOpenModal(false)
        getAllContractRegion()
        if (response.status === 200) {
          toast({
            title: 'Region Deleted',
            description: 'Region has been deleted successfully.'
          })
        }
      } catch (error) {
        errorMessage({
          description: error?.response?.data?.message
        })
      }
    }
  }

  const filteredData = leadsList.filter(contract =>
    Object.values(contract).some(
      value =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const handleDeleteRegion = row => {
    setDeleteIndex(row.original.id)
    setDeleteOpenModal(true)
  }

  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false)
  }

  const handleEditRegion = row => {
    router.push(
      `/dashboard/setting/manage-contractor-region/edit?editId=${row.original.id}`
    )
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <LayoutHeader pageTitle='All Sub Contractor Region' />
        <Button
          className='site-button'
          onClick={() =>
            router.push(`/dashboard/setting/manage-contractor-region/addregion`)
          }
        >
          <Plus />
          Add Sub Contractor Region
        </Button>
      </div>
      <div className='mx-auto w-full pt-5'>
        <DataTable
          data={filteredData}
          columns={columns(handleEditRegion, handleDeleteRegion)}
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
