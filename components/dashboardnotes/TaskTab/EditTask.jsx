'use client'

import { TaskValidation } from '@/components/form-validations/dashboardtaskValidation'
import LeadsServices from '@/services/leads-api'
import { successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import TaskFormField from './TaskFormField'

const EditTask = ({
  editId,
  getTaskList,
  setOpenDialog,
  taskId,
  taskData,
  setTaskId
}) => {
  const filterTask = taskData?.filter(item => item?.id === taskId)
  const form = useForm({ resolver: yupResolver(TaskValidation) })
  useEffect(() => {
    if (filterTask && filterTask.length > 0) {
      const task = filterTask[0]
      console.log('tasktasktask', task?.taskUsers)
      form.reset({
        task_status_id: String(task?.taskStatus?.id || ''),
        task_group_id: String(task?.taskGroup?.id || ''),
        task_subject_id: String(task?.taskSubject?.id || ''),
        project_id: String(task?.project?.id || ''),
        task_urgency_id: String(task?.taskUrgency?.id || ''),
        company_id: String(task?.company?.id || ''),
        taskUsers: task?.taskUsers?.map(user => user.user?.id.toString()) || [],
        taskTags:
          task?.taskTags
            ?.map(tag => tag?.tag?.id?.toString())
            .filter(Boolean) || [],
        checklist: task?.checklist || '',
        description: task?.description || '',
        file: task?.file || '',
        dueDate: new Date(task.due_date) || ''
      })
    }
  }, [taskId]) 
  const onSubmit = async data => {
    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('id', taskId)
    formData.append('lead_id', editId)
    formData.append('checklist', data.checklist)
    formData.append('company_id', Number(data.company_id))
    formData.append('description', data.description)
    formData.append('project_id', Number(data.project_id))
    if (data.taskUsers?.length > 0) {
      data.taskUsers?.forEach((tag, index) => {
        formData.append(`taskTags[${index}]`, tag)
      })
    }
    if (data.taskTags?.length > 0) {
      data.taskTags?.forEach((tag, index) => {
        formData.append(`taskTags[${index}]`, tag)
      })
    }
    formData.append('task_group_id', data.task_group_id)
    formData.append('task_status_id', Number(data.task_status_id))
    formData.append('task_subject_id', Number(data.task_subject_id))
    formData.append('task_urgency_id', Number(data.task_urgency_id))
    formData.append('file', data.file)
    function formatDateForMySQL(date) {
      const d = new Date(date)
      const pad = n => (n < 10 ? '0' + n : n)
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
    }
    formData.append('due_date', formatDateForMySQL(data.dueDate))
    try {
      const response = await LeadsServices.editTask(taskId, formData)
      if (response?.status === 200) {
        successMessage({
          description: response?.data?.message
        })
        setOpenDialog(false)
        getTaskList()
        getActivities()
        setTaskId(null)
        form.reset()
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <TaskFormField form={form} />
          <div className='mt-4 flex justify-end'>
            <Button type='submit' className='site-button'>Update</Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default EditTask
