'use client'
import LayoutHeader from '@/components/layoutHeader'
import AddLeadForm from '@/components/leads-module/AddLeadForm'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import LeadsServices from '@/services/leads-api'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
// import AttributeTableData from './attribute-tableData'

const EditLeads = ({ editLeadId, setOpenDialog, fetchLeadById }) => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id') || editLeadId

  const pathName = usePathname()

  const dashBoard = pathName === `/dashboard/leads/preview`

  const form = useForm()
  useDocumentTitle('Edit Leads')
  const router = useRouter()

  // Fetch the lead by Id To update the Id
  const fetchLeadsById = async () => {
    try {
      const response = await LeadsServices.getleadById(id)
      if (response?.status === 200) {
        const leadData = response.data.data

        // Pre-fill form values
        const formattedData = {
          ...leadData,
          date_record: new Date(leadData.date_record),
          due_date: new Date(leadData.due_date),
          dcs: leadData.dcs?.toString() || '',
          amount: leadData.amount || '',
          project_id: leadData.project?.id?.toString() || '',
          company_id: leadData.company?.id?.toString() || '',
          contact_id: leadData.contact?.id?.toString() || '',
          sale_person_id: leadData.salePerson?.id?.toString() || '',
          engineer_id: leadData.engineer?.id?.toString() || '',
          lead_status_id: leadData.leadStatus?.id?.toString() || '',
          pipelineType: leadData.pipelineType?.toString() || '',
          pipelineStatus: leadData.pipelineStatus?.toString() || '',
          nextAction: leadData.nextAction || '',
          priority: leadData.priority || '',
          leadTags: leadData.leadTags?.map(item => item.tag.id.toString()) || []
        }
        form.setValue('contact_id', leadData.contact?.id?.toString())
        console.log('formattedData', formattedData) 
        form.reset(formattedData)
      }
    } catch (error) {
      console.log('error', error)
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }

  useEffect(() => {
    if (id) {
      fetchLeadsById()
    }
  }, [id])

  function formatDateForMySQL(date) {
    const d = new Date(date)
    const pad = n => (n < 10 ? '0' + n : n)
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
  }
  // handle to edit
  const handleLeadUpdateSubmit = async data => {
    try {
      const formData = new FormData()

      formData.append('_method', 'PUT')
      formData.append('id', id)
      formData.append('date_record', formatDateForMySQL(data.date_record))
      formData.append('due_date', formatDateForMySQL(data.due_date))
      formData.append('dcs', data.dcs || '')
      formData.append('project_id', data.project_id || '')
      formData.append('company_id', data.company_id || '')
      formData.append('contact_id', data.contact_id || '')
      formData.append('sale_person_id', data.sale_person_id || '')
      formData.append('pipelineType', data.pipelineType || '')
      formData.append('nextAction', data.nextAction || '')
      formData.append('priority', data.priority || '')
      formData.append('pipelineStatus', data.pipelineStatus || '')
      formData.append('engineer_id', data.engineer_id || '')
      formData.append('lead_status_id', data.lead_status_id || '')
      formData.append('amount', data.amount || '')

      // Handle multi-select leadTags array
      if (data.leadTags?.length > 0) {
        data.leadTags.forEach((tag, index) => {
          formData.append(`leadTags[${index}]`, tag)
        })
      }

      const responseEdit = await LeadsServices.updateLeadById(id, formData)
      if (responseEdit?.status === 200) {
        form.reset()
        successMessage({ description: responseEdit?.data?.message })
        if (!dashBoard) {
          router.push('/dashboard/leads')
        } else {
          setOpenDialog(false)
          fetchLeadById()
        }
      }
    } catch (error) {
      console.log('error', error)
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }

  return (
    <>
      {!dashBoard && (
        <div className='flex justify-between'>
          <LayoutHeader pageTitle={'Edit Lead'} />
        </div>
      )}
      <div className='mt-5'>
        <div className='pb-2 text-xl font-medium'>Leads Details</div>
        <Separator />
      </div>
      <div className=''>
        <FormProvider {...form}>
          <form
            className=''
            onSubmit={form.handleSubmit(handleLeadUpdateSubmit)}
          >
            <AddLeadForm form={form} dashBoard={dashBoard} id={id} />
            <div className='mt-4 flex justify-end gap-4'>
              <Link href='/dashboard/leads'>
                <Button type='button' className='site-button bg-cyan-400'>
                  Back
                </Button>
              </Link>

              <Button type='submit' className='site-button'>
                Update
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  )
}

export default EditLeads
