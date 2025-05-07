'use client'
import BudgetBooksServices from '@/services/budgetBook'
import FormDatePicker from '@/components/share/form/datePicker'
import FormInputField from '@/components/share/form/FormInputField'
import FormMultiSelectField from '@/components/share/form/FormMultiSelect'
import SelectFilter from '@/components/share/form/SelectFilter'
import FormTextArea from '@/components/share/form/TextArea'
import TextEditor from '@/components/share/form/TextEditor'
import api from '@/lib/api'
import { useEffect, useState } from 'react'

const TaskFormField = ({ form }) => {
  const [allTask, setAllTask] = useState([])
  const [taskGroup, setTaskGroup] = useState([])
  const [taskSubject, setTaskSubject] = useState([])
  const [company, setCompany] = useState([])
  const [taskUrgency, setTaskUrgency] = useState([])
  const [taskUser, setTaskUser] = useState([])
  const [taskTag, setTaskTag] = useState([])
  const [budgetBook, setBudgetBook] = useState([])
  /// get project
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          statusRes,
          groupRes,
          subjectRes,
          companyRes,
          urgencyRes,
          userRes,
          tagRes,
          budgetRes
        ] = await Promise.all([
          api.get('/task-statuses'),
          api.get('/task-groups'),
          api.get('/task-subjects'),
          api.get('/companies'),
          api.get('/task-urgencies'),
          api.get('/users'),
          api.get('/task-tags'),
          BudgetBooksServices.budgetBooks()
        ])

        if (statusRes.status === 200) setAllTask(statusRes.data.data)
        if (groupRes.status === 200) setTaskGroup(groupRes.data.data)
        if (subjectRes.status === 200) setTaskSubject(subjectRes.data.data)
        if (companyRes.status === 200) setCompany(companyRes.data.data)
        if (urgencyRes.status === 200) setTaskUrgency(urgencyRes.data.data)
        if (userRes.status === 200) setTaskUser(userRes.data.data)
        if (tagRes.status === 200) setTaskTag(tagRes.data.data)
        if (budgetRes.status === 200) setBudgetBook(budgetRes.data.data)
      } catch (error) {
        console.log('Fetch error', error)
      }
    }

    fetchAllData()
  }, [])

  return (
    <>
      <div className='grid grid-cols-2 gap-5'>
        <SelectFilter
          form={form}
          name='task_status_id'
          label='Task Status'
          placeholder='Select Task Status'
          options={
            allTask.length > 0
              ? allTask.map(data => ({
                  label: data.title,
                  value: String(data.id)
                }))
              : []
          }
        />
        <SelectFilter
          form={form}
          name='task_group_id'
          label='Task Group'
          placeholder='Select Task Group'
          options={
            taskGroup.length > 0
              ? taskGroup.map(data => ({
                  label: data.name,
                  value: String(data.id)
                }))
              : []
          }
        />
        <SelectFilter
          form={form}
          name='task_subject_id'
          label='Task Subject'
          placeholder='Select Task Subject'
          options={
            taskSubject.length > 0
              ? taskSubject.map(data => ({
                  label: data.name,
                  value: String(data.id)
                }))
              : []
          }
        />
        <SelectFilter
          form={form}
          name='project_id'
          label='Project'
          placeholder='Select Project'
          options={
            budgetBook.length > 0
              ? budgetBook.map(data => ({
                  label: data.name,
                  value: String(data.id)
                }))
              : []
          }
        />
        <SelectFilter
          form={form}
          name='task_urgency_id'
          label='Task Urgency'
          placeholder='Select Task Urgency'
          options={
            taskUrgency.length > 0
              ? taskUrgency.map(data => ({
                  label: data.name,
                  value: String(data.id)
                }))
              : []
          }
        />

        <SelectFilter
          form={form}
          name='company_id'
          label='Company'
          placeholder='Select Company'
          options={
            company.length > 0
              ? company.map(data => ({
                  label: data.name,
                  value: String(data.id)
                }))
              : []
          }
        />

        <FormMultiSelectField
          form={form}
          name='taskUsers'
          label='Task User'
          placeholder='Select Task User'
          options={
            taskUser.length > 0
              ? taskUser.map(data => ({
                  label: data.name,
                  value: String(data.id)
                }))
              : []
          }
        />

        <FormMultiSelectField
          form={form}
          name='taskTags'
          label='Task Tags'
          placeholder='Select Task Tags'
          options={
            taskTag.length > 0
              ? taskTag.map(data => ({
                  label: data.title,
                  value: String(data.id)
                }))
              : []
          }
        />
        <FormDatePicker
          form={form}
          name='dueDate'
          label='Due Date'
          placeholder='Select Due Date'
        />
        <FormInputField
          form={form}
          name='file'
          placeholder='File Link'
          label='File'
        />
      </div>
      <FormTextArea
        className='rounded-6 !h-12 !max-h-28 !min-h-12 w-full bg-white !pr-7 pt-3 !shadow-[0_0_15px_-13px_black] shadow-slate-100'
        form={form}
        name='checklist'
        label='Check List'
        placeholder='Enter Check List'
        type='text'
      />
      <TextEditor
        name='description'
        form={form}
        label='Description'
        className='text-editor'
      />
    </>
  )
}

export default TaskFormField
