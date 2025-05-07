'use client'

import DialogBox from '@/components/DialogBox'
import LayoutHeader from '@/components/layoutHeader'
import LeadsServices from '@/services/leads-api'
import { DataTable } from '@/components/Table'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import EditTask from './EditTask'
import { taskColumn } from './taskColumn'
import TaskForm from './TaskForm'

const TaskList = ({ editId }) => {
  const [taskList, setTaskList] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [taskId, setTaskId] = useState(null)
  const [taskData, setTaskData] = useState([])
  const [totalRecord, setTotalRecord] = useState()
  const [page, setPage] = useState(1)
  const [length, setLength] = useState(10)
  const form = useForm({
    defaultValues: {
      length: '10'
    }
  })
  const getTaskList = async () => {
    try {
      setLoading(true)
      const res = await LeadsServices.tasksAll(editId, length, page)
      if (res?.status === 200) {
        setTaskList(res?.data?.data)
        setTotalRecord(res?.data?.meta?.total)
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
    getTaskList()
  }, [page, length])

  const onDelete = async () => {
    if (deleteIndex !== null) {
      try {
        const res = await LeadsServices.deleteTask(deleteIndex)
        setDeleteOpenModal(false)
        if (res?.status === 200) {
          getTaskList()
          successMessage({ description: res?.data?.message })
        }
      } catch (error) {
        console.log('errorerror', error)
        errorMessage({
          description: error?.response?.data?.message
        })
      }
    }
  }

  const handleDeleteTask = row => {
    setDeleteOpenModal(true)
    setDeleteIndex(row?.original?.id)
  }
  // edit table row
  const handleEditTask = row => {
    setTaskId(row.original.id)
    setTaskData(taskList)
    setOpenDialog(true)
  }
  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false)
  }
  const handleAddTask = () => {
    setOpenDialog(true)
  }
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'length') {
        const val = value.length
        setLength(val === 'all' ? totalRecord || 9999 : Number(val))
        setPage(1)
      }
    })
    return () => subscription.unsubscribe()
  }, [form, totalRecord])
  return (
    <div>
      <div className='mb-3 flex items-center justify-between'>
        <LayoutHeader pageTitle='' />
        <Button className='site-button' onClick={handleAddTask}>
          <Plus />
          Add Task
        </Button>
      </div>
      <DataTable
        data={taskList}
        loading={loading}
        columns={taskColumn(handleDeleteTask, handleEditTask)}
        totalRecord={totalRecord}
        page={page}
        setPage={setPage}
        length={length}
      />

      <DialogBox
        onDelete={onDelete}
        description='Are you certain you want to proceed with this deletion?'
        deleteOpenModal={deleteOpenModal}
        deleteHandleModalClose={deleteHandleModalClose}
      />

      <Dialog
        open={openDialog}
        onOpenChange={isOpen => {
          setOpenDialog(isOpen)
          if (!isOpen) {
            setTaskId(null)
            setTaskData([])
          }
        }}
      >
        <DialogContent className='max-h-[90vh] max-w-[60%] overflow-y-auto transition-all duration-300'>
          <DialogHeader>
            <DialogTitle>
              {taskId !== null ? 'EditTask' : 'Add Task'}
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          {taskId !== null ? (
            <>
              <EditTask
                taskData={taskData}
                editId={editId}
                getTaskList={getTaskList}
                setOpenDialog={setOpenDialog}
                taskId={taskId}
                setTaskId={setTaskId}
              />
            </>
          ) : (
            <>
              <TaskForm
                editId={editId}
                getTaskList={getTaskList}
                setOpenDialog={setOpenDialog}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default TaskList
