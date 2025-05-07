'use client'
'use client'
import { ConfigureAttributeValidationSchema } from '@/components/form-validations/configAttributes-validation'
import LayoutHeader from '@/components/layoutHeader'
import ConfigureAttributeServices from '@/components/services/configure-attribute-api'
import FormInputField from '@/components/share/form/FormInputField'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import ConfigAttributeTableData from './ConfigAttribute-tableData'

const AttributeModule = () => {
  const searchParams = useSearchParams()
  const attributeId = searchParams.get('attributeId')
  const [allConfiAttribute, setAllConfiAttribute] = useState([])
  const [loading, setLoading] = useState(true)
  const form = useForm({
    defaultValues: {
      name: '',
      slug: '',
      description: ''
    },
    resolver: yupResolver(ConfigureAttributeValidationSchema)
  })
  useDocumentTitle('Attributes')

  const handleAttributeSubmit = async data => {
    setLoading(true)
    try {
      // Check if an attribute with the same name already exists
      const isNameTaken = allConfiAttribute.some(
        attr => attr.name.toLowerCase() === data.name.toLowerCase()
      )
      if (isNameTaken) {
        errorMessage({
          description: 'An configure attribute with this name already exists.'
        })
        setLoading(false)
        form.reset()
        return // Stop further execution
      }
      const payload = [{ ...data, attributeId }]

      const response =
        await ConfigureAttributeServices.addConfigureAttribute(payload)
      form.reset()
      if (response?.status === 200) {
        successMessage({ description: response?.data?.message })

        getAllAttributes()
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    } finally {
      setLoading(false)
    }
  }

  const getAllAttributes = async () => {
    try {
      const res =
        await ConfigureAttributeServices.getAllConfigAttributes(attributeId)
      if (res?.status === 200) {
        setAllConfiAttribute(res.data.data?.attributes)
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }

  useEffect(() => {
    getAllAttributes()
  }, [])
  const name = form.watch('name')

  useEffect(() => {
    if (name) {
      const generatedSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
      form.setValue('slug', generatedSlug)
    }
  }, [name, form])

  return (
    <>
      <div className='flex items-center justify-between'>
        <LayoutHeader pageTitle={'Configure Attributes'} />
      </div>
      <Separator />
      <div className=''>
        <FormProvider {...form}>
          <form
            className='Confiattributes-form flex items-center gap-4'
            onSubmit={form.handleSubmit(handleAttributeSubmit)}
          >
            {/* <div> */}
            <FormInputField
              form={form}
              name='name'
              placeholder='Enter name'
              label='Name'
            />
            <FormInputField
              form={form}
              name='slug'
              placeholder='Enter slug'
              label='Slug'
              disable
            />
            <FormInputField
              form={form}
              name='description'
              placeholder='Enter description'
              label='Description'
            />
            <div className='addConfi-button'>
              <Button type='submit' className='site-button mt-5'>
                Add Configure Attribute
              </Button>
            </div>
            {/* </div> */}
          </form>
        </FormProvider>
      </div>
      <ConfigAttributeTableData
        loading={loading}
        setLoading={setLoading}
        allConfiAttribute={allConfiAttribute}
        getAllAttributes={getAllAttributes}
      />
    </>
  )
}

export default AttributeModule
