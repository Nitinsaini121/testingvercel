'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import api from '@/lib/api'
import { formatDistanceToNow } from 'date-fns'
import {
  Building2,
  CalendarDays,
  DoorOpen,
  Home,
  Pencil,
  Trash2
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Notes from '../dashboard-notes/notes'
import { errorMessage, successMessage } from '../ToasterMessage'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'

export function DashboardWorkOrderTabs({ workOrderId, workOrderData }) {
  const [userList, setUserList] = useState([])
  console.log('workOrderData', workOrderData)
  const [notesData, setNotesData] = useState([])
  const { data: session } = useSession()
  const router = useRouter()
  const [activitiesData, setActivitiesData] = useState()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/auth/getAllUsers')
        if (response?.status === 200) {
          setUserList(response?.data?.data.users || [])
        }
      } catch (error) {
        errorMessage({
          description: error?.response?.data?.message
        })
      }
    }
    fetchUsers()
  }, [])

  const getNotesApi = async () => {
    try {
      const res = await api.get(
        `notes/getNoteById?noteId=${workOrderId}&moduleName=workOrderObj`
      )
      if (res?.status === 200) {
        setNotesData(res.data.data)
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }
  const getActivities = async () => {
    try {
      const res = await api.get(
        `activities/getActivitiesById?activityId=${workOrderId}&moduleName=workOrderObj`
      )
      if (res?.status === 200) {
        setActivitiesData(res.data.data)
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }
  useEffect(() => {
    getNotesApi()
  }, [])
  useEffect(() => {
    getActivities()
  }, [])

  const handleEdit = () => {
    router.push(`/dashboard/workorders/edit/${workOrderId}`)
  }

  const handleDeleteNotes = async ({ noteId }) => {
    if (noteId !== null) {
      try {
        const response = await api.delete(
          `/notes/deleteNoteById?noteId=${noteId}`
        )
        if (response?.status === 200) {
          successMessage({
            description: response?.data?.message
          })
          getNotesApi()
        }
      } catch (error) {
        errorMessage({
          description: error?.response?.data?.message
        })
      }
    }
  }
  console.log('workOrderData---all', workOrderData)

  const handleBidsOpen = (contractorId, workOrderId) => {
    router.push(
      `/dashboard/workorders/bidder?contractorId=${contractorId}&workOrderId=${workOrderId}`
    )
  }

  const [activeTab, setActiveTab] = useState('Dashboard Overview')

  useEffect(() => {
    const savedTab = localStorage.getItem('workOrderDashboardTab')
    if (savedTab) {
      setActiveTab(savedTab)
    }
  }, [])

  const handleTabChange = value => {
    setActiveTab(value)
    localStorage.setItem('workOrderDashboardTab', value)
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange}>
      <div className='flex justify-between'>
        {/* tabs */}
        <TabsList className='dashboard-tabs grid grid-cols-4 bg-white p-0'>
          <TabsTrigger
            value='Dashboard Overview'
            className='text-light-color relative !rounded-none !px-0 text-sm font-medium !shadow-transparent'
          >
            Dashboard Overview
          </TabsTrigger>
          <TabsTrigger
            value='Lead Files'
            className='text-light-color relative !rounded-none !px-0 text-sm font-medium !shadow-transparent'
          >
            Takeoff Detail
          </TabsTrigger>
          <TabsTrigger
            value='Financials'
            className='text-light-color relative !rounded-none !px-0 text-sm font-medium !shadow-transparent'
          >
            Financing
          </TabsTrigger>
          <TabsTrigger
            value='documents'
            className='text-light-color relative !rounded-none !px-0 text-sm font-medium !shadow-transparent'
          >
            Work Order Documents
          </TabsTrigger>
        </TabsList>
        <div
          style={{ color: 'red', textAlign: 'center' }}
          className='border-color-grey text-dark-color top-minus-2 relative h-8 rounded border px-3 pb-1 pt-1.5 text-sm'
        >
          Work Order Date: 19/02/2025 06:08 PM{' '}
        </div>
      </div>
      <TabsContent className='mt-0' value='Dashboard Overview'>
        {/* <Separator /> */}
        {/* Dashboard Bar */}
        <Card className='shadow-none'>
          <div className='theme-bg-light-rgba border-color-grey flex h-24 w-full items-center justify-around space-x-4 border-b text-base'>
            <div className='m-0 text-center'>
              <CardDescription className='text-light-color text-sm font-medium'>
                Work Order status
              </CardDescription>
              <CardTitle className='text-lg'>{workOrderData.status}</CardTitle>
            </div>
            <Separator className='h-20' orientation='vertical' />
            <div className='m-0 text-center'>
              <CardDescription className='text-light-color text-sm font-medium'>
                Address & Contact Name
              </CardDescription>
              <CardTitle className='truncate text-base'>
                {workOrderData?.address}
              </CardTitle>
            </div>
            <Separator className='h-20' orientation='vertical' />
            <div className='m-0 text-center'>
              <CardDescription className='text-light-color text-sm font-medium'>
                Current/Accpeted Bid Price
              </CardDescription>
              <CardTitle className='text-base'>{workOrderData.price}</CardTitle>
            </div>
            <Separator className='h-20' orientation='vertical' />
            <div className='m-0 text-center'>
              <CardDescription className='text-light-color text-sm font-medium'>
                Next Step
              </CardDescription>
              <CardTitle className='text-base'>NA</CardTitle>
            </div>
            <Separator className='h-20' orientation='vertical' />
            <div className='m-0 text-center'>
              <CardDescription className='text-light-color text-sm font-medium'>
                Next Step Date
              </CardDescription>
              <CardTitle className='text-base'>NA</CardTitle>
            </div>
            <Separator className='h-20' orientation='vertical' />
            <div className='m-0 text-center'>
              <CardDescription className='text-light-color text-sm font-medium'>
                Region
              </CardDescription>
              <CardTitle className='text-base'>Los Angeles</CardTitle>
            </div>
            <Separator className='h-20' orientation='vertical' />
            <div className='m-0 text-center'>
              <CardDescription className='text-light-color text-sm font-medium'>
                Sales Designer
              </CardDescription>
              <CardTitle className='text-base'>Kelly Scheidt</CardTitle>
            </div>
            <Separator className='h-20' orientation='vertical' />
            <div className='m-0 text-center'>
              <CardDescription className='text-light-color text-sm font-medium'>
                Team
              </CardDescription>
              <CardTitle className='text-base'>Roof Top</CardTitle>
            </div>
          </div>
        </Card>

        <div className='rounded-6 mt-5 grid grid-cols-3 gap-4'>
          {/* work order details */}
          <Card className='border-color-grey w-full overflow-hidden rounded border'>
            <CardHeader className='theme-bg-light-rgba border-color-grey min-h-14 border-b p-3'>
              <CardTitle className='flex justify-between'>
                <div className='!text-lg'>Work Order Details</div>
                <div className='light-yellow-bg flex h-8 w-8 items-center justify-center rounded-full'>
                  <Button onClick={handleEdit} className='h-9 w-9 rounded-full'>
                    <Pencil className='text-dark-color h-5 w-5' />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className='p-0'>
              <div className='flex justify-between border-b border-solid p-3'>
                <CardDescription className='text-sm'>Id</CardDescription>
                <CardContent className='p-0 text-sm font-medium'>
                  {workOrderData.id}
                </CardContent>
              </div>
              <div className='flex justify-between border-b border-solid p-3'>
                <CardDescription className='text-sm'>
                  Working Category
                </CardDescription>
                <CardContent className='p-0 text-sm font-medium'>
                  Contacted
                </CardContent>
              </div>
              <div className='flex justify-between border-b border-solid p-3'>
                <CardDescription className='text-sm'>Status</CardDescription>
                <CardContent className='truncate p-0 pl-6 text-end text-sm font-medium'>
                  {workOrderData?.status}
                </CardContent>
              </div>
              <div className='flex justify-between border-b border-solid p-3'>
                <CardDescription className='text-sm'>Price</CardDescription>
                <CardContent className='truncate p-0 pl-6 text-end text-sm font-medium'>
                  {workOrderData?.price}
                </CardContent>
              </div>
              <div className='flex justify-between border-b border-solid p-3'>
                <CardDescription className='text-sm'>
                  Construction Dates
                </CardDescription>
                <CardContent className='truncate p-0 pl-6 text-end text-sm font-medium'>
                  {workOrderData?.finishDate}
                </CardContent>
              </div>
              <div className='flex justify-between border-b border-solid p-3'>
                <CardDescription className='text-sm'>Address</CardDescription>
                <CardContent className='truncate p-0 pl-6 text-end text-sm font-medium'>
                  {workOrderData?.address}
                </CardContent>
              </div>
              <div className='flex justify-between border-b border-solid p-3'>
                <CardDescription className='text-sm'>City</CardDescription>
                <CardContent className='truncate p-0 pl-6 text-end text-sm font-medium'>
                  {workOrderData?.city}
                </CardContent>
              </div>
              <div className='flex justify-between border-b border-solid p-3'>
                <CardDescription className='text-sm'>State</CardDescription>
                <CardContent className='truncate p-0 pl-6 text-end text-sm font-medium'>
                  {workOrderData?.state}
                </CardContent>
              </div>
            </CardContent>
          </Card>
          <Card className='border-color-grey w-full overflow-hidden rounded border'>
            <Tabs defaultValue='leadActivities'>
              <TabsList className='grid h-14 w-full grid-cols-2 rounded-none p-0'>
                <TabsTrigger
                  value='leadActivities'
                  className='h-14 rounded-none text-base font-semibold !shadow-none'
                >
                  Work Order Activities
                </TabsTrigger>
                <TabsTrigger
                  value='leadNotes'
                  className='h-14 rounded-none text-base font-semibold !shadow-none'
                >
                  Tickets
                </TabsTrigger>
              </TabsList>
              <TabsContent value='leadActivities'>
                <div className='activitie-collunm h-80 overflow-auto p-3'>
                  {activitiesData?.map(item => (
                    <>
                      <Card className='inner flex grid-cols-2 gap-2 shadow-none'>
                        <div className='flex'>
                          <Card className='relative shadow-none'>
                            <div
                              style={{ backgroundColor: '#ffe003' }}
                              className='relative z-10 flex h-3.5 w-3.5 items-center justify-center rounded-full'
                            >
                              {/* <Pencil className='text-white' size={20} /> */}
                            </div>
                            <Separator
                              className='line absolute ml-5'
                              orientation='vertical'
                            />
                          </Card>
                        </div>
                        <CardContent className='pl-3 pr-0'>
                          <CardDescription className='text-color font-meduim text-sm'>
                            {item.description}
                          </CardDescription>
                          <span className='right-2 top-2 text-xs font-medium text-gray-400'>
                            {formatDistanceToNow(new Date(item.createdAt), {
                              addSuffix: true
                            })}
                          </span>
                        </CardContent>
                      </Card>
                    </>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value='tickets'>No Tickets</TabsContent>
            </Tabs>
          </Card>
          <Card className='border-color-grey relative w-full overflow-hidden rounded border'>
            <CardHeader className='theme-bg-light-rgba border-color-grey min-h-14 border-b p-3'>
              <CardTitle className='flex justify-between'>
                <div className='!text-lg'>Work Order Notes</div>
              </CardTitle>
            </CardHeader>
            <div className='h-80 p-4'>
              <Card className='h-60 w-full overflow-auto rounded-none shadow-none'>
                {notesData.map(notes => {
                  const noteUser = userList.find(
                    user => user.id === notes.userId
                  )
                  return (
                    <CardContent className='pb-3 pl-0 pr-2' key={notes?.id}>
                      <div className='relative flex items-center gap-3 rounded-l-md rounded-t-md bg-gray-100 p-4'>
                        <div className='h-9 min-h-9 w-9 min-w-9 overflow-hidden rounded-full'>
                          <img
                            src='/images/user-avatar-male-5.png'
                            alt='User Avatar'
                          />
                        </div>
                        <div>
                          <h6 className='font-semibold'>
                            {noteUser
                              ? `${noteUser.firstName} ${noteUser.lastName}`
                              : 'Unknown User'}
                          </h6>
                          <CardDescription className='w-fit break-all rounded-l-md rounded-t-md text-base text-muted-foreground'>
                            {notes.description}
                          </CardDescription>
                          <span className='absolute right-2 top-2 text-xs font-medium text-gray-400'>
                            {formatDistanceToNow(new Date(notes.createdAt), {
                              addSuffix: true
                            })}
                            {notes.userId == session?.user?.id ? (
                              <Button
                                variant='ghost'
                                size='icon'
                                className='text-red-500 hover:text-red-600'
                                onClick={() =>
                                  handleDeleteNotes({
                                    noteId: notes.id
                                  })
                                }
                              >
                                <Trash2 className='h-5 w-5' />
                              </Button>
                            ) : (
                              ''
                            )}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  )
                })}
              </Card>
              <CardFooter className='bottom-0 left-0 w-full px-0 pb-3'>
                <Notes
                  moduleId={workOrderId}
                  moduleName='workOrderObj'
                  getNotesApi={getNotesApi}
                  getActivities={getActivities}
                />
              </CardFooter>
            </div>
          </Card>
        </div>
        <div className='rounded-6 mt-5 grid grid-cols-3 gap-4'>
          {/* Work Order Finances */}
          <Card className='border-color-grey w-full overflow-hidden rounded border'>
            <CardHeader className='theme-bg-light-rgba border-color-grey min-h-14 border-b p-3'>
              <CardTitle className='flex justify-between'>
                <div className='!text-lg'>Work Order Finances</div>
              </CardTitle>
            </CardHeader>
            <CardContent className='p-0'>
              <div className='flex justify-between border-b border-solid p-3'>
                <CardDescription className='text-base'>
                  Budgeted Cost:
                </CardDescription>
                <CardContent className='p-0 text-base font-medium'>
                  $19,460
                </CardContent>
              </div>
              <div className='flex justify-between border-b border-solid p-3'>
                <CardDescription className='text-base'>
                  Sell Price:
                </CardDescription>
                <CardContent className='p-0 text-base font-medium'>
                  $10,000
                </CardContent>
              </div>
              <div className='flex justify-between border-b border-solid p-3'>
                <CardDescription className='text-base'>
                  Current Low Bid:
                </CardDescription>
                <CardContent className='truncate p-0 pl-6 text-end text-base font-medium'>
                  $8,000
                </CardContent>
              </div>
              <div className='flex justify-between border-b border-solid p-3'>
                <CardDescription className='text-base'>
                  Current Best Qualified Bid:
                </CardDescription>
                <CardContent className='truncate p-0 pl-6 text-end text-base font-medium'>
                  $3,210
                </CardContent>
              </div>
              <div className='flex justify-between border-b border-solid p-3'>
                <CardDescription className='text-base'>
                  Accepted Bid:
                </CardDescription>
                <CardContent className='truncate p-0 pl-6 text-end text-base font-medium'>
                  $1,135
                </CardContent>
              </div>
              <div className='flex justify-between border-b border-solid p-3'>
                <CardDescription className='text-base'>
                  Excepted Profit:
                </CardDescription>
                <CardContent className='truncate p-0 pl-6 text-end text-base font-medium'>
                  $12,000
                </CardContent>
              </div>
              <div className='flex justify-between border-b border-solid p-3'>
                <CardDescription className='text-base'>
                  Actual Profit:
                </CardDescription>
                <CardContent className='truncate p-0 pl-6 text-end text-base font-medium'>
                  $15,700
                </CardContent>
              </div>
            </CardContent>
          </Card>
          {/* Current Bidders */}
          {/* // console.log(bids) */}
          <Card className='border-color-grey w-full overflow-hidden rounded border'>
            <CardHeader className='theme-bg-light-rgba border-color-grey min-h-14 border-b p-3'>
              <CardTitle className='flex justify-between'>
                <div className='!text-lg'>Current Bidders</div>
              </CardTitle>
            </CardHeader>
            <CardContent className='p-0'>
              {workOrderData?.biders?.map(bids => (
                <CardHeader
                  onClick={() =>
                    handleBidsOpen(bids?.contractorId, workOrderId)
                  }
                  key={bids.id}
                  className='theme-bg-light-rgba border-color-grey m-4 min-h-14 justify-center rounded border p-3'
                >
                  <div className='flex items-center justify-between border-solid'>
                    <CardDescription className='flex justify-between'>
                      <div className='!text-sm'>
                        {bids?.contractorInfo?.firstName}
                      </div>
                    </CardDescription>
                    <CardContent className='truncate p-0 pl-6 text-end text-base font-medium'>
                      ${bids?.totalEstimatedCost}
                    </CardContent>
                  </div>
                </CardHeader>
              ))}
            </CardContent>
          </Card>

          {/* Work Order Data */}
          <Card className='border-color-grey w-full overflow-hidden rounded border'>
            <CardHeader className='theme-bg-light-rgba border-color-grey min-h-14 border-b p-3'>
              <CardTitle className='flex justify-between'>
                <div className='!text-lg'>Work Order Data</div>
              </CardTitle>
            </CardHeader>
            <CardContent className='px-4 py-3'>
              <Accordion type='single' collapsible>
                {/* Contractor Details */}
                <AccordionItem value='contractor'>
                  <AccordionTrigger className='flex items-center justify-between px-2 py-3'>
                    <div className='flex items-center gap-2'>
                      <Home className='h-5 w-5' />
                      <CardDescription className='text-base'>
                        Contractor Details
                      </CardDescription>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className='border-t p-4'>
                    <div className='grid grid-cols-2 gap-3 text-sm'>
                      <div className='font-medium text-gray-500'>
                        Contractor Selected
                      </div>
                      <div className='text-right font-semibold text-gray-800'>
                        ABC Roofing Co.
                      </div>

                      <div className='font-medium text-gray-500'>
                        Contractor Selected Date
                      </div>
                      <div className='text-right font-semibold text-gray-800'>
                        March 20, 2025
                      </div>

                      <div className='font-medium text-gray-500'>
                        Scheduled Date:
                      </div>
                      <div className='text-right font-semibold text-gray-800'>
                        March 25, 2025
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Scheduling & Check-In */}
                <AccordionItem value='schedule'>
                  <AccordionTrigger className='flex items-center justify-between px-2 py-5'>
                    <div className='flex items-center gap-2'>
                      <CalendarDays className='h-5 w-5' />
                      <CardDescription className='text-base'>
                        Scheduling & Check-In
                      </CardDescription>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className='border-t p-4'>
                    Add scheduling and check-in details here.
                  </AccordionContent>
                </AccordionItem>

                {/* Roof Work */}
                <AccordionItem value='roof-work'>
                  <AccordionTrigger className='flex items-center justify-between px-2 py-5'>
                    <div className='flex items-center gap-2'>
                      <Building2 className='h-5 w-5' />
                      <CardDescription className='text-base'>
                        Roof Work
                      </CardDescription>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className='border-t p-4'>
                    Add roof work details here.
                  </AccordionContent>
                </AccordionItem>

                {/* Check out  */}
                <AccordionItem value='check-out'>
                  <AccordionTrigger className='flex items-center justify-between px-2 py-5'>
                    <div className='flex items-center gap-2'>
                      <DoorOpen className='h-5 w-5' />
                      <CardDescription className='text-base'>
                        Check-Out Details
                      </CardDescription>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className='border-t p-4'>
                    Add Check-Out Details details here.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value='Lead Files'>
        <Card>Lead files</Card>
      </TabsContent>
      <TabsContent value='Financials'>
        <Card>Financials</Card>
      </TabsContent>
    </Tabs>
  )
}
