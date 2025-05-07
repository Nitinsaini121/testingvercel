'use client'

import { Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ActivitiesList from '../dashboardnotes/ActivitiesList'
import NotesList from '../dashboardnotes/NotesList'
import Notes from '../dashboardnotes/Notex'
import ProjectCost from '../dashboardnotes/ProjectCost'
import ProjectData from '../dashboardnotes/ProjectData'
import ProjectPrice from '../dashboardnotes/ProjectPrice'
import TaskList from '../dashboardnotes/TaskTab/List'
import EditLeads from '../leads-module/EditLead'
import DcsModal from '../modal/dscForm'
import LeadsServices from '../../services/leads-api'
import { errorMessage } from '../ToasterMessage'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../ui/card'
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog'
import { Separator } from '../ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'

export function DashboardLeadTabs({ editId, editData, fetchLeadById }) {
  const [activeTab, setActiveTab] = useState('Dashboard Overview')
  const [notesData, setNotesData] = useState([])
  const router = useRouter()
  const [activitiesData, setActivitiesData] = useState()
  const [dcsModalOpen, setDcsModalOpen] = useState(false) // State for DCS modal
  const [selectedDcsValue, setSelectedDcsValue] = useState(null) // Store DCS value for modal
  const [openDialog, setOpenDialog] = useState(false)
  const DCSOpenModal = editData => {
    setSelectedDcsValue(editData)
    setDcsModalOpen(true)
  }
  const getNotesApi = async () => {
    try {
      const res = await LeadsServices.GetNotes(editId)
      if (res?.status === 200) {
        setNotesData(res?.data?.data)
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }
  const getActivities = async () => {
    try {
      const res = await LeadsServices.interactions()
      if (res?.status === 200) {
        setActivitiesData(res?.data?.data)
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
    setOpenDialog(true)
  }

  const handleTabChange = value => {
    setActiveTab(value)
    localStorage.setItem('leadDashboardTab', value)
  }
  const rawDcsString = editData?.dcs || '0%'
  const cleanedDcs = parseFloat(rawDcsString.replace('%', '')) || 0
  return (
    <>
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <div className='flex justify-between border-b'>
          <TabsList className='dashboard-tabs grid grid-cols-4 gap-8 bg-white p-0'>
            <TabsTrigger
              value='Dashboard Overview'
              className='text-light-color relative !rounded-none !px-0 text-sm font-medium !shadow-transparent'
            >
              Dashboard Overview
            </TabsTrigger>
            <TabsTrigger
              value='task'
              className='text-light-color relative !rounded-none !px-0 text-sm font-medium !shadow-transparent'
            >
              Task
            </TabsTrigger>
          </TabsList>
          <div className='flex justify-center text-center gap-4'>
            <div className='relative top-[-0.5rem] flex h-8 items-center justify-between rounded border border-gray-300 bg-white px-3 text-sm text-gray-800'>
              <button
                onClick={() => DCSOpenModal(editData)}
                className='flex items-center space-x-2'
                aria-label='Edit Lead'
              >
                <div className='relative h-4 w-24 overflow-hidden rounded-full bg-green-100'>
                  <div
                    className='h-full rounded-full bg-green-500'
                    style={{ width: `${cleanedDcs}%` }}
                  />
                  <span className='absolute inset-0 flex items-center justify-center text-xs font-medium text-green-800'>
                    {cleanedDcs}%
                  </span>
                </div>
                <Pencil className='h-3 w-3 text-gray-800' />
              </button>
            </div>
            <div className='relative top-[-0.5rem] flex h-8 items-center justify-between rounded border border-gray-300 bg-white px-3 text-sm text-gray-800'>
              <span className='ml-4 text-red-600'>
                Lead Date: 19/02/2025 06:08 PM
              </span>
            </div>
          </div>
        </div>
        <TabsContent className='mt-0' value='Dashboard Overview'>
          <Card className='shadow-none'>
            <div className='theme-bg-light-rgba border-color-grey flex h-24 w-full items-center justify-around space-x-4 border-b text-base'>
              <div className='m-0 text-center'>
                <CardDescription className='text-light-color text-sm font-medium'>
                  Lead status
                </CardDescription>
                <CardTitle className='text-base'>
                  {editData?.leadStatus?.title}
                </CardTitle>
              </div>
              <Separator className='h-20' orientation='vertical' />
              <div className='m-0 text-center'>
                <CardDescription className='text-light-color text-sm font-medium'>
                  Last Contact Type
                </CardDescription>
                <CardTitle className='text-base'>
                  You Sent SMS to Customer
                </CardTitle>
              </div>
              <Separator className='h-20' orientation='vertical' />
              <div className='m-0 text-center'>
                <CardDescription className='text-light-color text-sm font-medium'>
                  Last Contact Date
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
                  Sales Person
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
              <CardHeader className='theme-bg-light-rgba min-h-14 p-3 border-b'>
                <CardTitle className='flex justify-between'>
                  <div className='!text-lg'>Lead Details</div>
                  <div className='light-yellow-bg flex h-8 w-8 items-center justify-center rounded-full'>
                    <Button
                      onClick={handleEdit}
                      className='h-8 w-8 rounded-full'
                    >
                    <Pencil className='text-white h-5 w-5' />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className='p-0'>
                <div className='flex justify-between border-b border-solid p-3'>
                  <CardDescription className='text-sm'>
                    Project Name
                  </CardDescription>
                  <CardContent className='text-dark-color p-0 text-sm font-medium'>
                    {editData?.project?.name}
                  </CardContent>
                </div>
                <div className='flex justify-between border-b border-solid p-3'>
                  <CardDescription className='text-sm'>Company</CardDescription>
                  <CardContent className='text-dark-color p-0 text-sm font-medium'>
                    {editData?.company?.name}
                  </CardContent>
                </div>
                <div className='flex justify-between border-b border-solid p-3'>
                  <CardDescription className='text-sm'>Contact</CardDescription>
                  <CardContent className='text-dark-color truncate p-0 pl-6 text-end text-sm font-medium'>
                    {editData?.contact?.name}
                  </CardContent>
                </div>
                <div className='flex justify-between border-b border-solid p-3'>
                  <CardDescription className='text-sm'>
                    Lead Address
                  </CardDescription>
                  <CardContent className='text-dark-color truncate p-0 pl-6 text-end text-sm font-medium'>
                    {editData?.salePerson?.address}
                  </CardContent>
                </div>
                <div className='flex justify-between border-b border-solid p-3'>
                  <CardDescription className='text-sm'>Phone</CardDescription>
                  <CardContent className='text-dark-color truncate p-0 pl-6 text-end text-sm font-medium'>
                    {editData?.salePerson?.phone}
                  </CardContent>
                </div>
                <div className='flex justify-between border-b border-solid p-3'>
                  <CardDescription className='text-sm'>
                    Engineer
                  </CardDescription>
                  <CardContent className='text-dark-color truncate p-0 pl-6 text-end text-sm font-medium'>
                    {editData?.engineer?.name}
                  </CardContent>
                </div>
              </CardContent>
            </Card>

            <Card className='border-color-grey w-full overflow-hidden rounded border'>
              <ActivitiesList
                activitiesData={activitiesData}
                editId={editId}
                getActivities={getActivities}
              />
            </Card>

            <Card className='border-color-grey w-full overflow-hidden rounded border'>
              <CardHeader className='theme-bg-light-rgba border-color-grey min-h-14 border-b p-3'>
                <CardTitle className='flex justify-between'>
                  <div className='!text-lg'>Message</div>
                </CardTitle>
              </CardHeader>
              <div className='h-96 p-4'>
                <Card className='h-64 w-full overflow-auto rounded-none shadow-none'>
                  <NotesList notesData={notesData} />
                </Card>
                <CardFooter className='bottom-0 left-0 w-full px-0 pb-3'>
                  <Notes
                    moduleId={editId}
                    moduleName='contractObj'
                    getNotesApi={getNotesApi}
                  />
                </CardFooter>
              </div>
            </Card>

            <Card className='border-color-grey w-full overflow-hidden rounded border'>
              <CardHeader className='theme-bg-light-rgba min-h-14 p-3 border-b'>
                <CardTitle className='flex justify-between '>
                  <div className='!text-lg'>Project Data</div>
                </CardTitle>
              </CardHeader>
              <ProjectData />
            </Card>

            <Card className='border-color-grey w-full overflow-hidden rounded border'>
              <ProjectCost editId={editId} />
            </Card>

            <Card className='border-color-grey w-full overflow-hidden rounded border'>
              <ProjectPrice editId={editId} />
            </Card>
          </div>
        </TabsContent>
        <TabsContent value='task'>
          <Card>
            <CardDescription className='text-dark-color mt-7 pb-2 text-lg font-semibold'>
              Task
            </CardDescription>
            <TaskList editId={editId} />
          </Card>
          <Separator />
          <Card></Card>
        </TabsContent>
      </Tabs>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className='max-h-[90vh] max-w-[60%] overflow-y-auto transition-all duration-300'>
          <DialogHeader></DialogHeader>

          <EditLeads
            editLeadId={editId}
            setOpenDialog={setOpenDialog}
            fetchLeadById={fetchLeadById}
          />
        </DialogContent>
      </Dialog>
      <DcsModal
        getListLeads={fetchLeadById}
        isOpen={dcsModalOpen}
        onClose={() => setDcsModalOpen(false)}
        dcsValue={selectedDcsValue}
      />
    </>
  )
}
