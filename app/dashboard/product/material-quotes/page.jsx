'use client'

import DialogBox from '@/components/DialogBox'
import LayoutHeader from '@/components/layoutHeader'
import MaterialQuotesServices from '@/components/services/material-api'
import { DataTable } from '@/components/Table'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { columnsMaterial } from './materialColumns'

const MaterialQuotes = () => {
  useDocumentTitle('Material Quotes List')
  const [list, setList] = useState([])
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [totalRecord, setTotalRecord] = useState()
  const length = 10
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const [loading, setLoading] = useState(true) // Loading state

  // Fetch and load existing data
  const fetchMaterialsList = async () => {
    setLoading(true)
    try {
      const response = await MaterialQuotesServices.getMaterialList(
        page,
        length
      )
      if (response.status === 200) {
        const materials = response.data.data.material
        setTotalRecord(response.data.data.totalRecords)
        setList(materials)
      } else {
        errorMessage({ description: 'Data Not Found' })
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
    fetchMaterialsList()
  }, [page])
  const onDelete = async () => {
    try {
      const response = await MaterialQuotesServices.deleteMaterial(deleteIndex)
      if (response.status === 200) {
        fetchMaterialsList()
        successMessage({ description: response.data.message })
      }

      setDeleteOpenModal(false)
    } catch (error) {
      errorMessage({ description: error?.response?.data?.message })
    }
  }
  const handleDeleteMaterialQuotes = async row => {
    setDeleteOpenModal(true)
    setDeleteIndex(row.original.id)
  }
  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false)
  }
  const handleEditMaterialQuotes = row => {
    router.push(
      ` /dashboard/product/material-quotes/edit?editId=${row.original.id}`
    )
  }
  return (
    <div>
      <div className='mb-5 flex items-center justify-between'>
        <LayoutHeader pageTitle='All Material Quotes' />
        <Button
          className='site-button'
          onClick={() => router.push('/dashboard/product/material-quotes/add')}
        >
          Add Material
        </Button>
      </div>

      <DataTable
        loading={loading}
        data={list}
        columns={columnsMaterial(
          handleEditMaterialQuotes,
          handleDeleteMaterialQuotes,router
        )}
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
  )
}

export default MaterialQuotes
