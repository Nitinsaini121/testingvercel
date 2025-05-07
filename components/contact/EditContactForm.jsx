'use client'
import LayoutHeader from '@/components/layoutHeader'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import ContactServices from '@/services/contact'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ContactSchema } from '../form-validations/ContactFormValidation'
import AddContactForm from './AddContactForm'
// import AttributeTableData from './attribute-tableData'

const EditContactForm = ({ editLeadId, setOpenDialog, fetchLeadById }) => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id') || editLeadId
  console.log('iddd', id)

  const pathName = usePathname()

  const dashBoard = pathName === `/dashboard/leads/preview`

  const form = useForm({
    defaultValues: {
      id: '',
      name: '',
      email: '',
      phone: '',
      city: '',
      state: '',
      zip: '',
      address: '',
      company_id: ''
    },
    resolver: yupResolver(ContactSchema)
  })
  useDocumentTitle('Edit Contact')
  const router = useRouter()

  // Fetch the lead by Id To update the Id
  const fetchLeadsById = async () => {
    try {
      const response = await ContactServices.getContactById(id)
      if (response?.status === 200) {
        const contactData = response.data.data

        // Pre-fill form values
        const formattedData = {
          ...contactData
        }
        form.setValue('contact_id', contactData.contact?.id?.toString())
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

  // handle to edit
  const handleLeadUpdateSubmit = async data => {
    try {
      const formData = new FormData()
      formData.append('_method', 'PUT')
      formData.append('id', id || '')
      formData.append('name', data.name || '')
      formData.append('email', data.email || '')

      formData.append('phone', data.phone || '')
      formData.append('city', data.city || '')
      formData.append('state', data.state || '')
      formData.append('zip', data.zip || '')
      formData.append('company_id', data.company_id || '')

      formData.append('address', data.address || '')

      const responseEdit = await ContactServices.updateContactById(id, formData)
      if (responseEdit?.status === 200) {
        form.reset()
        successMessage({ description: responseEdit?.data?.message })
        if (!dashBoard) {
          router.push('/dashboard/contact')
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
      <div className='flex justify-between'>
        <LayoutHeader pageTitle={'Edit contact'} />
      </div>

      <div className=''>
        <FormProvider {...form}>
          <form
            className=''
            onSubmit={form.handleSubmit(handleLeadUpdateSubmit)}
          >
            <AddContactForm form={form} dashBoard={dashBoard} id={id} />
            <div className='mt-4 flex justify-end gap-4'>
              <Link href='/dashboard/contact'>
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

export default EditContactForm
