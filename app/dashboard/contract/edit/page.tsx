'use client'
import ContractorFormFields from '@/components/contractor/ContractFormFields'
import { contractDefaultValue } from '@/components/DefaultValue/AllDefaultValues'
import LayoutHeader from '@/components/layoutHeader'
import SubContractorService from '@/components/services/subContractor'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import UserContext from '@/contexts/usercontext'
import { toast } from '@/hooks/use-toast'
import api from '@/lib/api'
// import { ContractorSchema } from '@/schemas/contractor-schema'
import { Contractor } from '@/types/contractor-type'
// import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const EditContractor = () => {
  useDocumentTitle('Edit Contractor')
  // Get the editId from the querry params
  const searchParams = useSearchParams()
  const [gafCertification, setGafCertification] = useState<string>('')
  const [certainTeedCertification, setCertainTeedCertification] =
    useState<string>('')
  const [owensCoringCertification, setOwensCoringCertification] =
    useState<string>('')
  const editId = searchParams.get('editId')
  const userContext = useContext(UserContext)
  if (!userContext) {
    throw new Error(
      'UserContext is undefined. Make sure it is wrapped in a provider.'
    )
  }

  const { setBreadCrumbsData } = userContext
  setBreadCrumbsData(editId)
  const router = useRouter()
  const [editData, setEditData] = useState<Contractor | null>(null)

  // Fetch the contract by id and set the form values
  const form = useForm<Contractor>({
    // resolver: zodResolver(ContractorSchema),
    defaultValues: contractDefaultValue
  })

  const [getRegions, setRegions] = useState<string[]>([]) // Ensure it's an array

  const fetchRegions = async () => {
    try {
      const response = await api.get(`contract/getAllContractRegion`)
      if (response.status === 200) {
        setRegions(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching regions:', error)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch contract regions.'
      })
    }
  }

  // Fetch regions when the component mounts
  useEffect(() => {
    fetchRegions()
  }, [])

  const fetchContractById = async () => {
    try {
      const response = await SubContractorService.getContractById(editId)
      if (response.status === 200) {
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
      }
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

  useEffect(() => {
    if (editData) {
      form.reset({
        ...editData,
        contractorRegion:
          typeof editData.contractorRegion === 'string'
            ? editData.contractorRegion.split(',')
            : editData.contractorRegion || [],
        gafCertifications:
          typeof editData.gafCertifications === 'string'
            ? editData.gafCertifications.split(',')
            : editData.gafCertifications || [],
        certineedCertifications:
          typeof editData.certineedCertifications === 'string'
            ? editData.certineedCertifications.split(',')
            : editData.certineedCertifications || [],
        owensCoringCertifications:
          typeof editData.owensCoringCertifications === 'string'
            ? editData.owensCoringCertifications.split(',')
            : editData.owensCoringCertifications || []
      })
      setGafCertification(editData.gafCertifications ? 'true' : 'false')
      setCertainTeedCertification(
        editData.certineedCertifications ? 'true' : 'false'
      )
      setOwensCoringCertification(
        editData.owensCoringCertifications ? 'true' : 'false'
      )
    }
  }, [editData, form])

  useEffect(() => {
    if (editId) {
      fetchContractById()
    }
  }, [editId])

  useEffect(() => {}, [editData])

  const onSubmitContractor = async (data: Contractor) => {
    const formData = new FormData()

    // Append the file if present
    const file = data.logo?.[0]
    if (file) {
      formData.append('logo', file)
    }

    // Convert arrays to comma-separated strings
    const formattedData = {
      ...data,
      gafCertifications: Array.isArray(data.gafCertifications)
        ? data.gafCertifications.join(',')
        : '',
      certineedCertifications: Array.isArray(data.certineedCertifications)
        ? data.certineedCertifications.join(',')
        : '',
      owensCoringCertifications: Array.isArray(data.owensCoringCertifications)
        ? data.owensCoringCertifications.join(',')
        : ''
    }

    Object.entries(formattedData).forEach(([key, value]) => {
      if (key !== 'logo') {
        if (Array.isArray(value)) {
          formData.append(key, value.join(',')) // Convert array to comma-separated string
        } else {
          formData.append(key, String(value)) // Ensure it's a string
        }
      }
    })
    try {
      if (editId) {
        await SubContractorService.updateContractor(editId, formData)
        toast({
          title: 'Contract Updated',
          description: 'Successfully updated.'
        })

        if (editData?.qualifiedContractors === 'true') {
          router.replace('/dashboard/contract/qualified-contractor')
        } else {
          router.replace('/dashboard/contract')
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: err.message
        })
      }
    }
  }

  return (
    <>
      <div>
        <LayoutHeader pageTitle={'Edit Sub Contractor'} />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitContractor)} className=''>
            <ContractorFormFields
              form={form}
              editData={editData}
              getRegions={getRegions}
              owensCoringCertification={owensCoringCertification}
              setOwensCoringCertification={setOwensCoringCertification}
              certainTeedCertification={certainTeedCertification}
              setCertainTeedCertification={setCertainTeedCertification}
              gafCertification={gafCertification}
              setGafCertification={setGafCertification}
            />

            <div className='mt-5 flex justify-end'>
              <Button type='submit' className='site-button'>
                Update
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}
export default EditContractor
