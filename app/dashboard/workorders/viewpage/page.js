'use client'
import LayoutHeader from '@/components/layoutHeader'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { DashboardWorkOrderTabs } from '@/components/viewpages/dashboard-workorder-tabs'
import api from '@/lib/api'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
// import { useForm } from 'react-hook-form'
// import toast from 'react-hot-toast'

const WorkOrderDashboard = () => {
  useDocumentTitle('View Work Order Dashboard')
  const searchParams = useSearchParams()
  const router = useRouter()
  const workOrderId = searchParams.get('id')

  const [workOrder, setWorkOrder] = useState([])
  // const form = useForm({})
  const fetchWorkOrderById = async () => {
    try {
      const getWorkOrder = await api.get(`/workOrder/getWorkOrderById?workOrderId=${workOrderId}`)
      setWorkOrder(getWorkOrder.data.data)
    } catch (err) {
      console.error('Fetch Error:', err)
    }
  }

  useEffect(() => {
    if (workOrderId) {
        fetchWorkOrderById()
    }
  }, [workOrderId])
  return (
    <>
      <LayoutHeader
        pageTitle={`Work Order Dashboard (WO #${workOrderId})`}
      />
      <DashboardWorkOrderTabs workOrderData={workOrder} workOrderId={workOrderId} />
    </>
  )
}

export default WorkOrderDashboard
