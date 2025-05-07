'use client'
import LayoutHeader from '@/components/layoutHeader'
import FormCheckBox from '@/components/share/form/CheckBox'
import FormDatePickerRange from '@/components/share/form/DateRaangePicker'
import FormInputField from '@/components/share/form/FormInputField'
import { errorMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import api from '@/lib/api'
import { Briefcase, Calendar, DollarSign, MapPin, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const AllAppliedWorkOrders = () => {
  const form = useForm()
  const [workOrders, setWorkOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const getAllWorkOrders = async () => {
    try {
      const response = await api.get(`/workOrder/getAllWorkOrder`)
      if (response?.status === 200) {
        setWorkOrders(response?.data?.data?.workOrders)
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllWorkOrders()
  }, [])

  const handlePlaceBid = id => {
    router.push(`/workorder/applied-workorder?workorderId=${id}`)
  }

  return (
    <>
      <div className='container mx-auto mt-5 p-5'>
        <Form {...form}>
          <form>
            <div className='flex items-center justify-between'>
              <LayoutHeader pageTitle='Work Orders ' />
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400' />
                <FormInputField
                  form={form}
                  name='search'
                  placeholder='Search'
                  className='pl-10'
                />
              </div>
            </div>
            <div className='flex gap-7'>
              <div>
                {/* filter price */}
                <Card className='m-4 w-72 border'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                      
                    Price</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <div className='flex items-center space-x-2'>
                        <FormCheckBox
                          form={form}
                          name='price1'
                          className='h-5 w-5 accent-blue-500'
                        />
                        <span className='text-sm text-gray-700'>
                          $10 - $100
                        </span>
                      </div>

                      <div className='flex items-center space-x-2'>
                        <FormCheckBox
                          form={form}
                          name='price2'
                          className='h-5 w-5 accent-blue-500'
                        />
                        <span className='text-sm text-gray-700'>
                          $100 - $500
                        </span>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <FormCheckBox
                          form={form}
                          name='price3'
                          className='h-5 w-5 accent-blue-500'
                        />
                        <span className='text-sm text-gray-700'>
                          $500 - $1000
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* filter date */}
                <Card className='m-4 w-72 border'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                    Select Date</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='flex items-center gap-2 text-gray-600'>
                      <FormDatePickerRange form={form} name='date' />
                    </div>
                    {/* <Separator className='my-2' /> */}
                    <div className='flex items-center justify-between'></div>
                  </CardContent>
                </Card>
                {/* filter status */}
                <Card className='m-4 w-72 border'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                    Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='flex items-center space-x-2'>
                      <FormCheckBox
                        form={form}
                        name='draft'
                        className='h-5 w-5 accent-blue-500'
                      />
                      <span className='text-sm text-gray-700'>Draft</span>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <FormCheckBox
                        form={form}
                        name='openforbid'
                        // description='$10-$100'
                        className='h-5 w-5 accent-blue-500'
                      />
                      <span className='text-sm text-gray-700'>
                        Open for bids
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className='w-full   '>
                {
                  loading ? (
                    <div className='flex h-40 items-center justify-center'>
                      <Spinner className='h-10 w-10 bg-black text-blue-500' />
                    </div>
                  ) :
                  workOrders?.length > 0 ? (
                    workOrders.map(item => (
                      <Card className=' my-5 border' key={item?.id}>
                        <CardHeader>
                          <CardTitle className='flex items-center gap-2'>
                            <Briefcase className='h-5 w-5 text-blue-500' />
                            {item?.title}
                          </CardTitle>
                          <Separator />
                        </CardHeader>
                        <CardContent>
                          <div className='flex gap-10'>
                            <div className='flex items-center gap-2 text-gray-600'>
                              <MapPin className='h-4 w-4' />
                              {item?.regions?.regionName || 'No Region'}
                            </div>
                            <div className='flex items-center gap-2 text-gray-600'>
                              <Calendar className='h-4 w-4' />
                              <span>
                               { item?.startDate - item?.finishDate||"20/04/2025" }
                              </span>
                            </div>
                            <div className='flex items-center gap-2 text-gray-600'>
                              <DollarSign className='h-4 w-4' />
                              Starting Price: ${item?.startingPrice||"0"} 
                            </div>
                          </div>
                          <p className='mt-2 text-sm text-gray-700'>
                            {item?.description?.replace(/<[^>]*>/g, '') ||
                              'No description provided'}
                          </p>
                          <Separator className='my-2' />
                          <div className='flex items-center justify-between'>
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                item?.status === 'draft'
                                  ? 'bg-yellow-100 text-yellow-600'
                                  : 'bg-green-100 text-green-600'
                              }`}
                            >
                              {item?.status === 'draft'
                                ? 'Draft'
                                : 'Open for Bids'}
                            </span>
                            {/* <Link href='> */}
                            <Button
                              type='button'
                              variant='default'
                              className='bg-blue-500 text-white hover:bg-blue-600'
                              disabled={item.status === 'draft'}
                              onClick={() => handlePlaceBid(item?.id)}
                            >
                              Place Bid
                            </Button>
                            {/* </Link> */}
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className='text-center m-4 text-gray-500'>
                      No work orders available
                    </div>
                  )
                }
              </div>
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}

export default AllAppliedWorkOrders
