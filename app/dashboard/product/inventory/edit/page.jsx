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
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
// import AttributeTableData from './attribute-tableData'

const EditInventory = () => {
  const searchParams = useSearchParams()
  const editId = searchParams.get('editId')
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
  useDocumentTitle('Inventory')
  const router = useRouter()

  // Fetch the inventory by Id To update the Id
  const fetchInventoryById = async () => {
    try {
      const response = await InventoryService.getInventorById(editId)
      if (response?.status === 200) {
        let inventoryData = response.data.data

        // Parse the units and vendor fields safely
        inventoryData = {
          ...inventoryData,
          units:
            typeof inventoryData.units === 'string'
              ? JSON.parse(inventoryData.units)
              : inventoryData.units,
          vendor:
            typeof inventoryData.vendor === 'string'
              ? JSON.parse(inventoryData.vendor)
              : inventoryData.vendor
        }

        // Reset the form with the updated inventory data
        form.reset(inventoryData)
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }

  useEffect(() => {
    if (editId) {
      fetchInventoryById()
    }
  }, [editId])

  // handle to edit inventory
  const handleInventorySubmit = async data => {
    try {
      const formData = new FormData()

      // Append non-object fields directly
      Object.keys(data).forEach(key => {
        if (typeof data[key] !== 'object' || data[key] === null) {
          formData.append(key, data[key])
        }
      })
      if (imageUpload && Array.isArray(imageUpload)) {
        imageUpload.forEach(file => {
          formData.append('productGallery', file)
        })
      }

      // Append structured data as JSON strings
      formData.append('units', JSON.stringify(data.units))
      formData.append('vendor', JSON.stringify(data.vendor))

      // Handle image upload correctly
      const file = data.image?.[0]
      if (file && file instanceof File) {
        formData.append('image', file)
      }

      const responseEdit = await InventoryService.updateInventor(
        editId,
        formData
      )
      if (responseEdit?.status === 200) {
        form.reset()
        successMessage({ description: responseEdit?.data?.message })
        router.push('/dashboard/product/inventory')
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
        <LayoutHeader pageTitle={'Edit Inventory'} />
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
              updateImage={[]}
              setImageUpload={setImageUpload}
            />
            <UnitInventoryForm form={form} />
            <VendorInventoryForm form={form} />

            <div className='add-button flex justify-end'>
              <Button type='submit' className='mt-5 w-32'>
                Update Inventory
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

export default EditInventory
