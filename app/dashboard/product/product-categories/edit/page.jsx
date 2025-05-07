'use client'
import LayoutHeader from '@/components/layoutHeader'
import ProductCatogriesFields from '@/components/ProductCatogries/ProductCatogriesFields'
import ProductCatogriesServices from '@/components/services/catogries-api'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Spinner } from '@/components/ui/spinner'
import useDocumentTitle from '@/components/utils/useDocumentTitle'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const EditCatalog = () => {
  const searchParams = useSearchParams()
  const editId = searchParams.get('editId')
  console.log('editId===00', editId)
  useDocumentTitle('Edit Product categories')
  const [loading, setLoading] = useState(false)
  const [editData, setEditData] = useState(false)
  console.log('editData---product', editData)

  const form = useForm()
  const router = useRouter()
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response =
          await ProductCatogriesServices.getProductCategoryById(editId)
        if (response.status === 200) {
          setEditData(response?.data?.data)
          form.reset({
            ...response?.data?.data,
            goodProduct: String(response?.data?.data?.goodProduct || ''),
            betterProduct: String(response?.data?.data?.betterProduct || ''),
            bestProduct: String(response?.data?.data?.bestProduct || '')
          })
        }
      } catch (error) {
        errorMessage({
          description: error?.response?.data?.message
        })
      }
    }
    getProduct()
  }, [])
  const onSubmit = async data => {
    console.log('data', data)
    try {
      const formData = new FormData()

      Object?.keys(data)?.forEach(key => {
        if (typeof data[key] === 'object' && data[key] !== null) return
        formData.append(key, data[key])
      })
      const file = data.image?.[0]
      if (file) {
        formData.append('image', file)
      }
      const response = await ProductCatogriesServices.updateProductCategoryById(
        editId,
        formData
      )
      if (response.status === 200) {
        setLoading(true)
        router.push(`/dashboard/product/product-categories`)
        successMessage({
          description: response?.data?.message
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
        <LayoutHeader pageTitle='Edit Category' />
        <Button
          className='site-button'
          onClick={() => router.push(`/dashboard/product/product-categories`)}
        >
          All Categories
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
            }
          }}
        >
          <ProductCatogriesFields form={form} editData={editData} id={editId} />
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

export default EditCatalog
