'use client'
import DialogBox from '@/components/DialogBox'
import LayoutHeader from '@/components/layoutHeader'
import CatalogServices from '@/components/services/catalog-api'
import FormInputField from '@/components/share/form/FormInputField'
import { DataTable } from '@/components/Table'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { toast } from '@/hooks/use-toast'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { columns } from '../catalog-column'

const CatalogList = () => {
  useDocumentTitle('All Product')
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const [catalog, setCatalog] = useState([])
  const [page, setPage] = useState(1)
  const [totalRecord, setTotalRecord] = useState()
  const [loading, setLoading] = useState(true)

  const length = 10

  const formMethods = useForm({
    defaultValues: { search: '' }
  })
  const { watch } = formMethods
  const searchTerm = watch('search')

  const fetchCatalogData = async () => {
    setLoading(true)
    try {
      const response = await CatalogServices.allCatalog(page, length)
      setCatalog(response.data.data.catalog)
      setTotalRecord(response?.data?.data.totalRecords)
    } catch (error) {
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Update Error',
          description: error.message
        })
      }
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchCatalogData()
  }, [page])
  const router = useRouter()
  const onDelete = async () => {
    try {
      await CatalogServices.deleteCatalog(deleteIndex)
      setDeleteOpenModal(false)
      fetchCatalogData()
      toast({
        title: 'Catalog Deleted',
        description: 'Catalog Delete Successfully'
      })
    } catch (error) {}
  }

  const handleDeleteCatalog = row => {
    setDeleteOpenModal(true)
    setDeleteIndex(row.original.id)
  }
  const handleEditCatalog = row => {
    router.push(`/dashboard/product/list/edit?editId=${row.original.id}`)
  }
  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false)
  }
  const filteredData = catalog?.filter(item => {
    const matchesSearch = Object.values(item).some(
      value =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
    return matchesSearch
  })
  return (
    <>
      <div className='mb-3 flex items-center justify-between'>
        <LayoutHeader pageTitle='All Products' />
        <Button
          className='site-button'
          onClick={() => router.push(`/dashboard/product/add`)}
        >
          <Plus />
          Add New Product
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
        loading={loading}
        data={filteredData}
        columns={columns(handleDeleteCatalog, handleEditCatalog)}
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
    </>
  )
}

export default CatalogList
