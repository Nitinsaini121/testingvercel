'use client'
import { UserValidation } from '@/components/form-validations/userValidation'
import LayoutHeader from '@/components/layoutHeader'
import UserServices from '@/services/user-api'
import { successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import UserField from '@/components/UserSetting/UserField'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'

const AddUser = () => {
  const form = useForm({ resolver: yupResolver(UserValidation) })
  const router = useRouter()
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
    try {
      const response = await UserServices.AddUser(formData)
      if (response?.status === 200) {
        router.push(`/dashboard/settings/user-setting/list`)
        successMessage({ description: response?.data?.message })
      }
    } catch (error) {
      console.error('Error adding user:', error)
    }
    // Reset the form after submission
    form.reset()
  }
  return (
    <>
      <div>
        <div className='mb-3 flex items-center justify-between'>
          <LayoutHeader pageTitle='Add Users' />
          <Button
            className='site-button'
            onClick={() => router.push(`/dashboard/settings/user-setting/list`)}
          >
            All User
          </Button>
        </div>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmitUser)}>
            <UserField form={form} />
            <div className='mt-4 flex justify-end'>
              <Button type='submit' className='site-button'>
                Submit
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  )
}

export default AddUser
