'use client'
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
import { Pencil, Trash2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Notes from '../dashboard-notes/notes'
import { errorMessage, successMessage } from '../ToasterMessage'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import QualifiedCoontractor from './Qualified-Contractor'

export function QualifiedContractorTabs({ editData, editId }) {
  const form = useForm({})
  const [notesData, setNotesData] = useState([])
  const [userList, setUserList] = useState([])
  const [activitiesData, setActivitiesData] = useState()
  const router = useRouter()

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
        `notes/getNoteById?noteId=${editId}&moduleName=contractObj`
      )
      if (res?.status === 200) {
        setNotesData(res.data.data)
        getActivities()
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

  const getActivities = async () => {
    try {
      const res = await api.get(
        `activities/getActivitiesById?activityId=${editId}&moduleName=contractObj`
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
    getActivities()
  }, [])

  const handleEdit = () => {
    router.push(`/dashboard/contract/edit?editId=${editId}`)
  }
  const { data: session } = useSession()

  const handleDeleteNotes = async ({ noteId }) => {
    if (noteId !== null) {
      try {
        const response = await api.delete(
          `notes/deleteNoteById?noteId=${noteId}`
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

  const [activeTab, setActiveTab] = useState('Dashboard Overview')

  useEffect(() => {
    const savedTab = localStorage.getItem('QContractorDashboardTab')
    if (savedTab) {
      setActiveTab(savedTab)
    }
  }, [])

  const handleTabChange = value => {
    setActiveTab(value)
    localStorage.setItem('QContractorDashboardTab', value)
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange}>
      <div className='flex justify-between'>
        {/* Tabs Lists */}
        <TabsList className='dashboard-tabs grid grid-cols-5 bg-white p-0'>
          <TabsTrigger
            value='Dashboard Overview'
            className='relative !rounded-none !px-0 text-sm font-medium !shadow-transparent'
          >
            Dashboard Overview
          </TabsTrigger>
          <TabsTrigger
            value='Work Orders'
            className='relative !rounded-none !px-0 text-sm font-medium !shadow-transparent'
          >
            Work Orders
          </TabsTrigger>
          <TabsTrigger
            value='Financials'
            className='relative !rounded-none !px-0 text-sm font-medium !shadow-transparent'
          >
            Financials
          </TabsTrigger>
          <TabsTrigger
            value='Reviews'
            className='relative !rounded-none !px-0 text-sm font-medium !shadow-transparent'
          >
            Reviews
          </TabsTrigger>
          <TabsTrigger
            value='Tickets'
            className='relative !rounded-none !px-0 text-sm font-medium !shadow-transparent'
          >
            Tickets
          </TabsTrigger>
        </TabsList>
        <div
          style={{ color: 'red', textAlign: 'center' }}
          className='border-color-grey text-dark-color top-minus-2 relative h-8 rounded border px-3 pb-1 pt-1.5 text-sm'
        >
          Date: 19/02/2025 06:08 PM{' '}
        </div>
      </div>
      <TabsContent className='mt-0' value='Dashboard Overview'>
        {/* <Separator /> */}
        {/* Dashboard Bar */}
        <Card className='shadow-none'>
          <div className='theme-bg-light-rgba border-color-grey flex h-24 w-full items-center justify-around space-x-4 border-b text-base'>
            <div className='m-0 text-center'>
              <CardDescription className='text-light-color text-sm font-medium'>
                Contractor status
              </CardDescription>
              <CardTitle className='text-base'>{editData?.status}</CardTitle>
            </div>
            <Separator className='h-20' orientation='vertical' />
            <div className='m-0 text-center'>
              <CardDescription className='text-light-color text-sm font-medium'>
                Number of Bid
              </CardDescription>
              <CardTitle className='text-base'>40</CardTitle>
            </div>
            <Separator className='h-20' orientation='vertical' />
            <div className='m-0 text-center'>
              <CardDescription className='text-light-color text-sm font-medium'>
                Number of Won
              </CardDescription>
              <CardTitle className='text-base'>16</CardTitle>
            </div>
            <Separator className='h-20' orientation='vertical' />
            <div className='m-0 text-center'>
              <CardDescription className='text-light-color text-sm font-medium'>
                Last Logged In
              </CardDescription>
              <CardTitle className='text-base'>01/03/2025</CardTitle>
            </div>
            <Separator className='h-20' orientation='vertical' />
            <div className='m-0 text-center'>
              <CardDescription className='text-light-color text-sm font-medium'>
                Viewed Jobs
              </CardDescription>
              <CardTitle className='text-base'>6</CardTitle>
            </div>
            <Separator className='h-20' orientation='vertical' />
            <div className='m-0 text-center'>
              <CardDescription className='text-light-color text-sm font-medium'>
                Expertise
              </CardDescription>
              <CardTitle className='text-base'>Roof</CardTitle>
            </div>
          </div>
        </Card>
        <div className='rounded-6 mt-5 grid grid-cols-3 gap-4'>
          {/* Contractor Details  */}
          <Card className='border-color-grey w-full overflow-hidden rounded border'>
            <CardHeader className='theme-bg-light-rgba border-color-grey min-h-14 border-b p-3'>
              <CardTitle className='flex justify-between'>
                <div className='!text-lg'>Contractor Details</div>
                <div className='light-yellow-bg flex h-8 w-8 items-center justify-center rounded-full'>
                  <Button onClick={handleEdit} className='h-9 w-9 rounded-full'>
                    <Pencil className='text-dark-color h-5 w-5' />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className='p-0'>
              <div className='flex justify-between border-b border-solid p-3'>
                <CardDescription className='text-sm'>Name</CardDescription>
                <CardContent className='text-dark-color truncate p-0 pl-6 text-end text-sm font-medium'>
                  {editData?.contractorName}
                </CardContent>
              </div>
              <div className='flex justify-between border-b border-solid p-3'>
                <CardDescription className='text-sm'>Status</CardDescription>
                <CardContent className='text-dark-color truncate p-0 pl-6 text-end text-sm font-medium'>
                  {editData?.status}
                </CardContent>
              </div>
              <div className='flex justify-between border-b border-solid p-3'>
                <CardDescription className='text-sm'>Email</CardDescription>
                <CardContent className='text-dark-color truncate p-0 pl-6 text-end text-sm font-medium'>
                  {editData?.contractorEmail}
                </CardContent>
              </div>
              <div className='flex justify-between border-b border-solid p-3'>
                <CardDescription className='text-sm'>Phone</CardDescription>
                <CardContent className='text-dark-color truncate p-0 pl-6 text-end text-sm font-medium'>
                  {editData?.contractorPhone}
                </CardContent>
              </div>
              <div className='flex justify-between border-b border-solid p-3'>
                <CardDescription className='text-sm'>Address</CardDescription>
                <CardContent className='text-dark-color truncate p-0 pl-6 text-end text-sm font-medium'>
                  {editData?.contractorAddress}
                </CardContent>
              </div>
              <div className='flex justify-between border-b border-solid p-3'>
                <CardDescription className='text-sm'>City</CardDescription>
                <CardContent
                  className='truncate p-0 pl-6 text-end text-sm font-medium'
                  text-dark-color
                >
                  {editData?.contractorCity}
                </CardContent>
              </div>
              <div className='flex justify-between border-b border-solid p-3'>
                <CardDescription className='text-sm'>State</CardDescription>
                <CardContent className='text-dark-color truncate p-0 pl-6 text-end text-sm font-medium'>
                  {editData?.contractorState}
                </CardContent>
              </div>
              <div className='flex justify-between border-b border-solid p-3'>
                <CardDescription className='text-sm'>Zip</CardDescription>
                <CardContent className='text-dark-color truncate p-0 pl-6 text-end text-sm font-medium'>
                  {editData?.contractorZip}
                </CardContent>
              </div>
              <div className='px-3 py-2 text-sm'>
                <strong>First Draw:</strong> 20% of the approved bid amount,
                payable 48 hours after the bid submission is approved.
              </div>
              <div className='p-1 px-3 pb-5 text-sm'>
                <strong> Final Draw:</strong> 80% of the approved bid amount,
                payable 24 hours after completion of the work.
              </div>
            </CardContent>
          </Card>
          {/* Contractor activities and notes */}
          <Card className='border-color-grey w-full overflow-hidden rounded border'>
            <CardHeader className='theme-bg-light-rgba border-color-grey min-h-14 border-b p-3'>
              <CardTitle className='flex justify-between'>
                <div className='!text-lg'>Contractor ...</div>
              </CardTitle>
            </CardHeader>
          </Card>
          {/* Contractor Documents */}
          <QualifiedCoontractor />
        </div>
        {/* Contractor activities and notes */}

        <div className='flex gap-4'>
          <Card className='border-color-grey mt-4 w-full overflow-hidden rounded border'>
            <CardHeader className='theme-bg-light-rgba border-color-grey min-h-14 border-b p-3'>
              <CardTitle className='flex justify-between'>
                <div className='!text-lg'>Contractor Activities</div>
              </CardTitle>
            </CardHeader>
            <div className='activitie-collunm mt-2 h-96 overflow-auto p-4'>
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
                      <CardDescription className='text-color font-meduim break-all text-base'>
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
          </Card>
          <Card className='border-color-grey mt-4 w-full overflow-hidden rounded border'>
            <CardHeader className='theme-bg-light-rgba border-color-grey min-h-14 border-b p-3'>
              <CardTitle className='flex justify-between'>
                <div className='!text-lg'>Contractor Notes</div>
              </CardTitle>
            </CardHeader>
            <div className='h-96 p-4'>
              <Card className='h-64 w-full overflow-auto rounded-none shadow-none'>
                {notesData.map(notes => {
                  const noteUser = userList.find(
                    user => user.id === notes.userId
                  )
                  return (
                    <CardContent className='pb-3 pl-0 pr-2' key={notes?.id}>
                      <div className='theme-bg-light-rgba relative flex items-center gap-3 rounded p-4'>
                        <div className='h-9 min-h-9 w-9 min-w-9 overflow-hidden rounded-full'>
                          <img
                            src='/images/user-avatar-male-5.png'
                            alt='User Avatar'
                          />
                        </div>
                        <div>
                          <h6 className='text-sm font-semibold'>
                            {noteUser
                              ? `${noteUser.firstName} ${noteUser.lastName}`
                              : 'Unknown User'}
                          </h6>
                          <CardDescription className='w-fit break-all rounded-l-md rounded-t-md text-sm text-muted-foreground'>
                            {notes.description}
                          </CardDescription>
                          <span className='absolute right-2 top-2 text-xs font-medium text-gray-400'>
                            {formatDistanceToNow(new Date(notes.createdAt), {
                              addSuffix: true
                            })}
                            {notes?.userId == session?.user?.id ? (
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
                  getActivities={getActivities}
                  moduleId={editId}
                  moduleName='contractObj'
                  getNotesApi={getNotesApi}
                />
              </CardFooter>
            </div>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value='Work Orders'>
        <Card>Work Orders</Card>
      </TabsContent>
      <TabsContent value='Financials'>
        <Card>Financials</Card>
      </TabsContent>
      <TabsContent value='Reviews'>
        <Card>Reviews</Card>
      </TabsContent>
      <TabsContent value='Tickets'>
        <Card>Tickets</Card>
      </TabsContent>
    </Tabs>
  )
}
