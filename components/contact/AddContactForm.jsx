'use client'
import api from '@/lib/api'
import BudgetBookService from '@/services/budget-book-api'
import ContactServices from '@/services/contact'
import CustomerService from '@/services/customer-api'
import { useEffect, useState } from 'react'
import BudgetBooksServices from '../../services/budgetBook'
import LeadsServices from '../../services/leads-api'
import FormInputField from '../share/form/FormInputField'
import FormSelectField from '../share/form/FormSelect'

export default function AddContactForm({ form }) {
  const [companyData, setCompanyData] = useState([])
  const [zipCode, setZipCode] = useState([])

  /// get project
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          zipCodeRes,
          areaRes,
          submRes,
          contractorRes,
          engRes,
          customerRes,
          budgetScopeRes,
          contactRes,
          budgetRes
        ] = await Promise.all([
          api.get('taxes?limit=100'),
          api.get('/key-areas?limit=100'),
          api.get('/submittals?limit=100'),
          ContactServices.ContractorComponents(),
          CustomerService.GetEngineers(),
          CustomerService.GetCustomer(),
          BudgetBookService.GetBudgetScop(),
          BudgetBookService.GetContacts(),
          BudgetBooksServices.budgetBooks()
        ])
        if (zipCodeRes.status === 200) {
          const modifyProjectData = zipCodeRes?.data?.data.map(item => {
            return {
              label: `${item.zipcode} ${item.name}`,
              value: String(item.id)
            }
          })
          setZipCode(modifyProjectData)
        }
        if (areaRes.status === 200) setKeyArea(areaRes.data.data)
        if (submRes.status === 200) setDarwing(submRes.data.data)
        if (contractorRes.status === 200) setContractor(contractorRes.data.data)
        if (engRes.status === 200) {
          const modifyProjectData = engRes?.data?.data.map(item => {
            return {
              label: item.name,
              value: String(item.id)
            }
          })
          setEnginer(modifyProjectData)
        }
        if (customerRes.status === 200) {
          const modifyProjectData = customerRes?.data?.data.map(item => {
            return {
              label: item.name,
              value: String(item.id)
            }
          })
          setCustomer(modifyProjectData)
        }

        // Get the budget Scope
        if (budgetScopeRes.status === 200)
          setAllScop(budgetScopeRes?.data?.data)

        // Get the all contact to sent in the fields
        if (contactRes.status === 200) {
          const modifyProjectData = contactRes?.data?.data.map(item => {
            return {
              label: item.name,
              value: String(item.id)
            }
          })
          setAllContacts(modifyProjectData)
        }

        // Set The Price field data
        if (budgetRes.status === 200) {
          const modifyProjectData = budgetRes?.data?.data.map(item => {
            return {
              label: item.name,
              value: String(item.id)
            }
          })
          setAllProject(modifyProjectData)
        }
      } catch (error) {
        console.log('Fetch error', error)
      }
    }

    fetchAllData()
  }, [])
  const getCompanies = async () => {
    try {
      const response = await LeadsServices.companies()
      if (response.status === 200) {
        setCompanyData(response?.data?.data)
      }
    } catch (error) {
      console.log(error)
      errorMessage({
        description: error?.response?.data?.message || 'Something went wrong.'
      })
    }
  }

  useEffect(() => {
    getCompanies()
  }, [])
  return (
    <div>
      <div className='mt-4 grid grid-cols-2 gap-4'>
        <div className='space-y-1'>
          <label className='text-sm font-medium !text-gray-800 text-muted-foreground'>
            Name
          </label>
          <FormInputField name='name' type='text' className='' />
        </div>{' '}
        <div className='space-y-1'>
          <label className='text-sm font-medium !text-gray-800 text-muted-foreground'>
            Email
          </label>
          <FormInputField name='email' type='email' className='' />
        </div>
      </div>
      <div className='mt-4 grid grid-cols-2 gap-4'>
        <div className='space-y-1'>
          <label className='text-sm font-medium !text-gray-800 text-muted-foreground'>
            Phone
          </label>
          <FormInputField name='phone' type='text' className='' />
        </div>
        <div className='space-y-1'>
          <label className='text-sm font-medium !text-gray-800 text-muted-foreground'>
            Company
          </label>
          <FormSelectField
            form={form}
            name='company_id'
            placeholder='Select Company'
            options={
              companyData.length > 0
                ? companyData.map(data => ({
                    label: data.name,
                    value: String(data.id)
                  }))
                : []
            }
          />
        </div>
      </div>
      <div className='mt-4 grid grid-cols-3 gap-2'>
        <div className='space-y-1'>
          <FormInputField
            placeholder='City'
            form={form}
            name='city'
            label='City'
            type='text'
          />
        </div>
        <div className='space-y-1'>
          <FormInputField
            placeholder='State'
            form={form}
            name='state'
            label='State'
            type='text'
          />
        </div>
        <div className='space-y-1'>
          <FormSelectField
            name='zip'
            form={form}
            placeholder=''
            label='Zip Code'
            options={zipCode}
          />
        </div>
      </div>
      <div className='mt-4 grid grid-cols-1 gap-4'>
        <div className='space-y-1'>
          <label className='text-sm font-medium !text-gray-800 text-muted-foreground'>
            Address
          </label>

          <FormInputField name='address' type='text' className='' />
        </div>
      </div>
    </div>
  )
}
