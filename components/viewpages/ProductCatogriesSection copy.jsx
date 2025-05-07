'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useFieldArray, useForm, useWatch } from 'react-hook-form'
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
  const leadId = searchParam.get('id')
  const [data, setData] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [checkMaterial, setCheckMaterial] = useState(null)
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
  }, [data, fields.length])

  // Watch the quotes array
  const watchedQuotes = useWatch({
    control: form.control,
    name: 'quotes'
  })

  useEffect(() => {
    watchedQuotes?.forEach((quote, index) => {
      const cost = Number(quote?.cost || 0)
      const margin = Number(quote?.margin || 0)
      const quantity = Number(quote?.quantity || 0)

      const price = cost + margin
      const total = price * quantity

      if (form.getValues(`quotes.${index}.price`) !== price) {
        form.setValue(`quotes.${index}.price`, parseFloat(price.toFixed(2)))
      }

      if (form.getValues(`quotes.${index}.total`) !== total) {
        form.setValue(`quotes.${index}.total`, parseFloat(total.toFixed(2)))
      }
    })
  }, [watchedQuotes])

  const onSubmitQuotes = async data => {
    const formData = {
      materialQuality: checkMaterial || sendValue,
      leadId: Number(leadId),
      status: 'pending',
      quotes: data.quotes || []
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
          } else {
            errorMessage({ description: response?.data?.message })
          }
        }
      } catch (error) {
        console.log('error', error)
        errorMessage({
          description: error?.response?.data?.message || error?.message
        })
      }
    }
  }
  const handleClick = status => {
    setCheckMaterial(status)
  }
  // const checkMaterial = form.watch('material_quality')
  useEffect(() => {
    if (!data.length || !checkMaterial) return

    const updatedQuotes = data.map(category => {
      const skus = category.products
        .flatMap(item => item.variation) // flatten the nested arrays
        .map(variant => variant.data.sku)

      const selectedProductId = category[checkMaterial]
      console.log('selectedProductId', selectedProductId)
      console.log('category-product', category)

      const defaultProduct =
        category.products.find(item => item.id === selectedProductId) || null

      console.log('selectProduct', defaultProduct)

      console.log('defaultProuct', category.default_product)
      return {
        categoryId: category.id,
        categoryName: category.name,
        // productId: String(defaultProduct?.id ? defaultProduct?.id : category.default_product),
        productId: '53',
        description: '',
        cost: '',
        margin: '',
        price: '',
        quantity: '1',
        uom: '',
        total: ''
      }
    })
    form.setValue('quotes', updatedQuotes);

    console.log('updatedQuotes1111', updatedQuotes)

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
              {editId !== null && (
                <ProductQuotes
                  form={form}
                  data={data}
                  fields={fields}
                  editId={editId}
                  grandTotal={grandTotal}
                />
              )}
              {checkMaterial && (
                <ProductQuotes
                  form={form}
                  data={data}
                  fields={fields}
                  grandTotal={grandTotal}
                  editId={editId}
                />
              )}
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}
export default ProductCatogriesSection
