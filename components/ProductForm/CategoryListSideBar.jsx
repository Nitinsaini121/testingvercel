'use client'

import api from '@/lib/api'
import { useEffect, useState } from 'react'
import FormRadioButton from '../share/form/FormInputRadioButtom'
import { errorMessage } from '../ToasterMessage'
import { CardDescription } from '../ui/card'

const CategoryListSideBar = ({ form }) => {
  const [list, setList] = useState([])
  const getCategories = async () => {
    try {
      const response = await api.get('/productCategory/getAllProductCategory')
      if (response.status === 200) {
        setList(response?.data?.data?.productCategory)
      }
    } catch (error) {
      if (error) {
        errorMessage({ description: error?.response?.data?.message })
      }
    }
  }
  useEffect(() => {
    getCategories()
  }, [])

  return (
    <>
      <div>
        <CardDescription className='text-black-900 mb-3 mt-5 text-xl font-semibold'>
          Product Category
        </CardDescription>
        <div className='pl-2'>
          <FormRadioButton
            name='category'
            form={form}
            label=''
            options={list?.map(item => ({
              label: item.name,
              value: item.id
            }))}
            className='mb-2'
          />
        </div>
      </div>
    </>
  )
}

export default CategoryListSideBar
