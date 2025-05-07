'use client'
import LayoutHeader from '@/components/layoutHeader'
import LeadServices from '@/components/services/lead-api'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Spinner } from '@/components/ui/spinner'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { DashboardLeadTabs } from '@/components/viewpages/dashboard-lead-tabs'
import api from '@/lib/api'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
// import { useForm } from 'react-hook-form'
// import toast from 'react-hot-toast'

const LeadDashboard = () => {
  useDocumentTitle('View Lead Dashboard')
  const searchParams = useSearchParams()
  const router = useRouter()
  const editId = searchParams.get('id')

  const [leadData, setLeadData] = useState([])
  const [loading, setLoading] = useState(true)
  // const form = useForm({})
  const fetchLeadById = async () => {
    try {
      setLoading(true)
      const response = await LeadServices.getLeadById(editId)
      if (response.status === 200) {
        if (response?.data?.status === true) {
          setLeadData(response.data.data)
          // successMessage({ description: response?.data?.message })
        } else {
          errorMessage({ description: response?.data?.message })
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        errorMessage({
          description: err?.response?.data?.message || err?.message
        })
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (editId) {
      fetchLeadById()
    }
  }, [editId])

  return (
    <>
      <LayoutHeader
        pageTitle={
          loading ? (
            <div className='flex items-center gap-2'>
              Lead Dashboard (Lead #{editId} -
              <Spinner className='h-5 w-5 bg-black text-muted-foreground' />)
            </div>
          ) : (
            `Lead Dashboard (Lead #${editId} - ${leadData?.firstName})`
          )
        }
      />

      <DashboardLeadTabs editData={leadData} editId={editId} />
    </>
  )
}

export default LeadDashboard
