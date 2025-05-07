'use client'
import { useToast } from '@/hooks/use-toast'
import api from '@/lib/api'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { workOrderDefaultValue } from '../DefaultValue/AllDefaultValues'
import LayoutHeader from '../layoutHeader'
import { Form } from '../ui/form'
import useDocumentTitle from '../utils/useDocumentTitle'
import { DrawerForWorkOrder } from './DrawerForWorkOrder'
import WorkOrderFormField from './WorkOrderFormField'
import { errorMessage, successMessage } from '../ToasterMessage'

export type WorkOrder = {
  latitude: string
  longitude: string
  startDate: string
  finishDate: string
  title: string
  workOrder: string
  image: string
  offerBox: string
  price: string
  region: any
  location: string
  leadaddress: string
  workingCategory: any
  startingPrice: any
  description: any
  city: any
  state: any
  zip: any
  address: any
}
export type UserAddress = {
  city: string
  state: string
  zip: string
  fullAddress: string
}

export type ImaFile = [
  {
    id: number
    image: string
  }
]

const AddWorkOrder = () => {
  useDocumentTitle('Add Work Order')
  const { toast } = useToast() // Use ShadCN toast
  const [longitude, setLongitude] = useState<string | null>(null)
  const [latitude, setLatitude] = useState<string | null>(null)
  const [imageUpload, setImageUpload] = useState<File[] | null>(null)
  const [userAddress, setUserAddress] = useState<UserAddress>()
  const [publishTo, setPublishTo] = useState<string>('')
  const [selectedCont, setSelectedCont] = useState<number[]>([])
  const [loader, setLoader] = useState(false)
  const [regionId, setRegionId] = useState(null)
  const [regionError, setRegionError] = useState(null)
  const [getAllCategory, setAllCategory] = useState([])

  //use form hook
  const form = useForm<WorkOrder>({
    defaultValues: workOrderDefaultValue
  })
  const router = useRouter()

  const getAllCatgory = async () => {
    try {
      const allData = await api.get('workOrder/getAllWorkCategory')
      if (allData.status === 200) {
        const formattedRegions = allData.data.data.map(region => ({
          value: Number(region.id),
          label: region.category
        }))

        setAllCategory(formattedRegions)
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }

  useEffect(() => {
    getAllCatgory()
  }, [])

  // add work order :)
  const onSubmitLeads = async (data: WorkOrder) => {
    setLoader(true)
    const formData = new FormData()
    if (imageUpload) {
      // Append files to formData
      ;(imageUpload as File[]).forEach(file => {
        formData.append('image', file)
      })
    }

    formData.append('status', 'draft')
    formData.append('workingCategory', JSON.stringify(data.workingCategory))
    formData.append('startDate', data?.startDate || '')
    formData.append('finishDate', data?.finishDate || '')
    formData.append('startingPrice', data?.price || '')
    formData.append('region', regionId?.id)
    formData.append('price', data?.price || '')
    formData.append('offerBox', data?.offerBox || '')
    formData.append('longitude', longitude || '')
    formData.append('latitude', latitude || '')
    formData.append('publishTo', publishTo || '')
    formData.append('description', data?.description || '')
    formData.append('inviteContr', '')
    formData.append(
      'leadAddress',
      `${userAddress?.state || ''},${userAddress?.city || ''},${userAddress?.zip || ''}`
    )
    formData.append('address', data?.address || '')
    formData.append('state', data?.state || '')
    formData.append('city', data?.city || '')
    formData.append('zip', data?.zip || '')

    try {
      const response = await api.post(`/workOrder/addWorkOrder`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setLoader(false)
      if (response.status === 200) {
        successMessage({
          description:response?.data?.message
        })
        router.push('/dashboard/workorders')
      }
    } catch (error) {
      console.error('Error adding order:', error)
      setLoader(false)
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }

  const shortAddress = userAddress?.fullAddress
    .split(',')
    .slice(0, -2)
    .join(',')
    .trim()

  // Auto fill fields data:-
  useEffect(() => {
    if (userAddress) {
      form.setValue('city', userAddress.city)
      form.setValue('state', userAddress.state)
      form.setValue('zip', userAddress.zip)
      form.setValue('address', shortAddress)
    }
  }, [userAddress, form])

  //### Start Region select based on zip field value:-
  const zipCode = form.watch('zip')
  const regionSelectByZipCodeChange = async () => {
    try {
      const data = await api.get(
        `/workOrder/getRegionByZipCode?zipCode=${zipCode}`
      )
      if (data.status === 200) {
        if (data.status) {
          setRegionId(data?.data?.data)
          setRegionError(null)
        }
      }
    } catch (error) {
      setRegionError('Region not found!')
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }

  useEffect(() => {
    form.setValue('region', regionId?.regionName)
  }, [regionId])

  useEffect(() => {
    if (zipCode !== undefined) {
      regionSelectByZipCodeChange()
    }
  }, [zipCode])
  //### End Region select based on zip field value:-

  return (
    <div>
      <LayoutHeader pageTitle={'New Work Order'} />
      <Form {...form}>
        <form
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
            }
          }}
          onSubmit={form.handleSubmit(onSubmitLeads)}
          className=''
        >
          <WorkOrderFormField
            form={form}
            setLongitudde={setLongitude}
            setLatitudde={setLatitude}
            longitude={longitude}
            latitude={latitude}
            disabled={false}
            setUserAddress={setUserAddress}
            setImageUpload={setImageUpload}
            updateImage={[]}
            editId={''}
            regionError={regionError}
            getAllCategory={getAllCategory}
          />
          {/* <div className='mt-5 flex justify-center'>
            <Button
              type='submit'
              className='my-5 h-10 w-40 rounded-xl bg-yellow-300 py-3 text-base font-semibold !text-black transition-transform duration-300 hover:scale-105'
            >
              Continue
            </Button>
          </div> */}
          <DrawerForWorkOrder
            loader={loader}
            setPublishTo={setPublishTo}
            setSelectedCont={setSelectedCont}
          />
        </form>
      </Form>
    </div>
  )
}

export default AddWorkOrder
