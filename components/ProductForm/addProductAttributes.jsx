import { yupResolver } from '@hookform/resolvers/yup'
import { Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { ProductAttributeValidationSchema } from '../form-validations/product-Attributevalidation'
import AttributeServices from '../../services/attribute-api'
import AtributeFormMultipleSelect from '../share/form/AtributeFormMultipleSelect'
import FormInputField from '../share/form/FormInputField'
import FormSelectField from '../share/form/FormSelect'
import { errorMessage } from '../ToasterMessage'
import { Button } from '../ui/button'
import { Form } from '../ui/form'

const AddAttributes = ({ onSaveAttribute, setFinalVariationData }) => {
  const [Attribute, setAttributeOptions] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [attributeListValue, setAttributeValue] = useState([])
  const [atributeFieldNameLength, setAtributeFieldNameLength] = useState()

  let newOptions = []
  const form = useForm({
    defaultValues: {
      attributes: []
    },
    resolver: yupResolver(ProductAttributeValidationSchema)
  })

  const {
    fields: attribute,
    append: appendAttribute,
    remove: removeAttribute
  } = useFieldArray({
    control: form.control,
    name: 'attributes'
  })

  //getAttribute :-
  useEffect(() => {
    const getAttribute = async () => {
      try {
        const response = await AttributeServices.getAllAttributes()
        if (response.status === 200) {
          setAttributeOptions(response?.data?.data?.attributes)
          setAttributeValue(response?.data?.data?.attributes)
        }
      } catch (error) {
        if (error) {
          errorMessage({ description: error?.response?.data?.message })
        }
      }
    }
    getAttribute()
  }, [])

  const selectedExisting = form.watch('addExisting')

  // Handle adding existing value
  useEffect(() => {
    if (selectedExisting) {
      const existingAttribute = Attribute.find(
        attr => attr.name === selectedExisting
      )

      if (existingAttribute) {
        const formattedValue = existingAttribute.value
          ? existingAttribute.value.split(',').map(val => ({
              label: val.trim(),
              value: val.trim()
            }))
          : []

        appendAttribute({
          name: existingAttribute.name,
          value: formattedValue
        })

        form.setValue('addExisting', '')
        setIsFormOpen(true) // Open form when existing attribute is added
      }
    }
  }, [selectedExisting, Attribute, appendAttribute, form])

  // Attribute options handler
  useEffect(() => {
    if (!attribute) return
    const filteredOptions = attributeListValue?.filter(
      item => !attribute.some(element => element.name === item.name)
    )
    setAttributeOptions(filteredOptions)
    if (!attribute?.length) {
      setAttributeOptions(attributeListValue)
      setIsFormOpen(false)
    }
  }, [attribute])

  const localDataAttribute = JSON?.parse(
    localStorage?.getItem('oldAtributeData')
  )

  useEffect(() => {
    if (localDataAttribute !== 0) {
      localDataAttribute?.forEach(item => {
        const existingAttribute = Attribute?.find(
          attr => attr.name == item.name
        )

        if (existingAttribute) {
          const formattedValue = existingAttribute?.value
            ? existingAttribute.value.split(',').map(val => ({
                label: val.trim(),
                value: val.trim()
              }))
            : []
          if (atributeFieldNameLength == attribute?.length) {
            appendAttribute({
              name: existingAttribute.name,
              value: formattedValue
            })
          }

          form.setValue('addExisting', '')
        }
      })
    }
    setAtributeFieldNameLength(attribute.length)
  }, [Attribute, appendAttribute, form])

  useEffect(() => {
    if (!attribute || attribute.length === 0) {
      localStorage.removeItem('variations')
      setFinalVariationData([]) // Optional: clear state if attributes are empty
      return
    }

    const formattedCombinations = generateCombinations(attribute)
    localStorage.setItem('variations', JSON.stringify(formattedCombinations))
    // form.reset()
    setFinalVariationData(formattedCombinations)
  }, [attribute])

  const generateCombinations = attributes => {
    const result = []

    const getCombinations = (index, current) => {
      if (index === attributes?.length) {
        result.push([...current])
        return
      }

      if (
        !attributes[index] ||
        !attributes[index].name ||
        !Array.isArray(attributes[index].value)
      ) {
        console.error('errrror', index, attributes[index])
        return
      }

      attributes[index].value.forEach(val => {
        const newCurrent = [...current]

        if (
          !newCurrent.some(item => item.fieldName === attributes[index].name)
        ) {
          newCurrent.push({
            fieldName: attributes[index].name,
            options: attributes[index].value.map(v => ({ label: v, value: v }))
          })
        }

        getCombinations(index + 1, newCurrent)
      })
    }

    getCombinations(0, [])
    return result
  }
  return (
    <>
      <Form {...form}>
        <form>
          <div className='flex items-center justify-start gap-4'>
            {/* Add New Button */}
            {/* <Button
              type='button'
              onClick={() => {
                appendAttribute({
                  name: '',
                  value: []
                })
                setIsFormOpen(true) // Open form when adding new attribute
              }}
              className='w-24'
            >
              Add new
            </Button> */}

            {/* Select Existing Dropdown */}
            <FormSelectField
              className='h-12 w-96'
              form={form}
              name='addExisting'
              placeholder='Add Existing'
              options={
                Attribute?.length > 0
                  ? Attribute.map(data => ({
                      label: data.name,
                      value: data.name
                    }))
                  : []
              }
            />
          </div>
          {/* Render Dynamic Attributes */}
          {attribute?.map((field, index) => {
            return (
              <div
                key={field.id}
                className='grid grid-cols-3 items-center gap-4'
              >
                <FormInputField
                  form={form}
                  name={`attributes.${index}.name`}
                  placeholder='Enter name'
                  label='Name'
                  disable
                />
                <AtributeFormMultipleSelect
                  form={form}
                  name={`attributes.${index}.value`}
                  placeholder='Enter value'
                  label='Value'
                  options={
                    attributeListValue
                      ?.find(
                        attr =>
                          attr.name ===
                          form.getValues(`attributes.${index}.name`)
                      )
                      ?.configAttributes?.map(config => ({
                        label: config.name,
                        value: config.name
                      })) || []
                  }
                  fieldValue={form.getValues(`attributes.${index}.name`)}
                />
                {/* {attribute?.length && (
                  <div className='relative top-3 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-red-500'>
                    <Trash2
                      type='button'
                      className='h-5 w-5 text-white'
                      onClick={() => removeAttribute(index)}
                    />
                  </div>
                )} */}

                {attribute?.length > 0 && (
                  <div className='relative top-3 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-red-500'>
                    <Trash2
                      type='button'
                      className='h-5 w-5 text-white'
                      onClick={() => {
                        const currentAttributes =
                          form.getValues('attributes') || []
                        currentAttributes.splice(index, 1)
                        form.setValue('attributes', currentAttributes)
                        removeAttribute(index)
                      }}
                    />
                  </div>
                )}
              </div>
            )
          })}

          {/* Show Save Button ONLY if form is open */}
          {attribute?.length ? (
            <Button
              type='button'
              onClick={form.handleSubmit(onSaveAttribute)}
              className='site-button mt-4'
            >
              Save Attributes
            </Button>
          ) : (
            ''
          )}
        </form>
      </Form>
    </>
  )
}

export default AddAttributes
