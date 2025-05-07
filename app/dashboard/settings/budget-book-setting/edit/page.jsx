'use client'
import Scope from '@/components/BudgetBookScope/Scope'
import LayoutHeader from '@/components/layoutHeader'
import BudgetScopeService from '@/services/Budget-scope-api'
import { successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const EditScope = () => {
  const form = useForm({})
  const [editData, setEditData] = useState()
  const router = useRouter()
  console.log('editData', editData)
  useEffect(() => {
    form.reset(editData)
  }, [editData])
  const searchParams = useSearchParams()
  const scopId = searchParams.get(`id`)
  const FetchScopeById = async () => {
    try {
      const response = await BudgetScopeService.GetScopesBYId(scopId)
      if (response.status === 200) {
        setEditData(response?.data?.data)
      }
    } catch (error) {
      console.log('error', error)
    }
  }
  useEffect(() => {
    FetchScopeById()
  }, [scopId])

  
  const onSubmitScope = async data => {
    const formData = {
      ...data,
      _method: 'PUT'
    }
    try {
      const response = await BudgetScopeService.UpdateScopesById(
        scopId,
        formData
      )
      if (response.status === 200) {
        successMessage({ description: 'Scope Update Successfully' })
        router.push(`/dashboard/settings/budget-book-setting/scopelist`)
      }
    } catch (error) {
      console.log('error', error)
    }
  }
  return (
    <>
      <div className='mb-3 flex items-center justify-between'>
        <LayoutHeader pageTitle='Scope' />
        <Button
          className='site-button'
          onClick={() =>
            router.push(`/dashboard/settings/budget-book-setting/scopelist`)
          }
        >
          All Scope
        </Button>
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmitScope)}>
          <Scope form={form} />
          <div className='mt-4 flex justify-end gap-4'>
            <Button type='submit' className='site-button'>
              Update
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default EditScope
