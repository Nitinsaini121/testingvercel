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
import Notes from '../dashboard-notes/notes'
import List from '../ProductQuotes/List'
import { errorMessage, successMessage } from '../ToasterMessage'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import RoofTopDimension from './RoofTopDimension'

export function DashboardLeadTabs({ editId, editData }) {
  const [activeTab, setActiveTab] = useState('Dashboard Overview')
  const [userList, setUserList] = useState([])
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
        `notes/getNoteById?noteId=${editId}&moduleName=leadsObj`
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
        `activities/getActivitiesById?activityId=${editId}&moduleName=leadsObj`
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
    router.push(`/dashboard/leads/list/edit?editId=${editId}`)
  }

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

  useEffect(() => {
    const savedTab = localStorage.getItem('leadDashboardTab')
    if (savedTab) {
      setActiveTab(savedTab)
    }
  }, [])

  const handleTabChange = value => {
    setActiveTab(value)
    localStorage.setItem('leadDashboardTab', value)
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange}>
      <div className='flex justify-between border-none'>
        <TabsList className='dashboard-tabs grid grid-cols-4 gap-8 bg-white p-0'>
          <TabsTrigger
            value='Dashboard Overview'
            className='text-light-color relative !rounded-none !px-0 text-sm font-medium !shadow-transparent'
          >
            Dashboard Overview
          </TabsTrigger>
          <TabsTrigger
            value='Quotes'
            className='text-light-color relative !rounded-none !px-0 text-sm font-medium !shadow-transparent'
          >
            Quotes
          </TabsTrigger>
          <TabsTrigger
            value='Financials'
            className='text-light-color relative !rounded-none !px-0 text-sm font-medium !shadow-transparent'
          >
            Financials
          </TabsTrigger>
        </TabsList>
        <div
          style={{ color: 'red', textAlign: 'center' }}
          className='border-color-grey text-dark-color top-minus-2 relative h-8 rounded border px-3 pb-1 pt-1.5 text-sm'
        >
          Lead Date: 19/02/2025 06:08 PM{' '}
        </div>
      </div>
      <TabsContent className='mt-0' value='Dashboard Overview'>
        <Card className='shadow-none'>
          <div className='theme-bg-light-rgba border-color-grey flex h-24 w-full items-center justify-around space-x-4 border-b text-base'>
            <div className='m-0 text-center'>
              <CardDescription className='text-light-color text-sm font-medium'>
                Lead status
              </CardDescription>
              <CardTitle className='text-base'>Contacted</CardTitle>
            </div>
            <Separator className='h-20' orientation='vertical' />
            <div className='m-0 text-center'>
              <CardDescription className='text-light-color text-sm font-medium'>
                Current status
              </CardDescription>
              <CardTitle className='text-base'>
                You Sent SMS to Customer
              </CardTitle>
            </div>
            <Separator className='h-20' orientation='vertical' />
            <div className='m-0 text-center'>
              <CardDescription className='text-light-color text-sm font-medium'>
                Current state Date
              </CardDescription>
              <CardTitle className='text-base'>16/02/2025</CardTitle>
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

        <div className='mt-5 grid grid-cols-3 gap-4 rounded'>
          <Card className='border-color-grey w-full overflow-hidden rounded border'>
            <CardHeader className='theme-bg-light-rgba min-h-14 p-3'>
              <CardTitle className='flex justify-between'>
                <div className='!text-lg'>Lead Details</div>
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
                <CardContent className='text-dark-color p-0 text-sm font-medium'>
                  {editData?.firstName}
                  {editData?.lastName}
                </CardContent>
              </div>
              <div className='flex justify-between border-b border-solid p-3'>
                <CardDescription className='text-sm'>Status</CardDescription>
                <CardContent className='text-dark-color p-0 text-sm font-medium'>
                  Contacted
                </CardContent>
              </div>
              <div className='flex justify-between border-b border-solid p-3'>
                <CardDescription className='text-sm'>Email</CardDescription>
                <CardContent className='text-dark-color truncate p-0 pl-6 text-end text-sm font-medium'>
                  {editData?.email}
                </CardContent>
              </div>
              <div className='flex justify-between border-b border-solid p-3'>
                <CardDescription className='text-sm'>Phone</CardDescription>
                <CardContent className='text-dark-color truncate p-0 pl-6 text-end text-sm font-medium'>
                  {editData?.phone}
                </CardContent>
              </div>
              <div className='flex justify-between border-b border-solid p-3'>
                <CardDescription className='text-sm'>Address</CardDescription>
                <CardContent className='text-dark-color truncate p-0 pl-6 text-end text-sm font-medium'>
                  {editData?.address}
                </CardContent>
              </div>
              <div className='flex justify-between border-b border-solid p-3'>
                <CardDescription className='text-sm'>City</CardDescription>
                <CardContent className='text-dark-color truncate p-0 pl-6 text-end text-sm font-medium'>
                  {editData?.city}
                </CardContent>
              </div>
              <div className='flex justify-between border-b border-solid p-3'>
                <CardDescription className='text-sm'>State</CardDescription>
                <CardContent className='text-dark-color truncate p-0 pl-6 text-end text-sm font-medium'>
                  {editData?.state}
                </CardContent>
              </div>
              <div className='flex justify-between border-b border-solid p-3'>
                <CardDescription className='text-sm'>Zip</CardDescription>
                <CardContent className='text-dark-color truncate p-0 pl-6 text-end text-sm font-medium'>
                  {editData?.zip}
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
                  Lead Activities
                </TabsTrigger>
                <TabsTrigger
                  value='leadNotes'
                  className='h-14 rounded-none text-base font-semibold !shadow-none'
                >
                  Lead Notes
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
                              style={{ backgroundColor: '#FFE003' }}
                              className='relative z-10 flex h-3.5 w-3.5 items-center justify-center rounded-full'
                            >
                              {/* <Pencil className='text-dark-color' size={20} /> */}
                            </div>
                            <Separator
                              className='line absolute ml-5'
                              orientation='vertical'
                            />
                          </Card>
                        </div>
                        <CardContent className='pl-3 pr-0'>
                          <CardDescription className='text-color font-meduim text-base'>
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
              <TabsContent value='leadNotes' className='mt-0'>
                <div className='h-80 border-none p-4'>
                  <Card className='h-60 w-full overflow-auto rounded-none shadow-none'>
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
                                {formatDistanceToNow(
                                  new Date(notes.createdAt),
                                  {
                                    addSuffix: true
                                  }
                                )}
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
                  <CardFooter className='bottom-0 left-0 w-full px-0 pb-3 pt-0'>
                    <Notes
                      getActivities={getActivities}
                      moduleId={editId}
                      moduleName='leadsObj'
                      getNotesApi={getNotesApi}
                    />
                  </CardFooter>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
          <Card className='border-color-grey relative w-full overflow-hidden rounded border'>
            <CardHeader className='theme-bg-light-rgba min-h-14 p-3'>
              <CardTitle className='flex justify-between'>
                <div className='!text-lg'></div>
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value='Quotes'>
        <Card>
          <CardDescription className='text-dark-color mt-7 pb-2 text-lg font-semibold'>
            Measurement Details
          </CardDescription>
          <RoofTopDimension />
        </Card>
        <Separator />
        <Card>
          <List />
        </Card>
      </TabsContent>
      <TabsContent value='Financials'>
        <Card>qwerty</Card>
      </TabsContent>
    </Tabs>
  )
}
