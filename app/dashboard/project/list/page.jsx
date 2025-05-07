'use client'
import DialogBox from '@/components/DialogBox'
import LayoutHeader from '@/components/layoutHeader'
import ProjectServices from '@/components/services/project-service'
import { DataTable } from '@/components/Table'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { columnsProject } from './project-column'

const AllProject = () => {
  const router = useRouter()
  const [data, setData] = useState([])
  const [deleteId, setDeleteId] = useState(null)
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const fetchProject = async () => {
    try {
      const response = await ProjectServices.getAllProject()
      if (response?.status === 200) {
        if (response?.data?.status === true) {
          successMessage({ description: response?.data?.message })
          setData(response?.data?.data)
        } else {
          errorMessage({ description: response?.data?.message })
        }
      }
    } catch (error) {
      errorMessage({ description: error?.response?.data?.message ||error?.message})
    }
  }
  useEffect(() => {
    fetchProject()
  }, [])
  const handleEditProject = row => {
    console.log('Editrow', row?.original?.id)
    router.push(`/dashboard/project/list/edit?editid=${row?.original?.id}`)
  }

  const onDelete = async () => {
    if (deleteId !== null) {
      try {
        const response = await ProjectServices.deleteProject(deleteId)
        setDeleteOpenModal(false)
        if (response.status === 200) {
          if (response?.data?.status === true) {
            fetchProject()
            successMessage({
              description: 'Project has been deleted successfully.'
            })
          } else {
            errorMessage({ description: response?.data?.message })
          }
        }
      } catch (error) {
        if (error) {
          errorMessage({
            description: error?.response?.data?.message || error?.message
          })
        }
      }
    }
  }

  const handleDeleteProject = row => {
    setDeleteId(row.original.id)
    setDeleteOpenModal(true)
  }
  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false)
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <LayoutHeader pageTitle='All Projects' />
        <div className='flex gap-3'>
          <Button
            className='site-button'
            onClick={() => router.push(`/dashboard/project/add`)}
          >
            <Plus />
            Add New Project
          </Button>
        </div>
      </div>

      <DataTable
        data={data}
        columns={columnsProject(handleEditProject, handleDeleteProject, router)}
      />
      <DialogBox
        onDelete={onDelete}
        description='Are you certain you want to proceed with this deletion?'
        deleteOpenModal={deleteOpenModal}
        deleteHandleModalClose={deleteHandleModalClose}
      />
    </>
  )
}

export default AllProject
