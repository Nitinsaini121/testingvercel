'use client'
import { UserValidation } from '@/components/form-validations/userValidation'
import UserServices from '@/services/user-api'
import { Button } from '@/components/ui/button'
import UserField from '@/components/UserSetting/UserField'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const EditUser = ({ fetchUser, setSubmitOpenModal, editData }) => {
  const form = useForm({ resolver: yupResolver(UserValidation) })
  useEffect(() => {
    if (editData) {
      form.reset({
        name: editData?.name,
        email: editData?.email,
        phone: editData?.phone,
        password: editData?.password,
        password_confirmation: editData?.password_confirmation,
        address: editData?.address,
        role: editData?.role_id,
        status: editData?.status
      })
    }
  }, [])
  const editId = editData ? editData?.id : ''
  const onSubmitUser = async data => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('phone', data.phone)
    formData.append('password', data.password)
    formData.append('password_confirmation', data.password_confirmation)
    formData.append('address', data.address)
    formData.append('role_id', data.role_id)
    formData.append('status', data.status)
    formData.append('_method', 'PUT')
    try {
      const response = await UserServices.EditUser(editId, formData)
      if (response?.status === 200) {
        console.log('User added successfully:', response.data)
        fetchUser()
        setSubmitOpenModal(false)
      }
    } catch (error) {
      console.error('Error adding user:', error)
    }
    form.reset()
  }
  return (
    <>
      <div>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmitUser)}>
            <UserField form={form} />
            <div className='mt-4 flex justify-end'>
              <Button type='submit' className='site-button'>
                Update
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  )
}

export default EditUser
