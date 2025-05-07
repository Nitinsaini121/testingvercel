'use client'

import { DataTable } from '@/components/Table'
import api from '@/lib/api'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CoverColumn } from './cover-column'
import CoverPreview from './CoverPreview'

export default function BudgetCoverTab() {
  const searchParams = useSearchParams()
  const budgetId = searchParams.get('id')
  const [getList, setList] = useState([])
  const [previewData, setPreviewData] = useState(null)

  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  console.log('getListgetList', getList)
  const fetchCoverData = async () => {
    const response = await api?.get(`/projects/budget-history/${budgetId}`)
    if (response.status === 200) {
      setList(response?.data?.data)
    }
  }
  useEffect(() => {
    fetchCoverData()
  }, [])
  const handlePreviewLeads = async row => {
    const response = await api.get(
      `/projects/budget-history/details/${row?.original?.id}`
    )
    if (response.status === 200) {
      setPreviewData(response?.data?.data)
      setDeleteOpenModal(true)
    }
  }
  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false)
  }
  return (
    <>
      <DataTable data={getList} columns={CoverColumn(handlePreviewLeads)} />
      <CoverPreview
        deleteOpenModal={deleteOpenModal}
        previewData={previewData}
        deleteHandleModalClose={deleteHandleModalClose}
      />
    </>
  )
}
