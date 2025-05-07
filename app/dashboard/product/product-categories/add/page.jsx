'use client'
import { ProductCategoryValidationSchema } from '@/components/form-validations/productsCategory-validation'
import LayoutHeader from '@/components/layoutHeader'
import ProductCatogriesFields from '@/components/ProductCatogries/ProductCatogriesFields'
import ProductCatogriesServices from '@/components/services/catogries-api'
import { errorMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Spinner } from '@/components/ui/spinner'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { toast } from '@/hooks/use-toast'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const AddProductCatogries = () => {
  useDocumentTitle('Add Product Categories')
  const [loading, setLoading] = useState(false)

  const form = useForm({
    resolver:yupResolver(ProductCategoryValidationSchema)
  })
  const slug = form.watch('name')
  const router = useRouter()
  useEffect(() => {
    if (slug) {
      const generatedSlug = slug
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
      form.setValue('slug', generatedSlug)
    }
  }, [slug, form])
  const onSubmit = async data => {
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
      const response =
        await ProductCatogriesServices.addProductCategory(formData)
      if (response.status === 200) {
        setLoading(true)
        router.push(`/dashboard/product/product-categories`)
        toast({
          title: 'Add',
          description: 'Product catogrie added successfully'
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
        <LayoutHeader pageTitle='Add Category' />
        <Button
          className='site-button'
          onClick={() =>
            router.push(`/dashboard/product/product-categories`)
          }
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
          <ProductCatogriesFields form={form} />
          <div className='mt-5 flex justify-end'>
            {loading ? (
              <Button className='h-10 w-40'>
                <Spinner size='sm' className='m-auto bg-black dark:bg-white' />
              </Button>
            ) : (
              <Button
                type='submit'
                className='site-button'
              >
                Submit
              </Button>
            )}
          </div>
        </form>
      </Form>
    </>
  )
}

export default AddProductCatogries
