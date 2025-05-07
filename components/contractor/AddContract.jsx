'use client'
import { toast } from '@/hooks/use-toast'
// import { ContractorSchema } from '@/schemas/contractor-schema'
// import { zodResolver } from '@hookform/resolvers/zod'
import UserContext from '@/contexts/usercontext'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { contractDefaultValue } from '../DefaultValue/AllDefaultValues'
import { ContractorValidationSchema } from '../form-validations/contractor-validation'
import LayoutHeader from '../layoutHeader'
import SubContractorService from '../services/subContractor'
import { Button } from '../ui/button'
import { Form } from '../ui/form'
import { Spinner } from '../ui/spinner'
import useDocumentTitle from '../utils/useDocumentTitle'
import ContractorFormFields from './ContractFormFields'
import { errorMessage, successMessage } from '../ToasterMessage'

const AddContractor = () => {
  useDocumentTitle('Add Contractor')
  // Get the editId from the querry params
  const [gafCertification, setGafCertification] = useState('')
  const userContext = useContext(UserContext)
  if (!userContext) {
    throw new Error(
      'UserContext is undefined. Make sure it is wrapped in a provider.'
    )
  }

  const { getRegions } = userContext

  const [certainTeedCertification, setCertainTeedCertification] = useState('')

  const [owensCoringCertification, setOwensCoringCertification] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  // Fetch the contract by id and set the form values
  const form = useForm({
    resolver: yupResolver(ContractorValidationSchema),
    defaultValues: contractDefaultValue
  })

  const onSubmitContractor = async data => {
    setLoading(true)
    const formData = new FormData()

    // Append the file if present
    const file = data.logo?.[0] // Assuming data.logo is a FileList or array
    if (file) {
      formData.append('logo', file)
    }

    // Convert arrays to comma-separated strings
    const formattedData = {
      ...data,
      gafCertifications: Array.isArray(data.gafCertifications)
        ? data.gafCertifications.join(',')
        : '',
      certineedCertifications: Array.isArray(data.certineedCertifications)
        ? data.certineedCertifications.join(',')
        : '',
      owensCoringCertifications: Array.isArray(data.owensCoringCertifications)
        ? data.owensCoringCertifications.join(',')
        : ''
    }

    Object.entries(formattedData).forEach(([key, value]) => {
      if (key !== 'logo') {
        if (Array.isArray(value)) {
          formData.append(key, value.join(',')) // Convert array to comma-separated string
        } else {
          formData.append(key, String(value)) // Ensure it's a string
        }
      }
    })

    try {
      const response = await SubContractorService.addContractor(formData)
      if (response.status === 200) {
        successMessage({ description: response?.data?.message })
        router.replace('/dashboard/contract')
      }
      // toast({
      //   title: 'Contractor Registered',
      //   description: 'Successfully registered.'
      // })
    }    catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }

  return (
    <>
      <div className='pb-4'>
        <LayoutHeader pageTitle={'Add Sub Contractor'} />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitContractor)}
            className=''
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault()
              }
            }}
          >
            <ContractorFormFields
              getRegions={getRegions} // ✅ Pass regions to the child component
              form={form}
              owensCoringCertification={owensCoringCertification}
              setOwensCoringCertification={setOwensCoringCertification}
              certainTeedCertification={certainTeedCertification}
              setCertainTeedCertification={setCertainTeedCertification}
              gafCertification={gafCertification}
              setGafCertification={setGafCertification}
            />

            <div className='mt-5 flex justify-end'>
              {loading ? (
                <Button type='button' className='h-10 w-40'>
                  <Spinner
                    size='sm'
                    className='m-auto bg-black dark:bg-white'
                  />
                </Button>
              ) : (
                <Button type='submit' className='site-button'>
                  Submit
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}
export default AddContractor
