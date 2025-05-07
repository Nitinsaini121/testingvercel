'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { QuotesValidation } from '../form-validations/Quotes-Validation'
import DimensionService from '../services/dimension-Service'
import ProductQuote from '../services/ProductQuote'
import { errorMessage, successMessage } from '../ToasterMessage'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'
import { Form } from '../ui/form'
import { Spinner } from '../ui/spinner'
import ProductQuotes from './ProductQuotes'

const ProductCatogriesSection = ({
  editId,
  editData,
  fetchTakeOfData,
  setEditData,
  setEditId,
  sendValue,
  setSendValue
}) => {
  const searchParam = useSearchParams()
  const router = useRouter()
  const leadId = searchParam.get('id')
  const [data, setData] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [checkMaterial, setCheckMaterial] = useState(null)
  const [loading, setLoading] = useState(false)
  const form = useForm({
    resolver: yupResolver(QuotesValidation),
    defaultValues: {
      material_quality: '',
      quotes: []
    }
  })
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'quotes'
  })
  const fetchProductCatogries = async () => {
    try {
      const response = await DimensionService.getAllCategoryWithProduct()
      if (response.status === 200) {
        if (response?.data?.status === true) {
          const categories = response?.data?.data
          setData(response?.data?.data)
          // successMessage({ description: response?.data?.message })
        } else {
          errorMessage({ description: response?.data?.message })
        }
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message || error?.message
      })
    }
  }
  useEffect(() => {
    fetchProductCatogries()
  }, [])

  useEffect(() => {
    if (data?.length && fields.length === 0) {
      const fieldData = data.map(category => ({
        categoryId: category.id,
        categoryName: category.name,
        description: '',
        cost: '',
        margin: '',
        price: '',
        quantity: '',
        uom: '',
        total: ''
      }))

      form.setValue('quotes', fieldData)
    }
  }, [data, fields?.length])

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (!name?.startsWith('quotes.')) return

      const match = name.match(/^quotes\.(\d+)\.(cost|margin|quantity|waste)$/)

      if (match) {
        const index = Number(match[1])
        const quote = form.getValues(`quotes.${index}`)
        const cost = Number(quote.cost || 0)
        const margin = Number(quote.margin || 0)
        const quantity = Number(quote.quantity || 0)
        const waste = Number(quote.waste || 0)
        const wastePercent = waste / 100
        const qtyWithWaste = quantity / (1 - wastePercent)
        const inPerMargin = margin / 100
        const price = cost / (1 - inPerMargin)
        const total = price * quantity + qtyWithWaste

        form.setValue(`quotes.${index}.price`, price, {
          shouldValidate: false,
          shouldDirty: false
        })
        form.setValue(`quotes.${index}.total`, total, {
          shouldValidate: false,
          shouldDirty: false
        })

        // if (waste > 0) {
        //   const wastePercent = waste / 100
        //   const qtyWithWaste = quantity / (1 - wastePercent)
        //   const inPerMargin = margin / 100
        //   const price = cost / (1 - inPerMargin)
        //   const total = price * qtyWithWaste

        //   form.setValue(`quotes.${index}.price`, qtyWithWaste, {
        //     shouldValidate: false,
        //     shouldDirty: false
        //   })
        //   form.setValue(`quotes.${index}.total`, total, {
        //     shouldValidate: false,
        //     shouldDirty: false
        //   })
        // } else {
        // const inPerMargin = margin / 100
        // const price = cost / (1 - inPerMargin)

        // const total = price * quantity
        // form.setValue(`quotes.${index}.price`, price, {
        //   shouldValidate: false,
        //   shouldDirty: false
        // })
        // form.setValue(`quotes.${index}.total`, total, {
        //   shouldValidate: false,
        //   shouldDirty: false
        // })
        // }
      }
    })

    return () => subscription.unsubscribe()
  }, [form])

  const onSubmitQuotes = async data => {
    const formData = {
      materialQuality: checkMaterial || sendValue,
      leadId: Number(leadId),
      status: 'pending',
      quotes: data?.quotes
    }
    if (editId !== null) {
      try {
        const response = await ProductQuote.updateTakeOffQuoteById(
          editId,
          formData
        )
        if (response?.status === 200) {
          if (response?.data?.status === true) {
            successMessage({ description: response?.data?.message })
            fetchTakeOfData()
            setOpenDialog(false)
            form.reset()
            setEditId(null)
            setEditData()
            setSendValue()
            router.push('/dashboard/product/material-quotes')
          } else {
            errorMessage({ description: response?.data?.message })
          }
        }
      } catch (error) {
        errorMessage({
          description: error?.response?.data?.message || error?.message
        })
      }
      setEditData([])
      setSendValue()
    } else {
      try {
        const response = await ProductQuote.addTakeOffQuote(formData)
        if (response?.status === 200) {
          if (response?.data?.status === true) {
            successMessage({ description: response?.data?.message })
            fetchTakeOfData()
            setOpenDialog(false)
            form.reset()
            router.push('/dashboard/product/material-quotes')
          } else {
            errorMessage({ description: response?.data?.message })
          }
        }
      } catch (error) {
        errorMessage({
          description: error?.response?.data?.message || error?.message
        })
      }
    }
  }

  const handleClick = status => {
    setCheckMaterial(status)
  }

  useEffect(() => {
    if (!data.length || !checkMaterial) return

    const updatedQuotes = data.map(category => {
      const selectedProductId = category?.[checkMaterial]
      const defaultProduct = category.products.find(
        item => item.variationId === selectedProductId
      )

      const product =
        defaultProduct ||
        category.products.find(
          item => item.variationId === category?.default_product
        ) ||
        category.products[0] ||
        null

      console.log('category', category)
      return {
        categoryId: category.id,
        categoryName: category.name,
        productId: String(product?.variationId || ''),
        description: '',
        cost: '',
        margin: '',
        price: '',
        quantity: '1',
        uom: '',
        total: ''
      }
    })

    // const updatedQuotes = data.map(category => {
    //   const selectedProductId = category[checkMaterial]
    //   console.log('selectedProductId', selectedProductId)
    //   console.log(
    //     'category',
    //     category.products.map(item => item.productId)
    //   )
    //   const defaultProduct =
    //     category.products.find(
    //       item => item.productId === selectedProductId
    //     ) || null

    //   return {
    //     categoryId: category.id,
    //     categoryName: category.name,
    //     productId: String(
    //       defaultProduct?.id ?? category?.default_product ?? ''
    //     ),
    //     description: '',
    //     cost: '',
    //     margin: '',
    //     price: '',
    //     quantity: '1',
    //     uom: '',
    //     total: ''
    //   }
    // })

    form.setValue('quotes', updatedQuotes)
  }, [checkMaterial, data])

  const grandTotal = form.watch('quotes')?.reduce((acc, curr) => {
    return acc + (parseFloat(curr.total) || 0)
  }, 0)
  useEffect(() => {
    if (editId !== null && editData?.length) {
      form.reset({
        material_quality: '',
        quotes: editData.map(item => ({
          categoryId: item.data.categoryId,
          categoryName: item.data.categoryName,
          description: item.data.description || '',
          cost: item.data.cost || 0,
          id: item.id || 0,
          quantity: item.data.quantity || 0,
          margin: item.data.margin || 0,
          price: item.data.price || 0,
          uom: item.data.uom || '',
          total: item.data.total || 0,
          productId: String(item.data.productId) || 0
        }))
      })
      setOpenDialog(true)
    }
  }, [editData, editId, grandTotal])

  useEffect(() => {
    if (!openDialog) {
      form.reset({
        material_quality: '',
        quotes: []
      })
      setEditId(null)
      setEditData()
      setSendValue()
      setCheckMaterial()
    }
  }, [openDialog])

  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <div className='flex justify-between'>
          <div className='text-dark-color mt-7 pb-2 text-lg font-semibold'>
            All Quotes
          </div>
          <DialogTrigger asChild>
            <Button className='site-button mt-7 pb-2'>Add Quotes </Button>
          </DialogTrigger>
        </div>
        <DialogContent
          className={`max-h-[90vh] overflow-y-auto transition-all duration-300 ${
            checkMaterial || editId !== null ? 'sm:max-w-7xl' : 'sm:max-w-md'
          }`}
        >
          <DialogHeader>
            <DialogTitle>
              {editId !== null ? 'Edit Quote Details' : 'Add Quote Details'}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitQuotes)}
              className='space-y-4'
            >
              {editId === null && !checkMaterial && (
                <FormProvider {...form}>
                  <div className='grid grid-cols-3 gap-2'>
                    <Button
                      type='button'
                      className='site-button-small'
                      onClick={() => handleClick('goodProduct')}
                    >
                      Good
                    </Button>
                    <Button
                      type='button'
                      className='site-button-small'
                      onClick={() => handleClick('betterProduct')}
                    >
                      Better
                    </Button>
                    <Button
                      type='button'
                      className='site-button-small'
                      onClick={() => handleClick('bestProduct')}
                    >
                      Best
                    </Button>
                  </div>
                </FormProvider>
              )}

              {(editId !== null || checkMaterial) && (
                <ProductQuotes
                  form={form}
                  data={data}
                  fields={fields}
                  leadId={leadId}
                  grandTotal={grandTotal}
                />
              )}

              {(editId !== null || checkMaterial) && (
                <div className='mt-5 flex justify-end'>
                  {loading ? (
                    <Button type='button' className='h-10 w-40'>
                      <Spinner
                        size='sm'
                        className='m-auto bg-black dark:bg-white'
                      />
                    </Button>
                  ) : (
                    <Button className='site-button' type='submit'>
                      {editId !== null ? 'Update' : 'Submit'}
                    </Button>
                  )}
                </div>
              )}
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ProductCatogriesSection
