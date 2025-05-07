'use client'
import { AttributeValidationSchema } from '@/components/form-validations/attributes-validation'
import LayoutHeader from '@/components/layoutHeader'
import AttributeServices from '@/components/services/attribute-api'
import FormInputField from '@/components/share/form/FormInputField'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import AttributeTableData from './attribute-tableData'
import { toast } from '@/hooks/use-toast'

const AttributeModule = () => {
  const [loading, setLoading] = useState(true)
  const [allAttribute, setAllAttribute] = useState([])
  const [fieldVerify, setFieldVerify] = useState()
  const form = useForm({
    defaultValues: {
      name: '',
      slug: ''
    },
    resolver: yupResolver(AttributeValidationSchema)
  })
  useDocumentTitle('Attributes')

  const handleAttributeSubmit = async data => {
    
    try {
      const valueVerify = allAttribute.some(
        item => item.name === data.name.toLowerCase()
      )
      if (valueVerify) {
        errorMessage({description:"An attribute with this name already exists."})
        // toast({
        //   variant: 'destructive',
        //   title: 'Duplicate Attribute',
        //   description: 'An attribute with this name already exists.'
        // })
        setLoading(false)
        form.reset()
        return // Stop further execution
      }
      const response = await AttributeServices.addAttribute(data)
      if (response.status === 200) {
        getAllAttributes()
        successMessage({ description: response.data.message })
      }
      form.reset()
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }
  const getAllAttributes = async () => {
    setLoading(true)
    try {
      const res = await AttributeServices.getAllAttributes()
      if (res?.status == 200) {
        setAllAttribute(res.data.data.attributes)
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getAllAttributes()
  }, [])
  return (
    <>
      <div className='flex items-center justify-between'>
        <LayoutHeader pageTitle={'Attributes'} />
      </div>
      <Separator />
      <div className=''>
        <FormProvider {...form}>
          <form
            className='attributes-form flex items-center gap-4'
            onSubmit={form.handleSubmit(handleAttributeSubmit)}
          >
            {/* <div> */}
            <FormInputField
              form={form}
              name='name'
              placeholder='Enter name'
              label='Name'
            />
            {/* <FormInputField
              form={form}
              name='slug'
              placeholder='Enter slug'
              label='Slug'
              disable
            /> */}
            <div className='add-button'>
              {/* {fieldVerify == 'Attribute already exists' ? (
                <span style={{ color: 'red' }}>{fieldVerify}</span>
              ) : ( */}
                <Button type='submit' className='site-button mt-5 w-32'>
                  Add Attribute
                </Button>
              {/* )} */}
            </div>
            {/* </div> */}
          </form>
        </FormProvider>
      </div>
      <AttributeTableData
        setLoading={setLoading}
        loading={loading}
        allAttribute={allAttribute}
        getAllAttributes={getAllAttributes}
      />
    </>
  )
}
export default AttributeModule
