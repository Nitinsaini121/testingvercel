'use client'
import AddFields from '@/components/FieldsMaterial/AddFields'
import LayoutHeader from '@/components/layoutHeader'
import MaterialQuotesServices from '@/components/services/material-api'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const EditMaterial = () => {
  const searchParams = useSearchParams()
  const editId = searchParams.get('editId')
  const [editData, setEditData] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const form = useForm()
  useDocumentTitle('Edit Material')
  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const catalog = await MaterialQuotesServices.getMaterialListByid(editId)
        if (catalog?.status === 200) {
          setEditData(catalog.data.data)
        }
      } catch (error) {
        errorMessage({
          description: error?.response?.data?.message
        })
      }
    }
    fetchCatalog()
  }, [editId])
  console.log('editData--', editData)
  useEffect(() => {
    if (editData) {
      form.reset(editData)
      // form.setValue("materialQuotes",editData.materialQuotes.item)
    }
  }, [editData, form])

  const handleEditMaterial = async data => {
    setLoading(true)

    try {
      const formData = {
        customerName: data.customerName,
        shipTo: data.shipTo,
        materialQuotes: data.materialQuotes,
        additionalQuotes: data.additionalQuotes,
        additionalTotal: data.additionalTotal,
        materialTotal: data.materialTotal,
        addtaxable: data.addtaxable
      }
      const res = await MaterialQuotesServices.updateMaterialById(
        editId,
        formData
      )
      if (res?.status === 200) {
        router.push('/dashboard/product/material-quotes')
        successMessage({
          description: res?.data?.message
        })
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <div className='flex items-center justify-between'>
        <LayoutHeader pageTitle={'Edit Material'} />
        <Button
          className='site-button'
          onClick={() => router.push('/dashboard/product/material-quotes')}
        >
          Material List
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleEditMaterial)}>
          <div className='space-y-4'>
            <AddFields form={form} editData={editData} editId={editId} />
          </div>

          <div className='mt-5 flex justify-end'>
            {loading ? (
              <Button className='h-10 w-40'>
                <Spinner size='sm' className='m-auto bg-black dark:bg-white' />
              </Button>
            ) : (
              <Button type='submit' className='site-button'>
                Update
              </Button>
            )}
          </div>
        </form>
      </Form>
    </>
  )
}

export default EditMaterial
