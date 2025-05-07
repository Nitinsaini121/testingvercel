'use client'
import LayoutHeader from '@/components/layoutHeader'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import useDocumentTitle from '@/components/utils/useDocumentTitle'

import { InventoryValidationSchema } from '@/components/form-validations/inventory-validation'
import MainInventoryForm from '@/components/inventory/main-Inventory-Form'
import UnitInventoryForm from '@/components/inventory/unit-Inventory-Form'
import VendorInventoryForm from '@/components/inventory/vendor-Inventory-Form'
import InventoryService from '@/components/services/inventory-api'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
// import AttributeTableData from './attribute-tableData'

const Inventory = () => {
  const [imageUpload, setImageUpload] = useState(null)
  const form = useForm({
    resolver: yupResolver(InventoryValidationSchema),
    defaultValues: {
      sku: '',
      brand: '',
      image: null,
      shortDescription: '',
      longDescription: '',
      productGallery: [],
      units: [
        {
          unitOfMeasure: 'EA', // Default unit
          quantity: 1,
          perUnit: 1,
          upc: '',
          weight: '',
          height: '',
          length: '',
          width: '',
          volume: ''
        }
      ],
      vendor: [
        {
          vendor: '',
          vendorItem: '',
          vendorCost: 0,
          vendorUOM: '',
          costPerUOM: '',
          comments: ''
        }
      ]
    }
  })

  useDocumentTitle('Add Inventor')
  const router = useRouter()

  // add inventory
  const handleInventorySubmit = async data => {

    try {
      const formData = new FormData()

      // Append non-object fields directly
      Object.keys(data).forEach(key => {
        if (typeof data[key] !== 'object' || data[key] === null) {
          formData.append(key, data[key])
        }
      })

      // Append structured data as JSON strings
      formData.append('units', JSON.stringify(data.units))
      formData.append('vendor', JSON.stringify(data.vendor))

      // Handle image upload correctly
      const file = data.image?.[0]
      if (file && file instanceof File) {
        formData.append('image', file)
      }

      if (imageUpload && Array.isArray(imageUpload)) {
        imageUpload.forEach(file => {
          formData.append('productGallery', file)
        })
      }

      const responseAdd = await InventoryService.addInventory(formData)

      form.reset()
      if (responseAdd?.status === 200) {
        router.push('/dashboard/product/inventory')
        successMessage({ description: responseAdd?.data?.message })
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <LayoutHeader pageTitle='Add Inventory' />
        <Button
          className='site-button'
          onClick={() => router.push('/dashboard/product/inventory')}
        >
          All Inventory
        </Button>
      </div>
      <Separator />
      <div className=''>
        <FormProvider {...form}>
          <form
            className=''
            onSubmit={form.handleSubmit(handleInventorySubmit)}
          >
            <MainInventoryForm
              form={form}
              setImageUpload={setImageUpload}
              updateImage={[]}
            />

            <UnitInventoryForm form={form} />
            <VendorInventoryForm form={form} />

            <div className='add-button flex justify-end'>
              <Button type='submit' className='mt-5 site-button'>
                Add Inventory
              </Button>
            </div>
            {/* </div> */}
          </form>
        </FormProvider>
      </div>
      {/* <AttributeTableData
        allAttribute={allAttribute}
        getAllAttributes={getAllAttributes}
      /> */}
    </>
  )
}

export default Inventory
