'use client'

import DialogBox from '@/components/DialogBox'
import LayoutHeader from '@/components/layoutHeader'
import FormSelectField from '@/components/share/form/FormSelect'
import { Button } from '@/components/ui/button'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { useToast } from '@/hooks/use-toast'
import api from '@/lib/api'
import { Plus } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { columns } from '../user-columns'
import { DataTable } from '@/components/Table'
import { errorMessage } from '@/components/ToasterMessage'
import { Roles } from '@/components/usercrud/adduser'
import UsersServices from '@/components/services/users-api'

export default function UserDataList() {
  useDocumentTitle('All Users')
  const formMethods = useForm({
    defaultValues: { role: '' }
  })
  const router = useRouter()
  const { toast } = useToast()
  const [page, setPage] = useState(1)
  const [totalRecord, setTotalRecord] = useState()
  const [userList, setUserList] = useState([])
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const length = 10
  const searchParams = useSearchParams()
  const status = searchParams.get('role')
  const { watch } = formMethods
  const searchTerm = watch('role')
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const roleParam = status && status !== 'all' ? status : ''
        const response = await UsersServices.getAllUsers(page,length,roleParam)
        if (response?.status === 200) {
          setUserList(response?.data?.data?.users || [])
          setTotalRecord(response?.data?.data?.totalUsers)
        }
      } catch (error) {
        if (error) {
        errorMessage({description:error?.response?.data?.message})
        }
      }
    }
    fetchUsers()
  }, [page, status])

  // Function to update URL parameters
  const updateSearchParams = () => {
    const params = new URLSearchParams()
    if (searchTerm) params.set('role', searchTerm)

    router.push(`?${params.toString()}`)
  }

  useEffect(() => {
    updateSearchParams()
  }, [searchTerm])

  const handleEditUser = (row) => {
    router.push(`/dashboard/users/add?editId=${row.original.id}`)
  }

  const handleDeleteUser = (row) => {
    setDeleteIndex(row.original.id)
    setDeleteOpenModal(true)
  }

  const onDelete = async () => {
    try {
      if (deleteIndex) {
        const response = await UsersServices.deleteUser(deleteIndex)

        setDeleteOpenModal(false)
        if (response.status === 200) {
          toast({
            title: 'User Deleted',
            description: 'User has been deleted successfully.'
          })

          setUserList(prevList =>
            prevList.filter(user => user.id !== deleteIndex)
          )
        }
      }
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <LayoutHeader pageTitle='All Users' />
        <Button
          className='site-button'
          onClick={() => router.push(`/dashboard/users/add`)}
        >
          <Plus />
          Add User
        </Button>
      </div>
      <div className='mx-auto w-full py-6'>
        <FormProvider {...formMethods}>
          <form className='mb-4 grid grid-cols-4 gap-5'>
            <FormSelectField
              form={formMethods}
              name='role'
              label='Role'
              options={Roles}
              className='border-color-grey rounded !shadow-none'
            />
          </form>
        </FormProvider>
        <DataTable
          columns={columns(handleDeleteUser,handleEditUser)}
          data={userList}
          totalRecord={totalRecord}
          page={page}
          setPage={setPage}
          length={length}
        />
        <DialogBox
          onDelete={onDelete}
          description='Are you sure you want to delete this user?'
          deleteOpenModal={deleteOpenModal}
          deleteHandleModalClose={() => setDeleteOpenModal(false)}
        />
      </div>
    </>
  )
}
