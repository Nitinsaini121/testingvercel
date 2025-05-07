'use client'

import DialogBox from '@/components/DialogBox'
import LayoutHeader from '@/components/layoutHeader'
import MergeCell from '@/components/MergeCell'
import SubContractorService from '@/components/services/subContractor'
import FormDatePickerRange from '@/components/share/form/DateRaangePicker'
import FormInputField from '@/components/share/form/FormInputField'
import FormSelectField from '@/components/share/form/FormSelect'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import UserContext from '@/contexts/usercontext'
import api from '@/lib/api'
import { Plus } from 'lucide-react'
import moment from 'moment'
import { useRouter, useSearchParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { columns } from '../contract-columns'
import { DataTable } from '../datatable'

interface SearchFormValues {
  search: string
  status: string
  datefilter: string
  region: any
  from: any
}

const SubContractorList = () => {
  useDocumentTitle('Subcontractor Leads')
  const formMethods = useForm<SearchFormValues>({
    defaultValues: { search: '', status: '', from: '' }
  })
  // Get the Parama for Filter the data
  const searchParams = useSearchParams()
  const status = searchParams.get('status')
  const dateStart = searchParams.get('startDate')
  const dateEnd = searchParams.get('endDate')
  const regionF = searchParams.get('region')
  // Watch the Form Field By using UseForm Watch Method to get the filter input
  const { watch } = formMethods
  const searchTerm = watch('search')
  const statusFilter = watch('status')
  const dateFilter = watch('datefilter')
  const region = watch('region')

  const [loading, setLoading] = useState<boolean>(true) // Loading state
  // Delete Modal
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState<string | null>(null)
  const [page, setPage] = useState<number>(1)
  const [totalRecord, setTotalRecord] = useState<number>()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [filteredContracts, setFilteredContracts] = useState([])
  const handleMergeCell = row => {
    setModalOpen(true)
    setSelectedRow(row.original)
  }
  const length = 10
  // Get the router
  const router = useRouter()
  // Fetch the contract list
  const [contractList, setContractList] = useState([])

  const fetchUser = async () => {
    setLoading(true) // Start loading
    try {
      const getContractList = await SubContractorService.allContractor(
        page,
        length,
        dateStart,
        dateEnd,
        status,
        regionF
      )
      if (getContractList.status === 200) {
        setContractList(getContractList?.data?.data.contracts || [])
        setTotalRecord(getContractList?.data?.data.totalRecords || 0)
      }
    } catch (error) {
      console.error('Error fetching contracts:', error)
    } finally {
      setLoading(false) // Stop loading
    }
  }

  useEffect(() => {
    fetchUser()
  }, [page, status, regionF, dateStart, dateEnd])

  // Filter the date to set in the params
  const parsedDateFilter =
    typeof dateFilter === 'string' ? JSON.parse(dateFilter) : dateFilter

  const startDate = parsedDateFilter?.from
    ? moment(parsedDateFilter.from).format('YYYY-MM-DD')
    : ''

  const endDate = parsedDateFilter?.to
    ? moment(parsedDateFilter.to).format('YYYY-MM-DD')
    : ''

  // Function to update URL parameters
  const updateSearchParams = () => {
    const params = new URLSearchParams()
    if (statusFilter) params.set('status', statusFilter)
    if (dateFilter) params.set('startDate', startDate)
    if (endDate) params.set('endDate', endDate)
    if (Array.isArray(region) && region.length > 0) {
      region.forEach(item => params.append('region', item))
    } else if (typeof region === 'string' && region.length > 0) {
      params.append('region', region)
    }

    router.push(`?${params.toString()}`)
  }

  useEffect(() => {
    updateSearchParams()
  }, [searchTerm, statusFilter, dateFilter, region])

  const userContext = useContext(UserContext)
  if (!userContext) {
    throw new Error(
      'UserContext is undefined. Make sure it is wrapped in a provider.'
    )
  }

  const { getRegions } = userContext

  const onDelete = async () => {
    if (deleteIndex !== null) {
      try {
        const response =
          await SubContractorService.deleteContractor(deleteIndex)
          setDeleteOpenModal(false)
        if (response.data.status === true) {
          successMessage({ description: response.data.message })
          fetchUser()
        }
      } catch (error) {
        errorMessage({
          description: error?.response?.data?.message
        })
      }
    }
  }

  const handleDeleteContract = (row: { original: { id: string } }) => {
    setDeleteOpenModal(true)
    setDeleteIndex(row.original.id)
  }

  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false)
  }

  const handleEditContract = (row: { original: { id: string } }) => {
    router.push(`/dashboard/contract/edit?editId=${row.original.id}`)
  }

  useEffect(() => {
    if (selectedRow) {
      const data = contractList.filter(
        item =>
          item.contractorEmail === selectedRow?.contractorEmail &&
          item.refId === null
      )
      setFilteredContracts(data)
    }
  }, [selectedRow, contractList])

  // Now you can use `filteredContracts` anywhere in your component
  const getParentID = filteredContracts.map(item => item.id)
  const onMergeCell = async () => {
    try {
      // const response =
      // await SubContractorService.mergeContracts(getParentID,selectedRow)
      const response = await api.put(
        `contract/mergeContracts?parentContractId=${getParentID[0]}&childContractId=${selectedRow?.id}`
      )
      setDeleteOpenModal(false)
      if (response.data.status === true) {
        successMessage({ description: response.data.message })
        setModalOpen(false)
        fetchUser()
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }
  const filteredData = contractList?.filter(contract => {
    const matchesSearch = Object.values(contract).some(
      value =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
    return matchesSearch
  })
  return (
    <>
      <div className='flex items-center justify-between'>
        <LayoutHeader pageTitle='All Sub Contractor Leads' />
        <div className='flex gap-3'>
          <Button
            className='site-button'
            onClick={() =>
              router.push(`/dashboard/contract/list/merge-subcontractor`)
            }
          >
            Bulk Merge
          </Button>
          <Button
            className='site-button'
            onClick={() => router.push(`/dashboard/contract/add`)}
          >
            <Plus />  
            Add New Contractor
          </Button>
        </div>
      </div>

      <div className='container mx-auto'>
        {/* Filters */}
        <FormProvider {...formMethods}>
          <form className='mb-4 grid grid-cols-4 gap-5'>
            <FormDatePickerRange
              name='datefilter'
              form={formMethods}
              label='Search Date'
            />
            <FormInputField
              name='search'
              form={formMethods}
              placeholder='Search...'
              label='Search'
              type='text'
            />
            <FormSelectField
              form={formMethods}
              name='status'
              label='Status'
              options={[
                { label: 'New', value: 'new' },
                { label: 'Hot', value: 'Hot' },
                { label: 'In Discussion', value: 'In Discussion' },
                { label: 'Converted', value: 'Converted' }
              ]}
            />
            <FormSelectField
              form={formMethods}
              name='region'
              label='Region'
              placeholder='Search Contractor Region'
              options={
                Array.isArray(getRegions)
                  ? getRegions.map((region: any) => ({
                      label: region.regionName,
                      value: region.regionName
                    }))
                  : []
              }
            />
          </form>
        </FormProvider>

        {filteredData ? (
          <>
            <DataTable
              loading={loading}
              data={filteredData}
              handleDeleteContract={handleDeleteContract}
              handleEditContract={handleEditContract}
              columns={columns}
              totalRecord={totalRecord}
              page={page}
              setPage={setPage}
              length={length}
              handleMergeCell={handleMergeCell}
            />
          </>
        ) : (
          <>
            <DataTable
              loading={loading}
              data={contractList}
              handleDeleteContract={handleDeleteContract}
              handleEditContract={handleEditContract}
              columns={columns}
              totalRecord={totalRecord}
              page={page}
              setPage={setPage}
              length={length}
              handleMergeCell={handleMergeCell}
            />
          </>
        )}
        <DialogBox
          onDelete={onDelete}
          description='Are you certain you want to proceed with this deletion?'
          deleteOpenModal={deleteOpenModal}
          deleteHandleModalClose={deleteHandleModalClose}
        />
        <MergeCell
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)} // No argument needed
          description='Are you sure you want to merge this cell?'
          selectedRow={selectedRow}
          filteredContracts={filteredContracts}
          onMergeCell={onMergeCell}
        />
      </div>
    </>
  )
}

export default SubContractorList
