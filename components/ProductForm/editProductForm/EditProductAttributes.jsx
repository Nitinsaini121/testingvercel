import { ProductAttributeValidationSchema } from '@/components/form-validations/product-Attributevalidation'
import AttributeServices from '@/components/services/attribute-api'
import AtributeFormMultipleSelect from '@/components/share/form/AtributeFormMultipleSelect'
import FormInputField from '@/components/share/form/FormInputField'
import FormSelectField from '@/components/share/form/FormSelect'
import { errorMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Trash2 } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'

const EditAttributes = ({
  onSaveAttribute,
  setFinalVariationData,
  removeVariations,
  variationIndexRef,
  setChangedAttri,
  changedAttri
}) => {
  const [Attribute, setAttributeOptions] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [attributeListValue, setAttributeValue] = useState([])
  const [atributeFieldNameLength, setAtributeFieldNameLength] = useState()
  const [chnagedAttriLoad, setChangedAttriLoad] = useState(null)

  const pathname = usePathname()
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

  // for atribute field append with data :)
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
    setAtributeFieldNameLength(attribute?.length)
  }, [Attribute])

  // for atribute field delete :)
  useEffect(() => {
    if (!attribute || attribute?.length === 0) {
      localStorage.removeItem('variations')
      setFinalVariationData([]) // Optional: clear state if attributes are empty
      return
    }
  }, [attribute])

  // for page reload to get data:)
  const hasRefreshed = useRef(false)

  useEffect(() => {
    if (!pathname || !pathname.includes('/edit')) return
    if (hasRefreshed.current) return

    hasRefreshed.current = true
    const refreshCount = Number(sessionStorage.getItem('refreshCount') || '0')

    if (refreshCount < 1) {
      sessionStorage.setItem('refreshCount', '1')
      setTimeout(() => {
        location.reload()
      }, 1000)
    } else {
      sessionStorage.removeItem('refreshCount')
    }
  }, [pathname])

  const handleAtrubuteRemove = index => {
    removeAttribute(index)
    removeVariations()
    // setChnagedAttri(true)
    variationIndexRef.current = 0
  }

  const changedAttrii = useWatch({
    control: form.control,
    name: 'attributes'
  })

  useEffect(() => {
    if ( chnagedAttriLoad !== null) {
      setChangedAttri(true)
    }
  }, [changedAttrii, chnagedAttriLoad, setChangedAttri])

 

  return (
    <>
      <Form {...form}>
        <form>
          <div className='flex items-center justify-start gap-4'>
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
                  setChangedAttriLoad={setChangedAttriLoad}
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
                {attribute?.length && (
                  <div className='relative top-3 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-red-500'>
                    <Trash2
                      type='button'
                      className='h-5 w-5 text-white'
                      onClick={() => handleAtrubuteRemove(index)}
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
          {changedAttri && attribute?.length ? (
            <span className='pl-20 text-yellow-600'> Save New Attributes! </span>
          ) : (
            ''
          )}
        </form>
      </Form>
    </>
  )
}

export default EditAttributes
