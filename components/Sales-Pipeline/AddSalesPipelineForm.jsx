'use client'
import { useEffect, useState } from 'react'
import BudgetBooksServices from '../../services/budgetBook'
import LeadsServices from '../../services/leads-api'
import UsersServices from '../../services/salePerson'
import FormInputField from '../share/form/FormInputField'
import FormMultiSelectField from '../share/form/FormMultiSelect'
import FormSelectField from '../share/form/FormSelect'
import LeadsSettingServices from '@/services/LeadSetting'

export default function AddSalesPipelineForm({ form }) {
  const [budgetBook, setBudgetBook] = useState([])
  const [assign, setassign] = useState([])
  const [tag, setTag] = useState([])
  const [companyData, setCompanyData] = useState([])

  const [leadStatus, setLeadStatus] = useState([])
  const priorityOption = [
    { label: 'High', value: 'High' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Low', value: 'Low' }
  ]
  const nextActionOption = [
    { label: 'Follow up call', value: 'Follow up call' },
    { label: 'Finalize Proposal', value: 'Finalize Proposal' },
    { label: 'Prepare Demo', value: 'Prepare Demo' }
  ]
  const statusOption = [
    { label: 'New opportunities', value: 'New opportunities' },
    { label: 'Active opportunities', value: 'Active opportunities' },
    { label: 'Late Stage opportunities', value: 'Late Stage opportunities' },
    { label: 'Close Won', value: 'Close Won' },
    { label: 'Close Lost', value: 'Close Lost' }
  ]
  const leadStatusOption = [
    { label: 'Proposal', value: 'Proposal' },
    { label: 'Qualification', value: 'Qualification' },
    { label: 'Meeting', value: 'Meeting' },
    { label: 'Closed', value: 'Closed' }
  ]
  const getBudgetBooks = async () => {
    try {
      const response = await BudgetBooksServices.budgetBooks()
      if (response.status === 200) {
        setBudgetBook(response?.data?.data)
      }
    } catch (error) {
      console.log('err', error)
      errorMessage({
        description: error?.response?.data?.message || 'Something went wrong.'
      })
    }
  }

  useEffect(() => {
    getBudgetBooks()
  }, [])

  const getUsers = async () => {
    try {
      const response = await UsersServices.users()
      if (response.status === 200) {
        setassign(response?.data?.data)
      }
    } catch (error) {
      console.log('err', error)
      errorMessage({
        description: error?.response?.data?.message || 'Something went wrong.'
      })
    }
  }

  useEffect(() => {
    getUsers()
  }, [])
  /// get project
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [leadstatus, tagRes] = await Promise.all([
          LeadsSettingServices.getLeadsStatus(),
          LeadsSettingServices.getTags()
        ])
        if (leadstatus.status === 200) {
          const modifyProjectData = leadstatus?.data?.data.map(item => {
            return {
              label: item.title,
              value: String(item.id)
            }
          })
          setLeadStatus(modifyProjectData)
        }

        if (tagRes.status === 200) {
          const modifyProjectData = tagRes?.data?.data.map(item => {
            return {
              label: item.title,
              value: String(item.id)
            }
          })
          setTag(modifyProjectData)
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
            Project
          </label>
          <FormSelectField
            form={form}
            name='projectId'
            placeholder='Select Project'
            options={
              budgetBook.length > 0
                ? budgetBook.map(data => ({
                    label: data.name,
                    value: String(data.id)
                  }))
                : []
            }
          />
        </div>
        <div className='space-y-1'>
          <label className='text-sm font-medium !text-gray-800 text-muted-foreground'>
            Assign
          </label>
          <FormSelectField
            form={form}
            name='assign'
            placeholder='Select Assign Users'
            options={
              assign.length > 0
                ? assign.map(data => ({
                    label: data.name,
                    value: String(data.id)
                  }))
                : []
            }
          />
        </div>
      </div>
      <div className='mt-4 grid grid-cols-2 gap-4'>
        <div className='space-y-1'>
          <label className='text-sm font-medium !text-gray-800 text-muted-foreground'>
            Estimated Value
          </label>
          <FormInputField name='estimatedValue' type='number' className='' />
        </div>{' '}
        <div className='space-y-1 select-tags'>
          <label className='text-sm font-medium !text-gray-800 text-muted-foreground'>
            Tags
          </label>
          <FormMultiSelectField
            form={form}
            placeholder='Select Tags'
            name='tags'
            options={tag}
          />
        </div>
      </div>
      <div className='mt-4 grid grid-cols-2 gap-4'>
        <div className='space-y-1'>
          <label className='text-sm font-medium !text-gray-800 text-muted-foreground'>
            Priority
          </label>
          <FormSelectField
            form={form}
            name='priority'
            placeholder='Select Priority'
            options={priorityOption}
          />
        </div>
        <div className='space-y-1'>
          <label className='text-sm font-medium !text-gray-800 text-muted-foreground'>
            Company
          </label>
          <FormSelectField
            form={form}
            name='company'
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
      <div className='mt-4 grid grid-cols-2 gap-4'>
        <div className='space-y-1'>
          <label className='text-sm font-medium !text-gray-800 text-muted-foreground'>
            Status
          </label>
          <FormSelectField
            form={form}
            name='type'
            placeholder='Select Type'
            options={statusOption}
          />
        </div>
        <div className='space-y-1'>
          <label className='text-sm font-medium !text-gray-800 text-muted-foreground'>
            Next Action
          </label>
          <FormSelectField
            form={form}
            name='nextAction'
            placeholder='Select  Next Action'
            options={nextActionOption}
          />
        </div>
      </div>
      <div className='mt-4 grid grid-cols-1 gap-4'>
        <div className='space-y-1'>
          <label className='text-sm font-medium !text-gray-800 text-muted-foreground'>
            Lead Status
          </label>
          <FormSelectField
            form={form}
            name='status'
            placeholder='Select Lead Status'
            options={leadStatusOption}
          />
        </div>
      </div>
    </div>
  )
}
