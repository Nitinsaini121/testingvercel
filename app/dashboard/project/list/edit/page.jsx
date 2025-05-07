'use client'

import LayoutHeader from '@/components/layoutHeader'
import ProjectField from '@/components/ProjectComponent/ProjectField'
import ProjectServices from '@/components/services/project-service'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const EditProject = () => {
  const searchParams = useSearchParams()
  const editid = searchParams.get('editid')
  const [editData, setEditData] = useState()
  const router = useRouter()
  const [lattitude, setLatitudde] = useState('')
  const [longitudde, setLongitudde] = useState('')

  const form = useForm({})
  const fetchProject = async () => {
    try {
      const response = await ProjectServices.getProjectById(editid)
      if (response?.status === 200) {
        if (response?.data?.status === true) {
          successMessage({ description: response?.data?.message })
          setEditData(response?.data?.data)
          form.reset(response?.data?.data)
        } else {
          errorMessage({ description: response?.data?.message })
        }
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message || error?.message
      })
    }
  }
  useEffect(() => {
    fetchProject()
  }, [])
  const onsubmitProject = async data => {
    try {
      const projectData = {
        ...data,
        latitude: lattitude,
        longitude: longitudde
      }
      const response = await ProjectServices.updateProject(editid, projectData)
      if (response?.status === 200) {
        if (response?.data?.status === true) {
          router.push('/dashboard/project/list')
          successMessage({ description: response?.data?.message })
        } else {
          errorMessage({ description: response?.data?.message })
        }
      }
    } catch (error) {
      errorMessage({
        description: error?.message || error?.response?.data?.message
      })
    }
  }
  return (
    <>
      <div className='flex items-center justify-between'>
        <LayoutHeader pageTitle='Edit Project' />
        <div className='flex gap-3'>
          <Button
            className='site-button'
            onClick={() => router.push(`/dashboard/project/list`)}
          >
            All Projects
          </Button>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onsubmitProject)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
            }
          }}
        >
          <ProjectField
            form={form}
            setLatitudde={setLatitudde}
            setLongitudde={setLongitudde}
          />
          <div className='mt-3 flex justify-end'>
            <Button className='site-button' type='submit'>
              Update
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default EditProject
