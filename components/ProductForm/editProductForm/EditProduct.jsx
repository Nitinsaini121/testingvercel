'use client'
import FormInputField from '@/components/share/form/FormInputField'
import FormSelectField from '@/components/share/form/FormSelect'
import ImageUpload from '@/components/share/form/ImageUpload'
import FormTextArea from '@/components/share/form/TextArea'
import VariationFormSelect from '@/components/share/form/VariationFormSelect'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import TextEditor from '@/components/work-order/TextEditor'
import { toast } from '@/hooks/use-toast'
import api from '@/lib/api'
import { Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import CategoryListSideBar from '../CategoryListSideBar'
import { generateCombinations } from '../VariationGenrate'
import EditAttributes from './EditProductAttributes'

const EditProductFields = ({
  form,
  onSaveAttribute,
  allAttributeList,
  getListAttributes,
  attribute,
  duplicateVari,
  skuDuplicate,
  missingPrice,
  missingSku,
  setIfDelete,
  variationIndexRef,
  setChangedAttri,
  changedAttri
}) => {
  const [manufacturer, setManufacturer] = useState([])
  const [dataVar, setDataVar] = useState([])
  const [dataCheck, setDataCheck] = useState([])
  // global pointer to track which variation was added last
  const [finalVariationData, setFinalVariationData] = useState([])
  const {
    fields: variationFields,
    append: appendVariation,
    remove: removeVariations
  } = useFieldArray({
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

  // all Variations Variations handler : )
  // const autoGenerateVariations = (e, allDataAttribute) => {
  //   e.preventDefault()

  //   if (!allDataAttribute?.length) return

  //   // Step 1: Generate all possible combinations
  //   const allCombinations = generateCombinations(allDataAttribute, 'allgen')
  //   // Step 2: Get manually added variations (from localStorage)
  //   const manuallyAddedVariationData =
  //     JSON.parse(localStorage.getItem('variations')) || []

  //   // Step 3: If no manual variations exist, store all combinations directly
  //   if (!manuallyAddedVariationData?.length) {
  //     localStorage.setItem('variations', JSON.stringify(allCombinations))
  //     for (let index = 0; index < allCombinations.length; index++) {
  //       variationIndexRef.current += 1
  //     }
  //     setDataVar(allCombinations)
  //     return
  //   }

  //   const getVarationsValue = form.getValues('variations')
  //   console.log('getVarationsValue', getVarationsValue)

  //   console.log("PPPallCombinations", allCombinations)
  //   console.log("PPPmanuallyAddedVariationData", allCombinations)

  //   // Step 4: Add remaining combinations based on count (no duplicate check)
  //   const remaining = allCombinations.slice(manuallyAddedVariationData.length)
  //   console.log("PPPremaining", remaining)

  //   const updatedVariations = [...manuallyAddedVariationData, ...remaining]

  //   console.log('PPPupdatedVariations', updatedVariations)

  //   for (let index = 0; index < remaining.length; index++) {
  //     variationIndexRef.current += 1
  //   }

  //   // Step 5: Save updated list
  //   localStorage.setItem('variations', JSON.stringify(updatedVariations))
  //   setDataVar(updatedVariations)
  // }

  const autoGenerateVariations = (e, allDataAttribute) => {
    e.preventDefault()

    if (!allDataAttribute?.length) return

    const allCombinations = generateCombinations(allDataAttribute, 'allgen')

    const manuallyAddedVariationData =
      JSON.parse(localStorage.getItem('variations')) || []

    if (!manuallyAddedVariationData?.length) {
      localStorage.setItem('variations', JSON.stringify(allCombinations))
      for (let index = 0; index < allCombinations.length; index++) {
        variationIndexRef.current += 1
      }
      setDataVar(allCombinations)
      return
    }

    const getVarationsValue = form.getValues('variations')
    // compair logic :-

    const unmatched = allCombinations.filter(item => {
      const isMatched = getVarationsValue.some(matcher => {
        return item.fieldData.every(field => {
          return matcher[field.fieldName] === field.defaultValue
        })
      })
      return !isMatched // keep only unmatched
    })

    const updatedVariations = [...manuallyAddedVariationData, ...unmatched]

    for (let index = 0; index < unmatched.length; index++) {
      variationIndexRef.current += 1
    }

    // Step 5: Save updated list
    localStorage.setItem('variations', JSON.stringify(updatedVariations))
    setDataVar(updatedVariations)
  }
  // add Manually Variations Variations handler : )
  const addManuallyVariations = (e, fullAttributes) => {
    e.preventDefault()
    if (!Array.isArray(fullAttributes)) return

    // Step 1: Generate all combinations once
    const allCombinations = generateCombinations(fullAttributes, 'manually')
    const manuallyAddedVariationData =
      JSON.parse(localStorage.getItem('variations')) || []
    if (manuallyAddedVariationData.length === allCombinations.length) return

    if (!allCombinations.length) return

    const currentIndex = variationIndexRef.current

    // Step 2: Stop if all variations already added
    if (currentIndex >= allCombinations.length) {
      console.log('All variations added.')
      return
    }

    const nextVariation = allCombinations[currentIndex]

    // Step 3: Get existing variations (from localStorage or state)
    const existing = Array.isArray(variationData) ? variationData : []

    // Step 4: Add new one without checking for duplicates
    const updated = [...existing, nextVariation]
    localStorage.setItem('variations', JSON.stringify(updated))
    setDataVar(updated)

    // Step 5: Move to next
    variationIndexRef.current += 1
  }

  // Handle Variation Delete :)-
  const handleVariationDelete = (e, index) => {
    e.preventDefault()
    const variationDataa = JSON.parse(localStorage.getItem('variations')) || []
    const updatedVariations = variationDataa.filter((_, idx) => idx !== index)
    variationIndexRef.current -= 1
    setDataVar(updatedVariations)
    removeVariations(index)
    setIfDelete('isDeleted')
    localStorage.setItem('variations', JSON.stringify(updatedVariations))
  }

  //for variation update render :)***
  useEffect(() => {
    console.log('Check', form.watch('variations'))
  }, [dataVar])

  useEffect(() => {
    form.reset()
  }, [form])

  useEffect(() => {
    variationIndexRef.current = 0
  }, [])

  const uomOptions = ['kg', 'm', 'pcs', 'box', 'liters']

  const getVarationsValue = form.getValues('variations')
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

          <EditAttributes
            getListAttributes={getListAttributes}
            allAttributeList={allAttributeList}
            onSaveAttribute={onSaveAttribute}
            removeVariations={removeVariations}
            setFinalVariationData={setFinalVariationData}
            variationIndexRef={variationIndexRef}
            setChangedAttri={setChangedAttri}
            changedAttri={changedAttri}
          />

          <Separator className='mt-8' />

          {!changedAttri && attribute?.length ? (
            <div className='flex gap-6'>
              <Button
                className='site-button mt-4'
                onClick={e => autoGenerateVariations(e, attribute)}
              >
                Generate Variations
              </Button>
              <Button
                className='site-button mt-4'
                onClick={e => addManuallyVariations(e, attribute)}
              >
                Add Manually
              </Button>
            </div>
          ) : (
            ''
          )}

          <CardDescription className='text-black-900 mb-3 mt-5 text-xl font-semibold'>
            Variations
          </CardDescription>
          {variationData?.length ? (
            <>
              {duplicateVari && (
                <span className='text-red-600'>
                  {' '}
                  Duplicate variation value,
                </span>
              )}
              {skuDuplicate && (
                <span className='text-red-600'> SKU value is Duplicate,</span>
              )}
            </>
          ) : null}

          {variationData?.map((field, index) => {
            return (
              <Accordion
                key={field?.mainId}
                type='single'
                collapsible
                className='w-full'
              >
                <AccordionItem value={`${field?.mainId}`}>
                  <div
                    className={
                      form?.formState?.errors?.variations?.some(
                        (_, i) => i == index
                      )
                        ? 'g-gray-light mt-2 w-full rounded border border-red-700 px-4 pb-2 pt-0'
                        : 'g-gray-light mt-2 w-full rounded border px-4 pb-2 pt-0'
                    }
                  >
                    <AccordionTrigger className='pb-0 pt-2'>
                      <span>#ID{field?.mainId}</span>
                      <div className='flex gap-16'>
                        {field?.fieldData?.map((f, i) => {
                          return (
                            <>
                              <VariationFormSelect
                                key={`${index}-${i}`}
                                className='w-32 p-2'
                                form={form}
                                name={`variations.${index}.${f.fieldName}`}
                                placeholder={f.fieldName}
                                options={f.options}
                                defaultValue={f?.defaultValue}
                              />
                            </>
                          )
                        })}
                        <Button
                          className='mt-3 w-8 bg-red-600 p-2'
                          onClick={e => handleVariationDelete(e, index)}
                        >
                          X
                        </Button>
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
                          name={`variations.${index}.quantity`}
                          label='Qty'
                          placeholder='Enter Qty'
                          type='number'
                        />

                        <FormInputField
                          form={form}
                          name={`variations.${index}.cost`}
                          label='Cost'
                          placeholder='Enter Cost'
                          type='number'
                        />
                        <FormSelectField
                          className='!mt-7 h-10'
                          form={form}
                          name={`variations.${index}.uom`}
                          placeholder='UOM'
                          options={uomOptions.map(uom => ({
                            label: uom,
                            value: uom
                          }))}
                        />
                        <FormInputField
                          form={form}
                          name={`variations.${index}.sku`}
                          label='SKU'
                          placeholder='Enter SKU'
                          options={uomOptions.map(uom => ({
                            label: uom,
                            value: uom
                          }))}
                        />
                        <FormInputField
                          form={form}
                          name={`variations.${index}.coverageAreaSqft`}
                          label='Area Sq ft'
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
                        {/* <FormCheckBox
              form={form}
              name={`variations.${index}.default`}
              description='Select Default'
            /> */}
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
            )
          })}

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

export default EditProductFields
