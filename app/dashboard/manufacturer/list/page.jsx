'use client'
import DialogBox from '@/components/DialogBox'
import LayoutHeader from '@/components/layoutHeader'
import ManufacturerService from '@/components/services/manufacturer'
import { DataTable } from '@/components/Table'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { columns } from '../contract-columns'

const AllManufacturer = () => {
  useDocumentTitle('All Manufacturer')
  const router = useRouter()
  const [getList, setList] = useState([])
  const [page, setPage] = useState(1)
  const [totalRecord, setTotalRecord] = useState()
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const length = 10

  const getListManufacturer = async () => {
    try {
      const res = await ManufacturerService.listManufacturer(page, length)
      if (res?.status == 200) {
        setList(res?.data?.data?.manufacturer)
        setTotalRecord(res?.data?.data?.totalRecords)
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }

  useEffect(() => {
    getListManufacturer()
  }, [page, length])

  // delete table row
  const onDelete = async () => {
    if (deleteIndex !== null) {
      try {
        const res = await ManufacturerService.deleteManufacturer(deleteIndex)
        setDeleteOpenModal(false)
        if (res?.status == 200) {
          getListManufacturer()
          successMessage({
            description: res?.data?.message
          })
        }
      } catch (error) {
        errorMessage({
          description: error?.response?.data?.message
        })
      }
    }
  }
  const handleDeleteManufacturer = row => {
    setDeleteOpenModal(true)
    setDeleteIndex(row?.original?.id)
  }
  // edit table row
  const handleEditManufacturer = row => {
    router.push(`/dashboard/manufacturer/edit?editId=${row.original.id}`)
  }
  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false)
  }
  return (
    <>
      <div className='mb-3 flex items-center justify-between'>
        <LayoutHeader pageTitle='All Manufacturer' />
        <Button
          className='site-button'
          onClick={() => router.push(`/dashboard/manufacturer/add`)}
        >
          <Plus />
          Add Manufacturer
        </Button>
      </div>
      <DataTable
        data={getList}
        columns={columns(handleDeleteManufacturer, handleEditManufacturer)}
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
    </>
  )
}

export default AllManufacturer
