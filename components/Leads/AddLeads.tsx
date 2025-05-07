// import UserContext from '@/contexts/usercontext'
import api from '@/lib/api'
import { Leads, UserAddress } from '@/types/leda-type'
import { User } from '@/types/user-type'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import LayoutHeader from '../layoutHeader'
import { errorMessage, successMessage } from '../ToasterMessage'
import { Button } from '../ui/button'
import { Form } from '../ui/form'
import useDocumentTitle from '../utils/useDocumentTitle'
import LeadsFormFields from './LeadsFormField'
import { createNewLeads } from './newLeads'
import LeadServices from '../services/lead-api'

const AddLeads = () => {
  const [longitude, setLongitude] = useState<string | null>('')
  const [latitude, setLatitude] = useState<string | null>('')
  const [userAddress, setUserAddress] = useState<UserAddress>()
  const [disable, setDisabled] = useState(false)
  const [userList, setUserList] = useState<User[]>([])
  const [customerLongitude, setCustomerLongitude] = useState<string | null>('')
  const [customerLatitude, setCustomerLatitude] = useState<string | null>('')
  const [customerAddress, setCustomerAddress] = useState<UserAddress>()

  useDocumentTitle('Add Lead')
  const form = useForm<Leads>({
    // resolver:yupResolver(LeadsValidationSchema)
  })

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
      if (res?.status === 200) {
        if (res?.data?.status === true) {
          if (res?.data?.data?.users === res?.data?.data?.users) {
            setUserList(res?.data?.data?.users)
          }
        } else {
          errorMessage({ description: res?.data?.message })
        }
      }
    } catch (error) {
      if (error) {
        errorMessage({
          description: error?.response?.data?.message || error?.message
        })
      }
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

  // Submit the Leads And Edit the Leads
  const onSubmitLeads = async (data: Leads) => {
    console.log('data', data)
    const formData = createNewLeads(
      data,
      longitude,
      latitude,
      customerLongitude,
      customerLatitude
    )

    try {
      const response = await LeadServices.addLead(formData)
      if (response.status === 200) {
        if (response?.data?.status === true) {
          successMessage({ description: response?.data?.message })
          router.replace('/dashboard/leads/list')
        } else {
          errorMessage({ description: response?.data?.message })
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        errorMessage({ description: err?.message })
      }
    }
  }
  return (
    <div>
      <div className='flex items-center justify-between'>
        <LayoutHeader pageTitle='Add Lead' />
        <Button
          className='site-button'
          onClick={() => router.push(`/dashboard/leads/list`)}
        >
          All Leads
        </Button>
      </div>
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
              {'Submit Lead'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default AddLeads
