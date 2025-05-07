'use client'
import UserContext from '@/contexts/usercontext'
import { useToast } from '@/hooks/use-toast'
import api from '@/lib/api'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { workOrderDefaultValue } from '../DefaultValue/AllDefaultValues'
import LayoutHeader from '../layoutHeader'
import { Button } from '../ui/button'
import { Form } from '../ui/form'
import { Spinner } from '../ui/spinner'
import useDocumentTitle from '../utils/useDocumentTitle'
import WorkOrderFormField from './WorkOrderFormField'
import { errorMessage, successMessage } from '../ToasterMessage'

export type WorkOrder = {
  latitude: string
  longitude: string
  startDate: string
  finishDate: string
  title: string
  workOrder: string
  status: any
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
  fullAddress: any
  city: string
  state: string
  zip: string
}

export type ImaFile = {
  id: number
  image: string
}[]

const EditWorkOrder = ({ params }) => {
  useDocumentTitle('Edit Work Order')
  const userContext = useContext(UserContext)
  if (!userContext) {
    throw new Error(
      'UserContext is undefined. Make sure it is wrapped in a provider.'
    )
  }

  const { setBreadCrumbsData } = userContext
  const obj = params.id
  const editId = obj
  const [longitude, setLongitude] = useState<string | null>(null)
  const [latitude, setLatitude] = useState<string | null>(null)
  const [imageUpload, setImageUpload] = useState<File[] | null>(null)
  const [userAddress, setUserAddress] = useState<UserAddress>()
  const [updateImage, setUpdateImage] = useState<number[]>([])
  const [regionId, setRegionId] = useState(null)
  const [regionError, setRegionError] = useState(null)
  const [loader, setLoader] = useState(false)
  const [getAllCategory, setAllCategory] = useState([])

  const form = useForm<WorkOrder>({
    defaultValues: workOrderDefaultValue
  })
  const router = useRouter()
  const { toast } = useToast() // Use ShadCN toast

  const getAllCatgory = async () => {
    try {
      const allData = await api.get('workOrder/getAllWorkCategory')
      if (allData.status === 200) {
        const formattedRegions = allData.data.data.map(region => ({
          value: region.id,
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

  useEffect(() => {
    if (!editId) {
      toast({
        variant: 'destructive',
        title: 'EditId Error',
        description: 'Edit ID is required'
      })
      return
    }
    if (!/^\d+$/.test(editId)) {
      toast({
        variant: 'destructive',
        title: 'EditId Error',
        description: 'Edit ID must be a number'
      })
      return
    }
  }, [editId])

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

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const response = await api.get(
          `workOrder/getWorkOrderById?workOrderId=${editId}`
        )
        if (response.status === 200) {
          const editValue = response?.data?.data

          form.reset(editValue)
          setUpdateImage(editValue?.images || [])
          setLongitude(editValue?.longitude)
          setLatitude(editValue?.latitude)
          setBreadCrumbsData(editValue?.title)
        }
      } catch (error) {
        errorMessage({
          description: error?.response?.data?.message
        })
      }
    }

    fetchUserById()
  }, [editId])

  const onSubmitWorkOrder = async (data: WorkOrder) => {
    setLoader(true)
    if (!editId) return

    try {
      const formData = new FormData()
      if (imageUpload) {
        imageUpload.forEach(file => formData.append('image', file))
      }
      formData.append(
        'workingCategory',
        JSON.stringify(data?.workingCategory) || ''
      )
      formData.append('startDate', data?.startDate || '')
      formData.append('finishDate', data?.finishDate || '')
      formData.append('status', data?.status || '')
      formData.append('startingPrice', data?.price || '')
      formData.append('region', regionId?.id || '')
      formData.append('price', data?.price || '')
      formData.append('offerBox', data?.offerBox || '')
      formData.append('longitude', longitude || '')
      formData.append('latitude', latitude || '')
      formData.append('description', data?.description || '')
      formData.append(
        'leadAddress',
        `${userAddress?.state || ''}, ${userAddress?.city || ''}, ${userAddress?.zip || ''}`
      )
      formData.append('address', data?.address || '')
      formData.append('state', data?.state || '')
      formData.append('city', data?.city || '')
      formData.append('zip', data?.zip || '')

      const response = await api.put(
        `/workOrder/updateWorkOrder?workOrderId=${editId}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      )
      setLoader(false)
      if (response.status === 200) {
         successMessage({
                  description:response?.data?.message
                })
        router.push('/dashboard/workorders')
      }
    } catch (error) {
      setLoader(false)

      console.error('Error updating order:', error)
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }

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
      <LayoutHeader pageTitle='Edit Work Order' />
      <Form {...form}>
        <form
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
            }
          }}
          onSubmit={form.handleSubmit(onSubmitWorkOrder)}
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
            updateImage={updateImage}
            editId={editId}
            regionError={regionError}
            getAllCategory={getAllCategory}
          />
          <div className='mt-5 flex justify-center'>
            {loader ? (
              <Spinner size='lg' className='m-auto bg-black dark:bg-white' />
            ) : (
              <Button
                type='submit'
                className='rounded-6 font-meduim my-5 h-10 rounded-xl bg-yellow-300 p-6 py-3 text-base font-medium !text-black transition-transform duration-300 hover:scale-105'
              >
                Update Work Order
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  )
}

export default EditWorkOrder
