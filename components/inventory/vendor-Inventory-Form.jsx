'use client'

import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import FormInputField from '../share/form/FormInputField'
import { Button } from '../ui/button'
import { CardDescription } from '../ui/card'
import { Separator } from '../ui/separator'

const VendorInventoryForm = ({ updateImage, form, setImageUpload }) => {
  const { control } = useForm({
    defaultValues: {
      vendor: [{}]
    }
  })

  const [openRows, setOpenRows] = useState({})

  const unit = [
    { label: 'BX10', value: 'BX10' },
    { label: 'EA', value: 'EA' }
  ]

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'vendor'
  })

  const handleDimensionsOpen = index => {
    setOpenRows(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  return (
    <>
      <CardDescription className='mb-3 mt-5 text-xl font-semibold text-gray-700'>
        Vendor
      </CardDescription>
      <div>
        {fields.map((field, index) => (
          <div key={field.id} className='mb-4'>
            <div className='grid grid-cols-7 items-center gap-4'>
              <FormInputField
                form={form}
                name={`vendor.${index}.vendor`}
                label='Vendor'
                placeholder='Enter Vendor'
              />
              <FormInputField
                form={form}
                name={`vendor.${index}.vendorItem`}
                label='Vendor Item'
                placeholder='Enter Vendor Item'
              />
              <FormInputField
                form={form}
                name={`vendor.${index}.vendorCost`}
                label='Vendor Cost'
                placeholder='Enter Vendor Cost'
                type='number'
              />
              <FormInputField
                form={form}
                name={`vendor.${index}.vendorUOM`}
                label='Vendor UOM'
                placeholder='Enter Vendor UOM'
                type='number'
              />
              <FormInputField
                form={form}
                name={`vendor.${index}.costPerUOM`}
                label='Cost Per UOM'
                placeholder='Enter Cost Per UOM'
                type='number'
              />
              <FormInputField
                form={form}
                name={`vendor.${index}.comments`}
                label='Comments'
                placeholder='Enter Comments'
                type='number'
              />

              {index > 0 && (
                <Button type='button'
                  className='mt-6'
                  variant='destructive'
                  onClick={() => remove(index)}
                >
                  <Trash2 />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Button type='button' onClick={() => append({})} className='site-button-small'>Add More</Button>
      <Separator className='my-10' />
    </>
  )
}

export default VendorInventoryForm
