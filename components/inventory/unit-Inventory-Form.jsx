'use client'

import { ChevronDown, ChevronRight, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFieldArray, useWatch } from 'react-hook-form'
import FormInputField from '../share/form/FormInputField'
import FormSelectField from '../share/form/FormSelect'
import { Button } from '../ui/button'
import { CardDescription } from '../ui/card'
import { Separator } from '../ui/separator'

const UnitInventoryForm = ({ form }) => {
  const { control, watch, setValue } = form

  const unit = [
    { label: 'BX10', value: 'BX10' },
    { label: 'EA', value: 'EA' }
  ]

  // Track open rows separately
  const [openRows, setOpenRows] = useState({})

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'units'
  })

  const handleDimensionsOpen = (index) => {
    setOpenRows(prev => ({
      ...prev,
      [index]: !prev[index] // Toggle only the clicked row
    }))
  }

  // Watch for length, width, and height changes to dynamically calculate volume
  useEffect(() => {
    fields.forEach((field, index) => {
      const { length, width, height } = watch(`units.${index}`) || {}

      if (length && width && height) {
        const calculatedVolume = Number(length) * Number(width) * Number(height)
        setValue(`units.${index}.volume`, calculatedVolume)
      }
    })
  }, [watch('units'), setValue, fields.length])

  return (
    <>
      <CardDescription className='mb-3 mt-5 text-xl font-semibold text-gray-700'>
        Unit
      </CardDescription>
      <div>
        {fields.map((field, index) => (
          <div key={field.id} className='mb-4'>
            <div className='grid grid-cols-6 items-center gap-4'>
              <FormSelectField
                form={form}
                name={`units.${index}.unitOfMeasure`}
                label={`U/M ${index + 1}`}
                placeholder='Choose any one'
                options={unit}
              />
              <FormInputField
                form={form}
                name={`units.${index}.quantity`}
                label='Quantity'
                placeholder='Enter quantity'
                type='number'
              />
              <FormInputField
                form={form}
                name={`units.${index}.perUnit`}
                label='Per Unit'
                placeholder='Enter perUnit'
                type='number'
              />
              <FormInputField
                form={form}
                name={`units.${index}.upc`}
                label='UPC'
                placeholder='Enter UPC'
                type='number'
              />
              <div
                className='mt-6 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border bg-primary border-none'
                onClick={() => handleDimensionsOpen(index)}
              >
                {openRows[index] ? <ChevronDown /> : <ChevronRight />}
              </div>

              {index > 0 && (
                <Button
                  type='button'
                  variant='destructive'
                  onClick={() => remove(index)}
                >
                  <Trash2 />
                </Button>
              )}
            </div>

            {openRows[index] && (
              <div className='mt-4 rounded border px-5 pb-5'>
                <CardDescription className='mb-3 mt-5 text-xl text-gray-700'>
                  Dimensions
                </CardDescription>
                <div className='grid grid-cols-5 gap-4'>
                  <FormInputField
                    form={form}
                    name={`units.${index}.weight`}
                    label='Weight'
                    placeholder='Enter weight'
                    type='number'
                  />
                  <FormInputField
                    form={form}
                    name={`units.${index}.height`}
                    label='Height'
                    placeholder='Enter Height'
                    type='number'
                  />
                  <FormInputField
                    form={form}
                    name={`units.${index}.length`}
                    label='Length'
                    placeholder='Enter Length'
                    type='number'
                  />
                  <FormInputField
                    form={form}
                    name={`units.${index}.width`}
                    label='Width'
                    placeholder='Enter Width'
                    type='number'
                  />
                  <FormInputField
                    form={form}
                    name={`units.${index}.volume`}
                    label='Volume'
                    type='number'
                    disable // Volume is auto-calculated, so make it read-only
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Button type='button' onClick={() => append({})} className='site-button-small'>
        Add More
      </Button>
      <Separator className='my-10' />
    </>
  )
}

export default UnitInventoryForm
