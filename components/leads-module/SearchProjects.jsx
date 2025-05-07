'use client'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import BudgetBooksServices from '../../services/budgetBook'
import FormInputField from '../share/form/FormInputField'
import { DataTable } from '../Table'
import { errorMessage } from '../ToasterMessage'
import { SalePersonDataTable } from '../salePersonFormTable'

const SearchProjects = ({ handleCloseDialog, handleProjectSelect }) => {
  const [rowSelection, setRowSelection] = useState({})

  const [getList, setList] = useState([])
  const [filteredList, setFilteredList] = useState([])
  const [loading, setLoading] = useState(true)

  const form = useForm({
    defaultValues: {
      search: ''
    }
  })

  const searchValue = useWatch({
    control: form.control,
    name: 'search'
  })

  const Columns = [
    {
      id: 'select',
      // header: ({ table }) => ("hg"
      //   // <input
      //   //   type='checkbox'
      //   //   checked={table.getIsAllRowsSelected()}
      //   //   ref={el => {
      //   //     if (el) el.indeterminate = table.getIsSomeRowsSelected()
      //   //   }}
      //   //   onChange={table.getToggleAllRowsSelectedHandler()}
      //   // />
      // ),
      cell: ({ row }) => (
        <input
          type='checkbox'
          checked={row.getIsSelected()}
          onChange={() => handleRowSelection(row)}
        />
      )
    },
    
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => <div>{row.getValue('name')}</div>
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => <div>{row.getValue('description')}</div>
    }
  ]

  const getBudgetBooks = async () => {
    try {
      setLoading(true)
      const response = await BudgetBooksServices.budgetBooks()
      if (response.status === 200) {
        setList(response?.data?.data)
        setFilteredList(response?.data?.data)
      }
    } catch (error) {
      console.log('err', error)
      errorMessage({
        description: error?.response?.data?.message || 'Something went wrong.'
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getBudgetBooks()
  }, [])

  // Filter the list whenever searchValue or getList changes
  useEffect(() => {
    const filtered = getList.filter(item =>
      item.name?.toLowerCase().includes(searchValue?.toLowerCase())
    )
    setFilteredList(filtered)
  }, [searchValue, getList])

  const handleRowSelection = (row) => {
    // Only allow one row selection at a time
    setRowSelection({ [row.id]: true })
  }

  const handleSearchSubmit = () => {
    const selectedData = Object.keys(rowSelection).map(index => filteredList[index])
    if (selectedData.length > 0) {
      handleProjectSelect(selectedData[0]) // assuming single selection
      handleCloseDialog() // close the dialog after selecting
    }
  }

  return (
    <>
      <FormProvider {...form}>
        <form
          onSubmit={e => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit(handleSearchSubmit)()
          }}
          className='flex items-center gap-5'
        >
          <FormInputField
            form={form}
            name='search'
            placeholder='Search Materials'
          />
          <Button type='submit' className='site-button'>Submit</Button>
        </form>

        <SalePersonDataTable
          loading={loading}
          data={filteredList}
          columns={Columns}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection} 
        />
      </FormProvider>
    </>
  )
}

export default SearchProjects
