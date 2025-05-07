'use client'
import LayoutHeader from '@/components/layoutHeader'
import LeadsFormFields from '@/components/Leads/LeadsFormField'
import { createNewLeads } from '@/components/Leads/newLeads'
import LeadServices from '@/components/services/lead-api'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { toast } from '@/hooks/use-toast'
import api from '@/lib/api'
import { Leads, UserAddress } from '@/types/leda-type'
import { User } from '@/types/user-type'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const EditLead = () => {
  const searchParams = useSearchParams()
  const editId = searchParams.get('editId')
  const [longitude, setLongitude] = useState<string | null>('')
  const [latitude, setLatitude] = useState<string | null>('')
  const [userAddress, setUserAddress] = useState<UserAddress>()
  const [disable, setDisabled] = useState(false)
  const [userList, setUserList] = useState<User[]>([])
  const [customerLongitude, setCustomerLongitude] = useState<string | null>('')
  const [customerLatitude, setCustomerLatitude] = useState<string | null>('')
  const [customerAddress, setCustomerAddress] = useState<UserAddress>()

  useDocumentTitle('Edit Lead')
  const form = useForm<Leads>({})

  const shortAddress = userAddress?.fullAddress
    .split(',')
    .slice(0, -2)
    .join(',')
    .trim()

  useEffect(() => {
    if (userAddress) {
      form.setValue('city', userAddress.city)
      form.setValue('state', userAddress.state)
      form.setValue('zip', userAddress.zip)
      form.setValue('address', shortAddress)
    }
  }, [userAddress, form])
  const router = useRouter()

  // get the All User List To Fill Up The Customer Detail By Using Phone Number
  const fetchUserList = async () => {
    try {
      const res = await api.get(`/auth/getAllUsers?role=customer`)
      if (res.data.data.users === res.data.data.users) {
        setUserList(res.data.data.users)
      }
    } catch (error) {
      errorMessage({ description: error?.response?.data?.message })
    } finally {
    }
  }

  useEffect(() => {
    fetchUserList()
  }, [form])

  useEffect(() => {
    if (userAddress) {
      form.setValue('city', (userAddress as UserAddress)?.city)
      form.setValue('state', (userAddress as UserAddress)?.state)
      form.setValue('zip', (userAddress as UserAddress)?.zip)
    }
    if (customerAddress) {
      form.setValue('customerCity', (customerAddress as UserAddress)?.city)
      form.setValue('customerState', (customerAddress as UserAddress)?.state)
      form.setValue('customerZip', (customerAddress as UserAddress)?.zip)
    }
  }, [userAddress, customerAddress])
  // Get the phone no field and Address Field to match the Funcationality
  const getPhone = form.watch('phone')
  const getLeadAddress = form.watch('checkboxAddress')
  useEffect(() => {
    if (getPhone) {
      const filterUserData = userList?.filter(
        item => item.phoneNumber === getPhone
      )

      if (filterUserData.length) {
        form.setValue('email', filterUserData[0]?.email)
        form.setValue('firstName', filterUserData[0].firstName)
        form.setValue('lastName', filterUserData[0].lastName)
        form.setValue('phone', filterUserData[0].phoneNumber)
        setDisabled(true)
      }
    }
    if (getLeadAddress === true) {
      const LeadAddress = form.watch(['address', 'city', 'state', 'zip'])
      form.setValue('customerAddress', LeadAddress[0])
      form.setValue('customerCity', LeadAddress[1])
      form.setValue('customerState', LeadAddress[2])
      form.setValue('customerZip', LeadAddress[3])
    } else {
      form.setValue('customerAddress', '')
    }
  }, [disable, userList, getPhone, getLeadAddress])

  // Fetch the Lead by Id To update the Id
  const fetchLeadById = async () => {
    try {
      const getLeads = await LeadServices.getLeadById(editId)
      form.reset(getLeads.data.data)
    } catch (err) {
      if (err) {
        toast({
          variant: 'destructive',
          title: 'Update Error',
          description: err.message
        })
      }
    }
  }

  useEffect(() => {
    if (editId) {
      fetchLeadById()
    }
  }, [editId])

  // Submit the Leads And Edit the Leads
  const onSubmitLeads = async (data: Leads) => {
    const newLeads = createNewLeads(
      data,
      longitude,
      latitude,
      customerLongitude,
      customerLatitude
    )
    if (editId) {
      try {
        const response = await LeadServices.leadUpdate(editId, newLeads)
        if (response.status === 200) {
          successMessage({ description: response?.data?.message })
          router.replace('/dashboard/leads')
        }
        // toast({
        //   title: 'Contract Register',
        //   description: 'The contract has been updated successfully.'
        // })
        // router.replace('/dashboard/leads')
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast({
            variant: 'destructive',
            title: 'Update Error',
            description: err.message
          })
        }
      }
    }
  }
  return (
    <div>
      <LayoutHeader pageTitle={'Edit Lead'} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitLeads)}
          className=''
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
            }
          }}
        >
          <LeadsFormFields
            form={form}
            // For Customer Address Detail if not same as lead
            setCustomerLongitude={setCustomerLongitude}
            setCustomerLatitude={setCustomerLatitude}
            setCustomerAddress={setCustomerAddress}
            // By Default It is Used
            setLongitude={setLongitude}
            setLatitude={setLatitude}
            userList={userList}
            disable={disable}
            setUserAddress={setUserAddress}
            getLeadAddress={getLeadAddress}
          />
          <div className='mt-5 flex justify-end'>
            <Button type='submit' className='site-button'>
              {'Update Lead'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default EditLead
