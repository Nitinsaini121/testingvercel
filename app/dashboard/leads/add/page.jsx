'use client'
import { LeadFormSchema } from '@/components/form-validations/LeadForm'
import LayoutHeader from '@/components/layoutHeader'
import AddLeadForm from '@/components/leads-module/AddLeadForm'
import LeadsServices from '@/services/leads-api'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { yupResolver } from '@hookform/resolvers/yup'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'

const AddLead = () => {
  useDocumentTitle('Add lead')
  const form = useForm({
    defaultValues: {
      dcs: '0%',
      project_id: '',
      company_id: '',
      contact_id: '',
      sale_person_id: '',
      engineer_id: '',
      lead_status_id: '',
      amount: '',
      pipelineStatus:'',
      leadTags: [],
      date_record: new Date(),
      due_date: new Date()
    },
    resolver: yupResolver(LeadFormSchema)
  })
  const router = useRouter()
  function formatDateForMySQL(date) {
    const d = new Date(date)
    const pad = n => (n < 10 ? '0' + n : n)
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
  }

  const handleLeadSubmit = async data => {
    console.log('data--submit', data)
    try {
      const formData = new FormData()

      // Format date fields
      formData.append('date_record', formatDateForMySQL(data.date_record))
      formData.append('due_date', formatDateForMySQL(data.due_date))

      // Direct fields
      formData.append('dcs', data.dcs || '')
      formData.append('project_id', data.project_id || '')
      formData.append('company_id', data.company_id || '')
      formData.append('contact_id', data.contact_id || '')
      formData.append('sale_person_id', data.sale_person_id || '')
      formData.append('engineer_id', data.engineer_id || '')
      formData.append('pipelineType', data.pipelineType || '')
      formData.append('nextAction', data.nextAction || '')
      formData.append('priority', data.priority || '')
      formData.append('pipelineStatus', data.pipelineStatus || '')

      formData.append('lead_status_id', data.lead_status_id || '')
      formData.append('amount', data.amount || '')

      // Handle multi-select leadTags array
      if (data.leadTags?.length > 0) {
        data.leadTags.forEach((tag, index) => {
          formData.append(`leadTags[${index}]`, tag)
        })
      }

      // Submit to API
      const response = await LeadsServices.addLeads(formData)
      console.log("response",response)
      if (response.status === 200) {
        successMessage({ description: response?.data?.message })
        router.push('/dashboard/leads')
        form.reset()
      } else {
        errorMessage({
          description: response?.data?.message || 'Something went wrong.'
        })
      }
    } catch (error) {
      console.error('Lead submission error:', error)
      errorMessage({
        description:
          error?.response?.data?.message ||
          'Submission failed. Please try again.'
      })
    }
  }

  const handleBack=()=>{
    router.push('/dashboard/leads')
  }

  return (
    <>
      <div className='flex justify-between'>
        <LayoutHeader pageTitle={'Add Lead'} />
        
      </div>
      <div className='mt-3'>
        <div className='text-xl pb-2'>Leads Details</div>
        <Separator />
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleLeadSubmit)}>
          <AddLeadForm form={form} />
          <div className='mt-4 flex justify-end gap-4'>
          <Button onClick={handleBack} type='button' className='site-button bg-white'>Back</Button>
            <Button  type='submit' className='site-button'>Submit</Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default AddLead
