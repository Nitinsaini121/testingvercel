'use client'
import DialogBox from '@/components/DialogBox'
import LayoutHeader from '@/components/layoutHeader'
import InventoryService from '@/components/services/inventory-api'
import { Button } from '@/components/ui/button'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { errorMessage, successMessage } from '@/components/ToasterMessage'

import { DataTable } from '@/components/Table'
import { columnsInventory } from './InventoryColumns'

const AllInventory = () => {
  useDocumentTitle('All Inventory')
  const router = useRouter()
  const [getList, setList] = useState([])
  const [page, setPage] = useState(1)
  const [totalRecord, setTotalRecord] = useState()
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [loading, setLoading] = useState(true)

  const [deleteIndex, setDeleteIndex] = useState(null)
  const length = 10

  const getListInventory = async () => {
    try {
      setLoading(true)
      const res = await InventoryService.listInventory(page, length)
      if (res?.status === 200) {
        setList(res.data.data.inventories)
        setTotalRecord(res.data.data.totalUsers)
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
    getListInventory()
  }, [page, length])

  // delete table row
  const onDelete = async () => {
    if (deleteIndex !== null) {
      try {
        const res = await InventoryService.deleteInventory(deleteIndex)
        setDeleteOpenModal(false)
        if (res?.status === 200) {
          getListInventory()
          successMessage({ description: responseEdit?.data?.message })
        }
      } catch (error) {
        errorMessage({
          description: error?.response?.data?.message
        })
      }
    }
  }
  const handleDeleteInventory = row => {
    setDeleteOpenModal(true)
    setDeleteIndex(row?.original?.id)
  }
  // edit table row
  const handleEditInventory = row => {
    router.push(`/dashboard//product/inventory/edit?editId=${row.original.id}`)
  }
  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false)
  }
  return (
    <>
      <div className='mb-3 flex items-center justify-between'>
        <LayoutHeader pageTitle='All Inventory' />
        <Button
          className='site-button'
          onClick={() => router.push(`/dashboard/product/inventory/add`)}
        >
          <Plus />
          Add Inventory
        </Button>
      </div>
      <DataTable
        data={getList}
        loading={loading}
        columns={columnsInventory(handleDeleteInventory, handleEditInventory)}
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

export default AllInventory
