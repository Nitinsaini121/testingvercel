'use client'
import LeadsSettingServices from '@/services/LeadSetting'
import PipelineStatusServices from '@/services/pipeline-status-group'
import { Plus, Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import BudgetBooksServices from '../../services/budgetBook'
import EngineerServices from '../../services/engineer'
import LeadsServices from '../../services/leads-api'
import UsersServices from '../../services/salePerson'
import { LeadFormDialog } from '../modal/lead-form-modal'
import SalesPersonSheet from '../modal/salePerson-sheet'
import FormDatePicker from '../share/form/datePicker'
import FormInputField from '../share/form/FormInputField'
import FormMultiSelectField from '../share/form/FormMultiSelect'
import FormSelectField from '../share/form/FormSelect'
import { DealConfidenceScore } from '../static-Values'
import { errorMessage } from '../ToasterMessage'
import { Button } from '../ui/button'

const AddLeadForm = ({ form, dashBoard, id }) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [formType, setFormType] = useState(null)
  const [companyData, setCompanyData] = useState([])
  const [pipelineData, setPipelineData] = useState([])

  const [engineerData, setEngineerData] = useState([])
  const [salePerson, setSalePerson] = useState([])
  const [budgetBook, setBudgetBook] = useState([])
  const [contact, setContact] = useState([])
  const [leadStatus, setLeadStatus] = useState([])
  const [tag, setTag] = useState([])
  const selectCompany = form.watch('company_id')

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

  const getPipeline = async () => {
    try {
      const response = await PipelineStatusServices.getPipelineStatus()
      if (response.status === 200) {
        console.log("response", response)
        setPipelineData(response?.data?.data)
      }
    } catch (error) {
      console.log(error)
      errorMessage({
        description: error?.response?.data?.message || 'Something went wrong.'
      })
    }
  }

  useEffect(() => {
    getPipeline()
  }, [])

  const { watch, setValue } = form
  const selectedPipeline = watch('pipelineType')
  const pipelineStatus = useMemo(() => {
    const selected = pipelineData.find(p => p.id == selectedPipeline)
    return selected
    ? selected?.statusGroup?.status?.map(status => ({
      label: status.status,
      value: String(status.id)
    }))
    : []
  }, [selectedPipeline])
  
  useEffect(() => {
    // setValue('pipelineStatus', '')
  }, [selectedPipeline, setValue])

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

  const getEngineer = async () => {
    try {
      const response = await EngineerServices.engineers()
      if (response.status === 200) {
        setEngineerData(response?.data?.data)
      }
    } catch (error) {
      console.log('err', error)
      errorMessage({
        description: error?.response?.data?.message || 'Something went wrong.'
      })
    }
  }

  useEffect(() => {
    getEngineer()
  }, [])

  const getUsers = async () => {
    try {
      const response = await UsersServices.users()
      if (response.status === 200) {
        setSalePerson(response?.data?.data)
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

  const fetchContactsByCompany = async () => {
    if (!selectCompany) {
      setContact([])
      return
    }
    try {
      const response = await LeadsServices.contacts({
        company_id: selectCompany
      })
      if (response.status === 200) {
        setContact(response.data?.data || [])
      }
    } catch (error) {
      console.error('Failed to load contacts:', error)
      errorMessage({
        description: error?.response?.data?.message || 'Something went wrong.'
      })
    }
  }

  useEffect(() => {
    fetchContactsByCompany()
  }, [selectCompany])

  const handleOpenDialog = type => {
    setFormType(type)
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
  }
  const handleProjectSelect = project => {
    form.setValue('project_id', String(project.id))
  }

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

  return (
    <>
      <div className='mt-4 grid grid-cols-2 gap-4'>
        <FormSelectField
          form={form}
          name='dcs'
          label='Deal Confidence Score'
          placeholder='Select Deal Confidence Score'
          options={DealConfidenceScore}
        />
        <div className='space-y-1'>
          <div className='flex items-center gap-5'>
            <label className='text-sm font-medium !text-gray-800 text-muted-foreground'>
              Project
            </label>
            {!dashBoard && (
              <div className='flex gap-2'>
                <Button
                  type='button'
                  size='sm'
                  className='h-6 gap-1 rounded bg-primary p-2 text-white shadow-none'
                  onClick={() => handleOpenDialog('project')}
                >
                  <Plus className='mr-1 h-3 w-3' /> Add
                </Button>
                <Button
                  type='button'
                  size='sm'
                  className='h-6 w-24 gap-1 rounded bg-cyan-400 p-2 text-slate-600 shadow-none'
                  onClick={() => handleOpenDialog('search')}
                >
                  <Search className='mr-1 h-3 w-3' /> Search
                </Button>
              </div>
            )}
          </div>
          <FormSelectField
            form={form}
            name='project_id'
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
          <div className='flex items-center gap-5'>
            <label className='text-sm font-medium !text-gray-800 text-muted-foreground'>
              Company
            </label>
            {!dashBoard && (
              <div className='flex gap-2'>
                <Button
                  type='button'
                  size='sm'
                  className='h-6 gap-1 rounded bg-primary p-2 text-white shadow-none'
                  onClick={() => handleOpenDialog('company')}
                >
                  <Plus className='mr-1 h-3 w-3' /> Add
                </Button>
              </div>
            )}
          </div>
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
        <div className='space-y-1'>
          <div className='flex items-center gap-5'>
            <label className='text-sm font-medium !text-gray-800 text-muted-foreground'>
              Contact
            </label>
            {!dashBoard && (
              <div className='flex gap-2'>
                <Button
                  type='button'
                  size='sm'
                  className='h-6 gap-1 rounded bg-primary p-2 text-white shadow-none'
                  onClick={() => handleOpenDialog('contact')}
                >
                  <Plus className='mr-1 h-3 w-3' /> Add
                </Button>
              </div>
            )}
          </div>
          <FormSelectField
            form={form}
            name='contact_id'
            placeholder='Select Contact'
            options={
              contact.length > 0
                ? contact.map(data => ({
                    label: data.name,
                    value: String(data.id)
                  }))
                : [{ label: 'No data available', value: null, disabled: true }]
            }
          />
        </div>

        {/* <div className='mb-4 mt-4 grid'> */}
        <div className='space-y-1'>
          <div className='flex items-center gap-5'>
            <label className='text-sm font-medium !text-gray-800 text-muted-foreground'>
              Sales Person
            </label>
            {!dashBoard && (
              <div className='flex gap-2'>
                <SalesPersonSheet getUsers={getUsers} />
              </div>
            )}
          </div>
          <FormSelectField
            form={form}
            name='sale_person_id'
            placeholder='Select Sales Person'
            options={
              salePerson.length > 0
                ? salePerson.map(data => ({
                    label: data.name,
                    value: String(data.id)
                  }))
                : []
            }
          />
        </div>
        {/* </div> */}
        {/* </div> */}

        {/* <div className='grid grid-cols-2 gap-4'> */}
        <FormDatePicker form={form} name='date_record' label='Date Recieved' />
        <FormDatePicker form={form} name='due_date' label='Due Date' />
        <div className='space-y-1'>
          <div className='flex items-center gap-5'>
            <label className='text-sm font-medium !text-gray-800 text-muted-foreground'>
              Engineer
            </label>
            {!dashBoard && (
              <div className='flex gap-2'>
                <Button
                  type='button'
                  size='sm'
                  onClick={() => handleOpenDialog('engineer')}
                  className='h-6 gap-1 rounded bg-primary p-2 text-white shadow-none'
                >
                  <Plus className='mr-1 h-3 w-3' /> Add
                </Button>
              </div>
            )}
          </div>
          <FormSelectField
            form={form}
            placeholder='Select Engineer'
            name='engineer_id'
            options={
              engineerData.length > 0
                ? engineerData.map(data => ({
                    label: data.name,
                    value: String(data.id)
                  }))
                : []
            }
          />
        </div>

        <FormSelectField
          form={form}
          name='lead_status_id'
          placeholder='Select Lead Status'
          label='Lead Status'
          options={leadStatus}
        />
        <FormInputField
          placeholder='Enter Lead Amount'
          form={form}
          name='amount'
          label='Lead Amount'
          type='number'
        />

        <FormMultiSelectField
          form={form}
          placeholder='Select Tags'
          name='leadTags'
          label='Tags'
          options={tag}
        />
        <FormSelectField
          form={form}
          name='priority'
          placeholder='Select Priority'
          options={priorityOption}
          label='Priority'
        />
        <FormSelectField
          form={form}
          name='pipelineType'
          placeholder='Select Pipeline'
          options={
            pipelineData.length > 0
              ? pipelineData.map(data => ({
                  label: data.name,
                  value: String(data.id)
                }))
              : []
          }
          label='Pipeline'
        />

        <FormSelectField
          form={form}
          name='pipelineStatus'
          placeholder='Select Status'
          options={pipelineStatus}
          label='Pipeline Status'
          disabled={!selectedPipeline}
        />

        <FormSelectField
          form={form}
          name='nextAction'
          placeholder='Select  Next Action'
          options={nextActionOption}
          label='Next Action'
        />
      </div>
      <LeadFormDialog
        id={id}
        getBudgetBooks={getBudgetBooks}
        getCompanies={getCompanies}
        fetchContactsByCompany={fetchContactsByCompany}
        getEngineer={getEngineer}
        getUsers={getUsers}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        formType={formType}
        label={`Add ${formType?.charAt(0).toUpperCase() + formType?.slice(1)}`}
        handleCloseDialog={handleCloseDialog}
        handleProjectSelect={handleProjectSelect}
      />
    </>
  )
}

export default AddLeadForm
