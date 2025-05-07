'use client'

import DialogBox from '@/components/DialogBox'
import LayoutHeader from '@/components/layoutHeader'
import MergeCell from '@/components/MergeCell'
import FormInputField from '@/components/share/form/FormInputField'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import api from '@/lib/api'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import QualifiedSubContractorService from '@/components/services/qualified-subcontractor'
import SubContractorService from '@/components/services/subContractor'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { columns } from './qualified-contract-columns'
import { DataTable } from './qualified-contractor-datatable'
import { errorMessage } from '@/components/ToasterMessage'

const Page = () => {
  useDocumentTitle('Qualified Contrator')
  const formMethods = useForm({
    defaultValues: { search: '' }
  })

  const { watch } = formMethods
  const searchTerm = watch('search')
  const [loading, setLoading] = useState(true) // Loading state
  // Delete Modal
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const [page, setPage] = useState(1)
  const [totalRecord, setTotalRecord] = useState()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [filteredContracts, setFilteredContracts] = useState([])
  const handleMergeCell = row => {
    setModalOpen(true)
    setSelectedRow(row.original) // Store row data
  }
  const length = 10
  // Get the router
  const router = useRouter()
  // Fetch the contract list
  const [contractList, setContractList] = useState([])
  const fetchUser = async () => {
    setLoading(true)
    try {
      const getContractList =
        await QualifiedSubContractorService.allQualifiedContractor(page, length)
        
      setContractList(getContractList?.data?.data.contracts)
      setTotalRecord(getContractList?.data?.data.totalREcords)
    } catch (error) {
      errorMessage({ description: error?.response?.data?.message })
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchUser()
  }, [page])
  // Filter the contract list
  const filteredData = contractList?.filter(contract =>
    Object.values(contract).some(
      value =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const onDelete = async () => {
    if (deleteIndex !== null) {
      try {
        await SubContractorService.deleteContractor(deleteIndex)
        setDeleteOpenModal(false)
        toast({
          title: 'Lead Deleted',
          description: 'Lead has been deleted successfully.'
        })
        fetchUser()
      } catch (error) {
        errorMessage({ description: error?.response?.data?.message })
      }
    }
  }

  const handleDeleteContract = row => {
    setDeleteOpenModal(true)
    setDeleteIndex(row.original.id)
  }

  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false)
  }

  const handleEditContract = row => {
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
      await api.put(
        `contract/mergeContracts?parentContractId=${getParentID[0]}&childContractId=${selectedRow?.id}`
      )
      setDeleteOpenModal(false)
      toast({
        title: 'Contractor Merged',
        description: 'Contractor has been merged successfully.'
      })
      setModalOpen(false)
      fetchUser()
    } catch (error) {
      errorMessage({ description: error?.response?.data?.message })
      
    }
  }
  return (
    <>
      <div className='flex items-center justify-between'>
        <LayoutHeader pageTitle='All Qualified Sub Contractors' />
        <Button
          className='site-button'
          onClick={() => router.push(`/dashboard/contract/add`)}
        >
          <Plus />
          Add New Contractor
        </Button>
      </div>

      <div className='mx-auto w-full'>
        {/* Search Filter */}
        <FormProvider {...formMethods}>
          <form className='mb-4'>
            <FormInputField
              name='search'
              form={formMethods}
              placeholder='Search...'
              label='Search'
              type='text'
            />
          </form>
        </FormProvider>

        {/* Data Table with Filtered Results  */}
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

export default Page
