import api from '@/lib/api'
import { useEffect, useState } from 'react'
import FileUpload from '../share/form/FileUpload'
import FormInputField from '../share/form/FormInputField'
import FormSelectField from '../share/form/FormSelect'

const UserField = ({ form }) => {
  const [role, setRole] = useState([])
  /// get project
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [roleRes] = await Promise.all([api.get(`/roles`)])
        if (roleRes.status === 200) {
          const modifyProjectData = roleRes?.data?.data.map(item => {
            return {
              label: item.name,
              value: String(item.id)
            }
          })
          console.log("modifyProjectData",modifyProjectData)
          setRole(modifyProjectData)
        }
      } catch (error) {
        console.log('Fetch error', error)
      }
    }

    fetchAllData()
  }, [])
  return (
    <>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <FormInputField
          form={form}
          name='name'
          label='Name'
          placeholder='Enter Name'
        />
        <FormInputField
          form={form}
          name='email'
          label='Email'
          placeholder='Enter Email'
          type='email'
        />
        <FormInputField
          form={form}
          name='phone'
          label='Phone'
          placeholder='Enter Phone'
        />
        <FormInputField
          form={form}
          name='password'
          label='Password'
          placeholder='Enter Password'
        />
        <FormInputField
          form={form}
          name='password_confirmation'
          label='Confirmation Password'
          placeholder='Confirmation Password'
        />
        <FormInputField
          form={form}
          name='address'
          label='Address'
          placeholder='Enter Address'
        />
        <FormSelectField
          form={form}
          name='role_id'
          label='Role'
          placeholder='Select Role'
          options={role}
        />
        <FormSelectField
          form={form}
          name='status'
          label='Status'
          placeholder='Select Status'
          options={[
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'In Active' }
          ]}
        />
        <FileUpload form={form} name='avatar' />
      </div>
    </>
  )
}

export default UserField
