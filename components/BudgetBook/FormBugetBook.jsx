'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useFormContext, useWatch } from 'react-hook-form'
import LayoutHeader from '../layoutHeader'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { BudgetTab } from './tabs/budget'
import BudgetCoverTab from './tabs/cover'
import BudgetGeneralTab from './tabs/general'
import BudgetOptionTab from './tabs/option'
import BudgetScopeTab from './tabs/scope'
import BudgetSiteTab from './tabs/site'

const FormBugetBook = ({ form, pageTitle }) => {
  const { control, getValues } = useFormContext()
  const isPricing = useWatch({ control, name: 'is_pricing' })

  ///\/// budget save handler
  const budgetSavehandler = () => {
    const values = getValues()
    localStorage.setItem('budgetForm', JSON.stringify(values))
  }

  return (
    <>
      {isPricing ? (
        <Button type='button' className='site-button bg-red'>
          Budget Only
        </Button>
      ) : null}

      <div className='mb-3 flex items-center justify-between'>
        <LayoutHeader pageTitle={pageTitle} />
        <div className='flex gap-2'>
          <Link href='/dashboard/budget-book'>
            <Button type='button' className='site-button bg-white'>
              Back
            </Button>
          </Link>
          <Button
            type='button'
            onClick={budgetSavehandler}
            className='site-button'
          >
            Save
          </Button>
          <Button type='submit' className='site-button'>
            Save & Close
          </Button>
        </div>{' '}
      </div>

      <Tabs defaultValue='general'>
        <TabsList className='custom-tabs mb-3 w-full justify-start gap-2 rounded-none border-b bg-white p-0'>
          <TabsTrigger
            value='general'
            className='rounded-none px-4 py-2 !shadow-none'
          >
            General
          </TabsTrigger>
          <TabsTrigger
            value='site'
            className='rounded-none px-4 py-2 !shadow-none'
          >
            Site
          </TabsTrigger>
          <TabsTrigger
            value='budget'
            className='rounded-none px-4 py-2 !shadow-none'
          >
            Budget
          </TabsTrigger>
          <TabsTrigger
            value='cover'
            className='rounded-none px-4 py-2 !shadow-none'
          >
            Cover
          </TabsTrigger>
          <TabsTrigger
            value='option'
            className='rounded-none px-4 py-2 !shadow-none'
          >
            Option
          </TabsTrigger>
          <TabsTrigger
            value='scope'
            className='rounded-none px-4 py-2 !shadow-none'
          >
            Scope
          </TabsTrigger>
        </TabsList>

        <TabsContent value='general'>
          <BudgetGeneralTab form={form} />
        </TabsContent>

        <TabsContent value='site'>
          <BudgetSiteTab form={form} />
        </TabsContent>

        <TabsContent value='budget'>
          <BudgetTab form={form} />
        </TabsContent>

        <TabsContent value='cover'>
          <BudgetCoverTab form={form} />
        </TabsContent>

        <TabsContent value='option'>
          <BudgetOptionTab form={form} />
        </TabsContent>

        <TabsContent value='scope'>
          <BudgetScopeTab form={form} />
        </TabsContent>
      </Tabs>
    </>
  )
}

export default FormBugetBook
