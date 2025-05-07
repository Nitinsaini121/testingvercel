'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { RoofDimensionValidation } from '../form-validations/RoofDimensionValidation'
import FormFieldDimension from '../RoofTopDimension/FormFieldDimension'
import DimensionService from '../services/dimension-Service'
import { errorMessage, successMessage } from '../ToasterMessage'
import { Button } from '../ui/button'
import { Form } from '../ui/form'
import { Spinner } from '../ui/spinner'

const RoofTopDimension = () => {
  const searchParams = useSearchParams()
  const [editData, setEditData] = useState()
  const leadId = searchParams.get('id')
  const [loading, setLoading] = useState(false)
  const form = useForm({ resolver: yupResolver(RoofDimensionValidation) })
  const onSubmitDimension = async data => {
    if (editData !== undefined) {
      try {
        const formData = { ...data, leadId: Number(leadId) }
        const response = await DimensionService.updateRoofMeasure(
          leadId,
          formData
        )
        if (response?.status === 200) {
          if (response?.data?.status === true) {
            successMessage({ description: response?.data?.message })
            fetchRoofMeasure()
          } else {
            errorMessage({ description: response?.data?.message })
          }
        }
      } catch (error) {
        // console.log("erroer",error)
        errorMessage({ description: error?.response?.data?.message })
      }
    } else {
      try {
        const formData = { ...data, leadId: Number(leadId) }
        const response = await DimensionService.addRoofMeasure(formData)
        if (response?.status === 200) {
          if (response?.data?.status === true) {
            successMessage({ description: response?.data?.message })
            fetchRoofMeasure()
          } else {
            errorMessage({ description: response?.data?.message })
          }
        }
      } catch (error) {
        console.log("erroer",error)
        // errorMessage({ description: error?.response?.data?.message })
      }finally {

      }
    }
  }

  const fetchRoofMeasure = async () => {
    try {
      const response = await DimensionService?.roofMeasureId(leadId)
      if (response.status === 200) {
        if (response?.data?.status === true) {
          setEditData(response?.data?.data)
          form.reset(response?.data?.data)
          successMessage({ description: response?.data?.message })
        } else {
          errorMessage({ description: response?.data?.message })
        }
      }
    } catch (error) {
      console.log("erroer",error)
      // errorMessage({ description: error?.response?.data?.message })
    }
  }
  useEffect(() => {
    if (leadId) {
      fetchRoofMeasure()
    }
  }, [leadId])
  // Calculate the rakes&eaves to fill the dripEdge&starter field
  const getRake = form.watch('rakes')
  const getEave = form.watch('eaves')
  const calculate = Number(getRake) + Number(getEave)
  form.setValue('dripEdge', calculate)
  form.setValue('starter', calculate)

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitDimension)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
            }
          }}
        >
          <FormFieldDimension form={form} />

          <div className='mt-5 flex justify-end'>
            {loading ? (
              <Button type='button' className='h-10 w-40'>
                <Spinner size='sm' className='m-auto bg-black dark:bg-white' />
              </Button>
            ) : (
              <Button className='site-button' type='submit'>
                {editData !== undefined ? 'Update' : 'Submit'}
              </Button>
            )}
          </div>
          <div className='mt-3 flex justify-end'></div>
        </form>
      </Form>
    </>
  )
}

export default RoofTopDimension
