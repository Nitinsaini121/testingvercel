'use client'

import { useToast } from '@/hooks/use-toast'

import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { UserValidationSchema } from '../form-validations/user-validation'
import LayoutHeader from '../layoutHeader'
import UsersServices from '../services/users-api'
import FormInputField from '../share/form/FormInputField'
import FormSelectField from '../share/form/FormSelect'
import { errorMessage, successMessage } from '../ToasterMessage'
import { Button } from '../ui/button'
import { Form } from '../ui/form'
import useDocumentTitle from '../utils/useDocumentTitle'
export const Roles = [
  {
    value: 'sales',
    label: 'Sales'
  },
  {
    value: 'administrator',
    label: 'Administrator'
  },
  {
    value: 'super_admin',
    label: 'Super Admin'
  },
  {
    value: 'qualified_contractor',
    label: 'Contractor'
  },
  {
    value: 'quality_assurance_manager',
    label: 'Assurance Manager'
  },
  {
    value: 'customer',
    label: 'Customer'
  }
]
const AddUser = () => {
  const searchParams = useSearchParams()
  const editUserId = searchParams.get('editId')

  const form = useForm({
    resolver: yupResolver(UserValidationSchema),
    defaultValues: {}
  })
  useDocumentTitle(editUserId ? 'Edit User' : 'Add User')

  const fetchUserById = async () => {
    try {
      const response = await UsersServices.getUserById(editUserId)
      form.reset(response.data.data[0])
    } catch (error) {
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Update Error',
          description: error.message
        })
      }
    }
  }

  useEffect(() => {
    if (editUserId) {
      fetchUserById()
    }
  }, [editUserId])
  const router = useRouter()

  const { toast } = useToast() // Use ShadCN toast
  const handleSubmit = async data => {
    const formData = {
      firstName: data.firstName,
      email: data.email,
      userName: data.userName,
      phoneNumber: data.phoneNumber,
      password: data.password,
      lastName: data.lastName,
      role: data.role
    }
    if (editUserId) {
      try {
        const response = await UsersServices.updateUser(editUserId, formData)
        if (response.status === 200) {
          if (response.status === 200) {
            successMessage({
              description: response?.data?.message
            })
            router.push('/dashboard/users/list')
          }

          router.push('/dashboard/users/list')
        }
      } catch (err) {
        if (err instanceof Error) {
          errorMessage({
            description: err?.response?.data?.message
          })
        }
      }
    } else {
      try {
        const registerResponse = await UsersServices.register(formData)
        if (registerResponse.status === 200) {
          successMessage({
            description: registerResponse?.data?.message
          })
          router.push('/dashboard/users/list')
        }
      } catch (err) {
        if (err instanceof Error) {
          errorMessage({
            description: err?.response?.data?.message
          })
        }
      }
    }
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <LayoutHeader pageTitle={editUserId ? 'Edit User' : 'Add User'} />
        <Button
          className='site-button'
          onClick={() => router.push(`/dashboard/users/list`)}
        >
          All User
        </Button>
      </div>

      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-4'
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault()
              }
            }}
          >
            <div className='grid grid-cols-2 items-center justify-between gap-5'>
              <FormInputField
                form={form}
                name='firstName'
                label='First Name'
                type='text'
                placeholder='Enter your First Name'
                className='border-color-grey rounded !shadow-none'
              />
              <FormInputField
                form={form}
                name='lastName'
                label='Last Name'
                type='text'
                placeholder='Enter your Last Name'
                className='border-color-grey rounded !shadow-none'
              />
              <FormInputField
                form={form}
                name='userName'
                label='User Name'
                type='text'
                placeholder='Enter your User Name'
                className='border-color-grey rounded !shadow-none'
              />
              <FormInputField
                form={form}
                name='phoneNumber'
                label='Phone Number'
                type='tel'
                placeholder='Enter your Phone Number'
                className='border-color-grey rounded !shadow-none'
              />
              <FormInputField
                form={form}
                name='email'
                label='Email'
                type='email'
                placeholder='Enter your email'
                className='border-color-grey rounded !shadow-none'
              />
              <FormInputField
                form={form}
                name='password'
                label='Password'
                type='password'
                placeholder='Enter your password'
                className='border-color-grey rounded !shadow-none'
              />
              <FormSelectField
                form={form}
                name='role'
                label='Role'
                options={Roles}
                className='border-color-grey rounded !shadow-none'
              />
            </div>
            {/* <div className='flex flex-col items-center space-y-4 pt-4 justify-end'>
              <Button type='submit' className='site-button'>
                {editUserId ? <>Update</> : <>Submit</>}
              </Button>
            </div> */}

            <div className='mt-5 flex justify-end'>
              <Button type='submit' className='site-button'>
                {editUserId ? <>Update</> : <>Submit</>}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}
export default AddUser
