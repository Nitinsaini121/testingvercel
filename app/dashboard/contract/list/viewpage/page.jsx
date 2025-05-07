'use client'
import LayoutHeader from '@/components/layoutHeader'
import SubContractorService from '@/components/services/subContractor'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { DashboardContractorTabs } from '@/components/viewpages/dashboard-contractor-tabs'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const ContractorDashboard = () => {
  useDocumentTitle('Subcontractor Leads Dashboard')
  const [editData, setEditData] = useState(null)
  const searchParams = useSearchParams()
  const router = useRouter()
  const editId = searchParams.get('id')
  const form = useForm({})

  const fetchContractById = async () => {
    try {
      const response = await SubContractorService.getContractById(editId)
      const contractData = response.data.data
      setEditData(response.data.data)
      if (!contractData) {
        throw new Error('No contract found with the provided ID.')
      }
      form.reset({
        ...contractData,
        contractorRegion:
          typeof contractData.contractorRegion === 'string'
            ? contractData.contractorRegion.split(',')
            : contractData.contractorRegion || [],
        gafCertifications:
          typeof contractData.gafCertifications === 'string'
            ? contractData.gafCertifications.split(',')
            : contractData.gafCertifications || [],
        certineedCertifications:
          typeof contractData.certineedCertifications === 'string'
            ? contractData.certineedCertifications.split(',')
            : contractData.certineedCertifications || [],
        owensCoringCertifications:
          typeof contractData.owensCoringCertifications === 'string'
            ? contractData.owensCoringCertifications.split(',')
            : contractData.owensCoringCertifications || []
      })
    } catch (error) {
      console.error('Error fetching contract:', error)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch contract details.'
      })
      router.replace('/dashboard/contract')
    }
  }

  // Fetch contractor data when editId is available
  useEffect(() => {
    if (editId) {
      fetchContractById()
    }
  }, [editId])

  return (
    <>
      <LayoutHeader
        pageTitle={`Sub Contractor Lead Dashboard (SC #${editId} - ${editData?.contractorName})`}
      />
      <DashboardContractorTabs
        editData={editData}
        editId={editId}
        fetchContractById={fetchContractById}
      />
    </>
  )
}

export default ContractorDashboard
