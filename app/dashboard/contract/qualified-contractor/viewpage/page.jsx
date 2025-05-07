'use client'
import LayoutHeader from '@/components/layoutHeader'
import SubContractorService from '@/components/services/subContractor'
import { Spinner } from '@/components/ui/spinner'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { QualifiedContractorTabs } from '@/components/viewpages/dashboard-qualified-contractor-tab'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const QualifiedContractorDashboard = () => {
  useDocumentTitle('Qualified Subcontractor  Dashboard')
  const [editData, setEditData] = useState(null)
  const searchParams = useSearchParams()
  const router = useRouter()
  const ContractorId = searchParams.get('id')
  const form = useForm({})
  const [loading, setLoading] = useState(true)

  const fetchContractById = async () => {
    try {
      setLoading(true)
      const response = await SubContractorService.getContractById(ContractorId)
      const contractData = response.data.data
      console.log('contractData', contractData)
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
    } finally {
      setLoading(false)
    }
  }

  // Fetch contractor data when editId is available
  useEffect(() => {
    if (ContractorId) {
      fetchContractById()
    }
  }, [ContractorId])

  return (
    <>
      <LayoutHeader
        pageTitle={
          loading ? (
            <div className='flex items-center gap-2'>
              Qualified Sub Contractor Dashboard (SC #{ContractorId} -
              <Spinner className='h-5 w-5 bg-black text-muted-foreground' />)
            </div>
          ) : (
            `Qualified Sub Contractor Dashboard (SC #${ContractorId} - ${editData?.contractorName}`
          )
        }
      />
      <QualifiedContractorTabs editData={editData} editId={ContractorId} />
    </>
  )
}

export default QualifiedContractorDashboard
