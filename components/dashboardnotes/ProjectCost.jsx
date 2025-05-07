'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Edit, PlusCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ProjectCostValidation } from '../form-validations/ProjectCostValidation'
import LeadsServices from '../../services/leads-api'
import { errorMessage, successMessage } from '../ToasterMessage'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import CostFormfield from './CostFormfield'

const ProjectCost = ({ editId }) => {
  const [costData, setCostData] = useState()
  const [openDialog, setOpenDialog] = useState(false)
  const [costEditId, setCostEditId] = useState(null)
  const form = useForm({ resolver: yupResolver(ProjectCostValidation) })
  const getCostData = async () => {
    try {
      const res = await LeadsServices.projectCost(editId)
      if (res?.status === 200) {
        setCostData(res?.data?.data)
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }
  useEffect(() => {
    getCostData()
  }, [])
  const handleAddActivities = () => {
    setOpenDialog(true)
    form.reset()
  }
  const onSubmit = async data => {
    const formData = new FormData()
    formData.append('cmu', data.cmu)
    formData.append('id', costEditId)
    formData.append('co', data.co)
    formData.append('dk', data.dk)
    formData.append('dm', data.dm)
    formData.append('mc', data.mc)
    formData.append('po', data.po)
    formData.append('rf', data.rf)
    formData.append('rtu', data.rtu)
    formData.append('sp', data.sp)
    formData.append('st', data.st)
    formData.append('stl', data.stl)
    formData.append('swm', data.swm)
    formData.append('td', data.td)
    formData.append('type', 'cost')
    formData.append('up', data.up)
    formData.append('lead_id', editId)
    try {
      const response = await LeadsServices.addCost(formData)
      if (response?.status === 200) {
        successMessage({
          description: response?.data?.message
        })
        setOpenDialog(false)
        setCostEditId(null)
        getCostData()
        form.reset()
      }
    } catch (error) {
      console.log('error', error)
    }
  }
  const handleEditCost = costData => {
    setCostEditId(costData?.id)
    form.reset(costData)
    setOpenDialog(true)
  }
  return (
    <>
      <CardHeader className='theme-bg-light-rgba min-h-14 !p-0'>
        <CardTitle className='flex justify-between gap-4 p-3 border-b border-color-grey'>
          <div className='!text-lg'>Project Cost SQFT / Category</div>
          <div  className='flex justify-between gap-4' >
            <Button
              onClick={handleAddActivities}
              className='h-8 w-8 rounded-full'
            >
              <PlusCircle className='text-white h-5 w-5' />
            </Button>
            <Button
              onClick={() => handleEditCost(costData)}
              className='h-8 w-8 rounded-full'
            >
              <Edit className='text-white h-5 w-5' />
            </Button>
          </div>
        </CardTitle>
        <div className='flex justify-between px-3 py-2 border-b border-color-grey bg-white !m-0'>
          <p className='font-medium'>Segment</p>
          <p className='font-medium'>Cost/Sqft</p>
        </div>
      </CardHeader>
      <div className='h-96 overflow-auto p-0'>
        
        <Card className='w-full overflow-auto rounded-none shadow-none'>
          <CardContent className='p-0'>
            <div className='flex justify-between border-b border-solid p-3'>
              <CardDescription className='text-sm'>SP</CardDescription>
              <CardContent className='text-dark-color p-0 text-sm font-medium'>
                {costData?.sp}$
              </CardContent>
            </div>
            <div className='flex justify-between border-b border-solid p-3'>
              <CardDescription className='text-sm'>TD</CardDescription>
              <CardContent className='text-dark-color truncate p-0 pl-6 text-end text-sm font-medium'>
                {costData?.td}
              </CardContent>
            </div>
            <div className='flex justify-between border-b border-solid p-3'>
              <CardDescription className='text-sm'>SWM</CardDescription>
              <CardContent className='text-dark-color truncate p-0 pl-6 text-end text-sm font-medium'>
                {costData?.swm}
              </CardContent>
            </div>
            <div className='flex justify-between border-b border-solid p-3'>
              <CardDescription className='text-sm'>UP</CardDescription>
              <CardContent className='text-dark-color truncate p-0 pl-6 text-end text-sm font-medium'>
                {costData?.up}$
              </CardContent>
            </div>
            <div className='flex justify-between border-b border-solid p-3'>
              <CardDescription className='text-sm'>RF</CardDescription>
              <CardContent className='text-dark-color truncate p-0 pl-6 text-end text-sm font-medium'>
                {costData?.rf}$
              </CardContent>
            </div>
            <div className='flex justify-between border-b border-solid p-3'>
              <CardDescription className='text-sm'>CO</CardDescription>
              <CardContent className='text-dark-color truncate p-0 pl-6 text-end text-sm font-medium'>
                {costData?.co}$
              </CardContent>
            </div>
            <div className='flex justify-between border-b border-solid p-3'>
              <CardDescription className='text-sm'>DK</CardDescription>
              <CardContent className='text-dark-color truncate p-0 pl-6 text-end text-sm font-medium'>
                {costData?.dk}$
              </CardContent>
            </div>{' '}
            <div className='flex justify-between border-b border-solid p-3'>
              <CardDescription className='text-sm'>ST</CardDescription>
              <CardContent className='text-dark-color truncate p-0 pl-6 text-end text-sm font-medium'>
                {costData?.st}$
              </CardContent>
            </div>
            <div className='flex justify-between border-b border-solid p-3'>
              <CardDescription className='text-sm'>DM</CardDescription>
              <CardContent className='text-dark-color truncate p-0 pl-6 text-end text-sm font-medium'>
                {costData?.dm}$
              </CardContent>
            </div>
            <div className='flex justify-between border-b border-solid p-3'>
              <CardDescription className='text-sm'>PO</CardDescription>
              <CardContent className='text-dark-color truncate p-0 pl-6 text-end text-sm font-medium'>
                {costData?.po}$
              </CardContent>
            </div>
            <div className='flex justify-between border-b border-solid p-3'>
              <CardDescription className='text-sm'>CMU</CardDescription>
              <CardContent className='text-dark-color truncate p-0 pl-6 text-end text-sm font-medium'>
                {costData?.cmu}$
              </CardContent>
            </div>
            <div className='flex justify-between border-b border-solid p-3'>
              <CardDescription className='text-sm'>STL</CardDescription>
              <CardContent className='text-dark-color truncate p-0 pl-6 text-end text-sm font-medium'>
                {costData?.stl}$
              </CardContent>
            </div>
            <div className='flex justify-between border-b border-solid p-3'>
              <CardDescription className='text-sm'>MC</CardDescription>
              <CardContent className='text-dark-color truncate p-0 pl-6 text-end text-sm font-medium'>
                {costData?.mc}$
              </CardContent>
            </div>
            <div className='flex justify-between border-b border-solid p-3'>
              <CardDescription className='text-sm'>RTU</CardDescription>
              <CardContent className='text-dark-color truncate p-0 pl-6 text-end text-sm font-medium'>
                {costData?.rtu}$
              </CardContent>
            </div>
          </CardContent>
        </Card>

        <Dialog
          open={openDialog}
          onOpenChange={isOpen => {
            setOpenDialog(isOpen)
            if (!isOpen) {
              setCostEditId(null)
            }
          }}
        >
          <DialogContent className='max-h-[90vh] max-w-[60%] overflow-y-auto transition-all duration-300'>
            <DialogHeader>
              <DialogTitle>
                {costEditId !== null
                  ? 'Project Cost SQFT / Category'
                  : 'Project Cost SQFT / Category'}
              </DialogTitle>
            </DialogHeader>
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CostFormfield form={form} />
                <div className='mt-4 flex justify-end'>
                  <Button type='submit' className='site-button'>
                    {costEditId !== null ? 'Update' : 'Submit'}
                  </Button>
                </div>
              </form>
            </FormProvider>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}

export default ProjectCost
