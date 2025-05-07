'use client'
import DialogBox from '@/components/DialogBox'
import LayoutHeader from '@/components/layoutHeader'
import LeadServices from '@/components/services/lead-api'
import FormInputField from '@/components/share/form/FormInputField'
import { DataTable } from '@/components/Table'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { columns } from './leads-columns'
const Page = () => {
  useDocumentTitle('All Leads')

  const formMethods = useForm({
    defaultValues: { search: '' }
  })

  const { watch } = formMethods
  const [loading, setLoading] = useState(true) // Loading state
  const searchTerm = watch('search')
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const [leadsList, setLeadList] = useState([])
  const [page, setPage] = useState(1)
  const [totalRecord, setTotalRecord] = useState()
  const length = 10

  const fetchLeadsData = async () => {
    setLoading(true) // Start loading
    try {
      const response = await LeadServices.getAllLeads(page, length)
      if (response.status === 200) {
        if (response?.data?.status === true) {
          setLeadList(response.data.data.leads)
          setTotalRecord(response?.data?.data.totalLeads)
          successMessage({ description: response?.data?.message })
        } else {
          errorMessage({ description: response?.data?.message })
        }
      }
    } catch (error) {
      if (error) {
        errorMessage({
          description: error?.response?.data?.message || error?.message
        })
      }
    } finally {
      setLoading(false) // Stop loading
    }
  }
  useEffect(() => {
    fetchLeadsData()
  }, [page])
  const router = useRouter()

  const onDelete = async () => {
    if (deleteIndex !== null) {
      try {
        const response = await LeadServices.leadDelete(deleteIndex)
        setDeleteOpenModal(false)
        if (response.status === 200) {
          if (response?.data?.status === true) {
            fetchLeadsData()
            successMessage({ description: response?.data?.message })
          } else {
            errorMessage({ description: response?.data?.message })
          }
        }
      } catch (error) {
        if (error) {
          errorMessage({
            description: error?.response?.data?.message || error?.message
          })
        }
      }
    }
  }

  const filteredData = leadsList?.filter(contract =>
    Object.values(contract).some(
      value =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const handleDeleteLead = row => {
    setDeleteIndex(row.original.id)
    setDeleteOpenModal(true)
  }

  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false)
  }

  const handleEditLead = row => {
    router.push(`/dashboard/leads/list/edit?editId=${row.original.id}`)
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <LayoutHeader pageTitle='All Leads' />
        <Button
          className='site-button'
          onClick={() => router.push(`/dashboard/leads/add`)}
        >
          <Plus />
          Add New Lead
        </Button>
      </div>
      <div className='mx-auto w-full'>
        {/* Search Filter */}
        <FormProvider {...formMethods}>
          <form className='mb-4'>
            <FormInputField
              className='border-color-grey w-80 rounded border !shadow-none'
              name='search'
              form={formMethods}
              placeholder='Search...'
              label='Search'
              type='text'
            />
          </form>
        </FormProvider>
        <DataTable
          loading={loading}
          data={filteredData}
          columns={columns(handleDeleteLead, handleEditLead, router)}
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
    </>
  )
}

export default Page
