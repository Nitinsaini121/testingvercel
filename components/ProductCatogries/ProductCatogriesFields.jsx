'use client'

import api from '@/lib/api'
import { useEffect, useState } from 'react'
import FileUpload from '../share/form/FileUpload'
import FormInputField from '../share/form/FormInputField'
import FormSelectField from '../share/form/FormSelect'
import SelectFilter from '../share/form/SelectFilter'
import FormTextArea from '../share/form/TextArea'
import { errorMessage } from '../ToasterMessage'

const ProductCatogriesFields = ({ form, editData, id }) => {
  const [values, setValues] = useState([])
  // const [productItem, setProductItem] = useState([])
  const goodProduct = form.watch('goodProduct')
  const betterProduct = form.watch('betterProduct')
  const bestProduct = form.watch('bestProduct')
  const [variationData, setVariationData] = useState([])
  useEffect(() => {
    const fetchParentValues = async () => {
      try {
        const response = await api.get(`/productCategory/getAllProductCategory`)
        if (response.status === 200) {
          setValues(response?.data?.data?.productCategory)
        }
      } catch (error) {
        console.log('error', error)
        errorMessage({
          description: error?.response?.data?.message
        })
      }
    }
    fetchParentValues()
  }, [])

  useEffect(() => {
    const fetchVariationData = async () => {
      if (id) {
        try {
          const response = await api.get(
            `productCategory/getVariationByCategoryId?categoryId=${id}`
          )
          if (response.status === 200) {
            const variation = response?.data?.data?.variations

            setVariationData(variation)
          }
        } catch (error) {
          console.log('errorerror', error)
        }
      }
    }
    fetchVariationData()
  }, [])

  // useEffect(() => {
  //   const fetchItems = async () => {
  //     if (id) {
  // try {
  //   const response = await api.get(
  //     `productCategory/getProductByCategoryId?categoryId=${id}`
  //   )
  //   if (response.status === 200) {
  //     setProductItem(response?.data?.data.flat() || [])
  //   }
  // } catch (error) {
  //   errorMessage({
  //     description: error?.response?.data?.message
  //   })
  // }
  //     }
  //   }
  //   fetchItems()
  // }, [])

  const generateOptions = currentFieldValue => {
    const selectedIds = [goodProduct, betterProduct, bestProduct]
      .filter(id => id && id !== currentFieldValue)
      .map(id => String(id))

    return variationData
      .filter(item => !selectedIds.includes(String(item.id)))
      .map(item => {
        const sku = item?.data?.sku?.trim()
        return {
          label: sku
            ? `${item.productName} (${sku})`
            : `${item.productName} (${item.id})`,
          value: String(item?.id)
        }
      })
  }

  return (
    <>
      <FormInputField
        form={form}
        name='name'
        label='Name'
        placeholder='Enter your name'
        className='!mb-3'
        errors={form?.formState?.errors}
      />
      <FormTextArea
        form={form}
        name='description'
        label='Description'
        placeholder='Enter Description'
        className='!mb-3'
      />
      <FormSelectField
        form={form}
        name='parentCategory'
        label='Parent Categories'
        options={[
          { label: 'None', value: 'none' },
          ...(values?.length > 0
            ? values.map(val => ({
                label: val.name,
                value: val.name
              }))
            : [])
        ]}
        className='!mb-3'
      />
      <FileUpload
        form={form}
        name='image'
        label='Thumbnail'
        className='h-12 rounded py-3'
      />

      {editData && (
        <div className='mt-3 grid grid-cols-3 gap-4'>
          <SelectFilter
            form={form}
            name='goodProduct'
            label='Select Good Product'
            placeholder='Select Good Product'
            userList={generateOptions(goodProduct)}
            className='!mb-3'
          />
          <SelectFilter
            form={form}
            name='betterProduct'
            label='Select Better Product'
            placeholder='Select Better Product'
            userList={generateOptions(betterProduct)}
            className='!mb-3'
          />
          <SelectFilter
            form={form}
            name='bestProduct'
            label='Select Best Product'
            placeholder='Select Best Product'
            userList={generateOptions(bestProduct)}
            className='!mb-3'
          />
        </div>
      )}
    </>
  )
}

export default ProductCatogriesFields
