'use client'

import DialogBox from '@/components/DialogBox'
import LayoutHeader from '@/components/layoutHeader'
import ProductCatogriesServices from '@/components/services/catogries-api'
import FormInputField from '@/components/share/form/FormInputField'
import { DataTable } from '@/components/Table'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { columns } from './catagories-column'

const CatogriesList = () => {
  useDocumentTitle('Categories List')
  const [page, setPage] = useState(1)
  const [totalRecord, setTotalRecord] = useState()
  const length = 10
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [data, setData] = useState([])
  const formMethods = useForm({
    defaultValues: { search: '' }
  })
  const { watch } = formMethods
  const searchTerm = watch('search')
  const router = useRouter()

  const fetchData = async () => {
    try {
      const response = await ProductCatogriesServices.getAllProductCategory(
        page,
        length
      )
      if (response.status === 200) {
        setData(response?.data?.data?.productCategory)
        setTotalRecord(response.data.data.totalRecords)
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }
  useEffect(() => {
    fetchData()
  }, [page])

  const onDelete = async () => {
    try {
      const response =
        await ProductCatogriesServices.deleteProductCategoryById(deleteId)
      setDeleteOpenModal(false)
      if (response.status === 200) {
        fetchData()
        successMessage({
          description: response?.data?.message
        })
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }

  const handleDeleteCatogrie = row => {
    setDeleteOpenModal(true)
    setDeleteId(row.original.id)
  }
  const filteredData = data?.filter(item => {
    const matchesSearch = Object.values(item).some(
      value =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
    return matchesSearch
  })
  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false)
  }
  const handleEditProductCatogries = row => {
    router.push(
      `/dashboard/product/product-categories/edit?editId=${row.original.id}`
    )
  }
  return (
    <>
      <div className='flex items-center justify-between'>
        <LayoutHeader pageTitle='All Categories' />
        <Button
          className='site-button'
          onClick={() =>
            router.push(`/dashboard/product/product-categories/add`)
          }
        >
          <Plus />
          Add Category
        </Button>
      </div>
      <Separator />
      <FormProvider {...formMethods}>
        <FormInputField
          className='w-80'
          name='search'
          form={formMethods}
          placeholder='Search...'
          label='Search'
          type='text'
        />
      </FormProvider>
      <DataTable
        totalRecord={totalRecord}
        page={page}
        setPage={setPage}
        length={length}
        data={filteredData}
        columns={columns(handleEditProductCatogries, handleDeleteCatogrie)}
      />
      <DialogBox
        onDelete={onDelete}
        description='Are you certain you want to proceed with this deletion?'
        deleteOpenModal={deleteOpenModal}
        deleteHandleModalClose={deleteHandleModalClose}
      />
    </>
  )
}

export default CatogriesList
