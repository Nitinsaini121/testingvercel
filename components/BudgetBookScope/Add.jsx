'use client'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import LayoutHeader from '../layoutHeader'
import BudgetScopeService from '../../services/Budget-scope-api'
import { successMessage } from '../ToasterMessage'
import { Button } from '../ui/button'
import Scope from './Scope'

const Add = () => {
  const form = useForm({})
  const router = useRouter()
  const onSubmitScope = async data => {
    try {
      const response = await BudgetScopeService.AddScopes(data)
      if (response.status === 200) {
        successMessage({ description: 'Scope Added Successfully' })
        router.push(`/dashboard/settings/budget-book-setting/scopelist`)
      }
    } catch (error) {
      console.log('error', error)
    }
  }
  const handleBack=()=>{
    router.push('/dashboard/settings/budget-book-setting/scopelist')
  }
  return (
    <>
      <div className='mb-3 flex items-center justify-between'>
        <LayoutHeader pageTitle='Scope' />
        <Button
          className='site-button-dark'
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
          <Button onClick={handleBack} type='button' className='site-button bg-cyan-400'>Back</Button>
            <Button type='submit' className='site-button'>
              Submit
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default Add
