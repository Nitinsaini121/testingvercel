'use client'
import api from '@/lib/api'
import { Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import FormInputField from '../share/form/FormInputField'
import FormSelectField from '../share/form/FormSelect'
import ImageUpload from '../share/form/ImageUpload'
import FormTextArea from '../share/form/TextArea'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '../ui/accordion'
import { CardDescription } from '../ui/card'
import { Separator } from '../ui/separator'
import TextEditor from '../work-order/TextEditor'
import AddAttributes from './addProductAttributes'
import CategoryListSideBar from './CategoryListSideBar'

const AddProductFields = ({
  form,
  onSaveAttribute,
  allAttributeList,
  getListAttributes
}) => {
  const [manufacturer, setManufacturer] = useState([])
  const [finalVariationData , setFinalVariationData]= useState([])
  const { fields: variationFields, append: appendVariation } = useFieldArray({
    control: form.control,
    name: 'variations'
  })

  const {
    fields: specField,
    append: appendSpecField,
    remove: removespec,
    replace: specReplace
  } = useFieldArray({
    control: form.control,
    name: 'keySpecifications'
  })

  // Ensure at least one default field on load
  useEffect(() => {
    if (
      variationFields.length === 0 &&
      form.getValues('variations')?.length === 0
    ) {
      appendVariation({
        featureImage: '',
        thumbnail: '',
        name: '',
        cost: '',
        price: '',
        dynamic: '',
        sku: '',
        id: ''
      })
    }

    if (
      specField.length === 0 &&
      form.getValues('keySpecifications')?.length === 0
    ) {
      appendSpecField({
        title: '',
        value: '',
        description: ''
      })
    }
  }, [specField, variationFields, appendSpecField, appendVariation])

  useEffect(() => {
    const getManufacturer = async () => {
      try {
        const response = await api.get(`/manufacturer/getAllManufacturer`)
        setManufacturer(response.data.data?.manufacturer)
      } catch (error) {
        if (error) {
          toast({
            variant: 'destructive',
            title: 'Update Error',
            description: error.message
          })
        }
      }
    }
    getManufacturer()
  }, [])

  const variationData = JSON.parse(localStorage.getItem('variations'))


  return (
    <>
      <div className='mb-6 flex gap-4'>
        <div className='w-3/4'>
          <div className='mb-4 mt-3'>
            <FormInputField
              form={form}
              name='productName'
              label='Product Name'
              placeholder='Enter Product Name'
              type='text'
            />
          </div>
          <div>
            <TextEditor
              name='description'
              form={form}
              label='Product Description'
              className='text-editor'
            />
          </div>

          <Separator className='mt-8' />
          <CardDescription className='text-black-900 mb-3 mt-5 text-xl font-semibold'>
            Attribute
          </CardDescription>

          <AddAttributes
            getListAttributes={getListAttributes}
            allAttributeList={allAttributeList}
            onSaveAttribute={onSaveAttribute}
            setFinalVariationData={setFinalVariationData}
          />

         

          <Separator className='mt-8' />
          <CardDescription className='text-black-900 mb-3 mt-5 text-xl font-semibold'>
            Add Variation
          </CardDescription>

          {variationData?.map((field, index) => (
            <Accordion key={index} type='single' collapsible className='w-full'>
              <AccordionItem value={`${index}`}>
                <div className='bg-gray-light mt-2 rounded border px-4 pb-2 pt-0'>
                  <AccordionTrigger className='pb-0 pt-2'>
                    <div className='flex gap-16'>
                      {field?.map((f, i) => (
                        <>
                          <FormSelectField
                            key={`${index}-${i}`}
                            className='w-32 p-2'
                            form={form}
                            name={`variations.${index}.${f.fieldName}-${index}`}
                            placeholder={f.fieldName}
                            options={f.options}
                          />
                        </>
                      ))}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className='mt-4 grid grid-cols-3 gap-x-4 gap-y-2'>
                      <FormInputField
                        form={form}
                        name={`variations.${index}.name`}
                        label='Name'
                        placeholder='Enter Name'
                        type='text'
                      />
                      <ImageUpload
                        form={form}
                        name={`variations.${index}.featureImage`}
                        label='Feature Image'
                        className='border-color-grey h-12 rounded border bg-white py-3 !shadow-none'
                      />
                      <ImageUpload
                        form={form}
                        name={`variations.${index}.thumbnail`}
                        label='Variation Thumbnail'
                        className='border-color-grey h-12 rounded border bg-white py-3 !shadow-none'
                      />
                    </div>
                    <div className='grid grid-cols-5 gap-4'>
                      <FormInputField
                        form={form}
                        name={`variations.${index}.price`}
                        label='Price'
                        placeholder='Enter Price'
                        type='number'
                      />

                      <FormInputField
                        form={form}
                        name={`variations.${index}.cost`}
                        label='Cost'
                        placeholder='Enter Cost'
                        type='number'
                      />
                      <FormInputField
                        form={form}
                        name={`variations.${index}.sku`}
                        label='SKU'
                        placeholder='Enter SKU'
                        type='text'
                      />
                      <FormInputField
                        form={form}
                        name={`variations.${index}.coverageAreaSqft`}
                        label='Coverage Area Sq ft'
                        placeholder='Enter Coverage Area'
                        type='number'
                      />
                      <FormInputField
                        form={form}
                        name={`variations.${index}.unitsPerSq`}
                        label='Units Per Sq'
                        placeholder='Enter Units Per Sq'
                        type='number'
                      />
                      <FormInputField
                        form={form}
                        name={`variations.${index}.bundlesPerLf`}
                        label='Bundles Per Lf'
                        placeholder='Enter Bundles Per Lf'
                        type='number'
                      />
                      <FormInputField
                        form={form}
                        name={`variations.${index}.lf`}
                        label='Lf'
                        placeholder='Enter Lf'
                        type='number'
                      />
                      <FormInputField
                        form={form}
                        name={`variations.${index}.eaPerUnit`}
                        label='Ea Per Unit'
                        placeholder='Enter Ea Per Unit'
                        type='number'
                      />
                      <FormInputField
                        form={form}
                        name={`variations.${index}.rollSqft`}
                        label='Roll Sq ft'
                        placeholder='EnterRoll Sq ft'
                        type='number'
                      />
                       <FormInputField
                        form={form}
                        name={`variations.${index}.rollLengthFt`}
                        label='Roll Length Ft'
                        placeholder='Enter Roll Length Ft'
                        type='number'
                      />
                       <FormInputField
                        form={form}
                        name={`variations.${index}.rollWidthIn`}
                        label='Roll Width In'
                        placeholder='Enter Roll Width In'
                        type='number'
                      />
                    </div>
                    <div className='select-default mt-2 flex justify-between'>
                 
                      <FormInputField
                        form={form}
                        name={`variations.${index}.variationId`}
                        placeholder='Enter id'
                        type='hidden'
                      />
                    </div>
                  </AccordionContent>
                </div>
              </AccordionItem>
            </Accordion>
          ))}

          <Separator className='mb-6 mt-8' />
          <CardDescription className='text-black-900 mb-3 mt-5 text-xl font-semibold'>
            Installation Package
          </CardDescription>
          <div>
            <TextEditor
              name='installationPackage'
              form={form}
              label='Installation Package'
              className='text-editor'
            />
          </div>

          <Separator className='mb-6 mt-8' />
          <CardDescription className='text-black-900 mb-3 mt-5 text-xl font-semibold'>
            Specifications
          </CardDescription>
          <div className='mt-5'>
            <FormTextArea
              form={form}
              name='specificationsDescription'
              label='Description'
              type='text'
              className='rounded-6 !min-h-12 bg-white !pr-7 pt-3 !shadow-[0_0_15px_-13px_black] shadow-slate-100'
            />
          </div>
          <FormSelectField
            form={form}
            name='manufacturer'
            label='Manufacturer'
            options={
              manufacturer.length > 0
                ? manufacturer.map(manu => ({
                    label: manu.title,
                    value: manu.title
                  }))
                : []
            }
          />

          <CardDescription className='text-black-900 mb-3 mt-5 text-base font-semibold'>
            Key Specifications
          </CardDescription>

          {specField.map((field, index) => (
            <div
              key={field.id}
              className='bg-gray-light mt-2 rounded border p-4'
            >
              <div className='grid grid-cols-2 gap-4'>
                <FormInputField
                  form={form}
                  name={`keySpecifications.${index}.title`}
                  label='Title'
                  placeholder='Enter Title'
                  type='text'
                />
                <FormInputField
                  form={form}
                  name={`keySpecifications.${index}.value`}
                  label='Value'
                  placeholder='Enter Value'
                  type='text'
                />
              </div>
              <FormInputField
                form={form}
                name={`keySpecifications.${index}.description`}
                label='Description'
                placeholder='Enter Description'
                type='text'
              />
              <div className='flex justify-end gap-2'>
                <div
                  className='flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-primary'
                  onClick={() =>
                    appendSpecField({ title: '', value: '', description: '' })
                  }
                >
                  <Plus className='text-light-color h-5 w-5 text-orange-500' />
                </div>
                {specField.length > 1 && (
                  <div
                    className='flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-red-500'
                    onClick={() => removespec(index)}
                  >
                    <Trash2 className='h-5 w-5 text-orange-500 text-white' />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className='rounded-6 bg-gray-light mt-4 w-1/4 border border-slate-200 p-3.5'>
          <CategoryListSideBar form={form} />
        </div>
      </div>
    </>
  )
}

export default AddProductFields
